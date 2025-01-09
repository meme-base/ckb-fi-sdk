/** 延时函数 */
export const sleep = (ms = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
