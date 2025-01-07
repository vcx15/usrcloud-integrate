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
        <span>{value}</span>
        <span>{label}</span>
      </div>
    </div>
  );
}
