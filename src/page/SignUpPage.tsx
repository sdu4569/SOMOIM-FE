import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <>
      <h2>SignUp</h2>
      <Link to={"/"}>
        <button>메인</button>
      </Link>
    </>
  );
};

export default MainPage;
