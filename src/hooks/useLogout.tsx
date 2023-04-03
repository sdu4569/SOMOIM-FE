import { useState } from "react";
import useMutation from "./useMutation";

export default function useLogout() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { mutate } = useMutation("users/auth/signout");

  const logout = async (token: string) => {
    setIsLoading(true);

    const { ok, data, message } = await mutate({ accessToken: token });
    if (ok) {
      console.log(ok);
    } else {
      alert(message);
    }

    setIsLoading(false);

    return ok;
  };

  return { logout, isLoading };
}
