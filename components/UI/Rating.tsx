import { StarIcon } from "@heroicons/react/16/solid";
import { forwardRef, HTMLAttributes, JSX, useEffect, useState } from "react";
import cn from "classnames";
import { FieldError } from "react-hook-form";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  rating: number;
  isEditable?: boolean;
  setRating?: (rating: number) => void;
  error?: FieldError;
}

const Rating = forwardRef<HTMLDivElement, IProps>(({ rating, isEditable = false, setRating = () => {}, error, ...rest }, ref) => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((_, index) => {
      return (
        <StarIcon
          key={index}
          className={cn("inline-block size-5 transition duration-300", {
            "text-[var(--primary)]": index < currentRating,
            "text-gray-300": index >= currentRating,
            "cursor-pointer hover:text-[var(--primary)]": isEditable,
          })}
          onClick={() => isEditable && setRating(index + 1)}
          tabIndex={isEditable ? 0 : -1}
          onKeyDown={(e) => {
            if (isEditable && (e.key === "Enter" || e.key === " ")) {
              setRating(index + 1);
            }
          }}
        />
      );
    });
    setRatingArray(updatedArray);
  }

  useEffect(() => {
    constructRating(rating);
  }, [rating]);

  return (
    <div {...rest} ref={ref} className={cn("")}>
      {ratingArray.map((star, index) => (
        <span key={index} className={cn({ "text-red-500": !!error })}>{star}</span>
      ))}
      {!!error && <span className="absolute -bottom-5 left-0 text-red-500">{error.message}</span>}
    </div>
  );
});

export default Rating;
