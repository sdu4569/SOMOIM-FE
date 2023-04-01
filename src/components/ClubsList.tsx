import { Link } from "react-router-dom";
import ClubComponent from "./Club";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import { useEffect, useRef } from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import Spinner from "./Spinner";
import ClubSkeleton from "./ClubSkeleton";
import useAccessToken from "@/hooks/useAccessToken";
import useSWR from "swr";

const API_ENTRYPOINT = "https://jsonplaceholder.typicode.com";

export default function ClubsList({ selectedTab }: { selectedTab: string }) {
  const token = useAccessToken();

  const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
    if (!token) return;
    if (previousPageData && !previousPageData.data.length) return null;
    return [
      `clubs/${selectedTab === "추천클럽" ? "random" : "newclub"}?page=${
        pageIndex + 1
      }`,
      token,
    ];
  };

  const { data: page0 } = useSWR([`clubs/newclub?page=1`, token]);
  const { data: page1 } = useSWR([`clubs/newclub?page=2`, token]);
  const { data: page2 } = useSWR([`clubs/newclub?page=3`, token]);
  const { data: page3 } = useSWR([`clubs/newclub?page=4`, token]);

  const { data, isLoading, isValidating, size, setSize } =
    useSWRInfinite(getKey);
  const targetRef = useRef<HTMLDivElement>(null);

  const isIntersecting = useIntersectionObserver(targetRef, {});

  useEffect(() => {
    if (isIntersecting) {
      setSize(size + 1);
    }
  }, [isIntersecting]);

  // useEffect(() => {
  //   console.log(data);
  // }, [data, size]);

  useEffect(() => {
    console.log("page0: ", page0);
  }, [page0]);
  useEffect(() => {
    console.log("page1: ", page1);
  }, [page1]);
  useEffect(() => {
    console.log("page2: ", page2);
  }, [page2]);
  useEffect(() => {
    console.log("page3: ", page3);
  }, [page3]);

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
