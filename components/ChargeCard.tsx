import Image from "next/image";
import ChargeIcon from "@/public/pic_charge.svg";
import Dot from "@/public/dot.svg";

export default function ChargeCard() {
  return (
    <div className="flex flex-row">
      <div className="flex">
        <Image src={ChargeIcon} alt="" />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="flex flex-row">
            <span>移动</span>
            <span>50025</span>
          </div>
          <div className="flex flex-row">
            <Image src={Dot} alt="" />
            <span>联通</span>
            <span>50025</span>
          </div>
        </div>

        <div className="flex flex-row">
          <div className="flex flex-row">
            <span>移动</span>
            <span>50025</span>
          </div>
          <div className="flex flex-row">
            <Image src={Dot} alt="" />
            <span>联通</span>
            <span>50025</span>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-row">
            <span>移动</span>
            <span>50025</span>
          </div>
          <div className="flex flex-row">
            <Image src={Dot} alt="" />
            <span>联通</span>
            <span>50025</span>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-row">
            <span>移动</span>
            <span>50025</span>
          </div>
          <div className="flex flex-row">
            <Image src={Dot} alt="" />
            <span>联通</span>
            <span>50025</span>
          </div>
        </div>
      </div>
    </div>
  );
}
