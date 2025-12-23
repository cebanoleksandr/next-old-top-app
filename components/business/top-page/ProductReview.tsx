import Card from "@/components/UI/Card";
import { forwardRef, Fragment } from "react";
import cn from "classnames";
import Review from "./Review";
import { ProductModel } from "@/interfaces/product.interface";
import Divider from "@/components/UI/Divider";
import ReviewForm from "./ReviewForm";
import { motion, Variants } from "framer-motion";

interface IProps {
  product: ProductModel;
  isOpen: boolean;

}

const variants: Variants = {
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.25,
      ease: "easeInOut"
    }
  }
};

const ProductReview = forwardRef<HTMLDivElement, IProps>(({ isOpen, product }, ref) => (
  <motion.div
    ref={ref}
    variants={variants}
    initial="closed"
    animate={isOpen ? "open" : "closed"}
    className="mb-7 overflow-hidden -mt-8 shadow-sm"
  >
    <Card
      color="blue"
      className={cn('p-7 overflow-hidden')}
      ref={ref}
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
  </motion.div>
));

export default ProductReview;
