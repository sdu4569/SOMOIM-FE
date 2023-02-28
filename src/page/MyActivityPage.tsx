import PageHeader from "../components/PageHeader";
import ClubSearch from "../components/ClubSearch";
import UpdateInterestButton from "../components/UpdateInterestButton";
import Recommendation from "../components/Recommendation";

const MyActivityPage = () => {
  return (
    <div>
      <PageHeader title="내활동" />
      <main className="ml-2 mr-2">
        <h2 className="text-14 text-blue-500 font-semibold mb-5">
          클럽에 가입해 보세요!
        </h2>
        <h2 className="text-14 font-semibold mb-5">클럽찾기</h2>
        <ClubSearch />
        <UpdateInterestButton />
        <Recommendation />
      </main>
    </div>
  );
};

export default MyActivityPage;
