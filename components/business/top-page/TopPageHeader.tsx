import Tag from "@/components/UI/Tag";
import Title from "@/components/UI/Title";
import { TopPageModal } from "@/interfaces/page.interface";
import { ProductModel } from "@/interfaces/product.interface";
import { FC } from "react";

interface IProps {
  page: TopPageModal;
  products: ProductModel[];
}

const TopPageHeader: FC<IProps> = ({ page, products }) => {
  return (
    <div className="flex items-baseline justify-between gap-3 mb-5">
      <div className="flex gap-2 items-baseline">
        <Title tag="h1">{page.title}</Title>
        <Tag color="gray" size="medium">{products.length}</Tag>
      </div>
      
      <span>Сортировка</span>
    </div>
  )
}

export default TopPageHeader;
