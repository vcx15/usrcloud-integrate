import { pad } from "echarts/types/src/util/time.js";
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
    const token = await get("token");

    const response = await fetch(
      "https://openapi.mp.usr.cn/usrCloud/V6/user/getUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": token,
        },
        body: JSON.stringify({
          account: "4m02mir9",
        }),
      }
    );

    const data = await response.json();
    return data;
  }
}

export class OrgService {
  public static async getProvinceList(): Promise<Array<Province>> {
    const token = await get("token");

    const user = await UserService.getUser();
    const rootOrgId = user["data"]["projectId"];

    const response = await fetch(
      "https://openapi.mp.usr.cn/usrCloud/V6/organization/queryOrganizationList",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": token,
        },
        body: JSON.stringify({
          isTree: 1,
        }),
      }
    );

    const data = await response.json();
    const provinceList = (
      data["data"].filter((item: any) => item["id"] === rootOrgId) as Array<any>
    )
      .at(0)
      .children.map((item: any) => {
        return {
          id: item["id"],
          name: item["projectName"],
        } as Province;
      });
    return provinceList;
  }
}

export class DeviceService {
  public static async getBaseStationCount(projectId: string): Promise<number> {
    // 基站数量
    const token = await get("token");

    const response = await fetch(
      "https://openapi.mp.usr.cn/usrCloud/V6/cusdevice/getCusdevices",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": token,
        },
        body: JSON.stringify({
          projectId: projectId,
        }),
      }
    );

    const data = await response.json();
    return data["data"]["total"];
  }

  public static async getControllerCount(projectId: string): Promise<number> {
    // 计量控制设备数量
    const token = await get("token");

    const response = await fetch(
      "https://openapi.mp.usr.cn/usrCloud/V6/cusdevice/getCusdevices",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": token,
        },
        body: JSON.stringify({
          projectId: projectId,
        }),
      }
    );

    const data = await response.json();

    const deviceList = data["data"]["cusdeviceResponseDTO"] as Array<any>;
    const cusDeviceIds = deviceList.map((device: any) => {
      return device["cusdeviceNo"];
    });

    let totalSlaveCount = 0;
    for (const cusDeviceId of cusDeviceIds) {
      const response = await fetch(
        `https://openapi.mp.usr.cn/usrCloud/V6/cusdevice/getCusdeviceInfo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Token": token,
          },
          body: JSON.stringify({
            cusdeviceNo: cusDeviceId,
          }),
        }
      );
      const deviceDetail = await response.json();
      console.debug(
        (deviceDetail["data"]["cusdeviceSlaveRelDTO"] as Array<any>).length
      );
      totalSlaveCount += (
        deviceDetail["data"]["cusdeviceSlaveRelDTO"] as Array<any>
      ).length;
    }

    return totalSlaveCount + deviceList.length;
  }
}

export class DataService {
  public static async getTotalDatapointList(cusDeviceId: string): Promise<any> {
    // 运营商能耗数据点
    const token = await get("token");

    const response = await fetch(
      "https://openapi.mp.usr.cn/usrCloud/V6/cusdevice/getDataPointInfoForCusdeviceNo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": token,
        },
        body: JSON.stringify({
          cusdeviceNo: cusDeviceId,
        }),
      }
    );

    const data = await response.json();

    const dataSize = data["data"]["total"];

    const dataPointList = [];
    while (dataPointList.length < dataSize) {
      console.log("dataPointList.length", dataPointList.length);
      console.log("dataSize", dataSize);
      const response = await fetch(
        `https://openapi.mp.usr.cn/usrCloud/V6/cusdevice/getDataPointInfoForCusdeviceNo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Token": token,
          },
          body: JSON.stringify({
            cusdeviceNo: cusDeviceId,
            pageNo: dataPointList.length / 50 + 1,
            pageSize: 50,
          }),
        }
      );
      const pageData: any = await response.json();
      console.log("PAGE DATA", pageData);
      dataPointList.push(...pageData["data"]["cusdeviceDataPointList"]);
    }
    console.log("DATA POINT LIST", dataPointList);
    console.log(
      "DATA POINT LIST FILTER",
      dataPointList.filter((item: any) =>
        (item["name"] as string).endsWith("总电能")
      )
    );
    console.log(
      "DATA POINT LIST MAP",
      dataPointList.map((item: any) => item["name"] as string)
    );
    return dataPointList
      .filter((item: any) => (item["name"] as string).endsWith("总电能"))
      .map((item: any) => {
        return {
          id: item["dataPointRelId"],
          name: item["name"],
        };
      });
  }
}
