import { ProductModel } from "@/interfaces/product.interface";
import { FC } from "react";
import ProductItem from "./ProductItem";

interface IProps {
  products: ProductModel[];
}

const ProductsList: FC<IProps> = ({ products }) => {
  return (
    <div className="mb-12">
      {products?.map(product => (
        <ProductItem
          key={product._id}
          product={product}
          layout
        />
      ))}
    </div>
  )
}

export default ProductsList;
