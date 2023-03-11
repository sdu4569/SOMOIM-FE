import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { InterestList } from "../components/InterestList";
import HeaderBackButton from "../components/HeaderBackButton";
import getUserChoiceInterest from "../util/getUserChoiceInterest";

const InterestDetailChoicePage = () => {
  const location = useLocation();
  const detailList = InterestList.filter((item) =>
    location.state.includes(item.title)
  );
  const userChoice = getUserChoiceInterest()
    .map((item: any) => item.detail)
    .flat();

  const navigate = useNavigate();
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

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
      const userChoiceList = detailList.map((item) => {
        return {
          title: item.title,
          interest: item.interest,
          image: item.image,
          detail: item.detail.filter((item) => checkedList.includes(item)),
        };
      });
      localStorage.setItem("userChoice", JSON.stringify(userChoiceList));
      navigate("/activity");
    },
    [checkedList]
  );

  const clickHandler = (e: any) => {
    e.preventDefault();
    if (checkedList.length == 0) {
      alert("상세 관심사를 선택해주세요");
    }

    if (checkedList.length !== 0 && formRef.current) {
      console.log(formRef);
      formRef.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
  };

  if (userChoice.length !== 0) {
    useEffect(() => {
      setCheckedList(userChoice);
    }, []);
  }
  return (
    <div className="h-full pt-14 pb-16 overflow-auto">
      <PageHeader>
        <div className="flex items-center space-x-4 h-full overflow-hidden">
          <HeaderBackButton />
          <h1 className="text-xl whitespace-nowrap truncate">
            상세 관심사 선택
          </h1>
        </div>
        <button type="submit" className="text-xl" onClick={clickHandler}>
          저장
        </button>
      </PageHeader>
      <div className="relative">
        <form onSubmit={onSubmit} ref={formRef} className="overflow-auto">
          <div className="flex flex-col flex-wrap ">
            {detailList.map((item, idx) => {
              return (
                <div key={idx} className="min-w-[80px] mb-3 relative">
                  <img
                    src={item.image}
                    className="mb-2 w-6 inline-block ml-3"
                  />
                  <p className="ml-2 absolute top-1 text-[14px] inline-block">
                    {item.title}
                  </p>
                  <div className="flex flex-wrap m-2 ">
                    {item.detail.map((item, idx) => {
                      return (
                        <div key={idx} className="pb-3 pr-3 mb-2 ">
                          <input
                            type="checkbox"
                            id={item}
                            checked={checkedList.includes(item)}
                            onChange={(e) => checkHandler(e, item)}
                            className="hidden peer"
                          />
                          <label
                            htmlFor={item}
                            className="p-1 border-2 border-solid rounded text-[12px] peer-checked:border-blue-500"
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
        </form>
      </div>
    </div>
  );
};

export default InterestDetailChoicePage;
