import { Cacheables } from "cacheables";

export const cache = new Cacheables({
  enabled: true,
  logTiming: true,
  log: true,
});

export const get = (key: string, action: () => Promise<any>, expireTime?: number) =>
  cache.cacheable(action, key, {
    cachePolicy: "max-age",
    maxAge: expireTime ?? 2 * 60 * 60 * 1000, // 2 hours
  });
