import { FC } from "react";
import checkedIcon from "../../../public/icons/checked.svg";
import Image from "next/image";
import Text from "@/components/UI/Text";
import { TopPageAdvantage } from "@/interfaces/page.interface";

interface IProps {
  advantage: TopPageAdvantage;
}

const AdvantageItem: FC<IProps> = ({ advantage }) => {
  return (
    <div className="flex gap-10 mb-10">
      <div className="flex flex-col items-center gap-4">
        <Image src={checkedIcon} alt="" />

        <div className="w-0.5 border-l border-l-gray-300 flex-1"></div>
      </div>

      <div className="flex-1">
        <Text size="large" className="font-bold mb-5">{advantage.title}</Text>

        <Text size="large">{advantage.description}</Text>
      </div>
    </div>
  )
}

export default AdvantageItem;
