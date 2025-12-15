import { ProductModel } from "@/interfaces/product.interface";
import { FC, HTMLAttributes } from "react";
import cn from "classnames";
import Card from "@/components/UI/Card";
import Image from "next/image";
import Rating from "@/components/UI/Rating";
import Tag from "@/components/UI/Tag";
import "./ProductItem.css"
import Button from "@/components/UI/Button";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import { priceRu } from "@/helpers/helpers";
import Divider from "@/components/UI/Divider";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  product: ProductModel;
}

const ProductItem: FC<IProps> = ({ product, className }) => {
  return (
    <Card className={cn(className, 'product mb-7 p-8')}>
      <div className="logo">
        <Image
          src={product.image} 
          alt={product.title} 
          width={70} 
          height={30}
          className="rounded-sm"
        />
      </div>
      <div className="title font-semibold text-xl self-end">{product.title}</div>
      <div className="price text-xl self-end">
        {priceRu(product.price)}
        {!!product.oldPrice && <Tag color="green" className="ml-1">{priceRu(product.price - product.oldPrice)}</Tag>}
      </div>
      <div className="credit text-xl self-end">
        {priceRu(product.credit)}/<span className="text-sm">мес</span>
      </div>
      <div className="rating self-end mb-1">
        <Rating rating={product.reviewAvg ?? product.initialRating} />
      </div>
      <div className="tags">
        {product.categories.map(category => (
          <Tag key={category} color="ghost" className="mt-1">{category}</Tag>
        ))}
      </div>
      <div className="priceTitle font-light text-sm">Цена</div>
      <div className="creditTitle font-light text-sm">Кредит</div>
      <div className="reviewCount font-light text-sm">{product.reviewCount} отзывов</div>

      <Divider className="hr" />

      <div className="description text-base mb-4">{product.description}</div>
      <div className="features">FEATURES</div>
      <div className="advBlock">
        {!!product.advantages && (
          <div className="advantages border-l-[2px] border-[var(--green)] pl-4 mb-5">
            <div className="text-base font-bold mb-1">Преимущества</div>
            <div className="text-base">{product.advantages}</div>
          </div>
        )}
        {!!product.disadvantages && (
          <div className="disadvantages border-l-[2px] border-[var(--red)] pl-4">
            <div className="text-base font-bold mb-1">Недостатки</div>
            <div className="text-base">{product.disadvantages}</div>
          </div>
        )}
      </div>

      <Divider className="hr" />

      <div className="actions">
        <Button mode="primary">Узнать подробнее</Button>
        <Button mode="ghost" className="ml-5">
          Читать отзывы
          <ChevronRightIcon className="inline-block size-5" />
        </Button>
      </div>
    </Card>
  )
}

export default ProductItem;
