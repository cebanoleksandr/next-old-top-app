import { ProductModel } from "@/interfaces/product.interface";
import { FC } from "react";
import ProductItem from "./ProductItem";
import { useReducedMotion } from "framer-motion";

interface IProps {
  products: ProductModel[];
}

const ProductsList: FC<IProps> = ({ products }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="mb-12">
      {products?.map(product => (
        <ProductItem
          key={product._id}
          product={product}
          layout={!shouldReduceMotion}
        />
      ))}
    </div>
  )
}

export default ProductsList;
