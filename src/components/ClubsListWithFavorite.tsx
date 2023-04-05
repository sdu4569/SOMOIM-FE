import useSWR from "swr";
import { ClubResponse } from "@/libs/types";
import ClubsList from "./ClubsList";
import useAccessToken from "@/hooks/useAccessToken";
import { useEffect } from "react";

export default function ClubsListWithFavorite({
  favorite,
}: {
  favorite: string;
}) {
  const { token, tokenExpiration } = useAccessToken();
  const { data: clubs, error } = useSWR([
    `clubs/favorite?favorite=${favorite}`,
    token,
  ]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  return <ClubsList clubs={clubs?.data?.slice(0, 8)} />;
}
