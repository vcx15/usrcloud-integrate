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
    <div className="bg-[#33333333] h-[3.5625rem] mt-2 mx-3.5 text-center">
      头部位置
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
    <div className="bg-[#33333333] w-full h-[43.8125rem] text-center">地图</div>
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
