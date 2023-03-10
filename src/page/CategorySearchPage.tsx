import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ClubsList from "../components/ClubsList";
import HeaderBackButton from "../components/HeaderBackButton";
import PageHeader from "../components/PageHeader";

const category = [
  "공지사항",
  "자유게시판",
  "스터디",
  "자유게시판",
  "스터디",
  "프로젝트",
  "취업",
];

export default function CategorySearchPage() {
  return (
    <div className="h-full overflow-y-scroll p-4">
      <PageHeader className="flex-col space-y-4">
        <div className="flex w-full items-center space-x-4">
          <HeaderBackButton />
          <h1 className="">카테고리명</h1>
        </div>
        <div className="bg-red-500py-2 w-full">
          <input
            type="text"
            className="rounded-md p-2 outline-none bg-gray-200 w-full"
            placeholder="클럽을 검색하세요."
          />
        </div>
      </PageHeader>
      <section className="mt-24 flex flex-wrap border-b pb-2">
        {category.map((item, index) => (
          <span
            key={index}
            className="inline mb-2 mr-2 p-2 rounded-md border text-sm"
          >
            {item}
          </span>
        ))}
      </section>
      <section>
        <header>
          <p className="py-4">
            <strong className="font-bold text-blue-500">내 지역</strong>의 클럽
            리스트
          </p>
        </header>
        <ul className="flex flex-col space-y-4">
          <ClubsList />
        </ul>
      </section>
    </div>
  );
}
