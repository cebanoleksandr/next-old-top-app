import { FC, HTMLAttributes } from "react";
import Text from "../UI/Text";
import { format } from "date-fns";
import Link from "next/link";

interface IProps extends HTMLAttributes<HTMLElement> {}

const Footer: FC<IProps> = ({ ...props }) => {
  return (
    <footer {...props}>
      <div className="grid md:grid-cols-[1fr_auto] items-center bg-[var(--primary)] text-white px-6 py-7 text-center md:text-left gap-4">
        <Text>OwlTop © 2020 - {format(new Date(), "yyyy")} Все права защищены</Text>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-[1fr_auto]">
          <Link href="/terms" className="text-sm hover:text-gray-300 transition duration-300">
            Пользовательское соглашение
          </Link>
          
          <Link href="/privacy" className="text-sm hover:text-gray-300 transition duration-300">
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
