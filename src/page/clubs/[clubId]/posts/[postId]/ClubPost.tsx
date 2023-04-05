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
import { Comment, Like, ModalType, Post } from "@/libs/types";
import Delete from "@/components/Delete";
import PostMenuButton from "@/components/PostMenuButton";
import CommentMenuButton from "@/components/CommentMenuButton";
import { getDate } from "@/util/getDate";
import formatDate from "@/util/formatDate";
import Avatar from "@/components/Avatar";

interface commentFormData {
  comment: string;
}

interface CommentResponse {
  ok: boolean;
  data: Comment[];
}

interface LikeResponse {
  ok: boolean;
  data: Like[];
}

export default function ClubPost() {
  const params = useParams();
  const navigate = useNavigate();
  const { token, tokenExpiration } = useAccessToken();
  const { user: userData } = useUser();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [inModal, setInModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>();
  const [selectedComment, setSelectedComment] = useState<any>(null);
  const [post, setPost] = useState<Post>();
  const location = useLocation();
  useEffect(() => {});
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const resize = useAutoResizeTextArea();

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

  const { mutate: like, isLoading: likeLoading } = useMutation(
    `boards/${params.postId}/likes`,
    { authorized: true }
  );

  const { mutate: unlike, isLoading: unlikeLoading } = useMutation(
    `boards/${params.postId}/likes`,
    { authorized: true, method: "DELETE" }
  );

  const {
    data: commentData,
    isLoading: getCommentLoading,
    mutate: refreshCommentData,
  } = useSWR<CommentResponse>([`boards/${params.postId}/comments`, token]);

  const {
    data: likeData,
    isLoading: getLikeLoading,
    mutate: refreshLikeData,
  } = useSWR<LikeResponse>([`boards/${params.postId}/likes`, token]);

  useEffect(() => {
    if (!location.state) {
      alert("잘못된 접근입니다.");
      return navigate(-1);
    }
    if (location.state.post) {
      setPost(location.state.post);
    }
  }, [location]);

  useEffect(() => {
    if (post) {
      resize(textareaRef);
    }
  }, [post]);

  useEffect(() => {
    if (userData && likeData) {
      setIsLiked(likeData.data.some((like) => like.userId === userData.id));
    }
    console.log(likeData);
  }, [userData, likeData]);

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

  const onLike = async () => {
    if (likeLoading || unlikeLoading) {
      return;
    }

    if (isLiked) {
      await unlike();
    } else {
      await like();
    }

    await refreshLikeData();
  };

  //글 삭제
  const postDelete = async () => {
    await fetch(`${API_ENDPOINT}/boards/${post?.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      credentials: "include",
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
        credentials: "include",
      }
    );

    if (response.ok) {
      refreshCommentData({
        ok: true,
        data:
          commentData?.data?.filter(
            (comment: any) => comment.id !== selectedComment.id
          ) || [],
      });
    }
    closeModal();
  };

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
          className={`flex items-center 
          ${post?.userId !== userData?.id ? "hidden" : ""}
          `}
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
            <div className={`first-line:w-10 aspect-square rounded-full`}>
              <Avatar src={post?.userImg} size="md" />
            </div>
            <div className="flex flex-col h-full justify-between  text-sm">
              <div className="flex space-x-1">
                <p>{post?.userName}</p>
                {/* <p className="font-semibold text-blue-500"></p> */}
              </div>
              <p className="text-gray-500">
                {post ? formatDate(post.createdAt) : ""}
              </p>
            </div>
          </div>
          <div>
            <p className="text-blue-500">
              {post ? getPostCategoryWithKey(post.category) : ""}
            </p>
          </div>
        </header>
        <div className="pt-4 pb-12 flex flex-col space-y-4">
          {post?.imageUrl && (
            <img
              src={post?.imageUrl + "/post"}
              alt="게시글 사진"
              className="w-min rounded-md"
            />
          )}
          <textarea
            ref={textareaRef}
            cols={30}
            className="h-max focus:outline-none resize-none"
            value={post?.content}
            readOnly
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onLike}
            className={`border rounded-md p-2 text-sm border-black flex justify-center space-x-1 items-center ${
              isLiked ? "text-blue-500" : "text-black"
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
              {likeData?.data?.length == 0 ? (
                "제일 먼저 좋아요를 눌러주세요!"
              ) : (
                <>
                  <div className="text-blue-500 inline-block">
                    {likeData?.data?.length}
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
            {commentData?.data.map((comment: Comment) => {
              return (
                <li className="flex space-x-2 mb-3 relative" key={comment.id}>
                  <div className="w-10 aspect-square">
                    <Avatar src={comment.profileImg} size="md" />
                  </div>
                  <div className="w-36 flex flex-col space-y-1">
                    <div className="flex flex-col">
                      <p className="text-sm">{comment.userName}</p>
                      <p className="text-xs text-gray-500">
                        {getDate(comment.createdAt)}
                      </p>
                    </div>
                    <Textarea value={comment.comment} />
                  </div>
                  <button
                    className={`absolute right-1 ${
                      userData?.id !== comment.userId ? "hidden" : ""
                    }`}
                    onClick={() => {
                      setSelectedComment(comment);
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
