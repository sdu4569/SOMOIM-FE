import { ModalType } from "@/libs/types";
import { useParams } from "react-router-dom";
import Overlay from "./Overlay";

interface CommentButtonProps {
  onClose: () => void;
  setType: React.Dispatch<React.SetStateAction<ModalType | undefined>>;
}

export default function CommentMenuButton({
  onClose,
  setType,
}: CommentButtonProps) {
  const params = useParams();

  return (
    <Overlay onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className=" w-full h-[100px] mt-auto mb-auto ml-3 mr-3 flex bg-white self-end flex-col"
      >
        <div
          className="h-[50px] p-4 text-[16px]"
          onClick={() => {
            setType(ModalType.UPDATE_COMMENT);
          }}
        >
          수정하기
        </div>
        <div
          className="h-[50px] p-4 text-[16px]"
          onClick={() => {
            setType(ModalType.DELETE_COMMENT);
          }}
        >
          삭제하기
        </div>
      </div>
    </Overlay>
  );
}
