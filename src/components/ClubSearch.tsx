import { Link } from "react-router-dom";
import { InterestList } from "@/libs/InterestList";
import { Images } from "@/libs/Images";
import { useState } from "react";

const ClubSearch = () => {
  const [expanded, setExpanded] = useState(false);

  const onExpandClick = () => setExpanded((prev) => !prev);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className={`grid grid-cols-5 gap-y-4`}>
          {expanded
            ? InterestList.map((item, idx) => {
                return (
                  <div key={idx}>
                    <Link to={`/search/${item.interest}`} className="">
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
            : InterestList.slice(0, 10).map((item, idx) => {
                return (
                  <div key={idx}>
                    <Link to={`/search/${item.interest}`} className="">
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
              })}
        </div>
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
