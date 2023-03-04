import { useLocation } from "react-router-dom";
import BottomTabNavigator from "./BottomTabNavigator";

interface LayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
  return (
    <div
      className={`bg-white w-[400px] h-[740px] overflow-hidden rounded-md relative scrollbar-hide p-4 ${className}`}
    >
      {children}
    </div>
  );
}
