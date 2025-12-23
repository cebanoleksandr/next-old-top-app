import { useScrollY } from "@/hooks/useScrollY";
import { ChevronUpIcon } from "@heroicons/react/16/solid";
import { useAnimation } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect } from "react";

const Up = () => {
  const controls = useAnimation();
  const y = useScrollY();

  useEffect(() => {
    if (y > 300) {
      controls.start({ opacity: y / document.body.scrollHeight, pointerEvents: 'auto' });
    } else {
      controls.start({ opacity: 0, pointerEvents: 'none' });
    }
  }, [y, controls]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      className="size-10 rounded-xl bg-[var(--primary)] flex items-center justify-center 
      fixed bottom-10 right-10 cursor-pointer hover:bg-[var(--primary-hover)] active:bg-[var(--primary-active)] 
      border-2 border-white transition duration-300"
      onClick={scrollToTop}
      animate={controls}
      initial={{ opacity: 0, pointerEvents: 'none' }}
    >
      <ChevronUpIcon className="size-7 text-white" />
    </motion.div>
  );
};

export default Up;
