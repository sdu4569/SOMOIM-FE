import PageHeader from "@/components/PageHeader";
import ClubSearch from "@/components/ClubSearch";
import UpdateInterestButton from "@/components/UpdateInterestButton";
import Recommendation from "@/components/Recommendation";
import { imageMap } from "@/libs/Images";
import { Link } from "react-router-dom";
import BottomTabNavigator from "@/components/BottomTabNavigator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import FloatButton from "@/components/FloatButton";
import useSWR from "swr";

import { UserClub } from "@/libs/types";
import useAccessToken from "@/hooks/useAccessToken";
import { API_ENDPOINT } from "@/App";

interface UserResponse {
  ok: boolean;
  data?: UserClub[];
  code?: number;
  message?: string;
}

const MyActivityPage = () => {
  const token = useAccessToken();

  const { data, isLoading, error, mutate } = useSWR<UserResponse>(
    "users/join-clubs",
    {
      fetcher: (url: string) =>
        fetch(`${API_ENDPOINT}/users/join-clubs`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }).then((res) => res.json()),
    }
  );

  const userClub = data?.data;

  return (
    <div className="h-full py-16 px-4 overflow-scroll">
      <PageHeader>
        <h2 className="text-xl">내 활동</h2>
        <div className="flex space-x-8 items-center">
          <Link to="/search">
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </Link>
        </div>
      </PageHeader>

      <main>
        <h2
          className={`text-[14px] font-semibold mb-5 ${
            userClub?.length !== 0 ? "" : "text-blue-500"
          }`}
          id="userClub"
        >
          {userClub?.length !== 0 ? "가입한 클럽" : "클럽에 가입해 보세요!"}
        </h2>

        {userClub?.map((item, idx) => {
          const interestImg = imageMap.get(item.favorite);
          return (
            <Link to={`/clubs/${item.id}`} key={idx} state={item}>
              <div className="relative mt-4 h-12">
                <img
                  src={item.imageUrl}
                  alt="클럽 이미지"
                  className={`w-12 h-12 rounded-2xl inline-block ${
                    item.imageUrl === ""
                      ? "border-dashed border-2 border-gray-500"
                      : ""
                  } `}
                />
                <div className="text-[12px] absolute top-2 left-16">
                  <img
                    src={interestImg}
                    className="h-3 inline-block mr-1"
                    alt="관심사 이미지"
                  />
                  {item.name}
                </div>
                <div className="text-[10px] absolute bottom-2 left-16">
                  <span className="border-r-2 border-solid border-gray-200 pr-1 mr-1">
                    {item.area}
                  </span>
                  <span className="text-gray-400">멤버 {item.memberCnt} </span>
                </div>
              </div>
            </Link>
          );
        })}
        <h2 className="text-[14px] font-semibold mb-5 mt-5">클럽찾기</h2>
        <ClubSearch />
        <UpdateInterestButton />
        <Recommendation />
        <div className="absolute bottom-20 right-8">
          <FloatButton to={`/clubs/create`}>
            <FontAwesomeIcon icon={faPlus} />
            <p className="text-sm">개설</p>
          </FloatButton>
        </div>
      </main>
      <BottomTabNavigator />
    </div>
  );
};

export default MyActivityPage;
