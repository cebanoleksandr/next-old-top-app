'use client';

import { getMenu } from "@/api/menu";
import { FirstLevelMenuItem, PageItem } from "@/interfaces/menu.interface";
import { TopLevelCategory } from "@/interfaces/page.interface";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setMenuAC } from "@/store/menuSlice";
import { AcademicCapIcon, BookOpenIcon, CloudIcon, Squares2X2Icon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useEffect } from "react";
import cn from "classnames";

const firstLevelMenu: FirstLevelMenuItem[] = [
  { route: 'courses', name: 'Курсы', icon: <AcademicCapIcon className="size-6" />, id: TopLevelCategory.Courses },
  { route: 'servises', name: 'Сервисы', icon: <CloudIcon className="size-6" />, id: TopLevelCategory.Services },
  { route: 'books', name: 'Книги', icon: <BookOpenIcon className="size-6" />, id: TopLevelCategory.Books },
  { route: 'products', name: 'Продукты', icon: <Squares2X2Icon className="size-6" />, id: TopLevelCategory.Products },
];

const Menu = () => {
  const { menu, firstCategory } = useAppSelector(state => state.menu);
  
  const dispatch = useAppDispatch();

  const fetchMenu = async () => {
    const response = await getMenu(0);
    dispatch(setMenuAC({ menu: response }));
  }

  useEffect(() => {
    fetchMenu();
  }, []);

  const buildFirstLevel = () => {
    return (
      <>
        {firstLevelMenu.map(m => (
          <div key={m.id}>
            <Link
              href={`/${m.route}`} 
              className={cn('inline-flex items-center gap-3 font-medium text-lg hover:text-[var(--primary)] transition duration-300', {
                'text-[var(--primary)]': m.id === firstCategory
              })}
            >
              {m.icon}
              {m.name}
            </Link>
            {m.id === firstCategory && buildSecondLevel(m)}
          </div>
        ))}
      </>
    );
  }

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <div className="ml-3 mt-4 pl-8 border-l border-l-gray-300">
        {menu.map(m => (
          <div key={m._id.secondCategory} className="mb-5">
            <div className='mb-2 cursor-pointer uppercase text-[var(--gray-dark)] text-xs font-light'>
              {m._id.secondCategory}
            </div>

            <div 
              className={cn('mb-2 text-[var(--gray-dark)] text-sm font-medium', {
                '': m.isOpened
              })}
            >
              {buildThirdLevel(m.pages, menuItem.route)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return (
      <div className="">
        {pages.map(page => (
          <Link
            key={page._id} 
            href={`/${route}/${page.alias}`}
            className={cn('block hover:text-[var(--primary)] transition duration-300', {
              'text-[var(--primary)]': true
            })}
          >
            {page.category}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-5">
      {buildFirstLevel()}
    </div>
  );
};

export default Menu;
