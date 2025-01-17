<h1 align="center">CKB-FI Bonding SDK</h1>

## 🎾 Demo

- [CKB-FI SDK Demo](https://ckb-fi-sdk-test.vercel.com/)

<br/>

## 💊 Usage

#### 1、UMD

```html
<script
  src="https://cdn.jsdelivr.net/npm/@ckb-fi/bonding@latest/dist/ckb-fi-bonding.umd.js"
  defer
></script>

<script>
  window.onload = function () {
    const BondingInstance = new Bonding()
    console.log(BondingInstance, 'CKB-FI Bonding SDK initialized')
  }
</script>
```

#### 2、ES Module

```bash
npm i @ckb-fi/bonding -S
```

```typescript
import {
  Bonding,
  Enum_Env
} from "@ckb-fi/bonding";

  window.onload = function () {
    const BondingInstance = new Bonding()
    console.log(BondingInstance, 'CKB-FI Bonding SDK initialized')
  }
}
```

<br/>

## 🛠️ Options

#### 🔸 I_BondingOptions

```typescript
interface I_BondingOptions {
  env?: Enum_Env
}
```

| Field | Description | Type     | Default       |
| ----- | ----------- | -------- | ------------- |
| env   | Environment | Enum_Env | Enum_Env.PROD |

```typescript
// Initialize
const BondingInstance = new Bonding(Options:I_BondingOptions)
```

<br/>

## 🧩 Methods

#### 🔹 getTicket: (address: string) => Promise<string>

```ts
// Get ticket by address
const ticket = BondingInstance.getTicket('ckb...')
console.log('GetTicket success', ticket)
```

#### 🔹 signMessage: (params: I_SignMessageParams) => Promise<any>

```ts
// Sign ticket using your current provider
const resSign = BondingInstance.signMessage(params)
console.log('SignMessage success', resSign)
```

#### 🔹 login: (params: I_LoginParams) => Promise<string>

```ts
// Login to ckb.fi
const token = BondingInstance.login(params)
console.log('Login success', token)
```

#### 🔹 launch: (params: I_LaunchParams) => Promise<BondingItem | undefined>

```ts
// Launch memecoin
const data = BondingInstance.launch(params: I_LaunchParams)
console.log('Launch success', data)
```

<br/>

## 🛠️ Development

Execute `pnpm run dev` to start the demo project in the `/apps/ckb fi sdk demo` directory.

<br/>

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
