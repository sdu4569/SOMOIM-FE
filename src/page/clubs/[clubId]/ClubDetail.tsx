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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import useAccessToken from "@/hooks/useAccessToken";
import useUser from "@/hooks/useUser";
import { Club, Member, Tabs } from "@/libs/types";
import Spinner from "@/components/Spinner";
import FetchFail from "@/components/FetchFail";
import useMutation from "@/hooks/useMutation";

const tabs = ["정보", "게시판", "사진첩", "채팅"];

export default function ClubDetail() {
  const navigate = useNavigate();
  const [like, setLike] = useState<boolean>(false);
  const { token, tokenExpiration } = useAccessToken();
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

  const {
    data: likeClub,
    isLoading,
    error,
    mutate: likeClubMutate,
  } = useSWR(["users/like-clubs", token]);

  const { mutate: addLike } = useMutation(`clubs/${params.clubId}/likes`, {
    authorized: true,
  });
  const { mutate: delLike } = useMutation(`clubs/${params.clubId}/likes`, {
    authorized: true,
    method: "DELETE",
  });

  //최근 본 클럽 기능 시작
  useEffect(() => {
    if (club && club.ok && club.data) {
      let array = [];
      const getData = localStorage.getItem("recentClub");
      const clubInfo = {
        id: club.data.id,
        imageUrl: club.data.imageUrl,
        name: club.data.name,
        description: club.data.description,
        area: club.data.area,
        favorite: club.data.favorite,
        memberCnt: club.data.memberCnt,
      };

      if (getData !== null) {
        array = JSON.parse(getData);
        //최근 본 클럽에 이미 클럽이 들어가 있는지 체크
        if (!array.some((item: any) => item?.id == params.clubId)) {
          array.unshift(clubInfo);
          localStorage.setItem("recentClub", JSON.stringify(array));
        }
      } else {
        array.unshift(clubInfo);
        localStorage.setItem("recentClub", JSON.stringify(array));
      }
    }
  }, [club]);

  const [isMember, setIsMember] = useState<boolean>(true);
  const [isManager, setIsManager] = useState<boolean>(false);

  useEffect(() => {
    if (members && members.data && user) {
      setIsMember(
        members.data.some((member: any) => member.userId === user?.id)
      );
    }
  }, [members, user]);

  useEffect(() => {
    if (club && club.data && user) {
      setIsManager(club.data.managerId === user?.id);
    }
  }, [club, user]);

  useEffect(() => {
    console.log(club, members);
  }, [club, members]);

  useEffect(() => {
    const check = likeClub?.data?.some(
      (item: any) => item?.id == params.clubId
    );
    likeClub && setLike(check);
  }, [likeClub]);

  //클럽 찜하기 기능
  const handleClick = async () => {
    if (!like) {
      await addLike({ clubId: params.clubId });
    } else {
      await delLike({ clubId: params.clubId });
    }
    await likeClubMutate();
  };

  if (clubLoading || membersLoading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );

  if (!club?.ok || !members?.ok) {
    return <FetchFail />;
  }

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
      <section className="pt-[72px] h-full box-border">
        {
          {
            0: (
              <ClubDetailInfo
                like={like}
                members={members.data as Member[]}
                isMember={isMember}
                isManager={isManager}
                membersBoundMutate={membersBoundMutate}
                club={club.data as Club}
                handleClick={handleClick}
                user={user}
              />
            ),
            1: <ClubBoard isMember={isMember} isManager={isManager} />,
            2: <ClubGallery isMember={isMember} isManager={isManager} />,
            3: <ClubChat />,
          }[selectedTab]
        }
      </section>
    </div>
  );
}
