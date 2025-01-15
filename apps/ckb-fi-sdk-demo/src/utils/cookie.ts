/**
 * cookie 默认配置
 */
const defaultOptions = {
  Path: "/",
  Secure: true,
  SameSite: "Lax",
  // Domain: '.xxx.io' // 意味着无法在 localhost 环境调试
};

export const setCookie = (
  name: string,
  value: string,
  days?: number,
  options?: object
) => {
  const opts = {
    ...defaultOptions,
    ...(options || {}),
  };
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  const optionsString = Object.keys(opts).reduce((acc, key) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const optionValue = (opts as any)[key];
    if (optionValue === true) {
      return acc + `; ${key}`;
    } else if (optionValue) {
      return acc + `; ${key}=${optionValue}`;
    }
    return acc;
  }, "");

  document.cookie =
    name + "=" + (encodeURIComponent(value) || "") + expires + optionsString;
};

export const getCookie = (name: string) => {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2)
    return decodeURIComponent(parts?.pop()?.split(";")?.shift() || "");
};

export const deleteCookie = (name: string, options?: object) => {
  const opts = {
    ...defaultOptions,
    ...(options || {}),
  };
  const optionsString = Object.keys(opts).reduce((acc, key) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const optionValue = (opts as any)[key];
    if (optionValue === true) {
      return acc + `; ${key}`;
    } else if (optionValue) {
      return acc + `; ${key}=${optionValue}`;
    }
    return acc;
  }, "");

  document.cookie =
    name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + optionsString;
};
