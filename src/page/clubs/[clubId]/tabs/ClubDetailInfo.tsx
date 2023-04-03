import {
  faCalendar,
  faHeart as regularHeart,
} from "@fortawesome/free-regular-svg-icons";
import {
  faLocationDot,
  faWonSign,
  faHeart as solidHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import BottomTabNavigator from "@/components/BottomTabNavigator";
import JoinClub from "@/components/JoinClub";
import Overlay from "@/components/Overlay";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Member, Tabs } from "@/libs/types";
import Avatar from "@/components/Avatar";
import { imageMap } from "@/libs/Images";

interface ClubDetailInfoProps {
  like: boolean;
  handleClick?: any;
  members: Member[];
  club: any;
  isMember: boolean;
  isManager: boolean;
  membersBoundMutate: any;
}

export default function ClubDetailInfo({
  like,
  handleClick,
  members,
  isMember = true,
  isManager = false,
  club,
  membersBoundMutate,
}: ClubDetailInfoProps) {
  const [inJoinModal, setInJoinModal] = useState<boolean>(false);
  const params = useParams();
  const navigate = useNavigate();

  const onBannerClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();

    if (isManager) {
      navigate(`/clubs/${params.clubId}/edit`, {
        state: { club },
      });
    }
  };

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
              src={club.imageUrl}
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
              <div
                className={`text-[14px] inline-block underline text-gray-400`}
              >
                수정
              </div>
            </Link>
          )}
        </div>
        <section className="flex flex-col space-y-4">
          <header>
            <h4 className="text-lg">클럽 소개</h4>
          </header>
          <article className="h-[500px] overflow-scroll">
            <textarea
              className="leading-5 h-full w-full resize-none bg-white"
              disabled
              value={club.description}
            ></textarea>
          </article>
        </section>
        <section>
          <header>
            <h4 className="text-lg">클럽액티비티(C.A)</h4>
          </header>
          <ul className="divide-y-2">
            <li className="flex flex-col space-y-2 py-4">
              <h4 className="text-blue-500 font-bold">클럽액티비티 이름</h4>
              <div className="flex space-x-4">
                <div className="text-sm rounded-lg border border-gray-300 flex flex-col items-center">
                  <span className="px-2 pt-2">수요일</span>
                  <span className="text-2xl">8</span>
                </div>
                <div className="flex-1 flex flex-col justify-between text-sm">
                  <span className="flex space-x-2 items-center">
                    <FontAwesomeIcon icon={faCalendar} className="w-4" />
                    <p className="h-full ">3월 6일 (월) 오후 8:00</p>
                  </span>
                  <span className="flex space-x-2 items-center">
                    <FontAwesomeIcon icon={faLocationDot} className="w-4" />
                    <p className="h-full ">온라인(줌링크 문의주세요!)</p>
                  </span>
                  <span className="flex space-x-2 items-center">
                    <FontAwesomeIcon icon={faWonSign} className="w-4" />
                    <p className="h-full ">0원</p>
                  </span>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <span className="text-sm text-gray-500">참여 멤버 (5/20)</span>
                <div className="w-full flex justify-center items-center">
                  <ul className="w-full grid gap-y-2 grid-cols-7 px-auto">
                    <li className="w-10 h-10 bg-red-500 rounded-full"></li>
                    <li className="w-10 h-10 bg-red-500 rounded-full"></li>
                    <li className="w-10 h-10 bg-red-500 rounded-full"></li>
                    <li className="w-10 h-10 bg-red-500 rounded-full"></li>
                    <li className="w-10 h-10 bg-red-500 rounded-full"></li>
                  </ul>
                </div>
              </div>
            </li>
            <li className="flex flex-col space-y-2 py-4">
              <h4 className="text-blue-500 font-bold">클럽액티비티 이름</h4>
              <div className="flex space-x-4">
                <div className="text-sm rounded-lg border border-gray-300 flex flex-col items-center">
                  <span className="px-2 pt-2">수요일</span>
                  <span className="text-2xl">8</span>
                </div>
                <div className="flex-1 flex flex-col justify-between text-sm">
                  <span className="flex space-x-2 items-center">
                    <FontAwesomeIcon icon={faCalendar} className="w-4" />
                    <p className="h-full ">3월 6일 (월) 오후 8:00</p>
                  </span>
                  <span className="flex space-x-2 items-center">
                    <FontAwesomeIcon icon={faLocationDot} className="w-4" />
                    <p className="h-full ">온라인(줌링크 문의주세요!)</p>
                  </span>
                  <span className="flex space-x-2 items-center">
                    <FontAwesomeIcon icon={faWonSign} className="w-4" />
                    <p className="h-full ">0원</p>
                  </span>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <span className="text-sm text-gray-500">참여 멤버 (5/20)</span>
                <div className="w-full flex justify-center items-center">
                  <ul className="w-full grid gap-y-2 grid-cols-7 px-auto">
                    <li className="w-10 h-10 bg-red-500 rounded-full"></li>
                    <li className="w-10 h-10 bg-red-500 rounded-full"></li>
                    <li className="w-10 h-10 bg-red-500 rounded-full"></li>
                    <li className="w-10 h-10 bg-red-500 rounded-full"></li>
                    <li className="w-10 h-10 bg-red-500 rounded-full"></li>
                  </ul>
                </div>
              </div>
            </li>
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
            <div
              onClick={() => setInJoinModal(true)}
              className="flex-1 flex justify-center items-center h-full border rounded-lg bg-blue-500 text-white"
            >
              <p>가입하기</p>
            </div>
          </BottomTabNavigator>
        )}
      </div>
    </>
  );
}
