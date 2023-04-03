import {
  faChevronRight,
  faPen,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import ClubSearch from "@/components/ClubSearch";
import FloatButton from "@/components/FloatButton";
import BottomTabNavigator from "@/components/BottomTabNavigator";
import ClubsList from "@/components/ClubsList";
import useUser from "@/hooks/useUser";
import Spinner from "@/components/Spinner";
import useAccessToken from "@/hooks/useAccessToken";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { Club, ClubResponse } from "@/libs/types";

const tabs = ["추천클럽", "신규클럽"];

export default function ClubPage() {
  const token = useAccessToken();
  const [selectedTab, setSelectedTab] = useState<string>(
    localStorage.getItem("clubListTab") || "추천클럽"
  );

  const { user, loading } = useUser();
  const onTabClick = (tab: string) => {
    setSelectedTab(tab);
    localStorage.setItem("clubListTab", tab);
  };

  const getKey: SWRInfiniteKeyLoader = useCallback(
    (pageIndex, previousPageData) => {
      if (!token) return;
      if (previousPageData && !previousPageData.data.length) return null;
      return [
        `clubs/${
          selectedTab === "추천클럽" ? "random" : "newclub"
        }?page=${pageIndex}`,
        token,
      ];
    },
    [selectedTab, token]
  );

  const [clubs, setClubs] = useState<Club[] | undefined>(undefined);
  const { data, isValidating, size, setSize } =
    useSWRInfinite<ClubResponse>(getKey);
  const targetRef = useRef<HTMLDivElement>(null);

  const isIntersecting = useIntersectionObserver(targetRef, {});

  useEffect(() => {
    if (isIntersecting) {
      setSize(size + 1);
    }
  }, [isIntersecting]);

  useEffect(() => {
    if (data) {
      setClubs(data.map((page) => page.data).flat());
    }
  }, [data]);

  return (
    <div className="h-full overflow-scroll pt-16 pb-20">
      <PageHeader>
        <h2 className="text-lg">
          {loading ? <Spinner size="sm" /> : user?.area}
        </h2>
        <div className="flex space-x-8 items-center">
          <Link to="/search">
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </Link>
        </div>
      </PageHeader>
      <div className="bg-pink-200 h-32 relative p-4 flex flex-col space-y-2 rounded-md">
        <h2 className="text-xl">
          {selectedTab === "추천클럽" ? "추천 클럽!" : "신규 클럽!"}
        </h2>
        <h4 className="flex items-center space-x-2">
          <FontAwesomeIcon
            icon={selectedTab === "추천클럽" ? faSearch : faPen}
          />
          <span className="text-sm">
            {selectedTab === "추천클럽"
              ? "제일 인기있는 클럽을 찾아보세요."
              : "새롭게 오픈한 클럽의 첫 멤버가 되어 보세요."}
          </span>
        </h4>
      </div>
      <div className="bg-gray-50 rounded-md w-[350px] mx-auto relative -top-[45px] -mb-[30px] py-2 border">
        <ClubSearch />
      </div>
      <section className="">
        <nav className="w-full bg-white flex items-center sticky z-[99] -top-2 h-8">
          <ul className="flex flex-1 justify-evenly">
            {tabs.map((tab) => (
              <button
                onClick={() => onTabClick(tab)}
                key={tab}
                className="w-1/3 text-center p-2 h-full relative cursor-pointer flex justify-center"
              >
                {tab}
                {selectedTab === tab && (
                  <motion.div
                    className=" h-[2px] absolute left-0 right-0 bottom-0 bg-black"
                    layoutId="underline"
                  />
                )}
              </button>
            ))}
          </ul>
        </nav>
        <ClubsList clubs={clubs} />
        <div
          ref={targetRef}
          className="w-full flex justify-center items-center"
        >
          {isValidating && <Spinner size="md" className="my-5" />}
        </div>
      </section>
      <div className="absolute bottom-20 right-8">
        <FloatButton to="create" className="">
          <FontAwesomeIcon icon={faPlus} />
          <p className="text-sm">개설</p>
        </FloatButton>
      </div>
      <BottomTabNavigator />
    </div>
  );
}
