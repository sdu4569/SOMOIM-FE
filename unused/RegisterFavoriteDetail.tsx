// import { useCallback, useEffect, useRef, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import HeaderBackButton from "@/components/HeaderBackButton";
// import PageHeader from "@/components/PageHeader";
// import { FavoriteList } from "@/libs/FavoriteList";
// import { motion } from "framer-motion";
// import { pageSlideIn } from "@/libs/variants";
// import { useForm } from "react-hook-form";

// interface Favorite {
//   title: string;
//   favorite: string;
//   image: string;
//   detail: string[];
// }

// interface FavoriteDetailFormData {
//   [key: string]: string[];
// }

// export default function RegisterFavoriteDetail() {
//   const [detailList, setDetailList] = useState<Favorite[]>([]);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     watch,
//   } = useForm<FavoriteDetailFormData>();

//   const onSubmit = (data: FavoriteDetailFormData) => {
//     const favorites = Object.entries(data).map((item) => {
//       return {
//         name: item[0],
//         detail: item[1] ? item[1] : [],
//       };
//     });
//     console.log(favorites);
//   };

//   useEffect(() => {
//     console.log(location.state);
//   }, []);

//   useEffect(() => {
//     if (location.state && location.state.favorites) {
//       const { favorites } = location.state;
//       console.log(favorites);
//       const detailList = FavoriteList.filter((item) =>
//         favorites.includes(item.title)
//       );
//       setDetailList(detailList);
//     }
//   }, [location.state, location.state.favorites]);

//   // to do : prevent direct accesss

//   return (
//     <motion.div
//       variants={pageSlideIn}
//       initial="initial"
//       animate="animate"
//       className="h-full overflow-scroll"
//     >
//       <form onSubmit={handleSubmit(onSubmit)} className="pt-16 px-4 pb-10">
//         <PageHeader>
//           <div className="flex items-center space-x-2">
//             <HeaderBackButton />
//             <h1 className="text-xl whitespace-nowrap truncate">
//               상세 관심사 선택
//             </h1>
//           </div>
//           <button type="submit" className="text-xl">
//             저장
//           </button>
//         </PageHeader>
//         <div className="flex flex-col space-y-4">
//           {detailList.map((favorite, idx) => {
//             return (
//               <div key={idx} className="flex flex-col space-y-4">
//                 <header className="flex space-x-2 items-center">
//                   <img src={favorite.image} className="w-6" />
//                   <p className="text-14">{favorite.title}</p>
//                 </header>
//                 <div className="flex flex-wrap">
//                   {favorite.detail.map((detail, idx) => {
//                     return (
//                       <label
//                         key={idx}
//                         htmlFor={detail}
//                         className={`p-2 mr-2 mb-2 border-2 border-solid flex justify-center items-center rounded text-12
//                         ${
//                           watch(favorite.title) &&
//                           watch(favorite.title).includes(detail)
//                             ? "border-blue-500"
//                             : "border-gray-300"
//                         }
//                         `}
//                       >
//                         <input
//                           {...register(favorite.title)}
//                           value={detail}
//                           type="checkbox"
//                           id={detail}
//                           className="hidden"
//                         />
//                         <p>{detail}</p>
//                       </label>
//                     );
//                   })}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </form>
//     </motion.div>
//   );
// }
