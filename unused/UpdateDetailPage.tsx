// import { useEffect, useState } from "react";
// import Button from "@/components/Button";
// import HeaderBackButton from "@/components/HeaderBackButton";
// import { Images } from "@/libs/Images";
// import PageHeader from "@/components/PageHeader";
// import getUserChoiceFavorite from "@/util/getUserChoiceFavorite";
// import FavoriteSelect from "@/components/FavoriteSelect";
// import FavoriteDetailSelect from "@/components/FavoriteDetailSelect";

// interface FavoriteWithDetails {
//   name: string[];
//   detail: string[];
// }

// const enum ModalType {
//   FAVORITE = "favorite",
//   FAVORITE_DETAIL = "favoriteDetail",
// }

// const UpdateDetailPage = () => {
//   const [detail, setDetail] = useState([]);
//   const [inModal, setInModal] = useState<boolean>(false);
//   const [modalType, setModalType] = useState<ModalType>();
//   const [clubFavorite, setClubFavorite] = useState<FavoriteWithDetails>();

//   const closeModal = () => {
//     setInModal(false);
//   };

//   useEffect(() => {
//     console.log(clubFavorite);
//     if (clubFavorite !== undefined) {
//       localStorage.setItem("userChoice", JSON.stringify(clubFavorite.detail));
//     }
//     const updateDetail = getUserChoiceFavorite();
//     setDetail(updateDetail);
//   }, [clubFavorite]);
//   return (
//     <>
//       {inModal &&
//         modalType &&
//         {
//           favorite: (
//             <div className="w-full h-full z-[200] absolute bg-white">
//               <FavoriteSelect closeModal={closeModal} maxSelect={7} />
//             </div>
//           ),
//           favoriteDetail: clubFavorite && (
//             <div className="w-full h-full z-[200] absolute bg-white">
//               <FavoriteDetailSelect
//                 closeModal={closeModal}
//                 favorites={clubFavorite.name}
//                 onComplete={(data) => {
//                   let favoriteName: string[] = [];
//                   let favoriteDetail: any[] = [];
//                   data.map((item) => {
//                     favoriteName.push(item.name);
//                     favoriteDetail.push(item.detail);
//                   });
//                   setClubFavorite({
//                     name: favoriteName,
//                     detail: favoriteDetail.flat(Infinity),
//                   });
//                   closeModal();
//                 }}
//               />
//             </div>
//           ),
//         }[modalType]}
//       <div className="h-full py-16 px-4 overflow-auto">
//         <PageHeader>
//           <div className="flex items-center space-x-4 h-full overflow-hidden">
//             <HeaderBackButton />
//             <h1 className="text-xl whitespace-nowrap truncate">상세 관심사</h1>
//           </div>
//         </PageHeader>
//         <div>
//           <Button
//             children="관심사 선택"
//             className="w-full"
//             onClick={() => {
//               setInModal(true);
//               setModalType(ModalType.FAVORITE);
//             }}
//           />

//           <div className="text-[14px] font-semibold mt-5">
//             선택한 상세관심사
//           </div>
//           <div className="flex flex-wrap mt-5">
//             {detail.flat().map((favorite: string, index: number) => {
//               return (
//                 <p
//                   key={index}
//                   className="border-solid border-gray-300 border p-2 rounded-lg text-[12px] mb-3 mr-3 "
//                 >
//                   <img
//                     src={Images.check}
//                     alt="체크표시"
//                     className="inline-block w-3 mr-1"
//                   />
//                   {favorite}
//                 </p>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UpdateDetailPage;
