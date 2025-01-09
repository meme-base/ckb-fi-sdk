/* eslint-disable @typescript-eslint/no-explicit-any */
import path from "path";
import { defineConfig, ConfigEnv, UserConfigExport } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
// import windiCSS from "vite-plugin-windicss";

const getPath = (url: string) => path.resolve(__dirname, url);

export default ({ mode, command, isSsrBuild }: ConfigEnv) => {
  mode = ["dev", "prod"].includes(mode) ? mode : "dev";
  const isServeMode = command === "serve"; // 是否为开发模式
  console.log({
    mode: process.env.NODE_ENV,
    env: mode,
    command,
    isServeMode,
    isSsrBuild,
  });

  const config: UserConfigExport = {
    root: getPath(__dirname),
    // define: {
    //   "process.env": {},
    // },
    resolve: {
      alias: {
        "@": getPath("src"),
        assets: getPath("src/assets"),
        components: getPath("src/components"),
        pages: getPath("src/pages"),
      },
    },
    plugins: [
      ViteEjsPlugin({
        NODE_ENV: process.env.NODE_ENV,
        APP_ENV: mode,
        PROJECT: process.env.VITE_CARV_PROJECT,
        INTERFACE_API: process.env.VITE_INTERFACE_API_HOST,
      }),
      // windiCSS(),
    ],
    // 配置需要预编译的包，主要是一些按需加载的模块（避免开发中频繁出现 optimized dependencies changed. reloading）
    optimizeDeps: {
      include: ["lodash-es"],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern",
        },
      },
    },
    build: {
      assetsInlineLimit: 0, // 兼容 svg 文件引入
      sourcemap: mode === "prod" ? "hidden" : false, // 使用 Sentry 时打开（非本地环境时）
      chunkSizeWarningLimit: 1500, // 文件超过该大小会有警告信息（视具体情况设置）
      commonjsOptions: {
        strictRequires: true,
      },
      rollupOptions: {
        onLog(level, log: any, handler) {
          if (
            log.cause &&
            log.cause?.message === `Can't resolve original location of error.`
          ) {
            return;
          }
          handler(level, log);
        },
        // https://rollupjs.org/configuration-options/#onwarn
        onwarn: (warning, warn) => {
          // 若警告是 "Generated an empty chunk"，则忽略它
          if (warning.code === "EMPTY_BUNDLE") return;
          // 否则用默认警告函数输出
          warn(warning);
        },
        output: {
          // chunk 最小体积（只是压缩前的大小，可适当设置大点，这是个试验性功能，我打包后出现了报错）
          // experimentalMinChunkSize: 100000,
          // https://rollupjs.org/configuration-options/#output-manualchunks
          manualChunks(id: string) {
            if (id.indexOf("node_modules") !== -1) {
              const basic = id.toString().split("node_modules/")[1];
              const sub1 = basic.split("/")[0];
              if (sub1 !== ".pnpm") {
                return sub1.toString();
              }
              const name2 = basic.split("/")[1];
              return name2.split("@")[name2[0] === "@" ? 1 : 0].toString();
            }
          },
          entryFileNames() {
            return "assets/app.[hash].js";
          },
          // chunkFileNames: (chunkInfo: { facadeModuleId: string | null }) => {
          //   const facadeModuleId = chunkInfo.facadeModuleId
          //     ? chunkInfo.facadeModuleId.split('/')
          //     : []
          //   const fileName =
          //     facadeModuleId[facadeModuleId.length - 2] || '[name]'
          //   return `assets/${fileName}/[name].[hash].js`
          // },
          // 资源文件
          //   assetFileNames(chunk: any) {
          //     const chunkName = chunk.name || "";
          //     // css
          //     if (chunk.name?.endsWith(".css")) {
          //       return "assets/css/[name].[hash].[ext]";
          //     }
          //     // image
          //     if (/.(png|jpg|gif|jpeg|webp)$/.test(chunkName)) {
          //       return "assets/img/[name].[hash].[ext]";
          //     }
          //     // svg
          //     if (/.svg$/.test(chunkName)) {
          //       return "assets/svg/[name].[hash].[ext]";
          //     }
          //     // fonts
          //     if (/.(ttf|eot|woff|woff2)$/.test(chunkName)) {
          //       return "assets/fonts/[name].[hash].[ext]";
          //     }

          //     return "assets/others/[name].[hash].[ext]";
          //   },
        },
      },
    },
    server: {
      host: "localhost",
      strictPort: true,
      port: 3000,
      open: true,
    },
    preview: {
      port: 3322,
    },
  };

  return defineConfig(config);
};
