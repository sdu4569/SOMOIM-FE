import { Link } from "react-router-dom";
import ClubComponent from "./Club";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import { useEffect, useRef } from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import Spinner from "./Spinner";
import ClubSkeleton from "./ClubSkeleton";
import useAccessToken from "@/hooks/useAccessToken";

const API_ENTRYPOINT = "https://jsonplaceholder.typicode.com";

export default function ClubsList({ selectedTab }: { selectedTab: string }) {
  const token = useAccessToken();

  const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null;
    return [
      `clubs/${
        selectedTab === "추천클럽" ? "random" : "newclub"
      }?page=${pageIndex}`,
      token,
    ];
  };

  const { data, isLoading, isValidating, size, setSize } =
    useSWRInfinite(getKey);
  const targetRef = useRef<HTMLDivElement>(null);

  const isIntersecting = useIntersectionObserver(targetRef, {});

  useEffect(() => {
    if (isIntersecting) {
      setSize(size + 1);
    }
  }, [isIntersecting]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) {
    return (
      <ul className="flex flex-col space-y-5 mt-4 px-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ClubSkeleton key={i} />
        ))}
      </ul>
    );
  }

  return (
    <>
      <ul className="flex flex-col space-y-5 mt-4 px-4">
        {data &&
          data
            .map((e) => e.data)
            .flat()
            .map((post) => (
              <Link to={`/clubs/${post.id}`} key={post.id}>
                <ClubComponent data={post} />
              </Link>
            ))}
      </ul>
      <div ref={targetRef} className="w-full flex justify-center items-center">
        {isValidating && <Spinner size="md" className="my-5" />}
      </div>
    </>
  );
}
