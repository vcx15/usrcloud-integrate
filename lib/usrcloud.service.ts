import { pad } from "echarts/types/src/util/time.js";
import { get } from "./cache.service";
import { Province } from "./entities";
import dayjs from "dayjs";

// Configuration
const API_URL =
  process.env.API_URL ||
  "https://openapi.mp.usr.cn/usrCloud/V6/user/getAuthToken";
const APP_KEY = process.env.APP_KEY || "JzihOBti";
const APP_SECRET = process.env.APP_SECRET || "edc919p2md2afinboc4r29k06y284eck";

const dataServerUrl = "https://history.usr.cn:7002";

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

// export const fetchDataHistoryServerAddress = async (): Promise<string> => {
//   const token = await get("token");

//   const response = await fetch(
//     "https://openapi.mp.usr.cn/usrCloud/V6/ucloudSdk/getHistoryServerAddress",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "X-Access-Token": token,
//       },
//       body: JSON.stringify({}),
//     }
//   );

//   const result = await response.json();

//   return result["data"]["historyServerAddr"];
// };

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

  public static async getSubOrg(projectId: string) {
    const token = await get("token");

    // const user = await UserService.getUser();
    // const rootOrgId = user["data"]["projectId"];

    const response = await fetch(
      "https://openapi.mp.usr.cn/usrCloud/V6/organization/queryOrganizationList",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": token,
        },
        body: JSON.stringify({
          isTree: 0,
        }),
      }
    );

    const data = await response.json();

    console.log("DATA LIST", data["data"]["list"]);

    const subOrgList = (
      data["data"]["list"].filter(
        (item: any) => item["parentId"].toString() === projectId
      ) as Array<any>
    ).map((item: any) => {
      return {
        id: item["id"],
        name: item["projectName"],
      };
    });
    return subOrgList;
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
  public static async getDatapointList(
    cusDeviceId: string,
    type: string,
    category: string // 数据点分类（电费/电能）
  ): Promise<any> {
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
            pageNo: dataPointList.length / 500 + 1,
            pageSize: 500,
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
    let endString = "总" + category;
    switch (type) {
      case "total":
        endString = "总" + category;
        break;
      case "lastMonth":
        endString = "上月" + category;
        break;
      case "thisMonth":
        endString = "本月" + category;
        break;
    }
    return dataPointList
      .filter((item: any) => (item["name"] as string).endsWith(endString))
      .map((item: any) => {
        return {
          id: item["dataPointRelId"],
          deviceId: cusDeviceId,
          name: item["name"],
        };
      });
  }

  public static async getElectricalPowerGroupByOperator(
    projectId: string,
    type: string
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
      const datapointList = await this.getDatapointList(
        device.id,
        type,
        "电能"
      );

      const historyServerAddress = dataServerUrl;
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

      const finalData = result["data"]["list"].map((item: any) => {
        return {
          datapointId: item["dataPointId"],
          variableName: item["variableName"],
          deviceId: item["cusdeviceNo"],
          deviceName: item["cusdeviceName"],
          dataValue: item["value"],
        };
      });

      console.log("FINAL DATA", finalData);
      deviceDataList.push(...finalData);
    }

    console.log("deviceDataMap", deviceDataList);
    // return deviceDataList;

    // 按运营商分组计算总量
    let chinaMobileData = 0;
    let chinaUnicomData = 0;
    let chinaTelecomData = 0;
    let guangdianData = 0;
    let zhilianData = 0;
    let nengyuanData = 0;
    let tietaData = 0;
    let noTenantData = 0;
    for (const deviceData of deviceDataList) {
      // console.log("DEVICE DATA", deviceData);
      if ((deviceData["variableName"] as string).includes("移动")) {
        chinaMobileData += parseFloat(deviceData["dataValue"]);
      }
      if ((deviceData["variableName"] as string).includes("联通")) {
        chinaUnicomData += parseFloat(deviceData["dataValue"]);
      }
      if ((deviceData["variableName"] as string).includes("电信")) {
        chinaTelecomData += parseFloat(deviceData["dataValue"]);
      }
      if ((deviceData["variableName"] as string).includes("广电")) {
        guangdianData += parseFloat(deviceData["dataValue"]);
      }
      if ((deviceData["variableName"] as string).includes("智联")) {
        zhilianData += parseFloat(deviceData["dataValue"]);
      }
      if ((deviceData["variableName"] as string).includes("能源")) {
        nengyuanData += parseFloat(deviceData["dataValue"]);
      }
      if ((deviceData["variableName"] as string).includes("铁塔")) {
        tietaData += parseFloat(deviceData["dataValue"]);
      }
      if ((deviceData["variableName"] as string).includes("无租户")) {
        noTenantData += parseFloat(deviceData["dataValue"]);
      }
    }

    return [
      chinaMobileData.toFixed(2),
      chinaUnicomData.toFixed(2),
      chinaTelecomData.toFixed(2),
      guangdianData.toFixed(2),
      zhilianData.toFixed(2),
      nengyuanData.toFixed(2),
      tietaData.toFixed(2),
      noTenantData.toFixed(2),
    ];
  }

  public static async getElectricalPowerGroupBySubOrg(
    projectId: string,
    type: string
  ): Promise<any> {
    const token = await get("token");
    // 1. 通过projectId查询下级组织列表
    const subOrgList = await OrgService.getSubOrg(projectId);

    const allDeviceDataList = [];
    for (const subOrg of subOrgList) {
      // 2.a. 通过projectId查询所有的设备
      const response = await fetch(
        "https://openapi.mp.usr.cn/usrCloud/V6/cusdevice/getCusdevices",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Token": token,
          },
          body: JSON.stringify({
            projectId: subOrg.id,
          }),
        }
      );

      const data = await response.json();

      const deviceList = (
        data["data"]["cusdeviceResponseDTO"] as Array<any>
      ).map((item: any) => {
        return {
          id: item["cusdeviceNo"],
          name: item["cusdeviceName"],
        };
      });

      // 2. 通过cusDeviceId查询所有的数据点
      const deviceDataList = [];
      for (const device of deviceList) {
        const datapointList = await this.getDatapointList(
          device.id,
          type,
          "电能"
        );

        const historyServerAddress = dataServerUrl;
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

        const finalData = result["data"]["list"].map((item: any) => {
          return {
            projectId: subOrg.id,
            datapointId: item["dataPointId"],
            variableName: item["variableName"],
            deviceId: item["cusdeviceNo"],
            deviceName: item["cusdeviceName"],
            dataValue: item["value"],
          };
        });

        console.log("FINAL DATA", finalData);
        deviceDataList.push(...finalData);
      }
      allDeviceDataList.push(...deviceDataList);
    }

    // return allDeviceDataList;
    // 按subOrgId分组统计总量
    const resultList = [];
    for (const org of subOrgList) {
      const result = allDeviceDataList
        .filter((deviceData) => deviceData.projectId === org.id)
        .reduce((result, deviceData) => {
          if (!result["total"]) {
            result["total"] = 0;
          }
          result["total"] += parseFloat(deviceData.dataValue);
          return result;
        });

      resultList.push({
        id: org.id,
        result: result["total"],
      });
    }

    return resultList;
  }

  public static async getElectricChargeGroupByOperator(
    projectId: string,
    type: string
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
      const datapointList = await this.getDatapointList(
        device.id,
        type,
        "电费"
      );

      const historyServerAddress = dataServerUrl;
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

      const finalData = result["data"]["list"].map((item: any) => {
        return {
          datapointId: item["dataPointId"],
          variableName: item["variableName"],
          deviceId: item["cusdeviceNo"],
          deviceName: item["cusdeviceName"],
          dataValue: item["value"],
        };
      });

      console.log("FINAL DATA", finalData);
      deviceDataList.push(...finalData);
    }

    console.log("deviceDataMap", deviceDataList);
    // return deviceDataList;

    // 按运营商分组计算总量
    let chinaMobileData = 0;
    let chinaUnicomData = 0;
    let chinaTelecomData = 0;
    let guangdianData = 0;
    let zhilianData = 0;
    let nengyuanData = 0;
    let tietaData = 0;
    let noTenantData = 0;
    for (const deviceData of deviceDataList) {
      // console.log("DEVICE DATA", deviceData);
      if ((deviceData["variableName"] as string).includes("移动")) {
        chinaMobileData += parseFloat(deviceData["dataValue"]);
      }
      if ((deviceData["variableName"] as string).includes("联通")) {
        chinaUnicomData += parseFloat(deviceData["dataValue"]);
      }
      if ((deviceData["variableName"] as string).includes("电信")) {
        chinaTelecomData += parseFloat(deviceData["dataValue"]);
      }
      if ((deviceData["variableName"] as string).includes("广电")) {
        guangdianData += parseFloat(deviceData["dataValue"]);
      }
      if ((deviceData["variableName"] as string).includes("智联")) {
        zhilianData += parseFloat(deviceData["dataValue"]);
      }
      if ((deviceData["variableName"] as string).includes("能源")) {
        nengyuanData += parseFloat(deviceData["dataValue"]);
      }
      if ((deviceData["variableName"] as string).includes("铁塔")) {
        tietaData += parseFloat(deviceData["dataValue"]);
      }
      if ((deviceData["variableName"] as string).includes("无租户")) {
        noTenantData += parseFloat(deviceData["dataValue"]);
      }
    }

    return [
      chinaMobileData.toFixed(2),
      chinaUnicomData.toFixed(2),
      chinaTelecomData.toFixed(2),
      guangdianData.toFixed(2),
      zhilianData.toFixed(2),
      nengyuanData.toFixed(2),
      tietaData.toFixed(2),
      noTenantData.toFixed(2),
    ];
  }

  public static async getElectricPowerGroupByDate(
    projectId: string,
    type: string
  ) {}

  public static async getAlarmData() {
    // 最近一个月的告警数据
    const timeNow = new Date().getTime() / 1000;
    const timeLastMonth = timeNow - 30 * 24 * 60 * 60;

    const token = await get("token");

    const response = await fetch(
      "https://openapi.mp.usr.cn/usrCloud/V6/alarm/data/getAlarmHistory",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": token,
        },
        body: JSON.stringify({
          alarmType: 0,
          alarmState: 1,
          pageNo: 1,
          pageSize: 7,
          timeStart: timeLastMonth,
          timeEnd: timeNow,
        }),
      }
    );

    const result = await response.json();

    const alarmList = result["data"]["list"].map((item: any) => {
      return {
        alarmTime: dayjs(new Date(item["generateTime"] * 1000)).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        baseStation: item["cusdeviceName"],
        reason: item["triggerName"] + ": " + item["content"],
      };
    });
  }
}
