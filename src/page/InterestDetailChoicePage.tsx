import { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { InterestList } from "../components/InterestList";

const InterestDetailChoicePage = () => {
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
      const userChoiceList = detailList.map((item) => {
        return {
          title: item.title,
          interest: item.interest,
          image: item.image,
          detail: item.detail.filter((item) => checkedList.includes(item)),
        };
      });
      localStorage.setItem("userChoice", JSON.stringify(userChoiceList));
      console.log("checkedList:", checkedList);
    },
    [checkedList]
  );

  const clickHandler = (e: any) => {
    if (checkedList.length == 0) {
      alert("상세 관심사를 선택해주세요");
      e.preventDefault();
    }
  };

  console.log(checkedList);
  return (
    <div className="relative">
      <PageHeader children={"상세 관심사 선택"} />
      <form onSubmit={onSubmit}>
        <div className="flex flex-col flex-wrap">
          {detailList.map((item, idx) => {
            return (
              <div key={idx} className="min-w-80 mb-3 relative">
                <img src={item.image} className="mb-2 w-6 inline-block ml-3" />
                <p className="ml-2 absolute top-1 text-14 inline-block">
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
                          className="p-1 border-2 border-solid rounded text-12 peer-checked:border-blue-500"
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

        <button
          type="submit"
          className="mr-3 absolute text-xl top-0 right-0"
          onClick={clickHandler}
        >
          저장
        </button>
      </form>

      <main></main>
    </div>
  );
};

export default InterestDetailChoicePage;
