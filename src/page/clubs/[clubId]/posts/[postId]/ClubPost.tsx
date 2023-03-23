import { faComment, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, useState } from "react";
import HeaderBackButton from "@/components/HeaderBackButton";
import PageHeader from "@/components/PageHeader";
import BottomTabNavigator from "@/components/BottomTabNavigator";
import Button from "@/components/Button";
import Overlay from "@/components/Overlay";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

interface commentFormData {
  comment: string;
}

const enum ModalType {
  POST = "post",
  COMMENT = "comment",
  DELETE_POST = "delPost",
  UPDATE_COMMENT = "updateComment",
  DELETE_COMMENT = "delComment",
}

let commentArr: any[] = [];

export default function ClubPost() {
  const userId: number = 1;
  const params = useParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [like, setLike] = useState<boolean>(false);
  const [inModal, setInModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>();
  const [selectKey, setSelectKey] = useState<number>();
  const [selectComment, setSelectComment] = useState<any[]>([]);
  const [commentList, setCommentList] = useState<any[]>([]);

  //코멘트를 로컬저장소에서 들고옴
  const getComment = localStorage.getItem(
    `${params.clubId}_${params.postId} comment`
  );
  useEffect(() => {
    //로컬 저장소에 댓글이 존재하면
    if (getComment !== null) {
      commentArr = JSON.parse(getComment);
      setCommentList(commentArr);
    }
  }, []);

  const navigate = useNavigate();
  const handleUpdate = () => {
    navigate(`/clubs/${params.clubId}/update_post/${params.postId}`);
  };
  const handleDelete = () => {
    navigate(-1);
  };

  const closeModal = () => {
    setInModal(false);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    setFocus,
    setValue,
  } = useForm<commentFormData>();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    setValue: setValue2,
  } = useForm<commentFormData>();

  const clickHandler = (e: any) => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
    if (inModal) {
      setInModal(!inModal);
    }
  };

  const getDate = (e: number) => {
    let d = new Date(e);
    let month = d.getMonth() + 1;
    let date = d.getDate();
    let hour: number | string = d.getHours();
    let minute: number | string = d.getMinutes();
    let amPm = hour >= 12 ? "P.M" : "A.M";
    hour =
      hour > 12
        ? hour - 12 >= 10
          ? hour - 12
          : `0${hour - 12}`
        : hour >= 10
        ? hour
        : `0${hour}`;
    minute = minute < 10 ? `0${minute}` : minute;
    return (
      month + "월 " + date + "일 " + amPm + " " + hour + "시 " + minute + "분"
    );
  };

  const onSubmit = (commentForm: commentFormData) => {
    let d = Date.now();
    commentArr.sort(function (a, b) {
      return a.id - b.id;
    });
    console.log(commentArr);
    let item;
    if (commentArr.length !== 0) {
      item = {
        id: commentArr.at(-1)?.id + 1,
        user_id: userId,
        board_id: Number(params.postId),
        comment: commentForm.comment,
        createTime: d,
      };
    } else {
      item = {
        id: 1,
        user_id: userId,
        board_id: Number(params.postId),
        comment: commentForm.comment,
        createTime: d,
      };
    }

    commentArr.push(item);
    localStorage.setItem(
      `${params.clubId}_${params.postId} comment`,
      JSON.stringify(commentArr)
    );
    setCommentList(commentArr);
    setValue("comment", "");
  };

  const onUpdate = (commentForm: commentFormData) => {
    selectComment[0].comment = commentForm.comment;
    commentArr = commentArr.filter((item) => item.id !== selectKey);
    commentArr.push(selectComment[0]);
    commentArr.sort(function (a, b) {
      return a.id - b.id;
    });
    localStorage.setItem(
      `${params.clubId}_${params.postId} comment`,
      JSON.stringify(commentArr)
    );
    setCommentList(commentArr);
  };

  const commentDelete = () => {
    commentArr = commentArr.filter((item) => item.id !== selectKey);
    commentArr.sort(function (a, b) {
      return a.id - b.id;
    });
    localStorage.setItem(
      `${params.clubId}_${params.postId} comment`,
      JSON.stringify(commentArr)
    );
    setCommentList(commentArr);
  };

  const { ref } = register("comment");
  const commentRef = useRef<HTMLTextAreaElement | null>(null);

  const handleResizeHeight = useCallback(() => {
    if (!commentRef.current) return;

    commentRef.current.style.height = "0";
    commentRef.current.style.height = commentRef.current?.scrollHeight + "px";
  }, [commentRef]);

  useEffect(() => {
    console.log(selectKey);
  }, [selectKey]);

  useEffect(() => {
    setValue2("comment", selectComment[0]?.comment);
  }, [selectComment]);
  return (
    <>
      {inModal &&
        modalType &&
        {
          post: (
            <div className=" w-[200px] h-[90px] flex bg-white text-left flex-col absolute justify-evenly top-2 right-0 border-[1px] border-solid z-[100]">
              <div className="h-[40px] p-3 text-[16px]" onClick={handleUpdate}>
                게시글 수정
              </div>
              <div
                className="h-[40px] p-3 text-[16px]"
                onClick={() => setModalType(ModalType.DELETE_POST)}
              >
                게시글 삭제
              </div>
            </div>
          ),
          comment: (
            <Overlay onClick={closeModal}>
              <div
                onClick={(e) => e.stopPropagation()}
                className=" w-full h-[100px] mt-auto mb-auto ml-3 mr-3 flex bg-white self-end flex-col"
              >
                <div
                  className="h-[50px] p-4 text-[16px]"
                  onClick={() => {
                    setSelectComment(
                      commentList.filter((item) => item.id == selectKey)
                    );
                    setModalType(ModalType.UPDATE_COMMENT);
                  }}
                >
                  수정하기
                </div>
                <div
                  className="h-[50px] p-4 text-[16px]"
                  onClick={() => {
                    setModalType(ModalType.DELETE_COMMENT);
                  }}
                >
                  삭제하기
                </div>
              </div>
            </Overlay>
          ),
          delPost: (
            <Overlay onClick={closeModal}>
              <div
                onClick={(e) => e.stopPropagation()}
                className="rounded-2xl w-full h-[100px] p-4 m-4 flex bg-white self-end flex-col justify-evenly "
              >
                <div className="h-[30px] p-1">게시글을 삭제하시겠습니까?</div>
                <div className=" flex divide-x w-full divide-gray-300 mt-2 mb-2">
                  <button
                    className="flex justify-center items-center flex-1"
                    onClick={closeModal}
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    className="flex justify-center items-center flex-1"
                    onClick={handleDelete}
                  >
                    확인
                  </button>
                </div>
              </div>
            </Overlay>
          ),
          updateComment: selectComment && (
            <Overlay onClick={closeModal}>
              <div
                onClick={(e) => e.stopPropagation()}
                className="rounded-2xl w-full h-[210px] p-4 m-4 flex bg-white self-end flex-col justify-between "
              >
                <div className="h-[30px] p-1">댓글수정</div>
                <form onSubmit={handleSubmit2(onUpdate)} ref={formRef}>
                  <textarea
                    rows={2}
                    className="bg-gray-100 py-4 px-3 rounded-lg flex-1 outline-none w-full h-[96px] resize-none text-[16px] max-h-[96px]"
                    {...register2("comment")}
                  />
                </form>
                <div className=" flex divide-x w-full divide-gray-300 mt-2 mb-2">
                  <button
                    className="flex justify-center items-center flex-1"
                    onClick={closeModal}
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    className="flex justify-center items-center flex-1"
                    onClick={clickHandler}
                  >
                    확인
                  </button>
                </div>
              </div>
            </Overlay>
          ),
          delComment: (
            <Overlay onClick={closeModal}>
              <div
                onClick={(e) => e.stopPropagation()}
                className="rounded-2xl w-full h-[100px] p-4 m-4 flex bg-white self-end flex-col justify-evenly "
              >
                <div className="h-[30px] p-1">댓글을 삭제하시겠습니까?</div>
                <div className=" flex divide-x w-full divide-gray-300 mt-2 mb-2">
                  <button
                    className="flex justify-center items-center flex-1"
                    onClick={closeModal}
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    className="flex justify-center items-center flex-1"
                    onClick={() => {
                      commentDelete();
                      closeModal();
                    }}
                  >
                    확인
                  </button>
                </div>
              </div>
            </Overlay>
          ),
        }[modalType]}

      <PageHeader className="!bg-gray-100 relative">
        <div className="flex space-x-2 items-center">
          <HeaderBackButton />
          <h1 className="text-lg ">게시글</h1>
        </div>
        <button
          className={`flex items-center ${userId !== 1 ? "hidden" : ""}`}
          onClick={() => {
            setInModal(true);
            setModalType(ModalType.POST);
          }}
        >
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
      </PageHeader>
      <section className="mb-12 h-full overflow-scroll p-4">
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
            <p className="text-blue-500">공지사항</p>
          </div>
        </header>
        <div className="pt-4 pb-12">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur,
          maiores? A temporibus rem voluptate ad cumque ea ipsum eius.
          Asperiores rem deleniti laudantium atque ad delectus dolores. Libero,
          sunt modi?
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setLike((prev) => !prev)}
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
            <FontAwesomeIcon icon={faThumbsUp} className="-" />
            <p className="py-3 text-sm">제일 먼저 좋아요를 눌러주세요!</p>
          </div>
          <div className="flex items-center">
            <p className="text-sm">댓글 {commentList.length}개</p>
          </div>
        </div>
        <section className="mt-4 h-full overflow-scroll">
          <ul>
            {commentList.map((item, idx) => {
              return (
                <li className="flex space-x-2 mb-3 relative" key={idx}>
                  <div className="w-8 h-8 rounded-full bg-red-500"></div>
                  <div className="w-36 flex flex-col space-y-1">
                    <div className="flex flex-col">
                      <p className="text-sm">닉네임</p>
                      <p className="text-xs text-gray-500">
                        {getDate(item.createTime)}
                      </p>
                    </div>
                    <p className="p-2 rounded-md bg-blue-300">{item.comment}</p>
                  </div>
                  <button
                    className={`absolute right-1 ${
                      userId !== item.user_id ? "hidden" : ""
                    }`}
                    onClick={() => {
                      setSelectKey(item.id);

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
            rows={1}
            placeholder="댓글을 입력해주세요."
            className="bg-gray-100 py-4 px-3 rounded-lg flex-1 outline-none w-[300px] h-[48px] resize-none text-[16px] max-h-[48px]"
            {...register("comment")}
            onChange={handleResizeHeight}
            ref={(e) => {
              ref(e);
              commentRef.current = e;
            }}
          />
        </form>
        <Button onClick={clickHandler}>전송</Button>
      </BottomTabNavigator>
    </>
  );
}
