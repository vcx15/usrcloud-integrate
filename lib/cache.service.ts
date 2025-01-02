import { Cacheables } from "cacheables";

export const cache = new Cacheables({
  enabled: true,
  logTiming: true,
  log: true,
});

export const getUserToken = () =>
  cache.cacheable(
    async () => {
      const response = await fetch(
        "https://openapi.mp.usr.cn/usrCloud/V6/user/getAuthToken",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            appKey: "JzihOBti",
            appSecret: "edc919p2md2afinboc4r29k06y284eck",
          }),
        }
      );

      return JSON.stringify(await response.json());
    },
    "token",
    {
      cachePolicy: "max-age",
      maxAge: 7200000, // 2 hours
    }
  );
