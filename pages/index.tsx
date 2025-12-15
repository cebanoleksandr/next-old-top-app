import { API } from "@/api";
import { withMainLayout } from "@/components/layouts/MainLayout/MainLayout";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Rating from "@/components/UI/Rating";
import Search from "@/components/UI/Search";
import Tag from "@/components/UI/Tag";
import Text from "@/components/UI/Text";
import Textarea from "@/components/UI/Textarea";
import Title from "@/components/UI/Title";
import { MenuItem } from "@/interfaces/menu.interface";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

const Home = ({ menu, firstCategory }: HomeProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const [rating, setRating] = useState(3);

  return (
    <div className="text-black-1">
      <Title tag="h1">Welcome to the Home Page</Title>

      <Button onClick={() => setIsClicked(!isClicked)}>
        Click Me
        {isClicked ? (
          <ChevronDownIcon className="inline-block size-5" />
        ) : (
          <ChevronRightIcon className="inline-block size-5" />
        )}
      </Button>

      <Text size="small">
        {isClicked ? "Button has been clicked!" : "Button has not been clicked yet."}
      </Text>

      <Tag size="small" color="primary">New</Tag>
      <Tag size="medium" color="red">Sale</Tag>
      <Tag size="small" color="green" href="https://google.com">Learn More</Tag>

      <Rating rating={rating} isEditable setRating={setRating} />

      <ul>
        {menu.map(item => (
          <li key={item._id.secondCategory}>
            <Link href={`/courses/${item._id.secondCategory}`}>
              {item._id.secondCategory}
            </Link>
          </li>
        ))}
      </ul>

      {/* <Input placeholder="Test" />
      <Textarea placeholder="Test" /> */}
      {/* <Search /> */}
    </div>
  );
}

export default withMainLayout(Home);

export const getStaticProps = async () => {
  const firstCategory = 0;

  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory,
  });

  return {
    props: {
      menu,
      firstCategory
    },
  };
}

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
