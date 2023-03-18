// import {
//   faChevronRight,
//   faPen,
//   faPlus,
//   faSearch,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import PageHeader from "@/components/PageHeader";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { Link, Outlet, useLocation } from "react-router-dom";
// import BottomTabNavigator from "@/components/BottomTabNavigator";
// import FloatButton from "@/components/FloatButton";

// const tabs = ["추천클럽", "신규클럽"];
// const routes = ["recommend", "new"];

// export default function ClubPage() {
//   const location = useLocation();
//   const [selectedTab, setSelectedTab] = useState<string>();
//   useEffect(() => {
//     if (location.pathname.includes("recommend")) {
//       setSelectedTab("추천클럽");
//     } else {
//       setSelectedTab("신규클럽");
//     }
//   }, [location]);
//   return (
//     <>
//       <PageHeader>
//         <Link to="/region" className="flex space-x-2 items-center">
//           <h2 className="text-lg">내 지역</h2>
//           <FontAwesomeIcon icon={faChevronRight} />
//         </Link>
//         <div className="flex space-x-8 items-center">
//           <Link to="/search">
//             <FontAwesomeIcon icon={faSearch} size="lg" />
//           </Link>
//         </div>
//       </PageHeader>
//       <div className="h-full overflow-scroll pt-16 pb-20 px-4">
//         <div className="bg-pink-300 h-32 relative p-4 flex flex-col space-y-2 rounded-md">
//           <h2 className="text-xl">
//             {location.pathname.includes("recommend")
//               ? "추천 클럽!"
//               : "신규 클럽!"}
//           </h2>
//           <h4 className="flex items-center space-x-2">
//             <FontAwesomeIcon
//               icon={location.pathname.includes("recommend") ? faSearch : faPen}
//             />
//             <span className="text-sm">
//               {location.pathname.includes("recommend")
//                 ? "설정한 관심사에 맞춰 추천드려요."
//                 : location.pathname.includes("new")
//                 ? "새롭게 오픈한 클럽의 첫 멤버가 되어 보세요."
//                 : null}
//             </span>
//           </h4>
//         </div>
//         <section className="mt-40">
//           <nav className="w-full bg-white flex items-center sticky z-[99] -top-3 h-8">
//             <ul className="flex flex-1 justify-evenly">
//               {tabs.map((tab, i) => (
//                 <Link
//                   to={routes[i]}
//                   key={tab}
//                   className="w-1/3 text-center p-2 h-full relative cursor-pointer flex justify-center"
//                 >
//                   {tab}
//                   {selectedTab === tab && (
//                     <motion.div
//                       className=" h-[2px] absolute left-0 right-0 bottom-0 bg-black"
//                       layoutScroll
//                       layoutId="underline"
//                     />
//                   )}
//                 </Link>
//               ))}
//             </ul>
//           </nav>
//           <Outlet />
//         </section>
//         <div className="absolute bottom-20 right-8">
//           <FloatButton to="create" className="">
//             <FontAwesomeIcon icon={faPlus} />
//             <p className="text-sm">개설</p>
//           </FloatButton>
//         </div>
//         <BottomTabNavigator />
//       </div>
//     </>
//   );
// }

import {
  faChevronRight,
  faPen,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import ClubSearch from "@/components/ClubSearch";
import FloatButton from "@/components/FloatButton";
import BottomTabNavigator from "@/components/BottomTabNavigator";
import ClubsList from "@/components/ClubsList";

const tabs = ["추천클럽", "신규클럽"];

export default function ClubPage() {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState<string>(
    localStorage.getItem("clubListTab") || "추천클럽"
  );
  const onTabClick = (tab: string) => {
    setSelectedTab(tab);
    localStorage.setItem("clubListTab", tab);
  };
  return (
    <div className="h-full overflow-scroll pt-16 pb-20">
      <PageHeader>
        <Link to="/region" className="flex space-x-2 items-center">
          <h2 className="text-lg">내 지역</h2>
          <FontAwesomeIcon icon={faChevronRight} />
        </Link>
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
              ? "설정한 관심사에 맞춰 추천드려요."
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
        <ClubsList />
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
