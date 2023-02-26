import { useLocation } from "react-router-dom";
import BottomTabNavigator from "./BottomTabNavigator";

interface LayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
  const location = useLocation();
  return (
    <div
      className={`bg-white w-[400px] h-[740px] overflow-hidden rounded-md relative p-4 ${className}`}
    >
      {children}
      {location.pathname.includes("clubs") && <BottomTabNavigator />}
    </div>
  );
}
