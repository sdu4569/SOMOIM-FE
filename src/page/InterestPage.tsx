import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";

import { InterestList } from "../components/InterestList";

const InterestPage = () => {
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  const checkedItemHandler = (value: string, isChecked: boolean) => {
    //체크 되어 있는 관심사 해제 기능
    if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
      return;
    }

    //관심사가 7개 미만이면 List에 추가 7개가 되면 더이상 체크 안되게
    if (checkedList.length < 7) {
      if (isChecked) {
        setCheckedList((prev) => [...prev, value]);
        return;
      }
    } else if (checkedList.length == 7) {
      alert("7개의 관심사만 선택 가능합니다.");
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

  const clickHandler = (e: any) => {
    if (checkedList.length == 0) {
      alert("관심사를 선택해주세요");
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="relative">
        <PageHeader children="관심사 선택" />
        <form>
          <div className="flex justify-evenly flex-wrap">
            {InterestList.map((item, idx) => {
              return (
                <div key={idx} className="min-w-80 mb-3 ">
                  <input
                    type="checkbox"
                    id={item.title}
                    checked={checkedList.includes(item.title)}
                    onChange={(e) => checkHandler(e, item.title)}
                    className="hidden peer"
                  />
                  <label
                    htmlFor={item.title}
                    className="[&>img]:peer-checked:border-blue-500"
                  >
                    <img
                      src={item.image}
                      className="border-2 border-solid rounded m-auto mb-2 w-12 bg-gray-200"
                    />
                    <div className="text-12 text-center">{item.title}</div>
                  </label>
                </div>
              );
            })}
          </div>
          <Link
            to={"/interest/detail"}
            state={checkedList}
            onClick={clickHandler}
          >
            <button
              type="submit"
              id="button"
              className="mr-2 absolute text-xl top-0 right-0 peer-checked:"
            >
              다음
            </button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default InterestPage;
