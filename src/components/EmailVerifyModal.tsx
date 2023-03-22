import { API_ENDPOINT } from "@/App";
import { useForm } from "react-hook-form";
import Button from "./Button";

interface EmailVerifyModalProps {
  readonly email: string;
  readonly closeModal: () => void;
  readonly setVerified: () => void;
}

interface EmailVerifyForm {
  code: string;
}

export default function EmailVerifyModal({
  email,
  closeModal,
  setVerified,
}: EmailVerifyModalProps) {
  const { register, handleSubmit } = useForm<EmailVerifyForm>();

  const onSubmit = async (data: EmailVerifyForm) => {
    const response = await fetch(`${API_ENDPOINT}/users/auth/email/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        code: data.code,
      }),
    });

    const parsed = await response.json();

    if (parsed) {
      setVerified();
      closeModal();
      return;
    } else {
      alert("인증에 실패했습니다.");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onClick={(e) => e.stopPropagation()}
      className="p-4 rounded-md bg-white flex flex-col space-y-8"
    >
      <div className="flex flex-col space-y-2">
        <p>{email}로 발송된 코드를 입력해주세요.</p>
        <p>메일 전송에는 몇 분의 시간이 소요될 수 있습니다.</p>
      </div>
      <input
        {...register("code", { required: true })}
        type="text"
        className="p-4 bg-gray-100 rounded-md outline-none"
      />
      <div className="w-full flex justify-between space-x-2">
        <Button
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            closeModal();
          }}
          className="flex-1 !bg-white !text-black border border-black"
        >
          취소
        </Button>
        <Button type="submit" className="flex-1">
          확인
        </Button>
      </div>
    </form>
  );
}
