import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import HeaderBackButton from "../../../components/HeaderBackButton";
import PageHeader from "../../../components/PageHeader";
import { motion } from "framer-motion";
import ClubDetailInfo from "@/page/clubs/[clubId]/tabs/ClubDetailInfo";
import ClubBoard from "./tabs/ClubBoard";
import ClubChat from "./tabs/ClubChat";
import ClubGallery from "@/page/clubs/[clubId]/tabs/ClubGallery";
import { useLocation, useParams } from "react-router-dom";
import useSWR from "swr";
import useAccessToken from "@/hooks/useAccessToken";
import useUser from "@/hooks/useUser";
import { Member, Tabs } from "@/libs/types";
import Spinner from "@/components/Spinner";

const tabs = ["정보", "게시판", "사진첩", "채팅"];

export default function ClubDetail() {
  const [like, setLike] = useState<boolean>(false);
  const token = useAccessToken();
  const params = useParams();
  const { user } = useUser();
  const {
    data: members,
    mutate: membersBoundMutate,
    isLoading: membersLoading,
  } = useSWR([`clubs/${params.clubId}/members`, token]);
  const { data: club, isLoading: clubLoading } = useSWR([
    `clubs/${params.clubId}`,
    token,
  ]);
  const location = useLocation();
  const prevTab = location.state?.prevTab;
  const [selectedTab, setSelectedTab] = useState<number>(prevTab || Tabs.INFO);

  //최근 본 클럽 기능 시작
  useEffect(() => {
    if (club) {
      let array = [];
      const getData = localStorage.getItem("recentClub");
      if (getData !== null) {
        array = JSON.parse(getData);
        //최근 본 클럽에 이미 클럽이 들어가 있는지 체크
        if (!array.some((item: any) => item.id == params.clubId)) {
          array.unshift({
            id: club.data.id,
            imageUrl: club.data.imageUrl,
            name: club.data.name,
            description: club.data.description,
            area: club.data.area,
            favorite: club.data.favorite,
            member: club.data.memberCnt,
          });
          localStorage.setItem("recentClub", JSON.stringify(array));
        }
      } else {
        array.unshift({
          id: club.data.id,
          imageUrl: club.data.imageUrl,
          name: club.data.name,
          description: club.data.description,
          area: club.data.area,
          favorite: club.data.favorite,
          member: club.data.memberCnt,
        });
        localStorage.setItem("recentClub", JSON.stringify(array));
      }
    }
  }, [club]);
  //최근 본 클럽 끝

  const [isMember, setIsMember] = useState<boolean>(true);
  const [isManager, setIsManager] = useState<boolean>(false);

  useEffect(() => {
    if (members && user) {
      setIsMember(
        members.data.some((member: any) => member.userId === user.id)
      );
    }
  }, [members, user]);

  useEffect(() => {
    if (club && user) {
      setIsManager(club.data.managerId === user.id);
    }
  }, [club, user]);

  if (clubLoading || membersLoading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );

  return (
    <div className="h-full overflow-scroll">
      <PageHeader>
        <div className="flex items-center space-x-4 h-full overflow-hidden">
          <HeaderBackButton />
          <h1 className="text-xl whitespace-nowrap truncate ">
            {club.data.name}
          </h1>
        </div>
        <div className="flex space-x-6 items-center ml-2">
          <FontAwesomeIcon
            icon={like ? solidHeart : regularHeart}
            size="xl"
            // onClick={handleClick}
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
      <section className="pt-[72px] h-full box-border">
        {
          {
            0: (
              <ClubDetailInfo
                like={like}
                members={members?.data as Member[]}
                isMember={isMember}
                isManager={isManager}
                membersBoundMutate={membersBoundMutate}
                club={club?.data}
                // handleClick={handleClick}
              />
            ),
            1: <ClubBoard isMember={isMember} />,
            2: <ClubGallery isMember={isMember} />,
            3: <ClubChat />,
          }[selectedTab]
        }
      </section>
    </div>
  );
}
