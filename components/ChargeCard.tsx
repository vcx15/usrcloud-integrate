import Image from "next/image";
import ChargeIcon from "@/public/pic_charge.svg";
import Dot from "@/public/dot.svg";
import ChargeCardItem from "./ChargeCardItem";

export default function ChargeCard() {
  const data = [
    "1406.87",
    "2704.35",
    "61.57",
    "0.00",
    "0.00",
    "0.00",
    "0.00",
    "0.44"
]
  return (
    <div className="flex flex-row ml-8 mt-1">
      <div className="flex">
        <Image src={ChargeIcon} alt="" />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row space-x-4 mt-[22.9px]">
          <ChargeCardItem opName="移动" value={data[0]} />
          <ChargeCardItem opName="联通" value={data[1]} />
        </div>

        <div className="flex flex-row space-x-4 mt-[35px]">
          <ChargeCardItem opName="电信" value={data[2]} />
          <ChargeCardItem opName="广电" value={data[3]} />
        </div>
        <div className="flex flex-row space-x-4 mt-[35px]">
          <ChargeCardItem opName="智联" value={data[4]} />
          <ChargeCardItem opName="铁塔" value={data[5]} />
        </div>
        <div className="flex flex-row space-x-4 mt-[35px]">
          <ChargeCardItem opName="能源" value={data[6]} />
          <ChargeCardItem opName="无租户" value={data[7]} />
        </div>
      </div>
    </div>
  );
}
