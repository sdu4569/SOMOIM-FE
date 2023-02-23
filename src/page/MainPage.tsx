import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <>
      <h2>Main</h2>
      <Link to={"/auth"}>
        <button>인증</button>
      </Link>
      <Link to={"/signup"}>
        <button>회원가입</button>
      </Link>
      <Link to={"/interest"}>
        <button>관심사</button>
      </Link>
    </>
  );
};

export default MainPage;
