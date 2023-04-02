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
import { Club } from "@/libs/types";
import useAccessToken from "@/hooks/useAccessToken";
import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "@/App";
import ClubsListWithFavorite from "@/components/ClubsListWithFavorite";
import getInterestWithKey from "@/util/getInterestWithKey";

interface UserResponse {
  ok: boolean;
  data?: Club[];
  code?: number;
  message?: string;
}

interface FavoriteClubsList {
  favorite: string;
  favoriteClubs: Club[];
}

const MyActivityPage = () => {
  const token = useAccessToken();

  const { data, isLoading, error, mutate } = useSWR<UserResponse>([
    "users/join-clubs",
    token,
  ]);

  const userClub = data?.data;

  const { user } = useUser();

  return (
    <div className="h-full pt-16 pb-20 px-4 overflow-scroll">
      <PageHeader>
        <h2 className="text-xl">내 활동</h2>
        <div className="flex space-x-8 items-center">
          <Link to="/search">
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </Link>
        </div>
      </PageHeader>

      <main className="flex flex-col space-y-8">
        <h2
          className={`text-[14px] font-semibold ${
            userClub?.length !== 0 ? "" : "text-blue-500"
          }`}
          id="userClub"
        >
          {userClub?.length !== 0 ? "가입한 클럽" : "클럽에 가입해 보세요!"}
        </h2>

        {userClub?.map((item) => {
          const interestImg = imageMap.get(item.favorite);
          return (
            <Link to={`/clubs/${item.id}`} key={item.id} state={item}>
              <div className="flex space-x-4 mb-4">
                <div className="rounded-2xl w-[48px] aspect-square relative bg-blue-500">
                  {item.imageUrl && (
                    <div className="w-full h-full overflow-hidden rounded-2xl">
                      <img
                        src={item.imageUrl}
                        alt="클럽 대표 사진"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-evenly">
                  <div>
                    <img
                      src={interestImg}
                      className="w-[16px] h-[16px] inline-block mr-1"
                      alt="관심사 이미지"
                    />
                    <span className="">{item.name}</span>
                  </div>
                  <div className="flex space-x-2 text-xs">
                    <div className="flex divide-x-2 divide-gray-300 items-center">
                      <span className="pr-1">{item.area}</span>
                      <span className="pl-1 text-gray-500">
                        멤버 {item.memberCnt}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
        <h2 className="text-[14px] font-semibold">클럽찾기</h2>
        <ClubSearch />
        <UpdateInterestButton />
        <section className="flex flex-col space-y-8">
          {user?.favorites.map((favorite) => (
            <div key={favorite} className="flex flex-col space-y-4">
              <h2 className="text-[14px] font-semibold">
                {getInterestWithKey(favorite)} 추천 클럽
              </h2>
              <ClubsListWithFavorite favorite={favorite} />
            </div>
          ))}
        </section>
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
