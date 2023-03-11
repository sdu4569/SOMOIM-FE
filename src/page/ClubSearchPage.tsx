import PageHeader from "../components/PageHeader";

import { Link } from "react-router-dom";
import { InterestList } from "../components/InterestList";
import HeaderBackButton from "../components/HeaderBackButton";
import { testClubList } from "../components/testClubList";
import { useEffect, useState } from "react";
import { Images } from "../components/Images";

const ClubSearchPage = () => {
  const [text, setText] = useState("");
  const [contents, setContents] = useState<any[]>([]);
  const [filterList, setfilterList] = useState<any[]>([]);
  const [recentSearchList, setRecentSearchList] = useState<string[]>([]);

  const userCity = "부산광역시";

  const notFilterList = testClubList.filter((item) => item.city == userCity);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  useEffect(() => {
    const searchContents = notFilterList.filter(
      (content) =>
        content.clubTitle.includes(text) ||
        content.clubDescription.includes(text)
    );
    if (searchContents.length !== 0) {
      setContents(searchContents);
    } else {
      setContents([]);
      setfilterList([]);
    }
  }, [text]);

  const onSubmit = (event: any) => {
    event.preventDefault();
    console.log(text);
    let array = [];
    const getStorage = localStorage.getItem("recentSearch");
    console.log(getStorage);
    // 제출시 localStorage 갱신
    if (getStorage !== null) {
      array = JSON.parse(getStorage);
      setRecentSearchList(array);
      //중복 검색 여부
      if (array.filter((item: any) => item == text).length == 0) {
        array.unshift(text);
        localStorage.setItem("recentSearch", JSON.stringify(array));
      }
    } else {
      array.unshift(text);
      localStorage.setItem("recentSearch", JSON.stringify(array));
    }

    if (contents.length !== 0) {
      setfilterList(contents);
    } else {
      alert("검색 결과가 없습니다.");
    }
  };

  const onDelete = () => {
    setText("");
    setContents([]);
    setfilterList([]);
  };

  useEffect(() => {
    let array = [];
    const getStorage = localStorage.getItem("recentSearch");
    if (getStorage !== null) {
      array = JSON.parse(getStorage);
      setRecentSearchList(array);
    }
  }, []);

  const handleClick = (e: string) => {
    const updateRecentList = recentSearchList.filter((item) => item !== e);
    setRecentSearchList(updateRecentList);
    localStorage.setItem("recentSearch", JSON.stringify(updateRecentList));
  };

  if (filterList.length !== 0) {
    return (
      <div className="h-full pt-14 pb-16 overflow-auto">
        <PageHeader className="mb-2">
          <div className="flex items-center space-x-4 h-full overflow-hidden  relative">
            <HeaderBackButton />
            <h1 className="text-xl whitespace-nowrap truncate"></h1>
          </div>
          <div className="relative">
            <form method="post" onSubmit={onSubmit}>
              <input
                type="text"
                value={text}
                onChange={onChange}
                placeholder="클럽이나 커뮤니티를 검색하세요"
                className="bg-gray-200 rounded-md w-80 h-8 text-[12px] pl-3"
                inputMode="text"
                required
              />
            </form>
            <button
              className={text !== "" ? "absolute top-2 right-2 z-10" : "hidden"}
            >
              <img
                src={Images.delete}
                alt="삭제버튼"
                className="w-4"
                onClick={onDelete}
              />
            </button>
          </div>
        </PageHeader>
        <main>
          <div className=" border-t pt-4 border-solid border-gray-400 relative">
            <p className="text-[12px] inline-block float-left font-semibold absolute top-4">
              <span className="text-blue-500">{userCity}</span>의 클럽 리스트
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
  } else if (filterList.length == 0 && text !== "") {
    return (
      <div className="h-full pt-14 pb-16 overflow-auto">
        <PageHeader className="mb-2">
          <div className="flex items-center space-x-4 h-full overflow-hidden">
            <HeaderBackButton />
            <h1 className="text-xl whitespace-nowrap truncate"></h1>
          </div>
          <div className="relative">
            <form method="post" onSubmit={onSubmit}>
              <input
                type="text"
                value={text}
                onChange={onChange}
                placeholder="클럽이나 커뮤니티를 검색하세요"
                className="bg-gray-200 rounded-md w-80 h-8 text-[12px] pl-3"
                inputMode="text"
                required
              />
            </form>
            <button className="absolute top-2 right-2 z-10">
              <img
                src={Images.delete}
                alt="삭제버튼"
                className="w-4"
                onClick={onDelete}
              />
            </button>
          </div>
        </PageHeader>
        <main>
          <div className="mb-2.5 text-[12px]">
            <div className="text-gray-400">최근 검색</div>
            {recentSearchList.map((item, idx) => {
              return (
                <div className="relative mt-4 h-5" key={idx}>
                  <button
                    className="pl-2 w-full text-left h-4"
                    onClick={() => setText(item)}
                  >
                    {item}
                  </button>
                  <button
                    className="absolute top-0.5 right-0"
                    value={idx}
                    onClick={() => handleClick(`${item}`)}
                  >
                    <img
                      src={Images.delete}
                      alt="삭제버튼"
                      className="w-3 inline-block "
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="h-full pt-14 pb-16 overflow-auto">
      <PageHeader className="mb-2">
        <div className="flex items-center space-x-4 h-full overflow-hidden">
          <HeaderBackButton />
          <h1 className="text-xl whitespace-nowrap truncate"></h1>
        </div>
        <div className="relative">
          <form method="post" onSubmit={onSubmit}>
            <input
              type="text"
              value={text}
              onChange={onChange}
              placeholder="클럽이나 커뮤니티를 검색하세요"
              className="bg-gray-200 rounded-md w-80 h-8 text-[12px] pl-3"
              inputMode="text"
              required
            />
          </form>
          <button
            className={text !== "" ? "absolute top-2 right-2 z-10" : "hidden"}
          >
            <img
              src={Images.delete}
              alt="삭제버튼"
              className="w-4"
              onClick={onDelete}
            />
          </button>
        </div>
      </PageHeader>
      <main>
        <div className="mb-2.5">
          <div className="flex justify-evenly flex-wrap">
            {InterestList.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className=" w-40 mb-2.5 border rounded-lg h-9 relative"
                >
                  <Link to={`/search/${item.interest}`} className="m-0">
                    <img
                      src={item.image}
                      alt="관심사 이미지"
                      className="w-3 inline-block absolute top-3 left-11"
                    />
                    <span className="text-[10px] w-20 h-3 absolute top-3 left-16">
                      {item.title}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClubSearchPage;
