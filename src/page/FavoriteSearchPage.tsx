import PageHeader from "@/components/PageHeader";
import { Link, useParams } from "react-router-dom";
import { FavoriteList } from "@/libs/FavoriteList";
import HeaderBackButton from "@/components/HeaderBackButton";
import { useEffect, useRef, useState } from "react";
import { Images } from "@/libs/Images";
import { useForm } from "react-hook-form";
import useUser from "@/hooks/useUser";
import { API_ENDPOINT } from "@/App";
import useAccessToken from "@/hooks/useAccessToken";
import Club from "@/components/Club";
import useMutation from "@/hooks/useMutation";

interface searchFormData {
  search: string;
}

export const FavoriteSearchPage = () => {
  const params = useParams();
  const { user } = useUser();
  const { token, tokenExpiration } = useAccessToken();
  const favorite = FavoriteList.filter(
    (item) => item.favorite == params.favorite
  );
  const [focusOn, setFocusOn] = useState<boolean>(false);
  const [notSearch, setNotSearch] = useState<boolean>(false);
  const [filterList, setFilterList] = useState<any[]>([]);
  const [recentSearchList, setRecentSearchList] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<searchFormData>();

  useEffect(() => {
    if (watch("search") == "") {
      setNotSearch(false);
      setFocusOn(false);
    } else {
      setFocusOn(true);
    }
  }, [watch("search")]);

  const onSubmit = async (searchForm: searchFormData) => {
    if (searchForm.search == "") {
      return;
    }

    const response = await fetch(
      `${API_ENDPOINT}/clubs/search/favorite?name=${searchForm.search}&favorite=${params.favorite}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );
    const result = await response.json();

    if (result.data.length !== 0) {
      setFilterList(result.data);
      setNotSearch(false);
    } else {
      setFilterList([]);
      setNotSearch(true);
    }

    let array = [];
    const getStorage = localStorage.getItem("recentSearch");

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
  };

  useEffect(() => {
    let array = [];
    const getStorage = localStorage.getItem("recentSearch");
    if (getStorage !== null) {
      array = JSON.parse(getStorage);
      setRecentSearchList(array);
    }
  }, []);

  //최근 검색 기록 삭제 기능
  const searchDelete = (e: string) => {
    const updateRecentList = recentSearchList.filter((item) => item !== e);
    setRecentSearchList(updateRecentList);
    localStorage.setItem("recentSearch", JSON.stringify(updateRecentList));
  };

  //검색 페이지 초기화
  const onDelete = () => {
    setValue("search", "");
    setFilterList([]);
  };

  const clickHandler = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
  };

  return (
    <>
      {favorite.map((item) => {
        return (
          <div key={item.id} className="h-full py-16 px-4 overflow-auto">
            <PageHeader className="mb-2 ml-1 ">
              <div className="flex items-center space-x-4 h-full overflow-hidden">
                <HeaderBackButton />
                <h1 className="text-xl whitespace-nowrap truncate">
                  {item.title}
                </h1>
              </div>
            </PageHeader>
            <div className="sticky -top-14 z-20 w-full">
              <form
                method="post"
                ref={formRef}
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  onFocus={() => setFocusOn(true)}
                  type="text"
                  placeholder="클럽이나 커뮤니티를 검색하세요"
                  className="bg-gray-100 rounded-md mb-5 w-full h-8 text-[12px] pl-3 outline-none"
                  inputMode="text"
                  {...register("search", { required: "" })}
                />
              </form>
              <button
                className={
                  watch("search") !== ""
                    ? "absolute top-2 right-2 z-10"
                    : "hidden"
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
            {notSearch && (
              //검색 결과가 없는 경우

              <div className="flex h-full items-center justify-center">
                <p className="text-gray-400 text-lg">검색 결과가 없습니다.</p>
              </div>
            )}
            <main className="relative">
              <div className=" border-t pt-4 border-solid border-gray-400 relative">
                {filterList?.length !== 0 && (
                  //검색 결과가 존재하는 경우

                  <ul className="mt-7">
                    <p className="text-[12px] inline-block float-left font-semibold absolute top-4">
                      <span className="text-blue-500">{user?.area}</span>의 클럽
                      리스트
                    </p>
                    {filterList?.map((item) => {
                      return (
                        <li key={item.id} className="mt-3">
                          <Link to={`/clubs/${item.id}`}>
                            <Club data={item} />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {filterList?.length == 0 && focusOn && !notSearch && (
                  //검색 진행 전 검색창에 입력하는 경우
                  <div className="mb-2.5 text-[12px]">
                    <div className="text-gray-400">최근 검색</div>
                    {recentSearchList.map((item, idx) => {
                      return (
                        <div className="relative mt-4 h-5" key={idx}>
                          <button
                            className="pl-2 w-full text-left h-4"
                            onClick={() => {
                              setValue("search", item);
                              clickHandler();
                            }}
                          >
                            {item}
                          </button>
                          <button
                            className="absolute top-0.5 right-0"
                            value={idx}
                            onClick={() => searchDelete(`${item}`)}
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
                {}
              </div>
            </main>
          </div>
        );
      })}
    </>
  );
};
function setRecentSearchList(array: any) {
  throw new Error("Function not implemented.");
}
