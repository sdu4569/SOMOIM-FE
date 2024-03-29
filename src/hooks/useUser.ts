import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useSWR from "swr";
import useAccessToken from "./useAccessToken";
import { User } from "@/libs/types";
import isUserRequiredFieldsFilled from "@/util/isRequiredFieldsFilled";

interface UserResponse {
  ok: boolean;
  data?: User;
  code?: number;
  message?: string;
}

export default function useUser() {
  const navigate = useNavigate();
  const { token, tokenExpiration } = useAccessToken();
  const location = useLocation();

  const { data, isLoading, error, mutate } = useSWR<UserResponse>([
    "users",
    token,
  ]);

  useEffect(() => {
    if (!isLoading && data) {
      if (!data.ok) {
        alert(data.message);
        navigate("/", {
          replace: true,
        });
        return;
      }
      if (data.data && !isUserRequiredFieldsFilled(data.data)) {
        if (location.pathname === "/signup/profile") {
          return;
        }
        if (location.pathname !== "/more/editProfile") {
          alert("프로필을 설정해주세요.");
          navigate("/more/editProfile", {
            replace: true,
          });
        }
      } else if (
        data.data &&
        (!data.data.favorites || data.data.favorites.length === 0)
      ) {
        if (location.pathname !== "/signup/favorite") {
          alert("관심사를 설정해주세요.");
          navigate("/signup/favorite", {
            replace: true,
          });
        }
      }
      if (error) {
        console.log(error);
        // navigate("/", {
        //   replace: true,
        // });
        return;
      }
    }
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/", {
        replace: true,
      });
    }
  }, [token]);

  return {
    user: data?.data,
    loading: isLoading,
    mutate,
  };
}
