import Text from "@/components/UI/Text";
import Title from "@/components/UI/Title";
import AdvantageItem from "./AdvantageItem";
import { TopPageAdvantage } from "@/interfaces/page.interface";
import { FC } from "react";

interface IProps {
  advantages: TopPageAdvantage[]
}

const AdvantagesBlock: FC<IProps> = ({ advantages }) => {
  return (
    <div className="mb-12">
      <Title tag="h2" className="mb-6">Преимущества</Title>

      <div className="mb-7">
        {advantages.map(advantage => (
          <AdvantageItem key={advantage._id} advantage={advantage} />
        ))}
      </div>
    </div>
  )
}

export default AdvantagesBlock;
