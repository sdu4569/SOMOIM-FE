import PageHeader from "@/components/PageHeader";

import { Link, useParams } from "react-router-dom";
import { InterestList } from "@/libs/InterestList";
import HeaderBackButton from "@/components/HeaderBackButton";
import { testClubList } from "@/components/testClubList";
import { useEffect, useState } from "react";
import { Images } from "@/libs/Images";

const InterestSearchPage = () => {
  const params = useParams();

  const interest = InterestList.filter(
    (item) => item.interest == params.interest
  );

  const all = "전체";
  const userCity = "부산광역시";
  const [text, setText] = useState("");
  const [detailList, setDetailList] = useState<string[]>([]);
  const [filterList, setfilterList] = useState<any[]>([]);
  const notFilterList = testClubList.filter(
    (item) => item.city == userCity && item.interest == params.interest
  );
  useEffect(() => {
    setDetailList([all, ...interest[0].detail]);
    setfilterList(notFilterList);
  }, []);

  const [x, setX] = useState("전체");

  const handleClickRadioButton = (e: any) => {
    setX(e.target.value);

    if (e.target.value == "전체") {
      setfilterList(notFilterList);
    } else {
      const searchList = notFilterList.filter((item) => {
        return item.interestDetail == e.target.value;
      });

      setfilterList(searchList);
    }
  };
  const [contents, setContents] = useState<any[]>([]);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    const searchContents = notFilterList.filter(
      (content) =>
        content.clubTitle.includes(event.target.value) ||
        content.clubDescription.includes(event.target.value)
    );
    if (searchContents.length !== 0) {
      setContents(searchContents);
    } else {
      setContents([]);
    }
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    setfilterList(contents);
  };

  const onDelete = () => {
    setText("");
    setX("전체");
    setfilterList(notFilterList);
  };

  return (
    <>
      {interest.map((item, idx) => {
        return (
          <div key={idx} className="h-full py-16 px-4 overflow-auto">
            <PageHeader className="mb-2 ml-1 ">
              <div className="flex items-center space-x-4 h-full overflow-hidden">
                <HeaderBackButton />
                <h1 className="text-xl whitespace-nowrap truncate">
                  {item.title}
                </h1>
              </div>
            </PageHeader>
            <div className="sticky -top-14 z-20 w-full">
              <form method="post" onSubmit={onSubmit}>
                <input
                  type="text"
                  onChange={onChange}
                  value={text}
                  placeholder="클럽이나 커뮤니티를 검색하세요"
                  className="bg-gray-200 rounded-md mb-5 w-full h-8 text-[12px] pl-3"
                  inputMode="text"
                  required
                />
              </form>
              <button
                className={
                  text !== "" ? "absolute top-2 right-2 z-10" : "hidden"
                }
              >
                <img
                  src={Images.delete}
                  alt="삭제버튼"
                  className="w-4"
                  onClick={onDelete}
                />
              </button>
            </div>

            <main className="relative">
              <div className="flex flex-wrap mt-3">
                {detailList.map((detail, idx) => {
                  return (
                    <div key={idx} className="pb-3 pr-3 mb-4 ">
                      <input
                        type="radio"
                        id={detail}
                        name="category"
                        className="hidden peer"
                        value={detail}
                        onClick={handleClickRadioButton}
                        checked={x === `${detail}`}
                        readOnly
                      />
                      <label
                        htmlFor={detail}
                        className="border-solid border-gray-300 border p-2 rounded-lg mr-2 text-[12px] peer-checked:border-blue-500 "
                      >
                        {detail}
                      </label>
                    </div>
                  );
                })}
              </div>
              <div
                className="mt-4 border-t pt-4 border-solid border-gray-400"
                key={idx}
              >
                <p className="text-[12px] inline-block float-left font-semibold">
                  <span className="text-blue-500">{userCity}</span>의 클럽
                  리스트
                </p>
                {filterList.map((item, idx) => {
                  return (
                    <Link to={`/clubs/${item.id}`} key={idx} state={item}>
                      <div className="relative mt-6 h-12">
                        <img
                          src={item.clubImage}
                          alt="클럽 이미지"
                          className="w-12 rounded-2xl inline-block border-dashed border-2 border-gray-500"
                        />
                        <div className="text-[12px] absolute top-0 left-16">
                          {item.clubTitle}
                        </div>
                        <div className="text-[10px] absolute top-5 left-16 text-gray-400">
                          {item.clubDescription}
                        </div>
                        <div className="text-[10px] absolute bottom-0 left-16">
                          <span className="border-r-2 border-solid border-gray-200 pr-1 mr-1">
                            {item.region}
                          </span>
                          <span className="text-gray-400 mr-2">
                            멤버 {item.member}
                          </span>
                          <span className="text-gray-400 bg-gray-100 pl-1 pr-1 pt-0.5 pb-0.5 rounded-md">
                            {item.interestTitle}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </main>
          </div>
        );
      })}
    </>
  );
};

export default InterestSearchPage;
