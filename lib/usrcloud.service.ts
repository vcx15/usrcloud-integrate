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

export const fetchDataHistoryServerAddress = async (): Promise<string> => {
  const token = await get("token");

  const response = await fetch(
    "https://openapi.mp.usr.cn/usrCloud/V6/ucloudSdk/getHistoryServerAddress",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": token,
      },
      body: JSON.stringify({}),
    }
  );

  const result = await response.json();

  return result["data"]["historyServerAddr"];
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
    // console.log("DATA POINT LIST", dataPointList);
    // console.log(
    //   "DATA POINT LIST FILTER",
    //   dataPointList.filter((item: any) =>
    //     (item["name"] as string).endsWith("总电能")
    //   )
    // );
    // console.log(
    //   "DATA POINT LIST MAP",
    //   dataPointList.map((item: any) => item["name"] as string)
    // );
    return dataPointList
      .filter((item: any) => (item["name"] as string).endsWith("总电能"))
      .map((item: any) => {
        return {
          id: item["dataPointRelId"],
          deviceId: cusDeviceId,
          name: item["name"],
        };
      });
  }

  public static async getTotalElectricalPowerGroupByOperator(
    projectId: string
  ): Promise<any> {
    // 1. 通过projectId查询所有的设备
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

    const deviceList = (data["data"]["cusdeviceResponseDTO"] as Array<any>).map(
      (item: any) => {
        return {
          id: item["cusdeviceNo"],
          name: item["cusdeviceName"],
        };
      }
    );

    // 2. 通过cusDeviceId查询所有的数据点
    const deviceDataList = [];
    for (const device of deviceList) {
      const datapointList = await this.getTotalDatapointList(device.id);

      const historyServerAddress = await fetchDataHistoryServerAddress();
      console.log("HISTORY SERVER ADDRESS", historyServerAddress);
      // 获取该设备的最新数据

      console.log("DATAPONT LIST", datapointList);
      const response = await fetch(
        `${historyServerAddress}/history/cusdevice/lastDataPoint`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Token": await get("token"),
          },
          body: JSON.stringify({
            dataPoints: datapointList.map((item: any) => {
              return {
                cusdeviceNo: item.deviceId,
                dataPointId: item.id,
              };
            }),
          }),
        }
      );

      const result = await response.json();
      console.log("RESULT", result);

      const finalData = result["data"]["list"].map(
        (item: any) => {
          return {
            datapointId: item["dataPointId"],
            variableName: item["variableName"],
            deviceId: item["cusdeviceNo"],
            deviceName: item["cusdeviceName"],
            dataValue: item["value"],
          };
        }
      );

      console.log("FINAL DATA", finalData);
      deviceDataList.push(...finalData)
    }

    console.log("deviceDataMap", deviceDataList);
    return deviceDataList;

    // // 按运营商分组计算总量
    // for (const deviceData of deviceDataMap) {
    //   console.log("DEVICE DATA", deviceData);
    // }
  }
}
