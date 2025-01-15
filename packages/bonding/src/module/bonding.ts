export enum Enum_Env {
  DEV = "dev",
  PROD = "prod",
}

export interface I_BondingOptions {
  env?: Enum_Env;
}

export interface I_LoginParams {
  address: string;
  signatureText: string;
  signature: string;
}

export interface I_LaunchParams {
  icon_url: string;
  name: string;
  symbol: string;
  tweet_url: string;
  description: string;
}

export class Bonding {
  private env: Enum_Env;
  private baseUrl: string;
  private token: string = "";

  constructor(options: I_BondingOptions) {
    this.env = options?.env || Enum_Env.PROD;
    this.baseUrl =
      this.env === Enum_Env.PROD
        ? "https://api.ckb.fi/api/v1"
        : "https://dev.api.ckb.fi/api/v1";
  }

  // 获取签名文本
  async getSignatureText(): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/signature_text`);
      const data = await response.json();
      if (data.code !== 0) {
        throw new Error(data.message || "Failed to get signature text");
      }
      return data.data.text;
    } catch (error) {
      throw new Error(`Get signature text failed: ${error.message}`);
    }
  }

  // 登录
  async login(params: I_LoginParams): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: params.address,
          signature_text: params.signatureText,
          signature: params.signature,
        }),
      });

      const data = await response.json();
      if (data.code !== 0) {
        throw new Error(data.message || "Login failed");
      }

      this.token = data.data.token;
      return this.token;
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  }

  // 发射 Memecoin
  async launch(params: I_LaunchParams): Promise<number> {
    if (!this.token) {
      throw new Error("Please login first");
    }

    try {
      const response = await fetch(`${this.baseUrl}/bondings/direct_launch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({
          bonding: {
            icon_url: params.icon_url,
            name: params.name,
            symbol: params.symbol,
            tokenized_url: params.tweet_url,
            desc: params.description,
          },
        }),
      });

      const data = await response.json();
      if (data.code !== 0) {
        throw new Error(data.message || "Launch failed");
      }

      return data.data.id;
    } catch (error) {
      throw new Error(`Launch failed: ${error.message}`);
    }
  }
}
