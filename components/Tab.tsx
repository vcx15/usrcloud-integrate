import { useState } from "react";
import TabButton from "./buttons/TabButton";

export default function Tab({ tabButtonList }: { tabButtonList: Array<any> }) {
  const [selected, setSelected] = useState<string>("");

  return (
    <div className="flex flex-row mt-2.5 space-x-4 mr-8">
      {tabButtonList.map((item: any) => {
        return (
          <TabButton
            key={item.key}
            text={item.buttonName}
            onClick={() => {
              item.action();
              setSelected(item.key);
            }}
            isSelected={selected === item.key}
          />
        );
      })}
    </div>
  );
}
