import { ProductModel } from "@/interfaces/product.interface";
import { FC, HTMLAttributes } from "react";
import cn from "classnames";
import "./ProductFeatures.css";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  product: ProductModel;
}

const ProductFeatures: FC<IProps> = ({ product, className, ...rest }) => {
  return (
    <div { ...rest } className={cn(className, '')}>
      {product.characteristics.map(c => (
        <div key={c.name} className="characteristics">
          <span className="characteristicsName">{c.name}</span>
          <span className="characteristicsDots"></span>
          <span className="characteristicsValue">{c.value}</span>
        </div>
      ))}
    </div>
  )
}

export default ProductFeatures;
