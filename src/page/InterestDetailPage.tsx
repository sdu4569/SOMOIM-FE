import { useCallback, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { InterestList } from "./InterestPage";

const InterestDetailPage = () => {
  const location = useLocation();
  const detailList = InterestList.filter((item) =>
    location.state.includes(item.title)
  );
  console.log(detailList);

  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  const checkedItemHandler = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);
      return;
    }

    if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
      return;
    }

    return;
  };

  const checkHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setIsChecked(!isChecked);
    checkedItemHandler(value, e.target.checked);
  };
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      console.log("checkedList:", checkedList);
    },
    [checkedList]
  );
  return (
    <div className="relative">
      <header>
        <h2 className="max-w-4xl m-auto pl-3 mb-5 mt-5">
          <Link to={"/interest"}>
            <button className="float-left mr-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/507/507257.png"
                alt="뒤로가기"
                className="w-3 absolute top-1.5 left-2"
              />
            </button>
          </Link>
          <p className="text-16 font-bold ml-4">상세 관심사 선택</p>
        </h2>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col flex-wrap">
            {detailList.map((item, idx) => {
              return (
                <div key={idx} className="min-w-80 mb-2">
                  <img
                    src={item.image}
                    className="mb-2 w-6 inline-block ml-3"
                  />
                  <p className="ml-2 text-16 inline-block">{item.title}</p>
                  <div className="flex flex-wrap m-2 ">
                    {item.detail?.map((item) => {
                      return (
                        <div key={idx} className="pb-3 pr-3 mb-2 ">
                          <input type="checkbox" id={item} className="hidden" />
                          <label
                            htmlFor={item}
                            className="p-1 border-2 border-solid rounded text-sm"
                          >
                            {item}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <Link to={"/interest/detail"} state={checkedList}>
            <button type="submit" className="mr-3 absolute top-0 right-0">
              저장
            </button>
          </Link>
        </form>
      </header>
      <main></main>
    </div>
  );
};

export default InterestDetailPage;
