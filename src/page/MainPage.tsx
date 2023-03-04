import { Link } from "react-router-dom";

const routes = [
  {
    path: "/auth",
    name: "인증",
  },
  {
    path: "/signup",
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
    path: "/club/1",
    name: "클럽 상세",
  },
  {
    path: "/club/1/post/1",
    name: "클럽 게시글",
  },
  {
    path: "/club/1/write",
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
];

const MainPage = () => {
  return (
    <>
      <h2>Main</h2>
      <ul>
        {routes.map((route) => (
          <li key={route.path}>
            <Link to={route.path}>{route.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MainPage;
