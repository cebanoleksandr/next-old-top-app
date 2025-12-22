import { FC, HTMLAttributes } from "react";
import cn from "classnames";
import Input from "@/components/UI/Input";
import Rating from "@/components/UI/Rating";
import Textarea from "@/components/UI/Textarea";
import Button from "@/components/UI/Button";
import "./ReviewForm.css";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { Controller, useForm } from "react-hook-form";

export interface IReviewForm {
  name: string;
  title: string;
  description: string;
  rating: number;
}

interface IProps extends HTMLAttributes<HTMLDivElement> {
  productId: string;
}

const ReviewForm: FC<IProps> = ({ productId, className, ...rest }) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<IReviewForm>();

  const onSubmit = (data: IReviewForm) => {
    console.log('DATA: ', data);
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
        />

        <Input
          className="review-form-title"
          placeholder="Заголовок отзыва"
          { ...register('title', { required: { value: true, message: 'Заполните заголовок' }}) }
          error={errors.title}
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
              />
            )}
          />
        </div>

        <Textarea
          className="review-form-description"
          placeholder="Текст отзыва"
          { ...register('description', { required: { value: true, message: 'Заполните описание' }}) }
          error={errors.description}
        />

        <div className="review-form-submit">
          <Button mode="primary">
            Отправить
          </Button>

          <span className="ml-4">* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>

      <div className="bg-[var(--green-light)] p-5 relative rounded-sm mt-5">
        <div className="font-bold">Ваш отзыв отправлен</div>
        <div className="">Спасибо, ваш отзыв будет опубликован после проверки.</div>
        <XMarkIcon className="size-5 text-green-500 absolute top-5 right-5 cursor-pointer" />
      </div>
    </form>
  )
}

export default ReviewForm;
