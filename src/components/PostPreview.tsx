import { Post } from "@/libs/types";
import formatDate from "@/util/formatDate";
import getPostCategoryWithKey from "@/util/getPostCategoryWithKey";
import { faMessage, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "./Avatar";

export default function PostPreview({ post }: { post: Post }) {
  return (
    <>
      <header className="flex justify-between items-center">
        <div className="flex space-x-2 items-center ">
          <div className="w-8 h-8 rounded-full bg-gray-500">
            <Avatar src={post.userImg} size="md" />
          </div>
          <span>{post.userName}</span>
        </div>
        <div>
          <p className="text-sm text-gray-400">{formatDate(post.createdAt)}</p>
        </div>
      </header>
      <div className="py-4 flex justify-between items-start">
        <div className="flex flex-col flex-1 space-y-2">
          <p className="text-blue-500 pr-4 w-60 overflow-hidden whitespace-nowrap overflow-ellipsis">
            {post?.title}
          </p>
          <p className="flex-1 w-60 line-clamp-3 pr-4 leading-5">
            {post?.content}
          </p>
        </div>
        {post?.imageUrl && (
          <img
            src={post.imageUrl + "/public"}
            alt=""
            className="rounded-md max-w-[110px] max-h-[150px]"
          />
        )}
      </div>
      <div className="flex py-2 justify-between items-center border-y-2 border-gray-200">
        <div className="flex space-x-4">
          <div className="flex space-x-1 items-center">
            <FontAwesomeIcon icon={faThumbsUp} />
            <p className="text-sm ">좋아요 {post.likeCnt}</p>
          </div>
          <div className="flex space-x-1 items-center">
            <FontAwesomeIcon icon={faMessage} />
            <p className="text-sm ">댓글 {post.commentCnt}</p>
          </div>
        </div>
        <div>
          <p className="text-gray-500 text-sm ">
            {getPostCategoryWithKey(post.category)}
          </p>
        </div>
      </div>
    </>
  );
}
