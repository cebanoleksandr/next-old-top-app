import { API } from "@/api";
import { withMainLayout } from "@/components/layouts/MainLayout/MainLayout";
import { firstLevelMenu } from "@/helpers/helpers";
import { MenuItem } from "@/interfaces/menu.interface";
import { TopLevelCategory, TopPageModal } from "@/interfaces/page.interface";
import { ProductModel } from "@/interfaces/product.interface";
import axios from "axios";
import { GetStaticPropsContext } from "next";
import { notFound } from "next/navigation";

const CoursePage = ({ menu, firstCategory, page, products }: CourseProps) => {
  return (
    <div>
      Course Page
      <div>{page?.title}</div>
      <div>{page?.alias}</div>
      <div>
        {products?.map(product => (
          <div key={product._id}>{product.title}</div>
        ))}
      </div>
    </div>
  );
}

export default withMainLayout(CoursePage);

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

interface CourseProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  page: TopPageModal;
  products: ProductModel[];
}