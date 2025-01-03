import { Cacheables } from "cacheables";
import { fetchUserToken } from "./usrcloud.service";

export const cache = new Cacheables({
  enabled: true,
  logTiming: true,
  log: true,
});

export const get = (key: string) =>
  cache.cacheable(fetchUserToken, key, {
    cachePolicy: "max-age",
    maxAge: 7200000, // 2 hours
  });
