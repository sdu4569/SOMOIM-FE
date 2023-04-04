import useAccessToken from "@/hooks/useAccessToken";
import useMutation from "@/hooks/useMutation";
import { Activity, ActivityMember, User } from "@/libs/types";
import { formatDate, formatTime } from "@/util/formatActivityTime";
import {
  faCalendar,
  faEdit,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import {
  faChevronLeft,
  faLocationDot,
  faPlus,
  faWonSign,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR, { mutate } from "swr";
import Avatar from "./Avatar";
import Spinner from "./Spinner";

interface ActivityMemberResponse {
  ok: boolean;
  data: ActivityMember[];
}

interface ClubActivityProps {
  data: Activity;
  user?: User;
  isManager: boolean;
}

export default function ClubActivity({
  data,
  user,
  isManager,
}: ClubActivityProps) {
  const token = useAccessToken();
  const navigate = useNavigate();
  const [formattedDate, setFormattedDate] = useState<any>();
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const [isIconsOpen, setIsIconsOpen] = useState<boolean>(false);
  const params = useParams();
  const {
    data: joinedMembers,
    isLoading,
    mutate: mutateJoinedMembers,
  } = useSWR<ActivityMemberResponse>([
    `clubs/activities/${data.id}/users`,
    token,
  ]);

  const { mutate: joinActivity, isLoading: joinLoading } = useMutation(
    `clubs/activities/${data.id}/users`,
    {
      authorized: true,
    }
  );

  const { mutate: exitActivity, isLoading: exitLoading } = useMutation(
    `clubs/activities/${data.id}/users`,
    {
      authorized: true,
      method: "DELETE",
    }
  );

  const { mutate: deleteActivity, isLoading: deleteLoading } = useMutation(
    `clubs/activities/${data.id}`,
    {
      authorized: true,
      method: "DELETE",
    }
  );

  const onActivityClick = async (
    e: React.MouseEvent<HTMLHeadingElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (joinLoading || exitLoading) {
      return;
    }

    if (!isJoined) {
      if (confirm(`"${data.title}"에 참여할까요?`)) {
        await joinActivity();
        await mutateJoinedMembers();
      }
    } else {
      if (confirm("이미 참여한 액티비티입니다. 취소하시겠습니까?")) {
        await exitActivity();
        await mutateJoinedMembers();
      }
    }
  };

  const onDeleteClick = async () => {
    if (deleteLoading) {
      return;
    }

    if (confirm("정말 삭제하시겠습니까?")) {
      await deleteActivity();
      await mutate(`clubs/${params.clubId}/activities`);
    }
  };

  useEffect(() => {
    if (joinedMembers && joinedMembers.data && user) {
      console.log(joinedMembers);
      setIsJoined(
        joinedMembers.data.some((member) => member.userId === user.id)
      );
    }
  }, [joinedMembers, user]);

  useEffect(() => {
    if (data && data.activityTime) {
      setFormattedDate(formatDate(new Date(data.activityTime)));
    }
  }, [data]);

  if (!data || isLoading) {
    return <Spinner size="md" />;
  }

  return (
    <li className="flex flex-col space-y-2 py-4">
      <header className="flex justify-between items-center">
        <h4
          onClick={onActivityClick}
          className="text-blue-500 font-bold cursor-pointer"
        >
          {data.title}
        </h4>
        {isManager && (
          <div className="flex items-center">
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsIconsOpen((prev) => !prev);
              }}
              className="flex p-2 justify-center items-center cursor-pointer"
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                className={`${
                  isIconsOpen ? "rotate-180" : "rotate-0"
                } transition-all`}
              />
            </div>
            <div
              className={`flex justify-evenly space-x-2 overflow-hidden origin-right transition-all ${
                isIconsOpen ? "w-12" : "w-0"
              }`}
            >
              <FontAwesomeIcon
                icon={faEdit}
                onClick={() =>
                  navigate(`activities/${data.id}/edit`, {
                    state: { activity: data },
                  })
                }
                className="cursor-pointer"
              />
              <FontAwesomeIcon
                icon={faTrashCan}
                onClick={onDeleteClick}
                className="cursor-pointer"
              />
            </div>
          </div>
        )}
      </header>
      <div className="flex space-x-4">
        <div className="text-sm rounded-lg border border-gray-300 flex flex-col items-center">
          <span className="px-2 pt-2">{formattedDate?.dayOfWeekLabel}</span>
          <span className="text-2xl">{formattedDate?.day}</span>
        </div>
        <div className="flex-1 flex flex-col justify-between text-sm">
          <span className="flex space-x-2 items-center">
            <FontAwesomeIcon icon={faCalendar} className="w-4" />
            <p className="h-full ">
              {formattedDate?.month}월 {formattedDate?.day}일&nbsp;(
              {formattedDate?.dayOfWeekLabel.substring(0, 1)})&nbsp;
              {formatTime(data.activityTime.substring(11, 16))}
            </p>
          </span>
          <span className="flex space-x-2 items-center">
            <FontAwesomeIcon icon={faLocationDot} className="w-4" />
            <p className="h-full ">{data.location}</p>
          </span>
          <span className="flex space-x-2 items-center">
            <FontAwesomeIcon icon={faWonSign} className="w-4" />
            <p className="h-full ">{data.fee}</p>
          </span>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <span className="text-sm text-gray-500">
          참여 멤버 ({joinedMembers?.data?.length}/{data.memberLimit})
        </span>
        <div className="w-full flex justify-center items-center">
          <ul className="w-full grid gap-y-2 grid-cols-7 px-auto">
            {joinedMembers?.data.slice(0, 7).map((member, idx) => (
              <li
                className="w-10 h-10 rounded-full relative group"
                key={member.userId}
              >
                <Avatar src={member.userImage} size="md" />
                <div
                  className={`absolute group-hover:flex hidden p-2 rounded-md text-center min-w-fit bg-black text-white ${
                    idx === 6 && "-left-full"
                  }`}
                >
                  {member.userName}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}
