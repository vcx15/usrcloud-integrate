import { Cacheables } from "cacheables";
import { fetchUserToken } from "./usrcloud.service";

export const cache = new Cacheables({
  enabled: true,
  logTiming: true,
  log: true,
});

export const get = (key: string, action: () => Promise<any>, expireTime?: number) =>
  cache.cacheable(action, key, {
    cachePolicy: "max-age",
    maxAge: expireTime ?? 7200000, // 2 hours
  });
