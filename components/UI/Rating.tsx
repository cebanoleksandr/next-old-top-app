import { StarIcon } from "@heroicons/react/16/solid";
import { forwardRef, HTMLAttributes, JSX, KeyboardEvent, useEffect, useRef, useState } from "react";
import cn from "classnames";
import { FieldError } from "react-hook-form";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  rating: number;
  isEditable?: boolean;
  setRating?: (rating: number) => void;
  error?: FieldError;
}

const Rating = forwardRef<HTMLDivElement, IProps>(({ rating, isEditable = false, setRating = () => {}, error, tabIndex, ...rest }, ref) => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

  const ratingArrayRef = useRef<HTMLSpanElement[]>([]);

  const handleKey = (e: KeyboardEvent) => {
    if (!isEditable || !setRating) {
      return;
    }

    if (e.code === 'ArrowRight' || e.code === 'ArrowUp') {
      e.preventDefault();

      if (!rating) {
        setRating(1);
        return;
      }

      if (rating >= 5) {
        return;
      }

      setRating(rating + 1);
      ratingArrayRef.current[rating]?.focus();
    }

    if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
      e.preventDefault();

      if (!rating) {
        return;
      }

      if (rating <= 1) {
        setRating(0);
        return;
      }

      setRating(rating - 1);
      ratingArrayRef.current[rating - 2]?.focus();
    }
  };

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
        />
      );
    });
    setRatingArray(updatedArray);
  }

  useEffect(() => {
    constructRating(rating);
  }, [rating, tabIndex]);

  const setRef = (ref: HTMLSpanElement) => {
    ratingArrayRef.current?.push(ref);
  }

  const computeFocus = (index: number) => {
    if (!isEditable) {
      return -1;
    }

    if (!rating && index === 0) {
      return tabIndex ?? 0;
    }

    if (rating === index + 1) {
      return tabIndex ?? 0;
    }

    return -1;
  }

  return (
    <div {...rest} ref={ref} className={cn("")}>
      {ratingArray.map((star, index) => (
        <span
          key={index} 
          className={cn({ "text-red-500": !!error })}
          onClick={() => isEditable && setRating(index + 1)}
          tabIndex={computeFocus(index)}
          onKeyDown={handleKey}
          ref={setRef}
        >
          {star}
        </span>
      ))}
      {!!error && <span className="absolute -bottom-5 left-0 text-red-500">{error.message}</span>}
    </div>
  );
});

export default Rating;
