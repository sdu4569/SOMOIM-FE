import useSWR from "swr";
import { ClubResponse } from "@/libs/types";
import ClubsList from "./ClubsList";
import useAccessToken from "@/hooks/useAccessToken";

export default function ClubsListWithFavorite({
  favorite,
}: {
  favorite: string;
}) {
  const { token, tokenExpiration } = useAccessToken();
  const { data: clubs } = useSWR<ClubResponse>([
    `clubs/favorite?favorite=${favorite}`,
    token,
  ]);

  return <ClubsList clubs={clubs?.data?.content?.slice(0, 8)} />;
}
