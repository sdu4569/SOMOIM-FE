import { Link } from "react-router-dom";
import ClubComponent from "./Club";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import { useEffect, useRef } from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import Spinner from "./Spinner";
import ClubSkeleton from "./ClubSkeleton";
import useAccessToken from "@/hooks/useAccessToken";
import useSWR from "swr";
import { Club } from "@/libs/types";

export default function ClubsList({ clubs }: { clubs?: Club[] }) {
  // const token = useAccessToken();

  // const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
  //   if (!token) return;
  //   if (previousPageData && !previousPageData.data.length) return null;
  //   return [
  //     `clubs/${selectedTab === "추천클럽" ? "random" : "newclub"}?page=${
  //       pageIndex + 1
  //     }`,
  //     token,
  //   ];
  // };

  // const { data, isLoading, isValidating, size, setSize } =
  //   useSWRInfinite(getKey);
  // const targetRef = useRef<HTMLDivElement>(null);

  // const isIntersecting = useIntersectionObserver(targetRef, {});

  // useEffect(() => {
  //   if (isIntersecting) {
  //     setSize(size + 1);
  //   }
  // }, [isIntersecting]);

  if (!clubs) {
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
        {clubs.map((post) => (
          <Link to={`/clubs/${post.id}`} key={post.id}>
            <ClubComponent data={post} />
          </Link>
        ))}
      </ul>
      {/* <div ref={targetRef} className="w-full flex justify-center items-center">
        {isValidating && <Spinner size="md" className="my-5" />}
      </div> */}
    </>
  );
}
