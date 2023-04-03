import useLogout from "@/hooks/useLogout";
import Button from "./Button";
import useAccessToken from "@/hooks/useAccessToken";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const { logout, isLoading } = useLogout();
  const navigate = useNavigate();
  const token = useAccessToken();

  const onClick = async () => {
    const ok = await logout(token);

    if (ok) {
      navigate("/landing");
    }
  };
  return (
    <Button onClick={onClick} className="mt-[20px] flex float-right">
      로그아웃
    </Button>
  );
}
