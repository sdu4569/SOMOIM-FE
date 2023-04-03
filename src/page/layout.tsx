import { AnimatePresence } from "framer-motion";
import { ScrollRestoration } from "react-router-dom";

interface LayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
  return (
    <div
      className={`bg-white w-[400px] h-[740px] overflow-hidden rounded-md relative ${className}`}
    >
      <AnimatePresence>{children}</AnimatePresence>
    </div>
  );
}
