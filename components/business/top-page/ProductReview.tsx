import Card from "@/components/UI/Card";
import { FC, Fragment } from "react";
import cn from "classnames";
import Review from "./Review";
import { ProductModel } from "@/interfaces/product.interface";
import Divider from "@/components/UI/Divider";
import ReviewForm from "./ReviewForm";

interface IProps {
  isOpen: boolean;
  product: ProductModel;

}

const ProductReview: FC<IProps> = ({ isOpen, product }) => {
  return (
    <Card
      color="blue" 
      className={cn('mb-7 -mt-8', {
        'overflow-hidden max-h-0 p-0': !isOpen,
        'p-7': isOpen
      })}
    >
      <div>
        {product.reviews.map(review => (
          <Fragment key={review._id}>
            <Review review={review} />
            <Divider />
          </Fragment>
        ))}
      </div>

      <ReviewForm productId={product._id} />
    </Card>
  )
}

export default ProductReview;
