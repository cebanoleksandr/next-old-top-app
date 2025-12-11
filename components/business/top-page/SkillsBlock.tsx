import Tag from "@/components/UI/Tag";
import Title from "@/components/UI/Title";
import { FC } from "react";

interface IProps {
  skills: string[];
}

const SkillsBlock: FC<IProps> = ({ skills }) => {
  return (
    <div className="mb-12">
      <Title tag="h2" className="mb-6">Получаемые навыки</Title>

      <div className="flex flex-wrap gap-2 items-center">
        {skills.map(skill => (
          <Tag key={skill} color="primary">{skill}</Tag>
        ))}
      </div>
    </div>
  )
}

export default SkillsBlock;
