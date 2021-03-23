export const delayPromise = (ms: number = 250) => (x: any) =>
  new Promise((resolve) => setTimeout(() => resolve(x), ms));
