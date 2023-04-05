import { API_ENDPOINT } from "@/App";
import FloatButton from "@/components/FloatButton";
import Overlay from "@/components/Overlay";
import useAccessToken from "@/hooks/useAccessToken";
import { faCamera, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import HeaderBackButton from "@/components/HeaderBackButton";
import BottomTabNavigator from "@/components/BottomTabNavigator";
import Avatar from "@/components/Avatar";
import formatDate from "@/util/formatDate";
import useUser from "@/hooks/useUser";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Album } from "@/libs/types";

interface AlbumResponse {
  ok: boolean;
  data: Album[];
}

export default function ClubGallery({
  isMember,
  isManager,
}: {
  isMember: boolean;
  isManager: boolean;
}) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [detail, setDetail] = useState<Album | null>();
  const [layoutId, setLayoutId] = useState<string | null>(null);
  const [showNav, setShowNav] = useState<boolean>(false);
  const { clubId } = useParams();
  const [showSkeleton, setShowSkeleton] = useState<boolean>(false);
  const { token, tokenExpiration } = useAccessToken();
  const {
    data: albums,
    isLoading: albumsLoading,
    mutate,
  } = useSWR<AlbumResponse>([`clubs/${clubId}/albums`, token]);
  const { user } = useUser();

  const onCloseUp = (album: any) => {
    setDetail(album);
    setLayoutId(album.id + "");
  };

  const onDismiss = () => {
    setDetail(null);
    setLayoutId(null);
    setShowNav(false);
  };

  useEffect(() => {
    console.log(detail);
  }, [detail]);

  const onDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    if (!confirm("정말 삭제하시겠습니까?")) return;

    // to do : validate token

    fetch(`${API_ENDPOINT}/clubs/albums/${detail?.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    }).then(() => {
      mutate();
      onDismiss();
    });
  };

  useEffect(() => {
    if (showNav && detail) {
      fetch(`${API_ENDPOINT}/albums/${detail?.id}/likes`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          const check = data.data.some((item: any) => {
            return item.userId == user?.id;
          });
          setIsLiked(check);
        });
    }
  }, [showNav, detail]);

  useEffect(() => {
    if (albumsLoading) setShowSkeleton(true);
    else {
      setTimeout(() => {
        setShowSkeleton(false);
      }, 1000);
    }
  }, [albumsLoading]);

  useEffect(() => {
    if (albums && detail) {
      const file = albums.data.filter((album) => album.id === detail.id)[0];
      setDetail(file);
    }
  }, [albums, detail]);

  const onLike = async (albumId: any) => {
    if (isLiked) {
      await fetch(`${API_ENDPOINT}/albums/${albumId}/likes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        credentials: "include",
      });
    } else {
      await fetch(`${API_ENDPOINT}/albums/${albumId}/likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        credentials: "include",
      });
    }

    fetch(`${API_ENDPOINT}/albums/${detail?.id}/likes`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const check = data.data.some((item: any) => {
          return item.userId == user?.id;
        });
        setIsLiked(check);
      });

    await mutate();
  };

  if (showSkeleton) {
    return (
      <ul className="grid grid-cols-2 gap-2 w-full p-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <li key={i} className="bg-gray-300 aspect-video animate-pulse"></li>
        ))}
      </ul>
    );
  }

  if (albums && albums.data.length === 0) {
    return (
      <>
        <div className="flex justify-center items-center h-full p-4">
          <div className="text-gray-400 text-lg">
            제일 먼저 사진을 올려보세요!
          </div>
        </div>
        {isMember && (
          <div className="absolute bottom-8 right-8">
            {isMember && (
              <FloatButton to="upload">
                <FontAwesomeIcon icon={faCamera} />
              </FloatButton>
            )}
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <AnimatePresence>
        {layoutId && (
          <Overlay onClick={onDismiss}>
            <div className="relative w-full h-full flex items-center">
              {showNav && (
                <PageHeader>
                  <div className="flex space-x-4 items-center">
                    <HeaderBackButton onClick={() => setShowNav(false)} />
                    <h2 className="text-xl">사진</h2>
                  </div>
                  {user && user.id === detail?.userId && (
                    <div onClick={onDelete} className="cursor-pointer">
                      <FontAwesomeIcon icon={faTrashCan} size="xl" />
                    </div>
                  )}
                </PageHeader>
              )}
              <motion.div
                layoutId={layoutId}
                className="w-full flex justify-center items-center rounded-lg overflow-hidden"
              >
                <img
                  className="w-full"
                  src={detail?.imageUrl + "/gallery"}
                  onClick={(e) => {
                    e.stopPropagation();

                    setShowNav((prev) => !prev);
                  }}
                />
              </motion.div>
              {showNav && (
                <BottomTabNavigator>
                  <div className="flex w-full justify-between px-4">
                    <div className="flex space-x-2 items-center">
                      <div className="w-12 aspect-square rounded-full flex justify-center items-center">
                        <Avatar size="lg" src={detail?.userImg} />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <p>{detail?.userName}</p>
                        <p className="text-gray-400 text-sm">
                          {detail && formatDate(detail.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2 items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onLike(detail?.id);
                        }}
                        className={` p-2 text-sm border-black flex justify-center space-x-1 items-center ${
                          isLiked ? "text-blue-500" : "text-black"
                        }`}
                      >
                        <FontAwesomeIcon icon={faThumbsUp} className="-" />
                      </button>
                      좋아요 {detail?.likeCnt} 개
                    </div>
                  </div>
                </BottomTabNavigator>
              )}
            </div>
          </Overlay>
        )}
      </AnimatePresence>
      <ul className="grid grid-cols-2 gap-2 w-full p-4">
        {albums &&
          albums.ok &&
          albums.data.map((album: Album) => (
            <motion.li
              key={album.id}
              layoutId={album.id + ""}
              onClick={() => onCloseUp(album)}
              className="aspect-video border hover:border-blue-500"
            >
              <img
                src={album.imageUrl + "/gallery"}
                className={`h-full w-full object-cover`}
              />
            </motion.li>
          ))}
      </ul>
      <div className="absolute bottom-8 right-8">
        {isMember && (
          <FloatButton to="upload">
            <FontAwesomeIcon icon={faCamera} />
          </FloatButton>
        )}
      </div>
    </>
  );
}
