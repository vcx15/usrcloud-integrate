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
  return (
    <div className="flex flex-col">
      <HeadArea />
      <div className="flex flex-row mt-4 mb-3.5 mx-3.5 h-[61.5625rem] space-x-4">
        <div className="flex flex-col w-[35.625rem] space-y-4">
          <ObjectStatisticsArea />
          <EnergyConsumeArea />
          <OrgEnergyConsumeArea />
        </div>
        <div className="flex flex-col w-[45rem] space-y-4">
          <MapArea />
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

function HeadArea() {
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
    <div className="flex flex-row h-[3.5625rem] mt-2 mx-3.5 text-center bg-[#33333333]">
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
              <div>1</div>
              <div>2</div>
              <div>3</div>
            </div>
          }
          arrow={false}
          trigger={"click"}
        >
          <div className="flex flex-col justify-end mb-3">
            <DropDownButton icon={LocationIcon} text={"中国（98/106）"} />
          </div>
        </Popover>
        <div className="flex flex-col justify-end mb-3">
          <DropDownButton icon={UserIcon} text={"管理员"} />
        </div>
        <div className="flex flex-col justify-end mb-2">
          <GeneralButton
            customStyle="text-white bg-[#2E8BFFFF] px-4 py-1.5 rounded-2xl w-[96px] h-[34px]"
            text={"生成报表"}
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

function ObjectStatisticsArea() {
  return (
    <div className="flex flex-col  w-full h-60 text-center bg-[#33333333]">
      <AreaTitle title="对象统计" />
      <div className="flex flex-row ml-5 mt-9 space-x-28">
        <div className="flex flex-col space-y-8">
          <ObjectStatisticsCard
            icon={BaseStationIcon}
            label="基站总数量"
            value={100}
          />
          <ObjectStatisticsCard
            icon={CameraIcon}
            label="摄像头总数量"
            value={100}
          />
        </div>
        <div className="flex flex-col space-y-8">
          <ObjectStatisticsCard
            icon={ControlIcon}
            label="计量控制设备总数量"
            value={100}
          />
          <ObjectStatisticsCard
            icon={OthersIcon}
            label="其他设备总数量"
            value={100}
          />
        </div>
      </div>
    </div>
  );
}

function EnergyConsumeArea() {
  const [data, setData] = useState<Array<number>>([
    100, 200, 700, 400, 600, 200, 100, 400,
  ]);
  const [type, setType] = useState<string>("lastMonth");
  return (
    <div className="flex flex-col  w-full h-[22.5rem] text-center bg-[#33333333]">
      <div className="flex flex-row justify-between">
        <AreaTitle title="运营商能耗" />
        <Tab
          tabButtonList={[
            {
              key: "lastMonth",
              action: () => {
                setData([100, 200, 700, 400, 600, 200, 100, 400]);
                setType("lastMonth");
              },
              buttonName: "上月",
            },
            {
              key: "thisMonth",
              action: () => {
                setData([600, 100, 200, 500, 200, 200, 500, 800]);
                setType("thisMonth");
              },
              buttonName: "本月",
            },
            {
              key: "total",
              action: () => {
                setData([300, 200, 100, 400, 900, 700, 500, 100]);
                setType("total");
              },
              buttonName: "总电能",
            },
          ]}
        />
      </div>
      <div className="h-full">
        <BarWithBackgroundChart data={data} type={type} />
      </div>
    </div>
  );
}
function OrgEnergyConsumeArea() {
  const [categories, setCategories] = useState<Array<string>>([
    "1",
    "2",
    "3",
    "4",
    "1",
    "2",
    "3",
    "4",
  ]);
  const [data, setData] = useState<Array<number>>([
    100, 200, 700, 400, 600, 200, 100, 400,
  ]);
  const [type, setType] = useState<string>("lastMonth");
  return (
    <div className="flex flex-col w-full h-[22.0625rem] text-center bg-[#33333333]">
      <div className="flex flex-row justify-between">
        <AreaTitle title="组织内能耗" />
        <Tab
          tabButtonList={[
            {
              key: "lastMonth",
              action: () => {
                setData([100, 200, 700, 400, 600, 200, 100, 400]);
                setType("lastMonth");
              },
              buttonName: "上月",
            },
            {
              key: "thisMonth",
              action: () => {
                setData([600, 100, 200, 500, 200, 200, 500, 800]);
                setType("thisMonth");
              },
              buttonName: "本月",
            },
            {
              key: "total",
              action: () => {
                setData([300, 200, 100, 400, 900, 700, 500, 100]);
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

function MapArea() {
  return (
    <div className="flex flex-col w-full h-[43.8125rem] text-center bg-[#33333333]">
      <div className="flex flex-row justify-between mt-7">
        <div className="flex flex-row ml-24 items-center space-x-1">
          <Image src={LocationFillIcon} alt="" />
          <span className="font-normal">中国</span>
        </div>
        <div className="flex flex-col mr-2">
          <div>组织内的能耗总数（Kw·h）</div>
          <Number num={1234} />
        </div>
      </div>
      <MapChart projectId="323324" />
    </div>
  );
}

function TrendArea() {
  return (
    <div className="flex flex-col w-full h-[16.75rem] text-center bg-[#33333333]">
      <div className="flex flex-row justify-end">
        <Tab
          tabButtonList={[
            {
              key: "yesterday",
              action: () => { },
              buttonName: "昨日",
            },
            {
              key: "today",
              action: () => { },
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
  return (
    <div className="flex flex-col w-full h-60 text-center bg-[#33333333]">
      <AreaTitle title="运营商能耗分摊占比" />
      <div className="flex flex-row h-full">
        <div className="w-[30%] h-full">
          <RingPieChart />
        </div>
        <div className="flex flex-col h-full w-[70%] bg-slate-400">
          <div className="flex flex-row justify-between mx-auto">
            <RatioCard
              color={"bg-[#4DC0FCFF]"}
              name={"移动"}
              value={"700"}
              ratio={"40"}
            />
            <RatioCard
              color={"bg-[#F84446FF]"}
              name={"联通"}
              value={"700"}
              ratio={"40"}
            />
          </div>
          <div className="flex flex-row justify-between mx-auto">
            <RatioCard
              color={"bg-[#5676FCFF]"}
              name={"电信"}
              value={"700"}
              ratio={"40"}
            />
            <RatioCard
              color={"bg-[#FB9020FF]"}
              name={"广电"}
              value={"700"}
              ratio={"40"}
            />
          </div>
          <div className="flex flex-row justify-between mx-auto">
            <RatioCard
              color={"bg-[#4DC0FCFF]"}
              name={"铁塔"}
              value={"700"}
              ratio={"40"}
            />
            <RatioCard
              color={"bg-[#F84446FF]"}
              name={"智联"}
              value={"700"}
              ratio={"40"}
            />
          </div>
          <div className="flex flex-row justify-between mx-auto">
            <RatioCard
              color={"bg-[#5676FCFF]"}
              name={"能源"}
              value={"700"}
              ratio={"40"}
            />
            <RatioCard
              color={"bg-[#FB9020FF]"}
              name={"无租户"}
              value={"700"}
              ratio={"40"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
function WarningArea() {
  return (
    <div className="flex flex-col w-full h-[22.5rem] text-center bg-[#33333333]">
      <AreaTitle title="实时告警" />
      <WarningTable />
    </div>
  );
}
function BillArea() {
  return (
    <div className="flex flex-col w-full h-[22.0625rem] text-center bg-[#33333333]">
      <div className="flex flex-row justify-between">
        <AreaTitle title="电费" />
        <Tab
          tabButtonList={[
            {
              key: "lastMonth",
              action: () => {
              },
              buttonName: "上月",
            },
            {
              key: "thisMonth",
              action: () => {
              },
              buttonName: "本月",
            },
            {
              key: "total",
              action: () => {
              },
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
