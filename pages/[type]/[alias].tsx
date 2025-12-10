import { API } from "@/api";
import ProductsList from "@/components/business/top-page/ProductsList";
import TopPageHeader from "@/components/business/top-page/TopPageHeader";
import VacanciesBlock from "@/components/business/top-page/VacanciesBlock";
import { withMainLayout } from "@/components/layouts/MainLayout/MainLayout";
import { firstLevelMenu } from "@/helpers/helpers";
import { MenuItem } from "@/interfaces/menu.interface";
import { TopLevelCategory, TopPageModal } from "@/interfaces/page.interface";
import { ProductModel } from "@/interfaces/product.interface";
import axios from "axios";
import { GetStaticPropsContext } from "next";
import { FC } from "react";

interface TopPageProps extends Record<string, unknown> {
  firstCategory: TopLevelCategory;
  page: TopPageModal;
  products: ProductModel[];
}

const TopPage: FC<TopPageProps> = ({ firstCategory, page, products }) => {
  return (
    <div className="mt-10">
      <TopPageHeader page={page} products={products} />
      <ProductsList products={products} />
      {firstCategory === TopLevelCategory.Courses && <VacanciesBlock page={page} />}
    </div>
  );
}

export default withMainLayout(TopPage);

export const getStaticPaths = async () => {
  let paths: string[] = [];

  for (const m of firstLevelMenu) {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: m.id,
    });
    paths = paths.concat(menu.flatMap(s => s.pages.map(p => `/${m.route}/${p.alias}`)))
  }

  return {
    paths,
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

  const alias = params.alias as string;

  try {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: firstCategoryItem.id,
    });

    if (!menu.length) {
      return {
        notFound: true
      }
    }

    const { data: page } = await axios.get<TopPageModal>(API.topPage.byAlias + alias);
    const { data: products } = await axios.post<ProductModel[]>(API.product.find, {
      category: page.category,
      limit: 10,
    });

    return {
      props: {
        menu,
        firstCategory: firstCategoryItem.id,
        page,
        products
      },
    };
  } catch (error) {
    return {
      notFound: true
    }
  }
}
