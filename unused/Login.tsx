// import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import Button from "@/components/Button";
// import HeaderBackButton from "@/components/HeaderBackButton";
// import PageHeader from "@/components/PageHeader";
// import { motion } from "framer-motion";

// interface LogInFormData {
//   id: string;
//   password: string;
// }

// export default function LogIn() {
//   const [isMasked, setIsMasked] = useState<boolean>(true);
//   const {
//     handleSubmit,
//     register,
//     formState: { errors },
//   } = useForm<LogInFormData>();
//   const navigate = useNavigate();
//   const onSubmit = () => {
//     navigate("/");
//   };
//   return (
//     <motion.div
//       initial={{ opacity: 0, translateX: 100 }}
//       animate={{ opacity: 1, translateX: 0 }}
//       transition={{ type: "tween", ease: "easeInOut" }}
//       className="flex items-center h-full w-full justify-center"
//     >
//       <PageHeader>
//         <div className="flex items-center space-x-2">
//           <HeaderBackButton />
//           <h1 className="text-lg">로그인</h1>
//         </div>
//       </PageHeader>
//       <form
//         className="flex justify-center items-center h-full w-full p-4"
//         onSubmit={handleSubmit((data) => onSubmit())}
//       >
//         <div className="rounded-md border w-full border-black p-4 flex flex-col space-y-8">
//           <ul className="flex flex-col space-y-4">
//             <li>
//               <label htmlFor="id" className="flex flex-col space-y-2">
//                 <div className="flex items-center space-x-2">
//                   <p className="text-base">이메일</p>
//                   {errors.id && (
//                     <p className="text-red-500 text-sm">{errors.id.message}</p>
//                   )}
//                 </div>
//                 <input
//                   {...register("id", {
//                     required: "이메일을 입력해주세요.",
//                     pattern: {
//                       value: /^\S+@\S+$/i,
//                       message: "이메일 형식이 아닙니다.",
//                     },
//                   })}
//                   type="email"
//                   id="id"
//                   className="w-full rounded-md bg-gray-100 p-4 outline-none"
//                 />
//               </label>
//             </li>
//             <li>
//               <label
//                 htmlFor="password"
//                 className="relative flex flex-col space-y-2"
//               >
//                 <div className="flex items-center space-x-2">
//                   <p className="text-base">비밀번호</p>
//                   {errors.password && (
//                     <p className="text-red-500 text-sm">
//                       {errors.password.message}
//                     </p>
//                   )}
//                 </div>
//                 <input
//                   {...register("password", {
//                     required: "비밀번호를 입력해주세요.",
//                     minLength: {
//                       value: 8,
//                       message: "비밀번호는 8자 이상이어야 합니다.",
//                     },
//                     maxLength: {
//                       value: 20,
//                       message: "비밀번호는 20자 이하여야 합니다.",
//                     },
//                   })}
//                   type={isMasked ? "password" : "text"}
//                   id="password"
//                   className="w-full rounded-md bg-gray-100 p-4 pr-14 outline-none"
//                 />
//                 <FontAwesomeIcon
//                   onClick={() => setIsMasked((prev) => !prev)}
//                   icon={isMasked ? faEye : faEyeSlash}
//                   size="lg"
//                   className="absolute right-0 inset-y-6 p-4 cursor-pointer"
//                 />
//               </label>
//             </li>
//           </ul>
//           <Button className="w-full">
//             <p>로그인</p>
//           </Button>
//         </div>
//       </form>
//     </motion.div>
//   );
// }
