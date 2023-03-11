import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";

import { InterestList } from "../components/InterestList";
import getUserChoiceInterest from "../util/getUserChoiceInterest";
import HeaderBackButton from "../components/HeaderBackButton";

const InterestPage = () => {
  const userChoice = getUserChoiceInterest().map((item: any) => item.title);
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

  if (userChoice.length !== 0) {
    useEffect(() => {
      setCheckedList(userChoice);
    }, []);

    return (
      <div className="h-full pt-14 pb-16 overflow-auto">
        <PageHeader>
          <div className="flex items-center space-x-4 h-full overflow-hidden">
            <HeaderBackButton />
            <h1 className="text-xl whitespace-nowrap truncate">관심사 선택</h1>
          </div>
          <Link
            to={"/interest/detail"}
            state={checkedList}
            onClick={clickHandler}
          >
            <button type="submit" id="button" className="text-xl">
              다음
            </button>
          </Link>
        </PageHeader>
        <main>
          <form>
            <div className="flex justify-evenly flex-wrap">
              {InterestList.map((item, idx) => {
                return (
                  <div key={idx} className="min-w-[80px] mb-3 ">
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
                      <div className="text-[12px] text-center">
                        {item.title}
                      </div>
                    </label>
                  </div>
                );
              })}
            </div>
          </form>
        </main>
      </div>
    );
  }

  return (
    <>
      <PageHeader>
        <h1 className="text-xl whitespace-nowrap truncate">관심사 선택</h1>
        <Link
          to={"/interest/detail"}
          state={checkedList}
          onClick={clickHandler}
        >
          <button type="submit" id="button" className="text-xl">
            다음
          </button>
        </Link>
      </PageHeader>
      <div className="mt-12 relative">
        <form>
          <div className="flex justify-evenly flex-wrap">
            {InterestList.map((item, idx) => {
              return (
                <div key={idx} className="min-w-[80px] mb-3 ">
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
                    <div className="text-[12px] text-center">{item.title}</div>
                  </label>
                </div>
              );
            })}
          </div>
        </form>
      </div>
    </>
  );
};

export default InterestPage;
