/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./index.css";
import {
  CarvId,
  Enum_Env,
  Enum_CarvIdTheme,
  Enum_CarvIdIconPlacement,
  I_CarvIdOptions,
} from "@ckb-fi/bonding"; // 从工作区引入（本地测试）
// } from "@ckb-fi/bonding"; // 从 NPM 包引入（NPM 包测试）

interface I_SDKConfig {
  env: "dev" | "prod";
}

const SDKConfig: I_SDKConfig = {
  env: "dev",
};

const defaultParams = {
  name: "The Banana Game",
  symbol: "Banana",
  desc: "We are THE 🍌 game",
  icon_url: "https://img.icons8.com/ios/452/ethereum.png",
  tokenized_url: "https://x.com/thebananagameee/status/1816759320526356680",
};

const Bonding = () => {
  const [params, setParams] = useState(defaultParams);
  const [link, setLink] = useState("");
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiJ9.eyJhZGRyZXNzIjoiY2t0MXF6ZGEwY3IwOG04NWhjOGpsbmZwM3plcjd4dWxlanl3dDQ5a3QycnIwdnRoeXdhYTUweHdzcXZrZWcwZjk3bnV3bTBzcDJzZGxjeXJreTJ2ZGd6OXQ5Y3J6c3k1ayIsInVzZXJfaWQiOjM0LCJleHAiOjE3MzY0OTI5Mjl9.Ft4VVXvHgnFaoHtdp-BOYKx022P4fRzLLrIw6grCe5c"
  );
  const paramsStr = JSON.stringify(params, null, 2);

  const handleLogin = () => {
    // 1.获取待签名内容
    // 2.签名
    // 3.登录，得到 token
  };

  const handleLaunch = (e: any) => {
    e.preventDefault();

    if (!params) return toast.warn("Params is required");

    // const formFields = Object.keys(formValues);
    // let newFormValues = { ...formValues };

    // for (let index = 0; index < formFields.length; index++) {
    //   const currentField = formFields[index];
    //   const { value, required, validator } = formValues[currentField];

    //   const isError = required
    //     ? validator
    //       ? validator(value, formValues)
    //       : typeof value === "string"
    //         ? value.trim() === ""
    //         : value
    //     : false;

    //   newFormValues = {
    //     ...newFormValues,
    //     [currentField]: {
    //       ...newFormValues[currentField],
    //       error: !!isError,
    //       validatorMessage: typeof isError === "string" ? isError : "",
    //     },
    //   };
    // }
    // setFormValues(newFormValues);
    // const hasError = Object.values(newFormValues).some((itm) => itm.error);
    // if (hasError) return;

    // setLoading(true);
    // refUpload?.current
    //   // @ts-ignore
    //   ?.upload()
    //   .then(async (url: string) => {
    // const params = {
    //   name: formValues.name.value.trim(),
    //   symbol: formValues.symbol.value.trim(),
    //   desc: formValues.desc.value.trim(),
    //   icon_url: url,
    //   tokenized_url: formValues.tokenized_url.value.trim(),
    // };

    //   await directLaunchBonding({
    //     bonding: params,
    //   });
    //   toast.success("Launch successfully");
    //   setLoading(false);
    //   onSuccess();

    //   //   window?.gtm?.track('launch memecoin', {
    //   //     proposal_name: params.name,
    //   //     proposal_symbol: params.symbol
    //   //   })
    // })
    // .catch((err: string) => {
    //   console.log(err);
    //   setLoading(false);
    // });

    axios
      .post(
        "https://dev.api.ckb.fi/api/v1/bondings/direct_launch",
        { bonding: params },
        {
          params: {
            chain_id: 0,
            cv: 2,
          },
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        const { code, data, message } = res.data || {};
        if (code !== 0) {
          return toast.error(message);
        }
        toast.success("Launch successfully");
        setLink(
          `${SDKConfig.env === "dev" ? "dev." : ""}.ckb.fi/detail/${data?.id || ""}`
        );
      });
  };

  const handleParamsChange = (e: any) => {
    setParams(JSON.parse(e.target.value || "null"));
  };

  const handleReset = () => {
    setParams(defaultParams);
    setLink("");
    toast.success("Reset successfully");
  };

  return (
    <div className="container-bonding">
      <h1 className="title">
        CKB-FI SDK <span>Demo{SDKConfig.env === "dev" ? "@dev" : ""}</span>
      </h1>
      <div className="box-col config-box">
        <h3>
          🟢 SDK Config&nbsp;&nbsp;
          <a
            href="https://github.com/meme-base/ckb-fi-sdk/blob/main/README.md"
            target="_blank"
          >
            📋 Documentation
          </a>
        </h3>
        <textarea rows={8} value={paramsStr} onChange={handleParamsChange} />
      </div>
      <div className="btn-col">
        <button id="btn-login" disabled={!!token} onClick={handleLogin}>
          🔑 Login
        </button>
        <button id="btn-launch" onClick={handleLaunch}>
          🕹️ Launch Memecoin
        </button>
        <button id="btn-reset" onClick={handleReset}>
          ↪️ Reset
        </button>
      </div>
      <div className="box-col params-box">
        <h3>🔵 Bonding Detail Link</h3>
        <pre>
          {link ? (
            <a target="_blank" href={link}>
              👉🏻 {link}
            </a>
          ) : (
            "No data"
          )}
        </pre>
      </div>
      {/* <div className="box-col params-box">
        <h3>🔵 Start Params</h3>
        <pre id="start-params"></pre>
      </div>
      <div className="box-col status-box">
        <h3>🟡 SDK Status</h3>
        <div className="box-pre">
          <p id="sdk-status">❗Not active</p>
          <p id="sdk-version"></p>
        </div>
      </div> */}
    </div>
  );
};

export default Bonding;
