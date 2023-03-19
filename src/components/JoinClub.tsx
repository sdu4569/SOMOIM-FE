import { useForm } from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "@/page/more/editProfile/UpdateUserPage";
import { Images } from "@/libs/Images";

interface greetingFormData {
  greeting?: string;
}

interface JoinClubProps {
  closeModal: () => void;
}

export default function JoinClub({ closeModal }: JoinClubProps) {
  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/users/1",
    fetcher
  );

  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (e: greetingFormData) => {
    console.log(e);

    // axios.post("https://jsonplaceholder.typicode.com/users/1", e);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="rounded-2xl w-full h-[180px] p-4 m-4 flex bg-white self-end flex-col "
    >
      <header className="flex justify-between h-[56px]">
        <h1 className="text-[18px] mt-auto mb-auto">
          가입인사를 작성해주세요.
        </h1>
        <img
          src={Images.user}
          alt="유저 이미지"
          className="w-10 h-10 mt-auto mb-auto"
        />
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="relative h-[56px]">
        <input
          type="text"
          className="rounded-md p-2 w-full bg-gray-300 outline-none h-[40px] text-[12px] mt-2 mb-2"
          placeholder="가입인사를 작성해주세요!"
          {...register("greeting")}
        />
      </form>

      <div className="text-blue-500 flex divide-x w-full divide-gray-300 mt-2 mb-2">
        <button
          className="flex justify-center items-center flex-1"
          onClick={closeModal}
        >
          취소
        </button>
        <button
          type="submit"
          className="flex justify-center items-center flex-1"
        >
          확인
        </button>
      </div>
    </div>
  );
}
