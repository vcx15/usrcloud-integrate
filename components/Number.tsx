// import { useEffect } from "react";
import { useEffect } from "react";
import DigitCard from "./DigitCard";

export default function Number({ num }: { num: number }) {
    const digitArray = getDigitArray(num);

    useEffect(() => {
        console.log("DIGIT ARRAY", digitArray)
    }, [])

    return (
        <div className="flex flex-row space-x-4">
            {
                digitArray.map((digit: number, index: number) => <DigitCard key={index} digit={digit} />)
            }
        </div>
    )
}

function getDigitArray(num: number) {
    let tempNum = num;
    const digitArray = [];
    while (tempNum != 0) {
        digitArray.unshift(tempNum % 10);
        tempNum = Math.floor(tempNum / 10);
    }

    return digitArray;
}