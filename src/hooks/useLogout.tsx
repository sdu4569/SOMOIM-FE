import { useState } from "react";
import useMutation from "./useMutation";
import { useSetRecoilState } from "recoil";
import { accessTokenAtom, accessTokenExpirationAtom } from "@/libs/atoms";
import useUser from "./useUser";
import useAccessToken from "./useAccessToken";

export default function useLogout() {
  const token = useAccessToken();
  const setToken = useSetRecoilState(accessTokenAtom);
  const setTokenExp = useSetRecoilState(accessTokenExpirationAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutate: mutateUser } = useUser();
  const { mutate } = useMutation("users/auth/signout");

  const logout = async () => {
    setIsLoading(true);

    const { ok, data, message } = await mutate({ accessToken: token });
    if (ok) {
      setToken("");
      setTokenExp(0);
      await mutateUser();
    } else {
      alert(message);
    }

    setIsLoading(false);

    return ok;
  };

  return { logout, isLoading };
}
