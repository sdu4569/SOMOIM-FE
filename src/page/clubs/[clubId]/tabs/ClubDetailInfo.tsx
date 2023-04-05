import {
  faCalendar,
  faHeart as regularHeart,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import {
  faLocationDot,
  faWonSign,
  faHeart as solidHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import BottomTabNavigator from "@/components/BottomTabNavigator";
import JoinClub from "@/components/JoinClub";
import Overlay from "@/components/Overlay";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Activity, Club, Member, Tabs, User } from "@/libs/types";
import Avatar from "@/components/Avatar";
import { imageMap } from "@/libs/Images";
import useAutoResizeTextArea from "@/hooks/useAutoResizeTextArea";
import formatImageUrl from "@/util/formatImageUrl";
import useSWR from "swr";
import useAccessToken from "@/hooks/useAccessToken";
import ClubActivity from "@/components/ClubActivity";
import useUser from "@/hooks/useUser";

interface ClubDetailInfoProps {
  like: boolean;
  handleClick?: any;
  members: Member[];
  club: Club;
  isMember: boolean;
  isManager: boolean;
  membersBoundMutate: any;
  user?: User;
}

export default function ClubDetailInfo({
  like,
  handleClick,
  members,
  isMember = false,
  isManager = false,
  club,
  membersBoundMutate,
  user,
}: ClubDetailInfoProps) {
  const [inJoinModal, setInJoinModal] = useState<boolean>(false);
  const params = useParams();
  const navigate = useNavigate();
  const autoResize = useAutoResizeTextArea();
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const { token, tokenExpiration } = useAccessToken();

  const { data: clubActivities, isLoading } = useSWR([
    `clubs/${club.id}/activities`,
    token,
  ]);

  const onBannerClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();

    if (isManager) {
      navigate(`/clubs/${params.clubId}/edit`, {
        state: { club },
      });
    }
  };

  useEffect(() => {
    autoResize(descriptionRef);
  }, [descriptionRef, club]);

  useEffect(() => {
    console.log(clubActivities);
  }, [clubActivities]);

  return (
    <>
      {inJoinModal && params.clubId && (
        <Overlay onClick={() => setInJoinModal(false)}>
          <JoinClub
            membersBoundMutate={membersBoundMutate}
            closeModal={() => setInJoinModal(false)}
            clubId={params.clubId}
          />
        </Overlay>
      )}
      <div className={`flex flex-col space-y-4 ${!isMember && "pb-16"} p-4`}>
        <div
          onClick={onBannerClick}
          className={`aspect-twenty-nine w-full bg-gray-300 flex justify-center items-center ${
            isManager && "cursor-pointer"
          }`}
        >
          {club?.imageUrl ? (
            <img
              src={formatImageUrl(club.imageUrl, "public")}
              alt="클럽 배너"
              className="w-full aspect-twenty-nine object-fit"
            />
          ) : (
            "클럽 배너를 등록해보세요!"
          )}
        </div>
        <div className="flex space-x-4">
          <div className="w-10 h-10 flex rounded-full bg-gray-200 overflow-hidden justify-center items-center">
            <img
              src={imageMap.get(club.favorite)}
              alt="클럽 관심사 이미지"
              className="w-3/5 h-3/5"
            />
          </div>
          <div className="flex-1 flex flex-col space-y-2">
            <h3>{club.name}</h3>
            <div className="flex space-x-1">
              <span className="text-xs">{club.area}</span>
              <span className="">&middot;</span>
              <span className="text-xs">멤버 {club.memberCnt}</span>
            </div>
          </div>
          {isManager && (
            <Link to={"edit"} state={{ club }}>
              <p className={`text-[14px] inline-block underline text-gray-400`}>
                수정
              </p>
            </Link>
          )}
        </div>
        <section className="flex flex-col space-y-4">
          <header>
            <h4 className="text-lg">클럽 소개</h4>
          </header>
          <article className="max-h-[500px] overflow-scroll">
            <textarea
              ref={descriptionRef}
              className="leading-5 h-full w-full resize-none bg-white"
              disabled
              value={club.description}
            ></textarea>
          </article>
        </section>
        <section>
          <header className="flex justify-between items-center">
            <h4 className="text-lg">클럽액티비티(C.A)</h4>
            {isManager && (
              <Link to={"createActivity"}>
                <p className="text-[14px] underline text-gray-400">
                  새 액티비티
                </p>
              </Link>
            )}
          </header>
          <ul className="divide-y-2">
            {clubActivities?.data?.map((activity: Activity) => (
              <ClubActivity
                user={user}
                key={activity.id}
                data={activity}
                isManager={isManager}
              />
            ))}
          </ul>
        </section>
        <section>
          <header>
            <p className="text-lg">클럽 멤버 ({members?.length}명)</p>
          </header>
          <ul className="flex flex-col my-4 space-y-4">
            {members?.map((member: Member) => (
              <li key={member.userId} className="flex space-x-4">
                {/* <div className="w-10 h-10 rounded-full bg-green-500"></div> */}
                <Avatar size="md" src={member.profileUrl} />
                <div className="flex-1 flex flex-col justify-center text-sm">
                  <p>{member.name}</p>
                  <p className="text-gray-400">{member.introduction}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
        {!isMember && (
          <BottomTabNavigator className="space-x-4 px-4 py-2">
            <div className="" onClick={handleClick}>
              <FontAwesomeIcon
                icon={like ? solidHeart : regularHeart}
                size="2xl"
                className="text-red-500"
              />
            </div>
            {club.memberLimit > club.memberCnt ? (
              <div
                onClick={() => setInJoinModal(true)}
                className="flex-1 flex justify-center items-center h-full border rounded-lg bg-blue-500 text-white"
              >
                <p>가입하기</p>
              </div>
            ) : (
              <div className="flex-1 flex justify-center items-center h-full border rounded-lg bg-gray-400 text-white">
                <p>클럽 정원이 가득 찼습니다.</p>
              </div>
            )}
          </BottomTabNavigator>
        )}
      </div>
    </>
  );
}
