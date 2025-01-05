"use client";

import MapChart from "@/components/MapChart";
import Image from "next/image";
import Logo from "@/public/logo_icon.png";
import SplitLine from "@/public/split.svg";

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
      <div className="flex grow">buttons</div>
      <div className="flex w-[16.6875rem] bg-[url('/top_time_bg.svg')] bg-bottom bg-no-repeat mr-2.5">
        <div className="flex w-full justify-end justify-items-center items-center mr-2.5 mt-4">
          <span className="font-medium">2025.01.03 09:00</span>
        </div>
      </div>
    </div>
  );
}

function ObjectStatisticsArea() {
  return <div className="bg-[#33333333] w-full h-60 text-center">对象统计</div>;
}

function EnergyConsumeArea() {
  return (
    <div className="bg-[#33333333] w-full h-[22.5rem] text-center">
      运营商能耗
    </div>
  );
}
function OrgEnergyConsumeArea() {
  return (
    <div className="bg-[#33333333] w-full h-[22.0625rem] text-center">
      组织内能耗
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
      能耗趋势
    </div>
  );
}

function RatioArea() {
  return (
    <div className="bg-[#33333333] w-full h-60 text-center">运营商能耗占比</div>
  );
}
function WarningArea() {
  return (
    <div className="bg-[#33333333] w-full h-[22.5rem] text-center">
      实时告警
    </div>
  );
}
function BillArea() {
  return (
    <div className="bg-[#33333333] w-full h-[22.0625rem] text-center">
      账单区域
    </div>
  );
}
