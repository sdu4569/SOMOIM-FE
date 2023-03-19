import { motion } from "framer-motion";
import { overlayVariants } from "@/libs/variants";

interface OverlayPorps {
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function Overlay({ children, onClick }: OverlayPorps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={overlayVariants}
      onClick={onClick}
      className="absolute w-full h-full bg-black bg-opacity-50 flex justify-center items-center inset-0 z-[100]"
    >
      {children}
    </motion.div>
  );
}
