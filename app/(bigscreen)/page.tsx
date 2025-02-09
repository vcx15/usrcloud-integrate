"use client";

import MapChart from "@/components/charts/MapChart";
import Image from "next/image";
import Logo from "@/public/logo_icon.png";
import SplitLine from "@/public/split.svg";
import DropDownButton from "@/components/buttons/DropDownButton";
import LocationIcon from "@/public/ico_loc.svg";
import LocationFillIcon from "@/public/ico_loc_fill.svg";
import BaseStationIcon from "@/public/ico_count_basestation.svg";
import CameraIcon from "@/public/ico_count_camera.svg";
import ControlIcon from "@/public/ico_count_control.svg";
import OthersIcon from "@/public/ico_count_other.svg";
import UserIcon from "@/public/ico_user.svg";

import GeneralButton from "@/components/buttons/GeneralButton";
import ObjectStatisticsCard from "@/components/ObjectStatisticsCard";
import AreaTitle from "@/components/AreaTitle";
import BarWithBackgroundChart from "@/components/charts/BarWithBackgroundChart";
import OrgEnergyBar from "@/components/charts/OrgEnergyBar";
import AreaChart from "@/components/charts/AreaChart";
import RingPieChart from "@/components/charts/RingPieChart";
import WarningTable from "@/components/charts/WarningTable";
import ChargeCard from "@/components/ChargeCard";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Tab from "@/components/Tab";
import RatioCard from "@/components/RatioCard";
import { Popover } from "antd";
import Number from "@/components/Number";
import { OrgService, UserService } from "@/lib/usrcloud.service";
import { Province } from "@/lib/entities";
import { error } from "console";
// import { useEffect } from "react";
// import autofit from "autofit.js";

export default function BigScreen() {
  //数据大屏自适应函数
  const handleScreenAuto = () => {
    const designDraftWidth = 1920; //设计稿的宽度
    const designDraftHeight = 1080; //设计稿的高度
    //根据屏幕的变化适配的比例
    // const scale =
    //   document.documentElement.clientWidth /
    //     document.documentElement.clientHeight <
    //   designDraftWidth / designDraftHeight
    //     ? document.documentElement.clientWidth / designDraftWidth
    //     : document.documentElement.clientHeight / designDraftHeight;
    const scaleX = document.documentElement.clientWidth / designDraftWidth;
    const scaleY = document.documentElement.clientHeight / designDraftHeight;
    //缩放比例
    (
      document.querySelector("body") as HTMLElement
    ).style.transform = `scale(${scaleX}, ${scaleY})`;
  };

  //React的生命周期 如果你是vue可以放到mountd或created中
  useEffect(() => {
    //初始化自适应  ----在刚显示的时候就开始适配一次
    handleScreenAuto();
    //绑定自适应函数   ---防止浏览器栏变化后不再适配
    window.onresize = () => handleScreenAuto();
    //退出大屏后自适应消失   ---这是react的组件销毁生命周期，如果你是vue则写在deleted中。最好在退出大屏的时候接触自适应
    return () => {
      window.onresize = null;
    };
  }, []);

  // 地区列表加载
  const [areaList, setAreaList] = useState<Array<any>>([]);
  const [selectedArea, setSelectedArea] = useState<Province>();

  const loadAreaList = () => {
    fetch("/api/org/province", {
      method: "GET",
    })
      .then(async (response) => {
        const result = await response.json();
        console.log("RESPONSE", result);
        setAreaList(result["provinceList"]);
      })
      .catch((error) => {
        console.error("ERROR", error);
      });
  };

  useEffect(() => {
    loadAreaList();
    setSelectedArea(areaList.at(0));
  }, []);

  const [rootProjectId, setRootProjectId] = useState<string>("");
  useEffect(() => {
    UserService.getUser()
      .then((user) => {
        setRootProjectId(user["data"]["projectId"]);
      })
      .catch((error) => {
        console.error("ERROR", error);
      });
    // const rootOrgId = user["data"]["projectId"];
  }, []);

  // const [energyConsumeAreaData, setEnergyConsumeAreaData] = useState<any>();
  // const [orgEnergyConsumeAreaData, setOrgEnergyConsumeAreaData] =
  //   useState<any>();

  // const loadFirstPageData = async (projectId: string) => {
  //   fetch(`/api/project/${projectId}/data`, {
  //     method: "GET",
  //   })
  //     .then(async (response) => {
  //       const result = await response.json();
  //       setEnergyConsumeAreaData(result["dataGroupByOp"]);
  //       setOrgEnergyConsumeAreaData(result["dataGroupByOrg"]);
  //     })
  //     .catch((error) => {
  //       console.error("ERROR", error);
  //     });
  // };

  // useEffect(() => {
  //   const projectId = selectedArea?.id ?? rootProjectId;
  //   projectId && loadFirstPageData(projectId);
  // }, [selectedArea?.id]);

  return (
    <div className="flex flex-col">
      <HeadArea
        areaList={areaList}
        selectedArea={selectedArea}
        updateSelectedArea={(area: Province) => {
          setSelectedArea(area);
        }}
      />
      <div className="flex flex-row mt-4 mb-3.5 mx-3.5 h-[61.5625rem] space-x-4">
        <div className="flex flex-col w-[35.625rem] space-y-4">
          <ObjectStatisticsArea projectId={selectedArea?.id ?? rootProjectId} />
          <EnergyConsumeArea projectId={selectedArea?.id ?? rootProjectId} />
          <OrgEnergyConsumeArea projectId={selectedArea?.id ?? rootProjectId} />
        </div>
        <div className="flex flex-col w-[45rem] space-y-4">
          <MapArea area={selectedArea} rootProjectId={rootProjectId} />
          <TrendArea />
        </div>
        <div className="flex flex-col w-[35.625rem] space-y-4">
          <RatioArea />
          <WarningArea />
          <BillArea />
        </div>
      </div>
    </div>
  );
}

function HeadArea({
  areaList,
  selectedArea,
  updateSelectedArea,
}: {
  areaList: Array<any>;
  selectedArea?: Province;
  updateSelectedArea: (area: Province) => void;
}) {
  const [currentTime, setCurrentTime] = useState<string>();

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setCurrentTime(`${dayjs(date).format("YYYY-MM-DD HH:mm:ss")}`);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex flex-row h-[3.5625rem] mt-2 mx-3.5 text-center">
      <div className="flex flex-row w-[66.8125rem] bg-[url('/top_head.svg')] bg-bottom bg-no-repeat">
        <div className="flex ml-1 mb-2">
          <Image src={Logo} alt="logo" />
        </div>
        <div className="flex mx-2.5 items-center">
          <Image src={SplitLine} alt="split" />
        </div>
        <div className="flex flex-col items-start justify-between mt-1 mb-2">
          <div className="flex text-xl font-semibold">基站能耗管理平台</div>
          <div className="flex text-xs font-normal">
            Base station energy management platform
          </div>
        </div>
      </div>
      {/**
       * TODO: 排版有问题，需要调整
       */}
      <div className="flex flex-row grow space-x-[84px]">
        <Popover
          content={
            <div className="flex flex-col">
              {areaList.map((item: any, index: number) => {
                return (
                  <div
                    className="hover:cursor-pointer"
                    key={index}
                    onClick={() => {
                      updateSelectedArea(item as Province);
                    }}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>
          }
          arrow={false}
          trigger={"click"}
        >
          <div className="flex flex-col justify-end mb-3 w-[180px]">
            <DropDownButton
              icon={LocationIcon}
              text={`${selectedArea?.name ?? "中国"}(1/${areaList.length})`}
            />
          </div>
        </Popover>
        <div className="flex flex-col justify-end mb-3">
          <DropDownButton icon={UserIcon} text={"管理员"} />
        </div>
        <div className="flex flex-col justify-end mb-2">
          <GeneralButton
            customStyle="text-white bg-[#2E8BFFFF] px-4 py-1.5 rounded-2xl w-[96px] h-[34px]"
            text={"生成报表"}
            onClick={() => {
              const downloadElement = document.createElement("a");
              downloadElement.style.display = "none";
              downloadElement.href = "/report/test.xlsx";
              downloadElement.target = "_blank";
              downloadElement.rel = "noopener noreferrer";
              downloadElement.download = "数据.xlsx";
              document.body.appendChild(downloadElement);
              downloadElement.click();
              document.body.removeChild(downloadElement);
            }}
          />
        </div>
      </div>
      <div className="flex w-[16.6875rem] bg-[url('/top_time_bg.svg')] bg-bottom bg-no-repeat mr-2.5">
        <div className="flex w-full justify-end justify-items-center items-center mr-2.5 mt-4">
          <span className="font-medium">{currentTime}</span>
        </div>
      </div>
    </div>
  );
}

function ObjectStatisticsArea({ projectId }: { projectId: string }) {
  const [basestationCount, setBasestationCount] = useState<number>(0);
  const [controllerCount, setControllerCount] = useState<number>(0);
  const [cameraCount, setCameraCount] = useState<number>(0);
  const [otherCount, setOtherCount] = useState<number>(0);

  const loadStatistic = () => {
    // 加载基站数量数据
    fetch(`/api/project/${projectId}/device-count/base-station`, {
      method: "GET",
    })
      .then(async (response) => {
        const result = await response.json();
        setBasestationCount(result["count"]);
      })
      .catch((error) => {
        console.error("ERROR", error);
      });

    // 加载控制器数量数据
    fetch(`/api/project/${projectId}/device-count/controller`, {
      method: "GET",
    })
      .then(async (response) => {
        const result = await response.json();
        setControllerCount(result["count"]);
      })
      .catch((error) => {
        console.error("ERROR", error);
      });
  };

  useEffect(() => {
    projectId && loadStatistic();
    // const timer = setInterval(loadStatistic, 2 * 60 * 1000);
    // return () => {
    //   clearInterval(timer);
    // };
  }, [projectId]);
  return (
    <div className="flex flex-col  w-full h-60 text-center">
      <AreaTitle title="对象统计" />
      <div className="flex flex-row ml-5 mt-9 space-x-28">
        <div className="flex flex-col space-y-8">
          <ObjectStatisticsCard
            icon={BaseStationIcon}
            label="基站总数量"
            value={basestationCount}
          />
          <ObjectStatisticsCard
            icon={CameraIcon}
            label="摄像头总数量"
            value={cameraCount}
          />
        </div>
        <div className="flex flex-col space-y-8">
          <ObjectStatisticsCard
            icon={ControlIcon}
            label="计量控制设备总数量"
            value={controllerCount}
          />
          <ObjectStatisticsCard
            icon={OthersIcon}
            label="其他设备总数量"
            value={otherCount}
          />
        </div>
      </div>
    </div>
  );
}

function EnergyConsumeArea({ projectId }: { projectId: string }) {
  const [displayData, setDisplayData] = useState<Array<number>>([
    0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [type, setType] = useState<string>("lastMonth");

  const loadData = () => {
    // fetch(
    //   `/api/project/${projectId}/electric-power/${type}/group-by-operator`,
    //   {
    //     method: "GET",
    //   }
    // )
    //   .then(async (res) => {
    //     const result = await res.json();
    //     setDisplayData(result["data"]);
    //   })
    //   .catch((error) => {
    //     console.error("ERROR", error);
    //   });
    if (type === "total") {
      setDisplayData([3227.38, 407.58, 5679.51, 0.0, 0.0, 0.0, 0.0, 5.34]);
    } else if (type === "lastMonth") {
      setDisplayData([843.65, 143.74, 787.67, 0.0, 0.0, 0.0, 0.0, 0.99]);
    } else if (type === "thisMonth") {
      setDisplayData([359.25, 82.61, 416.13, 0.0, 0.0, 0.0, 0.0, 5.34]);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      projectId && loadData();
    }, 0);
    const timer = setInterval(loadData, 5 * 60 * 1000);
    return () => {
      clearInterval(timer);
    };
    // console.log(data);
    // setDisplayData(data);
  }, [projectId, type]);

  return (
    <div className="flex flex-col  w-full h-[22.5rem] text-center">
      <div className="flex flex-row justify-between">
        <AreaTitle title="运营商能耗" />
        <Tab
          tabButtonList={[
            {
              key: "lastMonth",
              action: () => {
                setType("lastMonth");
              },
              buttonName: "上月",
            },
            {
              key: "thisMonth",
              action: () => {
                setType("thisMonth");
              },
              buttonName: "本月",
            },
            {
              key: "total",
              action: () => {
                setType("total");
              },
              buttonName: "总电能",
            },
          ]}
        />
      </div>
      <div className="h-full">
        <BarWithBackgroundChart data={displayData} type={type} />
      </div>
    </div>
  );
}
function OrgEnergyConsumeArea({ projectId }: { projectId: string }) {
  const [categories, setCategories] = useState<Array<string>>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [data, setData] = useState<Array<number>>([0, 0, 0, 0, 0, 0, 0, 0]);
  const [type, setType] = useState<string>("lastMonth");

  const loadData = () => {
    //   fetch(`/api/project/${projectId}/electric-power/${type}/group-by-suborg`, {
    //     method: "GET",
    //   })
    //     .then(async (res) => {
    //       const result = await res.json();
    //       const dataArray: Array<any> = result["data"];
    //       setCategories(
    //         dataArray.map((item: any) => {
    //           return item["name"];
    //         })
    //       );
    //       setData(
    //         dataArray.map((item: any) => {
    //           return item["result"];
    //         })
    //       );
    //     })
    //     .catch((error) => {
    //       console.error("ERROR", error);
    //     });

    fetch(`/api/org/province/${projectId}/subOrg/`, {
      method: "GET",
    })
      .then(async (res) => {
        const result = await res.json();
        const dataArray: Array<any> = result["subOrgs"];
        setCategories(
          dataArray
            .filter((item: any) => item["name"] !== "test")
            .map((item: any) => {
              return item["name"];
            })
        );
        setData(
          dataArray
            .filter((item: any) => item["name"] !== "test")
            .map((item: any) => {
              return parseFloat((Math.random() * 200).toFixed(2));
            })
        );
      })
      .catch((error) => {
        console.error("ERROR", error);
      });
  };

  useEffect(() => {
    projectId && loadData();
    // setCategories(
    //   data.map((item: any) => {
    //     return item["name"];
    //   })
    // );
    // setData(
    //   data.map((item: any) => {
    //     return item["result"];
    //   })
    // );
    console.log("DATA ORG", data);
  }, [projectId]);

  return (
    <div className="flex flex-col w-full h-[22.0625rem] text-center">
      <div className="flex flex-row justify-between">
        <AreaTitle title="组织内能耗" />
        <Tab
          tabButtonList={[
            {
              key: "lastMonth",
              action: () => {
                // setData([100, 200, 700, 400, 600, 200, 100, 400]);
                setType("lastMonth");
              },
              buttonName: "上月",
            },
            {
              key: "thisMonth",
              action: () => {
                // setData([600, 100, 200, 500, 200, 200, 500, 800]);
                setType("thisMonth");
              },
              buttonName: "本月",
            },
            {
              key: "total",
              action: () => {
                // setData([300, 200, 100, 400, 900, 700, 500, 100]);
                setType("total");
              },
              buttonName: "总电能",
            },
          ]}
        />
      </div>
      <div className="h-full">
        <OrgEnergyBar categories={categories} data={data} type={type} />
      </div>
    </div>
  );
}

function MapArea({
  area,
  rootProjectId,
}: {
  area?: Province;
  rootProjectId?: string;
}) {
  const [totalData, setTotalData] = useState<number>(0);
  const [dataArray, setDataArray] = useState<Array<any>>([
    {
      id: 366973,
      name: "湖南铁塔分公司",
      adName: "湖南省",
      result: 217.92,
    },
    {
      id: 365786,
      name: "福建铁塔分公司",
      adName: "福建省",
      result: 2.9000000000000004,
    },
    {
      id: 364002,
      name: "湖北铁塔分公司",
      adName: "湖北省",
      result: 9803.07,
    },
  ]);

  const getTotal = (dataArray: Array<any>) => {
    let total = 0;
    for (const data of dataArray) {
      total += data["result"];
    }

    return Math.floor(total);
  };
  return (
    <div className="flex flex-col w-full h-[43.8125rem] text-center">
      <div className="flex flex-row justify-between mt-7">
        <div className="flex flex-row ml-24 items-center space-x-1">
          <Image src={LocationFillIcon} alt="" />
          <span className="font-normal">{area?.name ?? "中国"}</span>
        </div>
        <div className="flex flex-col mr-2">
          <div>组织内的能耗总数（Kw·h）</div>
          <Number num={getTotal(dataArray)} />
        </div>
      </div>
      <MapChart
        adcode={area?.adcode ?? "100000"}
        projectId={area?.id ?? rootProjectId}
        dataArray={dataArray}
      />
    </div>
  );
}

function TrendArea() {
  return (
    <div className="flex flex-col w-full h-[16.75rem] text-center">
      <div className="flex flex-row justify-end">
        <Tab
          tabButtonList={[
            {
              key: "yesterday",
              action: () => {},
              buttonName: "昨日",
            },
            {
              key: "today",
              action: () => {},
              buttonName: "今日",
            },
          ]}
        />
      </div>
      <div className="h-full">
        <AreaChart />
      </div>
    </div>
  );
}

function RatioArea() {
  const [ratioList, setRatioList] = useState<Array<any>>();

  const getTotal = (ratioList: Array<any>) => {
    let total = 0;
    for (const ratioData of ratioList) {
      total += ratioData.totalElectricPower;
    }
    return total;
  };

  const getValue = (ratioList: Array<any>, opName: string) => {
    if (ratioList.length === 0) return 0;
    return (
      ratioList.find((item: any) => item.opName === opName)
        ?.totalElectricPower ?? 0
    );
  };

  useEffect(() => {
    setRatioList([
      {
        opName: "移动",
        totalElectricPower: 2780.07,
      },
      {
        opName: "联通",
        totalElectricPower: 5408.1,
      },
      {
        opName: "电信",
        totalElectricPower: 95.37,
      },
      {
        opName: "广电",
        totalElectricPower: 0.0,
      },
      {
        opName: "智联",
        totalElectricPower: 0.0,
      },
      {
        opName: "铁塔",
        totalElectricPower: 0.0,
      },
      {
        opName: "能源",
        totalElectricPower: 0.0,
      },
      {
        opName: "无租户",
        totalElectricPower: 0.66,
      },
    ]);
  }, []);

  return (
    <div className="flex flex-col w-full h-60 text-center">
      <AreaTitle title="运营商能耗分摊占比" />
      <div className="flex flex-row h-full">
        <div className="w-[30%] h-full">
          <RingPieChart
            total={getTotal(ratioList ?? [])}
            data={
              ratioList?.map((item: any) => {
                return {
                  name: item["opName"],
                  value: item["totalElectricPower"],
                };
              }) ?? []
            }
          />
        </div>
        <div className="flex flex-col h-full w-[70%]">
          <div className="flex flex-row justify-between mx-auto">
            <RatioCard
              color={"bg-[#4DC0FCFF]"}
              name={"移动"}
              value={getValue(ratioList ?? [], "移动").toString()}
              ratio={(
                (100 * getValue(ratioList ?? [], "移动")) /
                getTotal(ratioList ?? [])
              ).toFixed(2)}
            />
            <RatioCard
              color={"bg-[#F84446FF]"}
              name={"联通"}
              value={getValue(ratioList ?? [], "联通").toString()}
              ratio={(
                (100 * getValue(ratioList ?? [], "联通")) /
                getTotal(ratioList ?? [])
              ).toFixed(2)}
            />
          </div>
          <div className="flex flex-row justify-between mx-auto">
            <RatioCard
              color={"bg-[#5676FCFF]"}
              name={"电信"}
              value={getValue(ratioList ?? [], "电信").toString()}
              ratio={(
                (100 * getValue(ratioList ?? [], "电信")) /
                getTotal(ratioList ?? [])
              ).toFixed(2)}
            />
            <RatioCard
              color={"bg-[#FB9020FF]"}
              name={"广电"}
              value={getValue(ratioList ?? [], "广电").toString()}
              ratio={(
                (100 * getValue(ratioList ?? [], "广电")) /
                getTotal(ratioList ?? [])
              ).toFixed(2)}
            />
          </div>
          <div className="flex flex-row justify-between mx-auto">
            <RatioCard
              color={"bg-[#ACB0FCFF]"}
              name={"铁塔"}
              value={getValue(ratioList ?? [], "铁塔").toString()}
              ratio={(
                (100 * getValue(ratioList ?? [], "铁塔")) /
                getTotal(ratioList ?? [])
              ).toFixed(2)}
            />
            <RatioCard
              color={"bg-[#87AB46FF]"}
              name={"智联"}
              value={getValue(ratioList ?? [], "智联").toString()}
              ratio={(
                (100 * getValue(ratioList ?? [], "智联")) /
                getTotal(ratioList ?? [])
              ).toFixed(2)}
            />
          </div>
          <div className="flex flex-row justify-between mx-auto">
            <RatioCard
              color={"bg-[#771FFCFF]"}
              name={"能源"}
              value={getValue(ratioList ?? [], "能源").toString()}
              ratio={(
                (100 * getValue(ratioList ?? [], "能源")) /
                getTotal(ratioList ?? [])
              ).toFixed(2)}
            />
            <RatioCard
              color={"bg-[#489A20FF]"}
              name={"无租户"}
              value={getValue(ratioList ?? [], "无租户").toString()}
              ratio={(
                (100 * getValue(ratioList ?? [], "无租户")) /
                getTotal(ratioList ?? [])
              ).toFixed(2)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
function WarningArea() {
  const [warningData, setWarningData] = useState<Array<any>>();

  const loadAlarmData = () => {
    fetch(`/api/alarm`, {
      method: "GET",
    })
      .then(async (res) => {
        const result = await res.json();
        setWarningData(result["data"]);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    loadAlarmData();
  }, []);

  return (
    <div className="flex flex-col w-full h-[22.5rem] text-center">
      <AreaTitle title="实时告警" />
      <WarningTable warningData={warningData ?? []} />
    </div>
  );
}
function BillArea() {
  return (
    <div className="flex flex-col w-full h-[22.0625rem] text-center">
      <div className="flex flex-row justify-between">
        <AreaTitle title="电费" />
        <Tab
          tabButtonList={[
            {
              key: "lastMonth",
              action: () => {},
              buttonName: "上月",
            },
            {
              key: "thisMonth",
              action: () => {},
              buttonName: "本月",
            },
            {
              key: "total",
              action: () => {},
              buttonName: "总电费",
            },
          ]}
        />
      </div>
      <div className="flex ml-8">
        <span className="mt-6">单位：元</span>
      </div>
      <ChargeCard />
    </div>
  );
}
