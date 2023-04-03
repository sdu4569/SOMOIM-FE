import PageHeader from "@/components/PageHeader";
import { Link, useParams } from "react-router-dom";
import { FavoriteList } from "@/libs/FavoriteList";
import HeaderBackButton from "@/components/HeaderBackButton";
import { useEffect, useState } from "react";
import { Images } from "@/libs/Images";
import { useForm } from "react-hook-form";
import useUser from "@/hooks/useUser";
import { API_ENDPOINT } from "@/App";
import useAccessToken from "@/hooks/useAccessToken";
import Club from "@/components/Club";

interface searchFormData {
  search: string;
}

export const FavoriteSearchPage = () => {
  const params = useParams();
  const { user } = useUser();
  const token = useAccessToken();
  const favorite = FavoriteList.filter(
    (item) => item.favorite == params.favorite
  );

  const [filterList, setFilterList] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<searchFormData>();

  useEffect(() => {
    if (watch("search") == "") {
      setFilterList([]);
    }
  }, [watch("search")]);

  const onDelete = () => {
    setValue("search", "");
    setFilterList([]);
  };

  const onSubmit = async (searchForm: searchFormData) => {
    if (searchForm.search == "") {
      return;
    }

    const response = await fetch(
      `${API_ENDPOINT}/clubs/search?name=${searchForm.search}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();

    const filterData = data.data.filter(
      (item: any) => item.favorite === params.favorite
    );

    console.log(filterData);
    if (filterData.length === 0) {
      alert("검색 결과가 없습니다.");
    } else {
      setFilterList(filterData);
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
              <form method="post" onSubmit={handleSubmit(onSubmit)}>
                <input
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
            <main className="relative">
              <div className=" border-t pt-4 border-solid border-gray-400 relative">
                <p className="text-[12px] inline-block float-left font-semibold absolute top-4">
                  <span className="text-blue-500">{user?.area}</span>의 클럽
                  리스트
                </p>
                {filterList?.length !== 0 && (
                  //검색을 진행한 경우
                  <ul className="mt-7">
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
              </div>
            </main>
          </div>
        );
      })}
    </>
  );
};
