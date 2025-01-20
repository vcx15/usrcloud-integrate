import Image from "next/image";
import TitlePrefixIcon from "@/public/ico_title_prefix.svg";

export default function AreaTitle({ title }: { title: string }) {
  return (
    <div className="flex flex-row ml-3.5 mt-2.5">
      <Image src={TitlePrefixIcon} alt="" />
      <span>{title}</span>
    </div>
  );
}
