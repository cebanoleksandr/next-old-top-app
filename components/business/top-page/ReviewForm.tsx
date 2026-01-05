import { FC, HTMLAttributes, useState } from "react";
import cn from "classnames";
import Input from "@/components/UI/Input";
import Rating from "@/components/UI/Rating";
import Textarea from "@/components/UI/Textarea";
import Button from "@/components/UI/Button";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { API } from "@/api";
import { IReviewSentResponse } from "@/interfaces/page.interface";
import Error from "next/error";

export interface IReviewForm {
  name: string;
  title: string;
  description: string;
  rating: number;
}

interface IProps extends HTMLAttributes<HTMLDivElement> {
  productId: string;
  isOpen: boolean;
}

const ReviewForm: FC<IProps> = ({ productId, className, isOpen, ...rest }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string>();
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm<IReviewForm>();

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, {
        ...formData,
        productId,
      });

      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setError('Что-то пошло не так');
      }
    } catch (error: Error | any) {
      setError(error?.message || 'Что-то пошло не так');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        {...rest}
        className={cn('text-sm review-form', className)}
      >
        <Input
          { ...register('name', { required: { value: true, message: 'Заполните имя' } }) } 
          placeholder="Имя"
          error={errors.name}
          tabIndex={isOpen ? 0 : -1}
        />

        <Input
          className="review-form-title"
          placeholder="Заголовок отзыва"
          { ...register('title', { required: { value: true, message: 'Заполните заголовок' }}) }
          error={errors.title}
          tabIndex={isOpen ? 0 : -1}
        />

        <div className="relative review-form-rating flex items-center gap-5">
          <span className={cn({ "text-red-500": errors.rating })}>Оценка</span>
          <Controller
            control={control}
            rules={{ required: { value: true, message: 'Поставьте оценку' } }}
            name="rating"
            render={({ field }) => (
              <Rating
                rating={field.value}
                isEditable
                setRating={field.onChange}
                ref={field.ref}
                error={errors.rating}
                tabIndex={isOpen ? 0 : -1}
              />
            )}
          />
        </div>

        <Textarea
          className="review-form-description"
          placeholder="Текст отзыва"
          { ...register('description', { required: { value: true, message: 'Заполните описание' }}) }
          error={errors.description}
          tabIndex={isOpen ? 0 : -1}
        />

        <div className="review-form-submit">
          <Button mode="primary" tabIndex={isOpen ? 0 : -1} type="submit">
            Отправить
          </Button>

          <span className="ml-4">* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>

      {isSuccess && (
        <div className="bg-[var(--green-light)] p-5 relative rounded-sm mt-5">
          <div className="font-bold">Ваш отзыв отправлен</div>
          <div className="">Спасибо, ваш отзыв будет опубликован после проверки.</div>
          <XMarkIcon className="size-5 text-green-500 absolute top-5 right-5 cursor-pointer" onClick={() => setIsSuccess(false)} />
        </div>
      )}

      {!!error && (
        <div className="bg-[var(--red-light)] p-5 relative rounded-sm mt-5">
          <div className="font-bold">Что-то пошло не так...</div>
          <div className="">{error}</div>
          <XMarkIcon className="size-5 text-red-700 absolute top-5 right-5 cursor-pointer" onClick={() => setError(undefined)} />
        </div>
      )}
    </form>
  )
}

export default ReviewForm;
