import Image from "next/image";
import TitlePrefixIcon from "@/public/ico_title_prefix.svg";

export default function AreaTitle({ title }: { title: string }) {
  return (
    <div className="flex flex-row">
      <Image src={TitlePrefixIcon} alt="" />
      <span>{title}</span>
    </div>
  );
}
