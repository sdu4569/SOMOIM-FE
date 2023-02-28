import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";

const MainPage = () => {
  const [value, setValue] = useState("");
  const [auth, setAuth] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.replace(/[^0-9]/g, ""));
  };
  const onChangeAuth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(e.target.value.replace(/[^0-9]/g, ""));
  };

  useEffect(() => {
    const input = document.querySelector("#input") as HTMLInputElement;
    const button = document.querySelector("#button") as HTMLButtonElement;

    input.addEventListener("keyup", activeEvent);

    function activeEvent() {
      switch (!input.value) {
        case true:
          button.disabled = true;
          break;

        case false:
          button.disabled = false;
          break;
      }
    }
  }, []);

  return (
    <div>
      <header>
        <h2 className="max-w-4xl text-xl m-auto pl-3 mb-5 mt-5 font-bold">
          번호 인증
        </h2>
      </header>
      <div>
        <p className="max-w-4xl m-auto pl-3 text-sm mb-2 ">
          전화번호를 입력하세요.
        </p>
        <form className="flex justify-between max-w-4xl m-auto pl-3 pr-3 min-h-45 mb-4">
          <input
            type="text"
            onChange={onChange}
            value={value}
            minLength={10}
            maxLength={11}
            placeholder="01012345678"
            className="border-solid border-2 rounded w-full mr-4 pl-2 bg-gray-100"
          ></input>
          <button className="bg-blue-400 text-white rounded text-sm min-w-100 min-h-45 font-bold">
            번호 요청
          </button>
        </form>
        <form className="flex flex-col justify-between  max-w-4xl m-auto pl-3 pr-3">
          <input
            id="input"
            type="text"
            onChange={onChangeAuth}
            value={auth}
            maxLength={6}
            placeholder="인증번호를 입력하세요"
            className="border-solid border-2 rounded w-full mr-4 pl-2 bg-gray-100 min-h-45 mb-4"
          ></input>
          <button
            id="button"
            disabled={true}
            className="bg-blue-400 text-white rounded text-sm min-w-100 min-h-45 font-bold disabled:opacity-50"
          >
            다음
          </button>
        </form>
      </div>
    </div>
  );
};

export default MainPage;
