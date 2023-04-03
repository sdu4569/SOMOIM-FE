import { FavoriteList } from "@/libs/FavoriteList";

export default function getFavoriteWithKey(key: string) {
  return (
    FavoriteList.find((favorite) => favorite.favorite === key)?.title || ""
  );
}
