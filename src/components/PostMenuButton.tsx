import { ModalType } from "@/libs/types";
import { Link, useParams } from "react-router-dom";

interface PostButtonProps {
  post: any;
  setType: React.Dispatch<React.SetStateAction<ModalType | undefined>>;
}

export default function PostMenuButton({ post, setType }: PostButtonProps) {
  const params = useParams();

  return (
    <div className=" w-[200px] h-[90px] flex cursor-pointer bg-white text-left flex-col absolute justify-evenly top-2 right-0 border-[1px] border-solid z-[100]">
      <Link
        to={`/clubs/${params.clubId}/posts/${params.postId}/edit`}
        state={{ post }}
      >
        <div className="h-[40px] p-3 text-[16px]">게시글 수정</div>
      </Link>
      <div
        className="h-[40px] p-3 text-[16px]"
        onClick={() => setType(ModalType.DELETE_POST)}
      >
        게시글 삭제
      </div>
    </div>
  );
}
