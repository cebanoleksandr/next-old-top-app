import { API } from "@/api";
import { withMainLayout } from "@/components/layouts/MainLayout/MainLayout";
import { MenuItem } from "@/interfaces/menu.interface";
import { TopPageModal } from "@/interfaces/page.interface";
import { ProductModel } from "@/interfaces/product.interface";
import axios from "axios";
import { GetStaticPropsContext } from "next";

const CoursePage = ({ menu, firstCategory, page, products }: CourseProps) => {
  return (
    <div>
      Course Page
      <div>{page.title}</div>
      <div>{page.alias}</div>
      <div>
        {products.map(product => (
          <div key={product._id}>{product.title}</div>
        ))}
      </div>
    </div>
  );
}

export default withMainLayout(CoursePage);

export const getStaticPaths = async () => {
  const firstCategory = 0;

  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory,
  });

  return {
    paths: menu.flatMap(m => m.pages.map(p => `/courses/${p.alias}`)),
    fallback: true,
  };
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const alias = params.alias as string;

  const firstCategory = 0;

  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory,
  });

  const { data: page } = await axios.get<TopPageModal>(API.topPage.byAlias + alias);
  const { data: products } = await axios.post<ProductModel[]>(API.product.find, {
    category: page.category,
    limit: 10,
  });

  return {
    props: {
      menu,
      firstCategory,
      page,
      products
    },
  };
}

interface CourseProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
  page: TopPageModal;
  products: ProductModel[];
}