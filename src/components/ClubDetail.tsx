import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faEllipsisV,
  faShareNodes,
  faHeart as solidHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import HeaderBackButton from "./HeaderBackButton";
import PageHeader from "./PageHeader";
import { motion } from "framer-motion";
import ClubDetailInfo from "../page/ClubDetailInfo";
import ClubBoard from "./ClubBoard";
import ClubChat from "./ClubChat";
import ClubGallery from "../page/ClubGallery";
import { useLocation } from "react-router-dom";
import { stringify } from "querystring";

enum Tabs {
  INFO,
  BOARD,
  PHOTO,
  CHAT,
}

const tabs = ["정보", "게시판", "사진첩", "채팅"];

export default function ClubDetail() {
  const [like, setLike] = useState<boolean>(false);
  const location = useLocation();
  const getRecentClub = localStorage.getItem("recentClub");
  const getFavoriteClub = localStorage.getItem("favoriteClub");
  let recentArr: any[] = [];
  let favoriteArr: any[] = [];

  useEffect(() => {
    if (getRecentClub !== null) {
      recentArr = JSON.parse(getRecentClub);
      //중복 클럽 여부
      if (
        recentArr.filter((item: any) => item.id == location.state.id).length !==
        0
      ) {
        return;
      } else {
        recentArr.unshift(location.state);
        localStorage.setItem("recentClub", JSON.stringify(recentArr));
      }
    } else {
      recentArr.unshift(location.state);
      localStorage.setItem("recentClub", JSON.stringify(recentArr));
    }
  }, [getRecentClub]);

  useEffect(() => {
    if (getFavoriteClub !== null) {
      favoriteArr = JSON.parse(getFavoriteClub);
      const practiceArr = favoriteArr.filter(
        (item: any) => item.id == location.state.id
      );
      //클럽이 찜한 클럽에 있다면 하트 채우기
      if (practiceArr.length !== 0) {
        setLike(true);
      } else {
        setLike(false);
      }
    }
  }, [getFavoriteClub]);

  const handleClick = () => {
    setLike((prev) => !prev);
    if (getFavoriteClub !== null) {
      favoriteArr = JSON.parse(getFavoriteClub);
      //중복 클럽 여부 있으면 삭제 없으면 추가
      if (
        favoriteArr.filter((item: any) => item.id == location.state.id)
          .length !== 0
      ) {
        const updateList = favoriteArr.filter(
          (item: any) => item.id !== location.state.id
        );
        localStorage.setItem("favoriteClub", JSON.stringify(updateList));
      } else {
        favoriteArr.unshift(location.state);
        localStorage.setItem("favoriteClub", JSON.stringify(favoriteArr));
      }
    } else {
      favoriteArr.unshift(location.state);
      localStorage.setItem("favoriteClub", JSON.stringify(favoriteArr));
    }
  };

  const [selectedTab, setSelectedTab] = useState<number>(Tabs.INFO);
  return (
    <div className="h-full overflow-scroll">
      <PageHeader>
        <div className="flex items-center space-x-4 h-full overflow-hidden">
          <HeaderBackButton />
          <h1 className="text-xl whitespace-nowrap truncate ">클럽 이름</h1>
        </div>
        <div className="flex space-x-6 items-center ml-2">
          <FontAwesomeIcon
            icon={like ? solidHeart : regularHeart}
            size="xl"
            onClick={handleClick}
          />
        </div>
      </PageHeader>
      <nav className="w-full flex items-center absolute h-8 top-14 left-0 right-0 px-4 bg-white z-[100]">
        <ul className="flex space-x-4 w-full">
          {tabs.map((tab, i) => (
            <li
              key={tab}
              onClick={() => setSelectedTab(i)}
              className="flex-1 p-2 h-full relative cursor-pointer text-center"
            >
              {tab}
              {tabs[selectedTab] === tab && (
                <motion.div
                  className=" h-[2px] absolute left-0 right-0 bottom-0 bg-black"
                  layoutId="club_detail_underline"
                />
              )}
            </li>
          ))}
        </ul>
      </nav>
      <section className="mt-[72px]">
        {
          {
            0: <ClubDetailInfo like={like} handleClick={handleClick} />,
            1: <ClubBoard />,
            2: <ClubGallery />,
            3: <ClubChat />,
          }[selectedTab]
        }
      </section>
    </div>
  );
}
