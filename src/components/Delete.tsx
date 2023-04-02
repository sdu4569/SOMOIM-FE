import Overlay from "./Overlay";

interface DeleteProps {
  onClose: () => void;
  onDelete: () => void;
  name: string;
}

export default function Delete({ onClose, onDelete, name }: DeleteProps) {
  return (
    <Overlay onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-2xl w-full h-[100px] p-4 m-4 flex bg-white self-end flex-col justify-evenly "
      >
        <div className="h-[30px] p-1">{name}을 삭제하시겠습니까?</div>
        <div className=" flex divide-x w-full divide-gray-300 mt-2 mb-2">
          <button
            className="flex justify-center items-center flex-1"
            onClick={onClose}
          >
            취소
          </button>
          <button
            type="button"
            className="flex justify-center items-center flex-1"
            onClick={onDelete}
          >
            확인
          </button>
        </div>
      </div>
    </Overlay>
  );
}
