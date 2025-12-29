import { FC, HTMLAttributes } from "react";
import sortIcon from "../../public/icons/Sort.svg";
import cn from "classnames";
import Image from "next/image";
import Text from "../UI/Text";
import { SortEnum } from "@/store/sortSlice";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  sort: SortEnum;
  setSort: (sort: SortEnum) => void;
}

const Sort: FC<IProps> = ({ sort, setSort, className, ...rest }) => {
  return (
    <div className={cn('flex items-center gap-3', className)} { ...rest }>
      <button
        className="flex items-center gap-1 cursor-pointer" 
        onClick={() => setSort(SortEnum.Rating)}
        tabIndex={0}
      >
        {sort === SortEnum.Rating && <Image src={sortIcon} alt="" />}
        <Text size="medium" className={cn('', {
          'text-[var(--primary)]': sort === SortEnum.Rating,
          'text-[var(--black)]': sort !== SortEnum.Price,
        })}>По рейтингу</Text>
      </button>

      <button
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => setSort(SortEnum.Price)}
        tabIndex={0}
      >
        {sort === SortEnum.Price && <Image src={sortIcon} alt="" />}
        <Text size="medium" className={cn('', {
          'text-[var(--primary)]': sort === SortEnum.Price,
          'text-[var(--black)]': sort !== SortEnum.Rating,
        })}>По цене</Text>
      </button>
    </div>
  )
}

export default Sort;
