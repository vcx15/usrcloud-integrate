import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

export default function ObjectStatisticsCard({
  icon,
  label,
  value,
}: {
  icon: string | StaticImport;
  label: string;
  value: number | string;
}) {
  return (
    <div className="flex flex-row">
      <div className="flex">
        <Image src={icon} alt="" />
      </div>
      <div className="flex flex-col">
        <span className="flex text-[#0061DBFF] font-semibold text-[22px] leading-7">{value}</span>
        <span className="flex text-[##555555FF] font-medium text-[12px] leading-4">{label}</span>
      </div>
    </div>
  );
}
