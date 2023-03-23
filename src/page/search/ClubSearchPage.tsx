import PageHeader from "@/components/PageHeader";
import { Link } from "react-router-dom";
import { InterestList } from "@/libs/InterestList";
import HeaderBackButton from "@/components/HeaderBackButton";
import { testClubList } from "@/components/testClubList";
import { useEffect, useRef, useState } from "react";
import { Images } from "@/libs/Images";
import { useForm } from "react-hook-form";

interface searchFormData {
  search: string;
}

const ClubSearchPage = () => {
  const [filterList, setFilterList] = useState<any[]>([]);
  const [recentSearchList, setRecentSearchList] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const userCity = "부산광역시";

  const notFilterList = testClubList.filter((item) => item.city == userCity);

  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<searchFormData>();

  useEffect(() => {
    if (watch("search") == "") {
      setFilterList([]);
    }
  }, [watch("search")]);

  const onSubmit = (searchForm: searchFormData) => {
    if (searchForm.search == "") {
      return;
    }

    let array = [];
    const getStorage = localStorage.getItem("recentSearch");

    const searchContents = notFilterList.filter(
      (content) =>
        content.clubTitle.includes(watch("search")) ||
        content.clubDescription.includes(watch("search"))
    );

    // 제출시 localStorage 갱신
    if (getStorage !== null) {
      array = JSON.parse(getStorage);
      setRecentSearchList(array);
      //중복 검색 여부
      if (array.filter((item: any) => item == watch("search")).length == 0) {
        array.unshift(watch("search"));
        localStorage.setItem("recentSearch", JSON.stringify(array));
      }
    } else {
      array.unshift(watch("search"));
      localStorage.setItem("recentSearch", JSON.stringify(array));
    }

    if (searchContents.length !== 0) {
      setFilterList(searchContents);
    } else {
      alert("검색 결과가 없습니다.");
    }
  };

  const onDelete = () => {
    setValue("search", "");
    setFilterList([]);
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

  const clickHandler = (e: any) => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
  };

  return (
    <div className="h-full pt-20 pb-16 px-4 overflow-auto">
      <PageHeader className="mb-2">
        <div className="flex items-center space-x-4 h-full overflow-hidden  relative">
          <HeaderBackButton />
          <h1 className="text-xl whitespace-nowrap truncate"></h1>
        </div>
        <div className="relative">
          <form method="post" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="클럽이나 커뮤니티를 검색하세요"
              className="bg-gray-200 rounded-md w-80 h-8 text-[12px] pl-3"
              inputMode="text"
              {...register("search", { required: "" })}
            />
          </form>
          <button
            className={
              watch("search") !== "" ? "absolute top-2 right-2 z-10" : "hidden"
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
      </PageHeader>
      <main>
        {filterList.length !== 0 && (
          //검색을 진행한 경우
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
        )}
        {filterList.length == 0 && watch("search") !== "" && (
          //검색 진행 전 검색창에 입력하는 경우
          <div className="mb-2.5 text-[12px]">
            <div className="text-gray-400">최근 검색</div>
            {recentSearchList.map((item, idx) => {
              return (
                <div className="relative mt-4 h-5" key={idx}>
                  <button
                    className="pl-2 w-full text-left h-4"
                    onClick={(e) => {
                      setValue("search", item);
                      clickHandler(e);
                    }}
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
        )}
        {watch("search") == "" && (
          //검색창이 비어 있는 경우
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
        )}
      </main>
    </div>
  );
};

export default ClubSearchPage;
