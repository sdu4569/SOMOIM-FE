import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { API_ENDPOINT } from "@/App";
import useSWR from "swr";
import useAccessToken from "./useAccessToken";

interface UserResponse {
  area: string;
  birth: string;
  favorite: string;
  gender: string;
  introduction: string;
  name: string;
}

export default function useUser() {
  const navigate = useNavigate();
  const token = useAccessToken();

  const { data, isLoading, error, mutate } = useSWR<UserResponse>("users", {
    fetcher: (url: string) =>
      fetch(`${API_ENDPOINT}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }).then((res) => res.json()),
  });

  useEffect(() => {
    if (!isLoading) {
      if (!data) {
        navigate("/landing", {
          replace: true,
        });
        return;
      }
      if (!data?.name) {
        alert("프로필을 설정해주세요.");
        navigate("/more/editProfile", {
          replace: true,
        });
        return;
      }
      if (error) {
        console.log(error);
        navigate("/landing", {
          replace: true,
        });
        return;
      }
    }
  }, [data, isLoading, error]);

  return {
    user: data,
    mutate,
  };
}
