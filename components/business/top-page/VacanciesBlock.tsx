import Card from "@/components/UI/Card";
import Tag from "@/components/UI/Tag";
import Title from "@/components/UI/Title";
import { TopPageModal } from "@/interfaces/page.interface";
import { FC } from "react";
import star from "../../../public/icons/star.svg";
import activeStar from "../../../public/icons/active-star.svg";
import Image from "next/image";

interface IProps {
  page: TopPageModal;
}

const VacanciesBlock: FC<IProps> = ({ page }) => {
  return (
    <div>
      <div className="flex items-baseline gap-2 mb-6">
        <Title tag="h2">Вакансии - {page.category}</Title>
        <Tag color="red" size="medium">hh.ru</Tag>
      </div>

      <div className="flex flex-col xl:flex-row gap-7">
        <Card className="w-full xl:w-1/4 h-36 flex flex-col items-center justify-center">
          <div className="font-light text-[var(--black)] text-xl mb-3">Всего вакансий</div>
          <div className="text-[var(--primary)] font-bold text-4xl">{page.hh?.count}</div>
        </Card>

        <Card className="flex flex-col lg:flex-row flex-1 p-3">
          <div className="flex flex-col items-center justify-center flex-1 border-b border-b-gray-300 lg:border-b-0 lg:border-r lg:border-r-gray-300">
            <div className="font-light text-[var(--black)] text-xl mb-3 pt-2">Начальный</div>
            <div className="text-[var(--black)] font-bold text-2xl mb-3">{page.hh?.juniorSalary}</div>
            <div className="flex items-center gap-1 pb-2">
              <Image src={activeStar} alt="" />
              <Image src={star} alt="" />
              <Image src={star} alt="" />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center flex-1 border-b border-b-gray-300 lg:border-b-0 lg:border-r lg:border-r-gray-300">
            <div className="font-light text-[var(--black)] text-xl mb-3 pt-2">Средний</div>
            <div className="text-[var(--black)] font-bold text-2xl mb-3">{page.hh?.middleSalary}</div>
            <div className="flex items-center gap-1 pb-2">
              <Image src={activeStar} alt="" />
              <Image src={activeStar} alt="" />
              <Image src={star} alt="" />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center flex-1">
            <div className="font-light text-[var(--black)] text-xl mb-3 pt-2">Профессионал</div>
            <div className="text-[var(--black)] font-bold text-2xl mb-3">{page.hh?.seniorSalary}</div>
            <div className="flex items-center gap-1 pb-2">
              <Image src={activeStar} alt="" />
              <Image src={activeStar} alt="" />
              <Image src={activeStar} alt="" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default VacanciesBlock;
