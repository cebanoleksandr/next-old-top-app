import { StarIcon } from "@heroicons/react/16/solid";
import { FC, HTMLAttributes, JSX, useEffect, useState } from "react";
import cn from "classnames";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  rating: number;
  isEditable?: boolean;
  setRating?: (rating: number) => void;
}

const Rating: FC<IProps> = ({ rating, isEditable = false, setRating = () => {}, ...rest }) => {
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
    <div {...rest}>
      {ratingArray.map((star, index) => (
        <span key={index}>{star}</span>
      ))}
    </div>
  );
};

export default Rating;
