import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderBackButton from "@/components/HeaderBackButton";
import PageHeader from "@/components/PageHeader";
import useSWR from "swr";
import useAccessToken from "@/hooks/useAccessToken";
import Club from "@/components/Club";
import useMutation from "@/hooks/useMutation";
import { Images } from "@/libs/Images";
import { API_ENDPOINT } from "@/App";

const FavoriteClubPage = () => {
  const [favoriteClubList, setFavoriteClubList] = useState<any[]>([]);

  const { token, tokenExpiration } = useAccessToken();

  const {
    data: likeClub,
    isLoading,
    error,
    mutate: likeClubMutate,
  } = useSWR(["users/like-clubs", token]);

  useEffect(() => {
    likeClub && setFavoriteClubList(likeClub.data);
  }, [likeClub]);

  const handleDelete = async (id: string) => {
    const response = await fetch(`${API_ENDPOINT}/clubs/${id}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        clubId: id,
      }),
      credentials: "include",
    });

    if (response.ok) {
      likeClubMutate();
    }
  };

  return (
    <div className="h-full py-16 px-4 overflow-auto">
      <PageHeader>
        <div className="flex items-center space-x-4 h-full overflow-hidden">
          <HeaderBackButton />
          <h1 className="text-xl whitespace-nowrap truncate">내 찜 클럽</h1>
        </div>
      </PageHeader>
      <div>
        {likeClub?.data.map((item: any) => {
          return (
            <div className="relative mb-4" key={item.id}>
              <Link to={`/clubs/${item.id}`}>
                <Club data={item} />
              </Link>
              <button
                className="absolute top-0 right-0"
                value={item.id}
                onClick={() => handleDelete(`${item.id}`)}
              >
                <img
                  src={Images.delete}
                  alt="삭제버튼"
                  className="w-3 inline-block "
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoriteClubPage;
