import Image from "next/image";
import Dot from "@/public/dot.svg";

export default function ChargeCardItem({
  opName,
  value,
}: {
  opName: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-row items-center">
      <Image src={Dot} alt="" />
      <span className="ml-2">{opName}</span>
      <span className="ml-4 text-[#0061DBFF] font-semibold text-[16px]">{value}</span>
    </div>
  );
}
