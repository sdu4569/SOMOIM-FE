import { Link } from "react-router-dom";
import ClubComponent from "./Club";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import { useEffect, useRef } from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import Spinner from "./Spinner";
import ClubSkeleton from "./ClubSkeleton";

const API_ENTRYPOINT = "https://jsonplaceholder.typicode.com";

const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null;
  return `${API_ENTRYPOINT}/posts?_page=${pageIndex + 1}`;
};

export default function ClubsList() {
  const { data, isLoading, isValidating, size, setSize } = useSWRInfinite(
    getKey,
    {
      revalidateOnFocus: false,
      fetcher: (url: string) =>
        fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json()),
    }
  );
  const targetRef = useRef<HTMLDivElement>(null);

  const isIntersecting = useIntersectionObserver(targetRef, {});

  useEffect(() => {
    if (isIntersecting) {
      setSize(size + 1);
    }
  }, [isIntersecting]);

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
          data.flat().map((post) => (
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
