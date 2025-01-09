// @ts-nocheck
import { fromEnv } from "@aws-sdk/credential-providers";
import { intersectionBy, differenceBy } from "lodash";
import {
  S3Client,
  paginateListObjectsV2,
  DeleteObjectsCommand,
  PutObjectCommand,
  _Object,
} from "@aws-sdk/client-s3";
import { glob } from "glob";
import path from "node:path";
import crypto from "node:crypto";
import fs from "node:fs";
import mime from "mime-types";
import yargs from "yargs";
import chalk from "chalk";

interface LocalFile {
  path: string;
  absolutePath: string;
  md5: string;
}

const config: any = {
  dist: {
    ckbSDKDemo: "../../apps/ckb-fi-sdk-demo/dist",
  },
  oldDist: {
    ckbSDKDemo: "../../apps/ckb-fi-sdk-demo/dist-old",
  },
  project: {
    dev: {
      bucket: {
        ckbSDKDemo: "ckb-fi-sdk-test",
      },
    },
    prod: {
      bucket: {
        ckbSDKDemo: "ckb-fi-sdk-test",
      },
    },
  },
};

function createMD5(filePath: string) {
  return new Promise<string>((res, rej) => {
    const hash = crypto.createHash("md5");

    const rStream = fs.createReadStream(filePath);
    rStream.on("data", (data) => {
      hash.update(data);
    });
    rStream.on("end", () => {
      res(hash.digest("hex"));
    });
    rStream.on("error", (err) => {
      rej(err);
    });
  });
}

async function getAllS3Files(bucket: string, s3Client: S3Client) {
  const totalFiles: _Object[] = [];
  for await (const data of paginateListObjectsV2(
    { client: s3Client },
    {
      Bucket: bucket,
    }
  )) {
    totalFiles.push(...(data.Contents ?? []));
  }
  return totalFiles;
}

async function getAllLocalFiles(searchPath: string): Promise<LocalFile[]> {
  const res = await glob(path.resolve(__dirname, `${searchPath}/**`), {
    nodir: true,
  });
  return Promise.all(
    res.map(async (file) => ({
      path: path.relative(path.resolve(__dirname, searchPath), file),
      absolutePath: file,
      md5: JSON.stringify(await createMD5(file)),
    }))
  );
}

async function generateVersionFile(argv: any, dist: string) {
  const { project, env, sha } = argv;
  fs.writeFileSync(
    path.resolve(__dirname, `${dist}/version.json`),
    JSON.stringify(
      { project, env, version: sha, build_time: Date.now() },
      null,
      "\t"
    )
  );
}

async function deleteObjects(
  files: _Object[],
  bucket: string,
  s3Client: S3Client
) {
  if (files.length === 0) {
    return;
  }
  const command = new DeleteObjectsCommand({
    Bucket: bucket,
    Delete: { Objects: files.map((i) => ({ Key: i.Key! })) },
  });
  return s3Client.send(command);
}

async function uploadObjects(
  files: LocalFile[],
  bucket: string,
  s3Client: S3Client
) {
  if (files.length === 0) {
    return;
  }
  for (const file of files) {
    const command = new PutObjectCommand({
      Body: fs.createReadStream(file.absolutePath),
      Bucket: bucket,
      Key: file.path,
      ContentType: mime.lookup(file.absolutePath) as string,
      CacheControl: /\.(json|html)$/.test(file.path)
        ? "max-age=0"
        : "public,max-age=8640000",
    });
    await s3Client.send(command);
  }
}

async function main() {
  const argv = yargs(process.argv.slice(2))
    .options({
      env: { type: "string", default: "dev" },
      project: { type: "string", default: "" },
      sha: { type: "string", default: "" },
      onlyOutput: { type: "boolean", default: false },
      useLocalS3: { type: "boolean", default: false },
    })
    .parseSync();

  const bucket = config.project[argv.env].bucket[argv.project];
  const dist = config.dist[argv.project];

  // await generateVersionFile(argv, dist);
  // console.log(chalk.green("成功生成版本文件 version.json"));

  const allLocalFiles = await getAllLocalFiles(dist);

  if (argv.useLocalS3) {
    const allLocalS3Files = await getAllLocalFiles(
      config.oldDist[argv.project]
    );

    const newly = differenceBy(allLocalFiles, allLocalS3Files, (item) => {
      return item.md5 + item.path;
    });
    const deleted = differenceBy(allLocalS3Files, allLocalFiles, (item) => {
      return item.md5 + item.path;
    });
    const notChanged = intersectionBy(
      allLocalS3Files,
      allLocalFiles,
      (item) => {
        return item.md5 + item.path;
      }
    );

    console.log(
      chalk.green(
        `本次构建共产生 ${allLocalFiles.length} 个文件，S3 当前存储 ${allLocalS3Files.length} 个文件，新增 ${newly.length} 个文件，删除 ${deleted.length} 个文件，未修改 ${notChanged.length} 个文件`
      )
    );
    console.log(chalk.green(`新增 ${newly.length} 个文件`));
    newly.forEach((i) => {
      console.log(chalk.cyan(i.absolutePath));
    });
    console.log(chalk.red(`删除 ${deleted.length} 个文件`));
    deleted.forEach((i) => {
      console.log(chalk.red(i.absolutePath));
    });
    // console.log(chalk.blueBright(`未修改 ${notChanged.length} 个文件`))
  } else {
    const s3Client = new S3Client({
      region: "ap-southeast-1",
      credentials: fromEnv(),
    });

    const allS3Files = await getAllS3Files(bucket, s3Client);

    const newly = differenceBy(allLocalFiles, allS3Files, (item) => {
      if ("md5" in item) {
        return item.md5 + item.path;
      }
      return item.ETag + (item.Key ?? "");
    });
    const deleted = differenceBy(allS3Files, allLocalFiles, (item) => {
      if ("md5" in item) {
        return item.md5 + item.path;
      }
      return item.ETag + (item.Key ?? "");
    });
    const notChanged = intersectionBy(allS3Files, allLocalFiles, (item) => {
      if ("md5" in item) {
        return item.md5 + item.path;
      }
      return item.ETag + (item.Key ?? "");
    });

    console.log(
      chalk.green(
        `本次构建共产生 ${allLocalFiles.length} 个文件，S3 当前存储 ${allS3Files.length} 个文件，新增 ${newly.length} 个文件，删除 ${deleted.length} 个文件，未修改 ${notChanged.length} 个文件`
      )
    );
    console.log(chalk.green(`新增 ${newly.length} 个文件`));
    newly.forEach((i) => {
      console.log(chalk.cyan(i.path));
    });
    console.log(chalk.red(`删除 ${deleted.length} 个文件`));
    deleted.forEach((i) => {
      console.log(chalk.red(i.Key));
    });
    console.log(chalk.blueBright(`未修改 ${notChanged.length} 个文件`));
    notChanged.forEach((i) => {
      console.log(chalk.blue(i.Key));
    });

    // fs.writeFileSync(
    //   'result.json',
    //   JSON.stringify({ newly, deleted, notChanged }, null, '\t')
    // )

    await deleteObjects(deleted, bucket, s3Client);
    console.log(chalk.green("成功删除旧文件"));
    await uploadObjects(newly, bucket, s3Client);
    console.log(chalk.green("成功上传新文件"));
  }
}

main();
