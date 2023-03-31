import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faEllipsisV,
  faShareNodes,
  faHeart as solidHeart,
} from "@fortawesome/free-solid-svg-icons";
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
import { Member } from "@/libs/types";
import Spinner from "@/components/Spinner";

enum Tabs {
  INFO,
  BOARD,
  PHOTO,
  CHAT,
}

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

  const [isMember, setIsMember] = useState<boolean>(true);

  useEffect(() => {
    if (members && user) {
      setIsMember(
        members.data.some((member: any) => member.userId === user.id)
      );
    }
  }, [members, user]);

  const [selectedTab, setSelectedTab] = useState<number>(Tabs.INFO);

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
          <h1 className="text-xl whitespace-nowrap truncate ">클럽 이름</h1>
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
      <section className="mt-[72px]">
        {
          {
            0: (
              <ClubDetailInfo
                like={like}
                members={members?.data as Member[]}
                isMember={isMember}
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
