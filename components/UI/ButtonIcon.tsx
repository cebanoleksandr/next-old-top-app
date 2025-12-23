import { XMarkIcon, Bars3Icon, ChevronUpIcon } from "@heroicons/react/16/solid";
import cn from "classnames";

interface IProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  onClick: () => void;
  mode?: 'primary' | 'white';
}

export const icons = {
  up: ChevronUpIcon,
  close: XMarkIcon,
  menu: Bars3Icon
};

export type IconName = keyof typeof icons;

const ButtonIcon = ({ icon, onClick, mode = 'primary', className, ...rest }: IProps) => {
  const Icon = icons[icon];

  return (
    <button
      onClick={onClick}
      className={cn(className, 'box-border px-3 py-2 cursor-pointer text-center rounded-xl text-sm transition duration-300', {
        "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] active:bg-[var(--primary-active)]": mode === "primary",
        'bg-white text-[var(--black)] border border-white hover:bg-gray-100 active:bg-gray-200': mode === "white"
      })}
      {...rest}
    >
      <Icon className={cn('size-7', {
        "text-white": mode === "primary",
        "text-[var(--black)]": mode === "white"
      })} />
    </button>
  );
};

export default ButtonIcon;
