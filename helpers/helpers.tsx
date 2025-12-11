import { FirstLevelMenuItem } from "@/interfaces/menu.interface";
import { TopLevelCategory } from "@/interfaces/page.interface";
import { AcademicCapIcon, BookOpenIcon, CloudIcon, Squares2X2Icon } from "@heroicons/react/16/solid";

export const firstLevelMenu: FirstLevelMenuItem[] = [
  { route: 'courses', name: 'Курсы', icon: <AcademicCapIcon className="size-6" />, id: TopLevelCategory.Courses },
  { route: 'servises', name: 'Сервисы', icon: <CloudIcon className="size-6" />, id: TopLevelCategory.Services },
  { route: 'books', name: 'Книги', icon: <BookOpenIcon className="size-6" />, id: TopLevelCategory.Books },
  { route: 'products', name: 'Продукты', icon: <Squares2X2Icon className="size-6" />, id: TopLevelCategory.Products },
];

export const priceRu = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ').concat(' ₽');
}
