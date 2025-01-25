import Image from "next/image";
import ChargeIcon from "@/public/pic_charge.svg";
import Dot from "@/public/dot.svg";
import ChargeCardItem from "./ChargeCardItem";

export default function ChargeCard() {
  return (
    <div className="flex flex-row ml-8 mt-1">
      <div className="flex">
        <Image src={ChargeIcon} alt="" />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row space-x-4 mt-[22.9px]">
          <ChargeCardItem opName="移动" value={40040} />
          <ChargeCardItem opName="联通" value={40040} />
        </div>

        <div className="flex flex-row space-x-4 mt-[35px]">
          <ChargeCardItem opName="电信" value={40040} />
          <ChargeCardItem opName="广电" value={40040} />
        </div>
        <div className="flex flex-row space-x-4 mt-[35px]">
          <ChargeCardItem opName="智联" value={40040} />
          <ChargeCardItem opName="铁塔" value={40040} />
        </div>
        <div className="flex flex-row space-x-4 mt-[35px]">
          <ChargeCardItem opName="能源" value={40040} />
          <ChargeCardItem opName="无租户" value={40040} />
        </div>
      </div>
    </div>
  );
}
