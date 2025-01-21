import { get } from "./cache.service";
import { Province } from "./entities";

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
  return data.data["X-Access-Token"];
};

export class UserService {
  public static async getUser() {
    const token = await get("token")

    const response = await fetch(
      "https://openapi.mp.usr.cn/usrCloud/V6/user/getUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": token,
        },
        body: JSON.stringify({
          account: "4m02mir9"
        }),
      }
    )

    const data = await response.json();
    return data;
  }
}

export class OrgService {
  public static async getProvinceList(): Promise<Array<Province>> {
    const token = await get("token")

    const user = await UserService.getUser()
    const rootOrgId = user['data']['projectId']

    const response = await fetch(
      "https://openapi.mp.usr.cn/usrCloud/V6/organization/queryOrganizationList",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": token,
        },
        body: JSON.stringify({
          isTree: 1
        }),
      }
    )

    const data = await response.json();
    const provinceList = (data['data'].filter((item: any) => item['id'] === rootOrgId) as Array<any>).at(0).children.map((item: any) => {
      return {
        id: item['id'],
        name: item['projectName']
      } as Province
    })
    return provinceList;
  }
}

export class DataService {
  public static async getBaseStationCount() {
    const token = await get("token")

    const response = await fetch(
      "https://openapi.mp.usr.cn/usrCloud/V6/data/count/baseStation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": token,
        },
        body: JSON.stringify({
          projectId: "4m02mir9"
        }),
      }
    )

    const data = await response.json();
    return data;
  }
}
