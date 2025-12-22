import Image from "next/image";
import { FC, HTMLAttributes } from "react";
import userIcon from "../../../public/icons/user.svg";
import { ReviewModel } from "@/interfaces/product.interface";
import cn from "classnames";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import Rating from "@/components/UI/Rating";
import "./Review.css";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  review: ReviewModel;
}

const Review: FC<IProps> = ({ review, className, ...rest }) => {
  return (
    <div {...rest } className={cn('review', className)}>
      <Image src={userIcon} alt="" />

      <div className="review-title">
        <span className="font-bold mr-2">{review.name}:</span>
        <span>{review.title}</span>
      </div>

      <div className="review-date">
        {format(new Date(review.createdAt), 'dd MMMM yyyy', { locale: ru })}
      </div>

      <div className="review-rating">
        <Rating rating={review.rating} />
      </div>

      <div className="review-description">
        {review.description}
      </div>
    </div>
  )
}

export default Review;
