import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "@/App";

import { useState } from "react";
import useAccessToken from "./useAccessToken";

interface APIResponse {
  ok: boolean;
  message?: string;
  data?: any;
}

interface PostRequestOptions {
  authorized?: boolean;
  method?: "POST" | "PUT" | "DELETE" | "PATCH";
  [key: string]: any;
}

export default function useMutation(
  url: string,
  { authorized = false, method = "POST" }: PostRequestOptions = {
    authorized: false,
    method: "POST",
  }
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { token, tokenExpiration } = useAccessToken();
  const navigate = useNavigate();

  if (authorized && !token) {
    navigate("/", {
      replace: true,
    });
  }

  const mutate = async function (data?: any): Promise<APIResponse> {
    if (isLoading) return Promise.reject("Already loading");

    if (tokenExpiration - Date.now() < 5000) {
      fetch(`${API_ENDPOINT}/users/auth/reissue`, {
        method: "POST",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }

    setIsLoading(true);
    let response;
    try {
      response = await fetch(`${API_ENDPOINT}/${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(authorized && {
            Authorization: "Bearer " + token,
          }),
        },
        credentials: "include",
        body: data && JSON.stringify(data),
      });
    } catch (error) {
      console.log(error);
      return { ok: false, message: "Request Failed" };
    }

    setIsLoading(false);

    if (response.status === 200) {
      const data = await response.json();
      return data;
    }

    if (response.status === 201) {
      return { ok: true };
    }

    if (response.status === 400) {
      const data = await response.json();
      return data;
    }

    if (response.status === 401) {
      const data = await response.json();
      return data;
    }

    if (response.status === 403) {
      const data = await response.json();
      return data;
    }

    if (response.status === 404) {
      const data = await response.json();
      return data;
    }

    if (response.status === 409) {
      const data = await response.json();
      return data;
    }

    if (response.status === 500) {
      return { ok: false, message: "Internal server error" };
    }

    return { ok: false, message: "Unknown Error" };
  };

  return { mutate, isLoading };
}
