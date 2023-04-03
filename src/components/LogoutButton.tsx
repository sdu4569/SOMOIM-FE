import useLogout from "@/hooks/useLogout";
import useAccessToken from "@/hooks/useAccessToken";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const { logout } = useLogout();

  const token = useAccessToken();

  const onClick = async () => {
    const ok = await logout(token);
  };
  return (
    <button
      onClick={onClick}
      className="text-[14px] mt-[20px] inline-block float-right underline text-gray-400 "
    >
      로그아웃
    </button>
  );
}
