// Configuration
const API_URL =
  process.env.API_URL ||
  "https://openapi.mp.usr.cn/usrCloud/V6/user/getAuthToken";
const APP_KEY = process.env.APP_KEY || "JzihOBti";
const APP_SECRET = process.env.APP_SECRET || "edc919p2md2afinboc4r29k06y284eck";

// Function to fetch user token
export const fetchUserToken = async (): Promise<string> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      appKey: APP_KEY,
      appSecret: APP_SECRET,
    }),
  });

  const data = await response.json();
  return JSON.stringify(data);
};
