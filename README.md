<p align="center">
  <img src="./stories/assets/logo.png" style="width:100px;" alt="CKB-FI logo" />
</p>
<h1 align="center">CKB-FI SDK</h1>


The SDK for CKB-FI ecosystem.

- Bonding Launch SDK

## 🎾 Demo

 - [CKB-FI SDK Demo](https://ckb-fi-sdk-test.verel.com/)

<br/>

<!-- ## 📒 Memo

-  xxx

<br/>

## 💊 Usage

#### 1、UMD

```html
<script src="https://cdn.jsdelivr.net/npm/@ckb-fi/bonding@latest/dist/ckb-fi-bonding.umd.js" defer></script>

<script>
 window.onload = function () {
  const CkbFiInstance = new CarvIdSDK.CarvId({
    showWidget: true,
    authorizeConfig: {
      client_id: "0a17299349c4b3e57bc8c25581b01bd0ec80c279",
      client_secret:
        "871cc95ca5a54866492bb052e0d487799e21a5c5896b7cd2ecbe813876a4b286",
      response_type: "code",
      state: "test app state",
      scope: "carv_id_basic_read email_basic_read evm_address_basic_read",
      redirect_uri: "https://t.me/BabyChinBot/carv_id_demo"
    }
  });
  console.log(CkbFiInstance, "CKB-FI SDK initialized");
}
</script>
```

#### 2、ES Module

```bash
pnpm add @ckb-fi/bonding
```

```typescript
import {
  CarvId,
  Enum_Env,
  Enum_CarvIdTheme,
  Enum_CarvIdIconPlacement,
} from "@ckb-fi/ckb-fi-sdk";

window.onload = function() => {
  const CkbFiInstance = new CarvId({
    theme: Enum_CarvIdTheme.LIGHT,
    showWidget: true,
    widgetOptions: {
      size: "60px",
      placement: Enum_CarvIdIconPlacement.BOTTOM_RIGHT
    },
    onLoad: (data) => {
      console.log("onLoad", data);
    },
    onAuthSuccess: (data) => {
      console.log("onAuthSuccess", data);
    },
    onAuthFailed: (data) => {
      console.log("onAuthFailed", data);
    }
  });
  console.log(CkbFiInstance, "CKB-FI SDK initialized");
}
```

<br/>

## 🧩 Methods

```typescript
// Initialize
const carvIdInstance = new CarvId(Options: I_CarvIdOptions)
```

#### 🔹 authenticateUser: () => void

```ts
// Start authorization process
carvIdInstance.authenticateUser();
```

#### 🔹 openIdentityPage: () => void

```ts
// Open CARV ID identity page
carvIdInstance.openIdentityPage();
```
#### 🔹 handleAuthCallback: Promise<I_AuthenticateResponse>

```ts
// Callback triggered after authorization
CkbFiInstance.handleAuthCallback().then((res: I_AuthenticateResponse) => {
  // {code: string, state: string}
  console.log(res, "handleAuthCallback");
  if (res.code) {
    console.log("Authorize success", res.code);
  }
});
```

<br/>

## 🛠️ Options

#### 🔸 I_CarvIdOptions

```typescript
interface I_CarvIdOptions {
  env?: Enum_Env;
  theme?: Enum_CarvIdTheme;
  showWidget?: boolean;
  widgetOptions?: I_CarvIdWidgetOptions;
  authorizeConfig: I_CarvIdAuthorizeConfig;
  onLoad?: (data: CarvId) => void;
  onAuthSuccess?: (data: I_AuthenticateResponse) => void;
  onAuthFailed?: (data: I_AuthenticateResponse) => void;
}
```

| Field            | Description                                            | Type                                   | Default                |
| ---------------- | ------------------------------------------------------ | -------------------------------------- | ---------------------- |
| env              | Environment                                            | Enum_Env                               | Enum_Env.PROD           |
| theme            | Theme mode                                             | Enum_CarvIdTheme                       | Enum_CarvIdTheme.LIGHT |
| showWidget       | Show widget icon                                       | Boolean                                | false                  |
| widgetOptions    | Widget options                                         | I_CarvIdWidgetOptions                  | undefined              |
| authorizeConfig  | Configuration for authorization                        | I_CarvIdAuthorizeConfig                | undefined              |
| onLoad           | Callback that triggered after SDK initialized          | (data: CarvId) => void                 | undefined              |
| onAuthSuccess    | Callback that triggered after authorization successful | (data: I_AuthenticateResponse) => void | undefined              |
| onAuthFailed     | Callback that triggered after authorization failed     | (data: I_AuthenticateResponse) => void | undefined              |

#### 🔸 I_CarvIdWidgetOptions

``` typescript
interface I_CarvIdWidgetOptions {
  theme?: Enum_CarvIdTheme;
  size?: string;
  className?: string;
  draggable?: boolean;
  watchResize?: boolean;
  rememberPosition?: boolean;
  placement?: Enum_CarvIdIconPlacement;
  offset?: I_CarvIdIconPlacementOffset;
}
```

| Field            | Description                     | Type                        | Default                                      |
| ---------------- | ------------------------------- | --------------------------- | -------------------------------------------- |
| theme            | Theme mode                      | Enum_CarvIdTheme            | Enum_CarvIdTheme.LIGHT                       |
| size             | Icon size                       | String                      | "48px"                                       |
| placement        | Icon placement                  | Enum_CarvIdIconPlacement    | Enum_CarvIdIconPlacement.BOTTOM_RIGHT        |
| offset           | The offset config for placement | I_CarvIdIconPlacementOffset | { left: 20, right: 20, top: 40, bottom: 60 } |
| className        | The class name of widget        | String                      | ""                                           |
| draggable        | Enable drag interaction         | Boolean                     | true                                         |
| watchResize      | Watch the resize event          | Boolean                     | true                                         |
| rememberPosition | Remember icon position          | Boolean                     | true                                         |

<br/> -->

## 🧿 Turborepo

This project generated from a [Turborepo](https://turbo.build/repo/docs) starter. Run the following command to init a new project:

```bash
npx create-turbo@latest -e with-vite
```

And this project includes the following packages and apps:

#### - Apps

- `ckb-fi-sdk-demo`: used for testing SDK

#### - Packages

- `docs`: documentation
- `web`: webapps
- `@ckb-fi/bonding`: SDK for handling bondings
- `@ckb-fi/utils`: a stub utility library shared by all applications
- `@ckb-fi/eslint-config`: shared `eslint` configurations
- `@ckb-fi/typescript-config`: `tsconfig.json`s used throughout the monorepo

<br/>

## 🦴 Utils

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

<br/>
