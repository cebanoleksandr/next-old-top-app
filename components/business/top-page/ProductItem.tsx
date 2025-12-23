import { ProductModel } from "@/interfaces/product.interface";
import { FC, forwardRef, HTMLAttributes, MouseEvent, useRef, useState } from "react";
import cn from "classnames";
import Card from "@/components/UI/Card";
import Image from "next/image";
import Rating from "@/components/UI/Rating";
import Tag from "@/components/UI/Tag";
import "./ProductItem.css"
import Button from "@/components/UI/Button";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { devlOfNum, priceRu } from "@/helpers/helpers";
import Divider from "@/components/UI/Divider";
import ProductFeatures from "./ProductFeatures";
import ProductReview from "./ProductReview";
import { motion } from "framer-motion";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  product: ProductModel;
}

const ProductItem = motion(forwardRef<HTMLDivElement, IProps>(({ product, className, ...rest }, ref) => {
  const [isReviewOpened, setIsReviewOpened] = useState(false);

  const reviewRef = useRef<HTMLDivElement>(null);

  const scrollToReview = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsReviewOpened(true);
    reviewRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    reviewRef.current?.focus();
  }

  return (
    <div
      className={cn('product-item', className)} 
      {...rest}
      ref={ref}
    >
      <Card className={cn('product mb-7 p-8')}>
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

        <a href="#ref" onClick={scrollToReview} className="reviewCount text-[var(--primary)]">
          <div className="font-light text-sm">
            {product.reviewCount} {devlOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
          </div>
        </a>

        <Divider className="hr" />

        <div className="description text-base mb-4">{product.description}</div>

        <ProductFeatures product={product} className="features" />

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

        <Divider className="hr2" />

        <div className="actions">
          <Button mode="primary">Узнать подробнее</Button>
          <Button
            mode="ghost" 
            className="ml-5"
            onClick={() => setIsReviewOpened(!isReviewOpened)}
          >
            Читать отзывы
            {isReviewOpened ? (
              <ChevronDownIcon className="inline-block size-5" />
            ) : (
              <ChevronRightIcon className="inline-block size-5" />
            )}
          </Button>
        </div>
      </Card>

      <ProductReview
        isOpen={isReviewOpened}
        product={product}
        ref={reviewRef}
      />
    </div>
  )
}));

export default ProductItem;
