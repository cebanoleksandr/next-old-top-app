'use client';

import { getMenu } from "@/api/menu";
import { FirstLevelMenuItem, PageItem } from "@/interfaces/menu.interface";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setMenuAC } from "@/store/menuSlice";
import Link from "next/link";
import { useEffect } from "react";
import cn from "classnames";
import { usePathname } from "next/navigation";
import { firstLevelMenu } from "@/helpers/helpers";
import { motion } from "framer-motion";

const Menu = () => {
  const { menu, firstCategory } = useAppSelector(state => state.menu);
  
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const fetchMenu = async () => {
    const response = await getMenu(0);
    dispatch(setMenuAC({ menu: response }));
  }

  const openSecondLevel = (secondCategory: string) => {
    const updatedMenu = menu.map(m => ({
      ...m,
      isOpened:
        m._id.secondCategory === secondCategory ? !m.isOpened : m.isOpened
    }));

    dispatch(setMenuAC({ menu: updatedMenu }));
  }

  useEffect(() => {
    fetchMenu();
  }, []);

  const variants = {
    visible: {
      marginBottom: 20,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      }
    },
    hidden: {
      marginBottom: 0,
    },
  };

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: 'auto',
    },
    hidden: {
      opacity: 0,
      height: 0,
    },
  };

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
        {menu.map(m => {
          const isActive = m.pages.some(p => p.alias === pathname?.split('/')[2]);

          const newM = {
            ...m,
            isOpened: isActive || m.isOpened
          };

          return (
            <div key={m._id.secondCategory} className="mb-5">
              <div className='mb-2 cursor-pointer uppercase text-[var(--gray-dark)] text-xs font-light' onClick={() => openSecondLevel(m._id.secondCategory)}>
                {m._id.secondCategory}
              </div>

              <motion.div
                className={cn('block mb-2 text-[var(--gray-dark)] text-sm font-medium')}
                layout
                variants={variants}
                initial={newM.isOpened ? 'visible' : 'hidden'}
                animate={newM.isOpened ? 'visible' : 'hidden'}
              >
                {buildThirdLevel(m.pages, menuItem.route)}
              </motion.div>
            </div>
          )
        })}
      </div>
    );
  }

  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return (
      <div className="">
        {pages.map(page => (
          <motion.div
            key={page._id}
            variants={variantsChildren}
          >
            <Link
              href={`/${route}/${page.alias}`}
              className={cn('block hover:text-[var(--primary)] transition duration-300', {
                'text-[var(--primary)]': `/${route}/${page.alias}` === pathname
              })}
            >
              {page.category}
            </Link>
          </motion.div>
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
