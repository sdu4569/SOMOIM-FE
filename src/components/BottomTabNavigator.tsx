import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faEllipsis, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

export default function BottomTabNavigator({
  children,
  className,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const location = useLocation();
  return (
    <nav
      className={`flex items-center bg-white h-16 border-t-2 border-gray-300 absolute left-0 right-0 bottom-0 z-20 ${className}`}
    >
      {children ? (
        children
      ) : (
        <ul className="flex w-full h-full justify-around items-center">
          <Link
            to={"/clubs"}
            className={`flex flex-col items-center space-y-1 w-12 ${
              location.pathname.includes("club")
                ? "text-black"
                : "text-gray-400"
            }`}
          >
            <FontAwesomeIcon icon={faUsers} size={"xl"} />
            <span className="text-sm text-center">클럽</span>
          </Link>
          <Link
            to={"/activity"}
            className={`flex flex-col items-center space-y-1 w-12 ${
              location.pathname.includes("activity")
                ? "text-black"
                : "text-gray-400"
            }`}
          >
            <FontAwesomeIcon icon={faCircleUser} size={"xl"} />
            <span className="text-sm text-center">내 활동</span>
          </Link>
          <Link
            to={"/more"}
            className={`flex flex-col items-center space-y-1 w-12 ${
              location.pathname.includes("more")
                ? "text-black"
                : "text-gray-400"
            }`}
          >
            <FontAwesomeIcon icon={faEllipsis} size={"xl"} />
            <span className="text-sm text-center">더 보기</span>
          </Link>
        </ul>
      )}
    </nav>
  );
}
