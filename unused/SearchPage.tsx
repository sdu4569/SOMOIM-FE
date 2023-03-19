// import { faPlane } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Link } from "react-router-dom";
// import HeaderBackButton from "@/components/HeaderBackButton";
// import PageHeader from "@/components/PageHeader";

// const category = [
//   "공지사항",
//   "자유게시판",
//   "스터디",
//   "프로젝트",
//   "취업",
//   "공지사항",
//   "자유게시판",
//   "스터디",
//   "프로젝트",
//   "취업",
//   "공지사항",
//   "자유게시판",
//   "스터디",
//   "프로젝트",
//   "취업",
// ];

// export default function SearchPage() {
//   return (
//     <>
//       <PageHeader>
//         <div className="flex w-full items-center space-x-4">
//           <HeaderBackButton />
//           <input
//             type="text"
//             className="rounded-md p-2 outline-none bg-gray-200 flex-1"
//             placeholder="클럽을 검색하세요."
//           />
//         </div>
//       </PageHeader>
//       <section className="mt-14 grid grid-cols-2 gap-x-4 gap-y-2">
//         {category.map((item, index) => (
//           <Link
//             to={"category"}
//             key={index}
//             className="flex items-center p-2 pl-10 rounded-md border text-sm"
//           >
//             <FontAwesomeIcon icon={faPlane} className="mr-2" />
//             {item}
//           </Link>
//         ))}
//       </section>
//     </>
//   );
// }
