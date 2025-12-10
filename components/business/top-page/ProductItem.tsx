import { ProductModel } from "@/interfaces/product.interface";
import { FC } from "react";

interface IProps {
  product: ProductModel;
}

const ProductItem: FC<IProps> = ({ product }) => {
  return (
    <div>
      {product.title}
    </div>
  )
}

export default ProductItem;
