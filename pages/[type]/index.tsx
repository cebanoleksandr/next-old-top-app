import { API } from "@/api";
import { withMainLayout } from "@/components/layouts/MainLayout/MainLayout";
import { firstLevelMenu } from "@/helpers/helpers";
import { MenuItem } from "@/interfaces/menu.interface";
import { TopLevelCategory } from "@/interfaces/page.interface";
import axios from "axios";
import { GetStaticPropsContext } from "next";
import { FC } from "react";

interface TypeProps {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
}

const TypePage: FC<TypeProps> = ({ firstCategory }) => {
  return (
    <div>
      {firstCategory}
    </div>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: firstLevelMenu.map(m => `/${m.route}`),
    fallback: true,
  };
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const firstCategoryItem = firstLevelMenu.find(menu => menu.route === params.type);

  if (!firstCategoryItem) {
    return {
      notFound: true,
    };
  }

  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory: firstCategoryItem.id,
  });

  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id,
    },
  };
}

export default withMainLayout(TypePage);
