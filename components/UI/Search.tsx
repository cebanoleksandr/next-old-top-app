import { FC, HTMLAttributes, KeyboardEvent, useState } from "react";
import cn from "classnames";
import Input from "./Input";
import Button from "./Button";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/router";

interface IProps extends HTMLAttributes<HTMLDivElement> {}

const Search: FC<IProps> = ({ className, ...rest }) => {
  const [search, setSearch] = useState('');

  const router = useRouter();

  const goToSearch = () => {
    router.push({
      pathname: '/search',
      query: {
        q: search,
      }
    });
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      goToSearch();
    }
  }

  return (
    <div { ...rest } className={cn('relative w-full', className)}>
      <Input
        className="w-full pr-11"
        placeholder="Поиск..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <Button
        mode="primary"
        className="absolute top-1 right-1 size-8"
        onClick={goToSearch}
        aria-label="Искать по сайту"
      >
        <MagnifyingGlassIcon className="size-5 -mx-1.5 -my-1" />
      </Button>
    </div>
  )
}

export default Search;
