import { Link } from "react-router-dom";
import RecommendClub from "./RecommendClub";
import UserChoiceInterest from "./UserChoiceInterst";
const Recommendation = () => {
  const userChoice = UserChoiceInterest();
  return (
    <>
      {userChoice.map((item, idx) => {
        return (
          <div
            className="mt-6 border-t pt-4 border-solid border-gray-400"
            key={idx}
          >
            <Link to={`/${item.interest}`}>
              <button className="w-full">
                <p className="text-12 inline-block float-left font-semibold">
                  {item.title} 맞춤추천
                </p>
                <span className="text-12 inline-block float-right underline text-gray-400 ">
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
