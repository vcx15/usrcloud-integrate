"use client";

import MapChart from "@/components/charts/MapChart";
import Image from "next/image";
import Logo from "@/public/logo_icon.png";
import SplitLine from "@/public/split.svg";
import DropDownButton from "@/components/buttons/DropDownButton";
import LocationIcon from "@/public/ico_loc.svg";
import UserIcon from "@/public/ico_user.svg";

import GeneralButton from "@/components/buttons/GeneralButton";
import ObjectStatisticsCard from "@/components/ObjectStatisticsCard";
import AreaTitle from "@/components/AreaTitle";
import BarWithBackgroundChart from "@/components/charts/BarWithBackgroundChart";
import OrgEnergyBar from "@/components/charts/OrgEnergyBar";
import AreaChart from "@/components/charts/AreaChart";
import RingPieChart from "@/components/charts/RingPieChart";
import WarningTable from "@/components/charts/WarningTable";

export default function BigScreen() {
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
  return (
    <div className="flex flex-row bg-[#33333333] h-[3.5625rem] mt-2 mx-3.5 text-center">
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
      <div className="flex flex-row grow">
        <div>
          <DropDownButton icon={LocationIcon} text={"中国（98/106）"} />
        </div>
        <div>
          <DropDownButton icon={UserIcon} text={"管理员"} />
        </div>
        <div>
          <GeneralButton
            customStyle="text-white bg-[#2E8BFFFF] px-4 py-1.5 rounded-2xl"
            text={"生成报表"}
          />
        </div>
      </div>
      <div className="flex w-[16.6875rem] bg-[url('/top_time_bg.svg')] bg-bottom bg-no-repeat mr-2.5">
        <div className="flex w-full justify-end justify-items-center items-center mr-2.5 mt-4">
          <span className="font-medium">2025.01.03 09:00</span>
        </div>
      </div>
    </div>
  );
}

function ObjectStatisticsArea() {
  return (
    <div className="flex flex-col bg-[#33333333] w-full h-60 text-center">
      <AreaTitle title="对象统计" />
      <div className="flex flex-row">
        <div className="flex flex-col">
          <ObjectStatisticsCard
            icon={LocationIcon}
            label="基站总数量"
            value={100}
          />
          <ObjectStatisticsCard
            icon={LocationIcon}
            label="摄像头总数量"
            value={100}
          />
        </div>
        <div className="flex flex-col">
          <ObjectStatisticsCard
            icon={LocationIcon}
            label="基站总数量"
            value={100}
          />
          <ObjectStatisticsCard
            icon={LocationIcon}
            label="摄像头总数量"
            value={100}
          />
        </div>
      </div>
    </div>
  );
}

function EnergyConsumeArea() {
  return (
    <div className="flex flex-col bg-[#33333333] w-full h-[22.5rem] text-center">
      <AreaTitle title="运营商能耗" />
      <div className="h-full">
        <BarWithBackgroundChart />
      </div>
    </div>
  );
}
function OrgEnergyConsumeArea() {
  return (
    <div className="bg-[#33333333] w-full h-[22.0625rem] text-center">
      <AreaTitle title="组织内能耗" />
      <div className="h-full">
        <OrgEnergyBar />
      </div>
    </div>
  );
}

function MapArea() {
  return (
    <div className="bg-[#33333333] w-full h-[43.8125rem] text-center">
      <MapChart />
    </div>
  );
}

function TrendArea() {
  return (
    <div className="bg-[#33333333] w-full h-[16.75rem] text-center">
      <div className="h-full">
        <AreaChart />
      </div>
    </div>
  );
}

function RatioArea() {
  return (
    <div className="bg-[#33333333] w-full h-60 text-center">
      <AreaTitle title="运营商能耗分摊占比" />
      <div className="flex flex-row h-full">
        <div className="w-[30%] h-full">
          <RingPieChart />
        </div>
      </div>
    </div>
  );
}
function WarningArea() {
  return (
    <div className="bg-[#33333333] w-full h-[22.5rem] text-center">
      <AreaTitle title="实时告警" />
      <WarningTable />
    </div>
  );
}
function BillArea() {
  return (
    <div className="bg-[#33333333] w-full h-[22.0625rem] text-center">
      <AreaTitle title="电费" />
    </div>
  );
}
