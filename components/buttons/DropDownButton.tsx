import Image from "next/image";

import DownArrayIcon from "@/public/down_array.svg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function DropDownButton({
    icon,
    text,
}: {
    icon: string | StaticImport;
    text: string;
}) {
    return (
        <button className="flex flex-row items-center">
            <Image src={icon} alt="" />
            <span>{text}</span>
            <Image src={DownArrayIcon} alt="" />
        </button>
    )
}