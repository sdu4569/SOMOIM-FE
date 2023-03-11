import { Link } from "react-router-dom";
import RecommendClub from "./RecommendClub";
import UserChoiceInterest from "../util/getUserChoiceInterest";
const Recommendation = () => {
  const userChoice = UserChoiceInterest();
  return (
    <>
      {userChoice.map((item: any, idx: number) => {
        return (
          <div
            className="mt-6 border-t pt-4 border-solid border-gray-400"
            key={idx}
          >
            <Link to={`/search/${item.interest}`}>
              <button className="w-full">
                <p className="text-[12px] inline-block float-left font-semibold">
                  {item.title} 맞춤추천
                </p>
                <span className="text-[12px] inline-block float-right underline text-gray-400 ">
                  모두보기
                </span>
              </button>
            </Link>
            <RecommendClub interest={item.interest} />
          </div>
        );
      })}
    </>
  );
};

export default Recommendation;
