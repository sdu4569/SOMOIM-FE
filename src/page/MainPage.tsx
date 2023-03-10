import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const routes = [
  {
    path: "/auth",
    name: "인증",
  },
  {
    path: "/signup/register",
    name: "회원가입",
  },
  {
    path: "/interest",
    name: "관심사",
  },
  {
    path: "/activity",
    name: "활동",
  },
  {
    path: "/clubs/recommend",
    name: "클럽 리스트",
  },
  {
    path: "/clubs/1",
    name: "클럽 상세",
  },
  {
    path: "/clubs/1/post/1",
    name: "클럽 게시글",
  },
  {
    path: "/clubs/1/write",
    name: "클럽 게시글 작성",
  },
  {
    path: "/search",
    name: "검색",
  },
  {
    path: "/search/category",
    name: "카테고리 검색",
  },
  {
    path: "/more",
    name: "더보기",
  },
  {
    path: "/clubs/1/edit",
    name: "클럽 수정",
  },
  {
    path: "/clubs/1/createActivity",
    name: "클럽 액티비티 생성",
  },
  {
    path: "/clubs/create",
    name: "클럽 생성",
  },
];

const MainPage = () => {
  return (
    <>
      <ul className="flex flex-col space-y-4 overflow-scroll h-full">
        {routes.map((route) => (
          <li key={route.path}>
            <Link
              to={route.path}
              className="p-2 rounded-md border flex space-x-2 items-center w-max"
            >
              <p>{route.name}</p>
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MainPage;
