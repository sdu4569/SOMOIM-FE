import { faComment, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import HeaderBackButton from "@/components/HeaderBackButton";
import PageHeader from "@/components/PageHeader";
import BottomTabNavigator from "@/components/BottomTabNavigator";
import Button from "@/components/Button";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import UpdateComment from "@/components/UpdateComment";
import useUser from "@/hooks/useUser";
import useAutoResizeTextArea from "@/hooks/useAutoResizeTextArea";
import useMutation from "@/hooks/useMutation";
import useSWR from "swr";
import useAccessToken from "@/hooks/useAccessToken";
import { API_ENDPOINT } from "@/App";
import Textarea from "@/components/Textarea";
import getPostCategoryWithKey from "@/util/getPostCategoryWithKey";
import { ModalType } from "@/libs/types";
import Delete from "@/components/Delete";
import PostMenuButton from "@/components/PostMenuButton";
import CommentMenuButton from "@/components/CommentMenuButton";
import { getDate } from "@/util/getDate";

interface commentFormData {
  comment: string;
}

let postLikeArr: any[] = [];

export default function ClubPost() {
  const params = useParams();
  const navigate = useNavigate();
  const token = useAccessToken();
  const { user: userData } = useUser();
  const formRef = useRef<HTMLFormElement>(null);
  const [like, setLike] = useState<boolean>(false);
  const [inModal, setInModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>();
  const [selectedComment, setSelectedComment] = useState<any>(null);
  const {
    state: { post },
  } = useLocation();
  useEffect(() => {});
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const _ = useAutoResizeTextArea(textareaRef);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setFocus,
    setValue,
  } = useForm<commentFormData>();

  const { mutate: comment, isLoading: commentLoading } = useMutation(
    `boards/${params.postId}/comments`,
    {
      authorized: true,
    }
  );

  const { data: commentData, mutate: refreshCommentData } = useSWR([
    `boards/${params.postId}/comments`,
    token,
  ]);

  useEffect(() => {
    if (!post) {
      alert("잘못된 접근입니다.");
      return navigate(-1);
    }
  }, [post]);

  //모달 닫기 기능
  const closeModal = () => {
    setInModal(false);
  };

  const clickHandler = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
    if (inModal) {
      setInModal(!inModal);
    }
  };

  //댓글 전송 기능
  const onSubmit = async (commentForm: commentFormData) => {
    if (commentForm.comment.length == 0) {
      return;
    }

    if (commentLoading) {
      return;
    }

    if (commentLoading) {
      return;
    }

    let item;
    if (userData) {
      item = {
        userId: userData.id,
        boardId: Number(params.postId),
        comment: commentForm.comment,
        userName: userData.name,
        profileImg: userData.profileUrl,
      };
    }

    const response = await comment(item);

    if (response.ok) {
      refreshCommentData();
    }
    setValue("comment", "");
  };

  //글 삭제
  const postDelete = async () => {
    const response = await fetch(`${API_ENDPOINT}/boards/${post.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    navigate(-1);
  };

  //댓글 삭제
  const commentDelete = async () => {
    if (!selectedComment) return;

    const response = await fetch(
      `${API_ENDPOINT}/boards/comments/${selectedComment.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.ok) {
      refreshCommentData({
        ok: true,
        data: commentData?.data.filter(
          (comment: any) => comment.id !== selectedComment.id
        ),
      });
    }
    closeModal();
  };

  // // 좋아요 기능
  // const getPostLike = localStorage.getItem(
  //   `${params.clubId}_${params.postId} like`
  // );

  // useEffect(() => {
  //   if (getPostLike !== null) {
  //     postLikeArr = JSON.parse(getPostLike);
  //     const likeUserArr = postLikeArr.filter(
  //       (item: { id: number }) => item.id == userData?.id
  //     );

  //     if (likeUserArr.length !== 0) {
  //       setLike(true);
  //     } else {
  //       setLike(false);
  //     }
  //   }
  // }, [getPostLike]);

  // const likeClick = () => {
  //   setLike((prev) => !prev);

  //   if (getPostLike !== null) {
  //     postLikeArr = JSON.parse(getPostLike);
  //     console.log(postLikeArr);
  //     //유저가 이미 좋아요를 눌렀다면?
  //     if (postLikeArr.some((item: { id: number }) => item.id == userData?.id)) {
  //       postLikeArr = postLikeArr.filter(
  //         (item: { id: number }) => item.id !== userData?.id
  //       );
  //       localStorage.setItem(
  //         `${params.clubId}_${params.postId} like`,
  //         JSON.stringify(postLikeArr)
  //       );
  //     }
  //     //좋아요를 누르지 않았다면
  //     else {
  //       postLikeArr.unshift({ id: userData?.id });
  //       localStorage.setItem(
  //         `${params.clubId}_${params.postId} like`,
  //         JSON.stringify(postLikeArr)
  //       );
  //     }
  //   }
  //   // 글에 좋아요가 0일때
  //   else {
  //     postLikeArr.unshift({ id: userData?.id });
  //     localStorage.setItem(
  //       `${params.clubId}_${params.postId} like`,
  //       JSON.stringify(postLikeArr)
  //     );
  //   }
  // };

  return (
    <div className="flex flex-col overflow-scroll h-full">
      {inModal &&
        modalType &&
        {
          post: <PostMenuButton post={post} setType={setModalType} />,
          delPost: (
            <Delete onClose={closeModal} onDelete={postDelete} name="게시글" />
          ),

          comment: (
            <CommentMenuButton onClose={closeModal} setType={setModalType} />
          ),

          updateComment: selectedComment && (
            <UpdateComment
              selectComment={selectedComment}
              refreshComment={refreshCommentData}
              closeModal={closeModal}
            />
          ),
          delComment: (
            <Delete onClose={closeModal} onDelete={commentDelete} name="댓글" />
          ),
        }[modalType]}

      <PageHeader className="!bg-gray-100">
        <div className="flex space-x-2 items-center overflow-ellipsis">
          <HeaderBackButton />
          <h1 className="text-lg whitespace-nowrap">{post?.title}</h1>
        </div>
        <button
          // 작성자 Id와 로그인한 유저 id 비교
          //${location.state.post.id !== userData?.id ? "hidden" : ""}
          className={`flex items-center `}
          onClick={() => {
            setInModal(true);
            setModalType(ModalType.POST);
          }}
        >
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
      </PageHeader>
      <section className="p-4 py-16">
        <header className="flex w-full items-center justify-between py-2">
          <div className="flex space-x-2 items-center">
            <div className="w-10 aspect-square rounded-full bg-blue-500"></div>
            <div className="flex flex-col h-full justify-between  text-sm">
              <div className="flex space-x-1">
                <p>포마</p>
                <p className="font-semibold text-blue-500">클럽장</p>
              </div>
              <p className="text-gray-500">3월 3일 오후 12시 57분</p>
            </div>
          </div>
          <div>
            <p className="text-blue-500">
              {getPostCategoryWithKey(post?.category)}
            </p>
          </div>
        </header>
        <div className="pt-4 pb-12 flex flex-col space-y-4">
          {post?.imageUrl && (
            <img
              src={post.imageUrl + "/post"}
              alt="게시글 사진"
              className="w-min rounded-md"
            />
          )}
          <textarea
            ref={textareaRef}
            cols={30}
            className="h-max focus:outline-none resize-none"
            value={post.content}
            readOnly
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            // onClick={likeClick}
            className={`border rounded-md p-2 text-sm border-black flex justify-center space-x-1 items-center ${
              like ? "text-blue-500" : "text-black"
            }`}
          >
            <FontAwesomeIcon icon={faThumbsUp} className="-" />
            <p>좋아요</p>
          </button>
          <button
            className="border rounded-md p-2 text-sm border-black flex justify-center space-x-1 items-center"
            onClick={() => setFocus("comment")}
          >
            <FontAwesomeIcon icon={faComment} className="" />
            <p>댓글 달기</p>
          </button>
        </div>
        <div className="border-y border-gray-300 mt-4 flex justify-between items-center pl-2">
          <div className="flex space-x-2 items-center">
            <FontAwesomeIcon icon={faThumbsUp} className="text-blue-500" />
            <div className="py-3 text-sm">
              {postLikeArr.length == 0 ? (
                "제일 먼저 좋아요를 눌러주세요!"
              ) : (
                <>
                  <div className="text-blue-500 inline-block">
                    {postLikeArr.length}
                  </div>
                  <div className="inline-block">&nbsp;명이 좋아하셨습니다.</div>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <p className="text-sm">댓글 {commentData?.data?.length}개</p>
          </div>
        </div>
        <section className="mt-4 overflow-scroll">
          <ul>
            {commentData?.data.map((item: any) => {
              return (
                <li className="flex space-x-2 mb-3 relative" key={item.id}>
                  <img
                    src={`${item.profileImg}/avatar`}
                    alt="유저 프로필"
                    className="w-8 h-8 rounded-full"
                  ></img>
                  <div className="w-36 flex flex-col space-y-1">
                    <div className="flex flex-col">
                      <p className="text-sm">{item.userName}</p>
                      <p className="text-xs text-gray-500">
                        {getDate(item.createdAt)}
                      </p>
                    </div>
                    <Textarea value={item.comment} />
                  </div>
                  <button
                    className={`absolute right-1 ${
                      userData?.id !== item.userId ? "hidden" : ""
                    }`}
                    onClick={() => {
                      setSelectedComment(item);
                      setInModal(true);
                      setModalType(ModalType.COMMENT);
                    }}
                  >
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </section>
      <BottomTabNavigator className="justify-between p-2 nav">
        <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
          <textarea
            required
            placeholder="댓글을 입력해주세요."
            className="bg-gray-100 py-4 px-3 rounded-lg flex-1 outline-none w-[300px] h-[48px] resize-none text-[16px] max-h-[48px]"
            {...register("comment")}
          />
        </form>
        <Button onClick={clickHandler}>전송</Button>
      </BottomTabNavigator>
    </div>
  );
}
