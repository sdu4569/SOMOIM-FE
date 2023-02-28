import PageHeader from "../components/PageHeader";
import UpdateInterestButton from "../components/UpdateInterestButton";
import Recommendation from "../components/Recommendation";
import { useLocation } from "react-router-dom";
import { InterestList } from "../components/InterestList";

const InterestSearchPage = () => {
  const location = useLocation();
  const interest = InterestList.filter(
    (item) => item.interest == location.pathname.slice(1)
  );
  console.log(interest);

  return (
    <>
      {interest.map((item, idx) => {
        return (
          <div key={idx}>
            <PageHeader title={item.title} back={true} />
            <main className="ml-2 mr-2">
              <div className="flex flex-wrap mt-5">
                <p className="border-solid border-gray-300 border p-2 rounded-lg text-12 mb-3 mr-3 ">
                  전체
                </p>
                {item.detail.map((detail, idx) => {
                  return (
                    <p
                      key={idx}
                      className="border-solid border-gray-300 border p-2 rounded-lg text-12 mb-3 mr-3 "
                    >
                      {detail}
                    </p>
                  );
                })}
              </div>
            </main>
          </div>
        );
      })}
    </>
  );
};

export default InterestSearchPage;
