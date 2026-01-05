import Tag from "@/components/UI/Tag";
import Title from "@/components/UI/Title";
import { TopPageModal } from "@/interfaces/page.interface";
import { ProductModel } from "@/interfaces/product.interface";
import { setSortAC, SortEnum } from "@/store/sortSlice";
import { FC } from "react";
import Sort from "../Sort";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

interface IProps {
  page: TopPageModal;
  products: ProductModel[];
}

const TopPageHeader: FC<IProps> = ({ page, products }) => {
  const { sort } = useAppSelector(state => state.sort);
  const dispatch = useAppDispatch();

  const setSort = (sort: SortEnum) => {
    dispatch(setSortAC({ sort }));
  }

  return (
    <div className="flex items-baseline justify-between gap-3 mb-7 flex-wrap">
      <div className="flex gap-2 items-baseline">
        <Title tag="h1">{page?.title}</Title>
        <Tag
          color="gray"
          size="medium"
          aria-label={products?.length + ' товаров на странице'}
        >
          {products?.length}
        </Tag>
      </div>

      <Sort sort={sort} setSort={setSort} />
    </div>
  )
}

export default TopPageHeader;
