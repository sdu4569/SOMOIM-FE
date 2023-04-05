import { Link } from "react-router-dom";
import { FavoriteList } from "@/libs/FavoriteList";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useUser from "@/hooks/useUser";

const ClubSearchVariants = {
  initial: {
    height: "120px",
  },
  base: {
    height: "120px",
  },
  expanded: {
    height: "248px",
  },
};

interface FavoriteListProps {
  id: number;
  title: string;
  favorite: string;
  image: string;
}

const ClubSearch = () => {
  const { user } = useUser();
  const [expanded, setExpanded] = useState(false);
  const [selectFavorite, setSelectFavorite] = useState<FavoriteListProps[]>([]);
  const [notSelectFavorite, setNotSelectFavorite] = useState<
    FavoriteListProps[]
  >([]);

  useEffect(() => {
    if (user && user.favorites) {
      const SelectList = FavoriteList.filter((item) =>
        user.favorites.includes(item.favorite)
      );
      setSelectFavorite(SelectList);
      const notSelectList = FavoriteList.filter(
        (item) => !user.favorites.includes(item.favorite)
      );
      setNotSelectFavorite(notSelectList);
    }
  }, [user]);

  const onExpandClick = () => setExpanded((prev) => !prev);

  return (
    <>
      <div className="flex flex-col items-center">
        <motion.div
          variants={ClubSearchVariants}
          initial="initial"
          animate={expanded ? "expanded" : "base"}
          transition={{ ease: "easeInOut", duration: 0.5, originY: 0 }}
          className={`grid grid-cols-5 gap-y-4 overflow-hidden`}
        >
          {selectFavorite.map((item) => {
            return (
              <div key={item.id}>
                <Link to={`/search/${item.favorite}`} className="">
                  <img
                    src={item.image}
                    alt="관심사 이미지"
                    className="rounded-md w-8 mx-auto mb-2 bg-gray-300"
                  />
                  <div className="text-[10px] text-center">{item.title}</div>
                </Link>
              </div>
            );
          })}
          {notSelectFavorite.map((item) => {
            return (
              <div key={item.id}>
                <Link to={`/search/${item.favorite}`} className="">
                  <img
                    src={item.image}
                    alt="관심사 이미지"
                    className="rounded-md w-8 mx-auto mb-2 bg-gray-300"
                  />
                  <div className="text-[10px] text-center">{item.title}</div>
                </Link>
              </div>
            );
          })}
          {/* {expanded
            ? FavoriteList.map((item, idx) => {
                return (
                  <div key={idx}>
                    <Link to={`/search/${item.favorite}`} className="">
                      <img
                        src={item.image}
                        alt="관심사 이미지"
                        className="rounded-md w-8 mx-auto mb-2 bg-gray-300"
                      />
                      <div className="text-[10px] text-center">
                        {item.title}
                      </div>
                    </Link>
                  </div>
                );
              })
            : FavoriteList.slice(0, 10).map((item, idx) => {
                return (
                  <div key={idx}>
                    <Link to={`/search/${item.favorite}`} className="">
                      <img
                        src={item.image}
                        alt="관심사 이미지"
                        className="rounded-md w-8 mx-auto mb-2 bg-gray-300"
                      />
                      <div className="text-[10px] text-center">
                        {item.title}
                      </div>
                    </Link>
                  </div>
                );
              })} */}
        </motion.div>
        <button
          onClick={onExpandClick}
          className="text-gray-400 underline text-2xs w-max px-2 pt-4"
        >
          {expanded ? "접기" : "더 보기"}
        </button>
      </div>
    </>
  );
};

export default ClubSearch;
