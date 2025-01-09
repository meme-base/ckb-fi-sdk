import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { IconCARVID } from "../config/file";
import { MapUrl } from "../config/url";
import { throttle } from "lodash-es";
import * as Utils from "../utils";

export enum Enum_Env {
  DEV = "dev",
  PROD = "prod",
}
export enum Enum_CarvIdTheme {
  LIGHT = "light",
  DARK = "dark",
}
export enum Enum_CarvIdIconDirection {
  TOP = "top",
  RIGHT = "right",
  BOTTOM = "bottom",
  LEFT = "left",
}
export enum Enum_CarvIdIconPlacement {
  TOP_LEFT = "top-left",
  TOP_RIGHT = "top-right",
  BOTTOM_LEFT = "bottom-left",
  BOTTOM_RIGHT = "bottom-right",
}
export enum Enum_CarvIdIntent {
  AUTHORIZE = "authorize",
  IDENTITY = "identity",
}
export interface I_CarvIdAuthorizeConfig {
  client_id: string;
  client_secret: string;
  response_type: string;
  state: string;
  scope: string;
  redirect_uri: string;
}
export interface I_AuthenticateResponse {
  code: string;
  state: string;
  message?: string;
}
export interface I_CarvIdIconPlacementOffset {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}
export interface I_CarvIdOptions {
  env?: Enum_Env;
  theme?: Enum_CarvIdTheme;
  showWidget?: boolean;
  widgetOptions?: I_CarvIdWidgetOptions;
  authorizeConfig: I_CarvIdAuthorizeConfig;
  onLoad?: (data: CarvId) => void;
  onAuthSuccess?: (data: I_AuthenticateResponse) => void;
  onAuthFailed?: (data: I_AuthenticateResponse) => void;
}
export interface I_CarvIdWidgetOptions {
  env?: Enum_Env;
  theme?: Enum_CarvIdTheme;
  // icon?: string;
  size?: string;
  className?: string;
  draggable?: boolean;
  watchResize?: boolean;
  rememberPosition?: boolean;
  carvIdInstance?: CarvId;
  entryUrl?: string;
  placement?: Enum_CarvIdIconPlacement;
  offset?: I_CarvIdIconPlacementOffset;
}
export interface I_PositionInfo {
  x: number;
  y: number;
  direction: Enum_CarvIdIconDirection;
}

export const FLAG_CARV_ID_WINDOW_SIZE = "carv_id_window_size";
export const FLAG_CARV_ID_BTN_POSITION = "carv_id_btn_position";
export const FLAG_CARV_ID_AUTH_CODE = "carv_id_auth_code";

const defaultCarvIdWidgetOptions = {
  env: Enum_Env.PROD,
  theme: Enum_CarvIdTheme.LIGHT,
  // icon: IconCARVID,
  size: "48px",
  className: "",
  draggable: true,
  watchResize: true,
  rememberPosition: true,
  entryUrl: MapUrl[Enum_Env.PROD].TELEGRAM_APP_URL,
  placement: Enum_CarvIdIconPlacement.BOTTOM_RIGHT,
  offset: { left: 20, right: 20, top: 40, bottom: 60 },
};

@customElement("ckb-fi-sdk")
export class CarvIdWidget extends LitElement {
  @property({ type: Object })
  options?: I_CarvIdWidgetOptions = defaultCarvIdWidgetOptions;

  private elBtn: HTMLElement | null = null;
  private config = defaultCarvIdWidgetOptions;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private draggie: any; // 拖拽实例
  isDragging: boolean = false; // 是否正在拖
  position: I_PositionInfo = {
    x: 0,
    y: 0,
    direction: Enum_CarvIdIconDirection.RIGHT,
  }; // 图标当前位置信息
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private resizeHandler?: (e: any) => void; // 窗口大小变化事件处理函数

  static styles = css`
    :host {
      position: fixed;
      z-index: 50;
      width: var(--icon-size);
      height: var(--icon-size);
      touch-action: none; /* 禁用默认的触摸滚动行为 */
    }
    .ckb-fi-sdk-widget {
      cursor: pointer;
      width: var(--icon-size);
      height: var(--icon-size);
      user-select: none;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  `;

  // 记录位置信息到本地存储
  setButtonStorageData(data: I_PositionInfo) {
    const { innerWidth, innerHeight } = window;
    localStorage.setItem(
      FLAG_CARV_ID_WINDOW_SIZE,
      `${innerWidth},${innerHeight}`
    );
    localStorage.setItem(
      FLAG_CARV_ID_BTN_POSITION,
      `${data.x},${data.y},${data.direction},${this.config.placement}`
    );
  }
  // 从本地存储中获取位置信息
  getButtonStorageData() {
    const { innerWidth, innerHeight } = window;
    // 获取本地存储的位置信息
    const localPlacement = localStorage.getItem(FLAG_CARV_ID_BTN_POSITION);
    const [x, y, direction, placement] = localPlacement
      ? localPlacement.split(",")
      : [];

    // 获取本地存储的窗口大小信息
    const localWindowSize = localStorage.getItem(FLAG_CARV_ID_WINDOW_SIZE);
    const res = localWindowSize ? localWindowSize.split(",") : [];
    const width = Number(res[0] || 0);
    const height = Number(res[1] || 0);

    if (width && height && (width != innerWidth || height != innerHeight)) {
      this.clearButtonStorageData();
      return {
        x: innerWidth,
        y: innerHeight,
        direction: Enum_CarvIdIconDirection.RIGHT,
        placement,
      };
    }

    return {
      x: Number(x || 0),
      y: Number(y || 0),
      direction,
      placement,
    };
  }
  // 清除本地存储的位置信息
  clearButtonStorageData() {
    localStorage.removeItem(FLAG_CARV_ID_WINDOW_SIZE);
    localStorage.removeItem(FLAG_CARV_ID_BTN_POSITION);
  }
  // 初始化按钮位置信息
  setInitialPosition() {
    const { innerWidth, innerHeight } = window;

    const { x: btnX, y: btnY } = this.getButtonStorageData();
    // 如果有存储的位置信息，则使用存储的位置信息
    if (btnX && btnY) {
      if (
        (Number(btnX) || 0) < innerWidth &&
        (Number(btnY) || 0) < innerHeight
      ) {
        this.updatePosition(Number(btnX) || 0, Number(btnY) || 0);
      } else {
        this.updatePosition(innerWidth, innerHeight);
      }
    } else {
      // 如果没有存储的位置信息，则使用默认的位置信息
      const { top, right, bottom, left } = this.config.offset;
      let x, y;
      switch (this.config.placement) {
        case Enum_CarvIdIconPlacement.TOP_LEFT:
          x = left;
          y = top;
          break;
        case Enum_CarvIdIconPlacement.TOP_RIGHT:
          x = innerWidth - right;
          y = top;
          break;
        case Enum_CarvIdIconPlacement.BOTTOM_LEFT:
          x = left;
          y = innerHeight - bottom;
          break;
        case Enum_CarvIdIconPlacement.BOTTOM_RIGHT:
          x = innerWidth - right;
          y = innerHeight - bottom;
          break;
        default:
          x = innerWidth - right;
          y = innerHeight - bottom;
      }

      this.updatePosition(x, y);
    }
  }
  // 更新按钮位置信息
  updatePosition(x: number, y: number, type?: string) {
    const {
      left: iconLeft,
      top: iconTop,
      width: iconWidth,
      height: iconHeight,
    } = this.elBtn!.getBoundingClientRect();
    const isResize = type === "windowResize"; // 是否来自 Resize 事件
    const iconOffsetLeft = isResize ? iconLeft : x; // 按钮左侧位置
    const iconOffsetTop = isResize ? iconTop : y; // 按钮左侧位置
    const maxX = window.innerWidth - iconWidth;
    const maxY = window.innerHeight - iconHeight;
    let newDirection;
    let newX;

    // 水平方向控制 - 根据拖动结束时的 x 位置判断吸附到左侧或右侧
    if (iconOffsetLeft <= maxX / 2) {
      newDirection = Enum_CarvIdIconDirection.LEFT;
      newX = this.config.offset.left;
    } else {
      newDirection = Enum_CarvIdIconDirection.RIGHT;
      newX = maxX - this.config.offset.right;
    }

    // 垂直方向控制 - 根据拖动结束时的 y 位置判断吸附到上侧或下侧
    const newY = Math.max(
      this.config.offset.top,
      Math.min(iconOffsetTop, maxY - this.config.offset.bottom)
    );

    // 更新按钮位置
    this.position = { x: newX, y: newY, direction: newDirection };
    if (this.elBtn) {
      this.elBtn.style.left = newX + "px";
      this.elBtn.style.top = newY + "px";
    }

    return {
      left: newX,
      top: newY,
      direction: newDirection,
    };
  }
  // 点击悬浮图标
  handleClick() {
    // @ts-ignore
    const carvIdInstance = this.config.carvIdInstance!;
    if (carvIdInstance.getAuthCode()) {
      // alert("Authorized, open Identity page directly");
      window.open(this.config.entryUrl, "_blank");
    } else {
      // alert(
      //   "Unauthorized, bring authorization parameters to the CARVID bot for authorization"
      // );
      carvIdInstance.authenticateUser();
    }
  }
  // 销毁
  destroy() {
    localStorage.removeItem(FLAG_CARV_ID_WINDOW_SIZE);
    localStorage.removeItem(FLAG_CARV_ID_BTN_POSITION);
    localStorage.removeItem(FLAG_CARV_ID_AUTH_CODE);

    if (!this.elBtn) return;

    this.draggie?.destroy();
    this.elBtn.parentNode?.removeChild(this.elBtn);
    this.elBtn = null;

    if (this.config.watchResize && this.resizeHandler) {
      window.removeEventListener("resize", this.resizeHandler);
      this.resizeHandler = undefined;
    }
  }

  // 初始化
  async firstUpdated() {
    // 合并配置项
    this.config = Object.assign(this.config, {
      ...this.options,
      offset: Object.assign(this.config.offset, this.options?.offset || {}),
    });
    this.resizeHandler = throttle(() => {
      const { left, top, direction } = this.updatePosition(
        0,
        0,
        "windowResize"
      );

      if (this.config.rememberPosition) {
        this.setButtonStorageData({
          x: left,
          y: top,
          direction,
        });
      }
    }, 100);

    // 是否记住位置信息
    if (!this.config.rememberPosition) {
      this.clearButtonStorageData();
    }

    this.position = {
      x: 0,
      y: 0,
      direction: Enum_CarvIdIconDirection.RIGHT,
    };
    this.elBtn = this.shadowRoot?.host as HTMLElement; // 缓存当前按钮元素
    this.elBtn.style.setProperty("--icon-size", this.config.size); // 设置图标大小
    this.setInitialPosition(); // 设置初始位置

    // 开启拖拽功能
    if (this.config.draggable) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      // const Draggabilly = (await import("draggabilly")).default;
      const Draggabilly = (
        await import(
          // @ts-ignore
          "https://cdn.jsdelivr.net/npm/draggabilly@3.0.0/+esm"
        )
      ).default;
      this.draggie = new Draggabilly(this.elBtn);

      this.draggie.on(
        "dragStart",
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // (event: Event, pointer: MouseEvent | Touch) => {
        (event: Event) => {
          event.stopPropagation();
          // console.log(event, pointer, "dragStart");
          this.isDragging = true;
          this.elBtn!.style.cursor = "move";
        }
      );
      // this.draggie.on("dragMove", (event, pointer) => {
      // console.log(event, pointer, "dragMove");
      // event.stopPropagation();
      // this.updatePosition();
      // });
      this.draggie.on(
        "dragEnd",
        (event: Event, pointer: MouseEvent | Touch) => {
          event.stopPropagation();
          this.elBtn!.style.cursor = "pointer";
          const { clientX, clientY } = pointer;
          const { left, top, direction } = this.updatePosition(
            clientX,
            clientY - 35
          );

          if (this.config.rememberPosition) {
            this.setButtonStorageData({
              x: left,
              y: top,
              direction,
            });
          }
          setTimeout(() => {
            this.isDragging = false;
          }, 50);
        }
      );
      this.draggie.on("staticClick", (event: Event) => {
        event.stopPropagation();
        this.handleClick();
      });
    }

    // 是否需要监听窗口大小变化
    if (this.config.watchResize) {
      window.addEventListener("resize", this.resizeHandler);
    }

    console.log(this.config, "CarvID Widget Initialized👌🏻");
  }
  destroyed() {
    this.destroy();
  }

  render() {
    const cls = `${this.config.className ? `${this.config.className} ` : ""}${this.config.theme === Enum_CarvIdTheme.DARK ? Enum_CarvIdTheme.DARK : Enum_CarvIdTheme.LIGHT}`;

    return html`
      <div class="ckb-fi-sdk-widget ${cls}">
        <img src="${IconCARVID}" alt="CARV ID" />
      </div>
    `;
  }
}

export class CarvId {
  env: Enum_Env;
  theme: Enum_CarvIdTheme;
  authCode: string;
  entryUrl: string;
  authorizeConfig: I_CarvIdAuthorizeConfig;
  onAuthSuccess?: (data: I_AuthenticateResponse) => void;
  onAuthFailed?: (data: I_AuthenticateResponse) => void;

  static utils = Utils;
  static version = "0.0.5"; // 更新版本号，和 package.json 一致

  constructor(options: I_CarvIdOptions) {
    const env = [Enum_Env.DEV, Enum_Env.PROD].includes(options?.env as Enum_Env)
      ? options.env!
      : Enum_Env.PROD;
    this.env = env;
    this.theme = [Enum_CarvIdTheme.LIGHT, Enum_CarvIdTheme.DARK].includes(
      options?.theme as Enum_CarvIdTheme
    )
      ? options.theme!
      : Enum_CarvIdTheme.LIGHT;

    this.authorizeConfig = options.authorizeConfig;
    if (!this.authorizeConfig) {
      throw new Error("authorizeConfig is required");
    }

    this.onAuthSuccess = options?.onAuthSuccess;
    this.onAuthFailed = options?.onAuthFailed;

    // 从本地获取 authCode
    this.authCode = this.getAuthCode();

    const encodeStartParams = Utils.HexUtils.jsonEncode({
      theme: this.theme,
      intent: Enum_CarvIdIntent.IDENTITY,
    });

    this.entryUrl = `${MapUrl[this.env].TELEGRAM_APP_URL}?startapp=${encodeStartParams}`;
    this.authenticateUser = this.authenticateUser.bind(this);
    this.handleAuthCallback = this.handleAuthCallback.bind(this);
    this.openIdentityPage = this.openIdentityPage.bind(this);
    this.destroy = this.destroy.bind(this);

    if (options?.showWidget) {
      const carvIdNode = document.createElement(
        "ckb-fi-sdk-widget"
      ) as CarvIdWidget;
      carvIdNode.options = {
        env,
        theme: this.theme,
        ...(options?.widgetOptions || {}),
        carvIdInstance: this,
        entryUrl: this.entryUrl,
      };
      document.body.appendChild(carvIdNode);
    }

    if (options?.onLoad) {
      options.onLoad(this);
    }
  }
  private getAuthCode() {
    return localStorage.getItem(FLAG_CARV_ID_AUTH_CODE) || "";
  }

  // CARVID 授权流程
  async authenticateUser() {
    if (!this.authorizeConfig) {
      throw new Error("authorizeConfig is required");
    }

    const authCode = this.getAuthCode();
    if (!authCode) {
      const encodeStartParams = Utils.HexUtils.jsonEncode({
        theme: this.theme,
        intent: Enum_CarvIdIntent.AUTHORIZE,
        authParams: JSON.stringify(this.authorizeConfig),
      });
      window.open(
        `${MapUrl[this.env].TELEGRAM_APP_URL}?startapp=${encodeStartParams}`
      );
    } else {
      // 已授权过，直接返回 authCode
      this.authCode = authCode;
      const res = {
        code: authCode,
        state: "",
        message: "Authorization success: from cache",
      };
      if (this.onAuthSuccess) {
        this.onAuthSuccess(res);
      }
    }
  }
  async handleAuthCallback(): Promise<I_AuthenticateResponse> {
    // @ts-ignore
    const tgapp = window?.Telegram?.WebApp;
    const startParam = tgapp?.initDataUnsafe?.start_param;
    if (!startParam) {
      return {
        code: "",
        state: "",
        message: "Authorization failed: no start param",
      };
    }

    const { code, state } = Utils.HexUtils.jsonDecode(startParam);
    if (code) {
      const result = { code, state, message: "Authorization success" };
      localStorage.setItem(FLAG_CARV_ID_AUTH_CODE, code);
      this.authCode = code;
      if (this.onAuthSuccess) {
        this.onAuthSuccess(result);
      }
      return result;
    } else {
      const result = { code, state, message: "Authorization failed" };
      localStorage.removeItem(FLAG_CARV_ID_AUTH_CODE);
      if (this.onAuthFailed) {
        this.onAuthFailed(result);
      }
      return result;
    }
  }
  // 打开 CARVID Bot 的首页，进去也会检查授权状态
  async openIdentityPage(user_id: string) {
    if (!user_id) {
      throw new Error("user_id is required");
    }

    window.open(this.entryUrl, "_blank");
  }

  // 销毁
  destroy() {
    localStorage.removeItem(FLAG_CARV_ID_WINDOW_SIZE);
    localStorage.removeItem(FLAG_CARV_ID_BTN_POSITION);
    localStorage.removeItem(FLAG_CARV_ID_AUTH_CODE);

    const elWidget = document.querySelector("ckb-fi-sdk-widget") as HTMLElement;
    if (!elWidget) return;

    elWidget.parentNode?.removeChild(elWidget);
  }
}
