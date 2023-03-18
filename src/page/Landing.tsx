import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { fadeIn } from "@/libs/variants";

interface LogInFormData {
  id: string;
  password: string;
}

export default function Landing() {
  const [isMasked, setIsMasked] = useState<boolean>(true);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LogInFormData>();
  const navigate = useNavigate();
  const onSubmit = () => {
    navigate("/");
  };
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 100 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex justify-center items-center h-full"
    >
      <div className="flex flex-col space-y-10 w-full p-4">
        <h1 className="w-full text-center text-xl">소모임</h1>
        <ul className="flex flex-col">
          <li>
            <ul className="flex flex-col items-center space-y-4 pb-4 mb-4 border-b">
              <li className="w-full">
                <form
                  className="flex justify-center items-center h-full w-full"
                  onSubmit={handleSubmit((data) => onSubmit())}
                >
                  <div className="rounded-md w-full flex flex-col space-y-4">
                    <ul className="flex flex-col space-y-4">
                      <li>
                        <div className="flex items-center"></div>
                        <input
                          placeholder="이메일"
                          {...register("id", {
                            required: "이메일을 입력해주세요.",
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: "이메일 형식이 아닙니다.",
                            },
                          })}
                          type="email"
                          id="id"
                          className="w-full rounded-md bg-gray-100 p-4 outline-none"
                        />
                      </li>
                      <li>
                        <div className="relative">
                          <div className="flex items-center"></div>
                          <input
                            placeholder="비밀번호"
                            {...register("password", {
                              required: "비밀번호를 입력해주세요.",
                              minLength: {
                                value: 8,
                                message: "비밀번호는 8자 이상이어야 합니다.",
                              },
                              maxLength: {
                                value: 20,
                                message: "비밀번호는 20자 이하여야 합니다.",
                              },
                            })}
                            type={isMasked ? "password" : "text"}
                            id="password"
                            className="w-full rounded-md bg-gray-100 p-4 pr-14 outline-none"
                          />
                          <FontAwesomeIcon
                            onClick={() => setIsMasked((prev) => !prev)}
                            icon={isMasked ? faEye : faEyeSlash}
                            size="lg"
                            className="absolute right-0 p-4 cursor-pointer"
                          />
                        </div>
                      </li>
                    </ul>
                    <Button className="w-full">
                      <p>로그인</p>
                    </Button>
                  </div>
                </form>
              </li>
              <Link
                to={"/signup/register"}
                className="rounded-md px-4 h-10 items-center justify-center flex text-center w-min"
              >
                <p className="whitespace-nowrap">회원가입</p>
              </Link>
            </ul>
          </li>
          <li>
            <ul className="flex flex-col space-y-4">
              <a
                href={`https://kauth.kakao.com/oauth/authorize?client_id=${
                  import.meta.env.VITE_KAKAO_CLIENT_ID
                }&redirect_uri=${
                  import.meta.env.VITE_KAKAO_REDIRECT_URI
                }&response_type=code`}
                className="rounded-md px-10 h-10 flex justify-center items-center text-center border border-kakao bg-kakao"
              >
                <p>카카오로 로그인</p>
              </a>
              <a
                href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${
                  import.meta.env.VITE_GOOGLE_CLIENT_ID
                }&redirect_uri= ${
                  import.meta.env.VITE_GOOGLE_REDIRECT_URI
                }&response_type=code&scope=openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`}
                className="rounded-md relative px-10 h-10 text-center space-x-2 border border-black flex justify-center items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  //   xmlns:v="https://vecta.io/nano"
                  //   width="705.6"
                  //   height="720"
                  viewBox="0 0 186.69 190.5"
                  className="w-5 absolute left-2"
                >
                  <g transform="translate(1184.583 765.171)">
                    <path
                      clipPath="none"
                      mask="none"
                      d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
                      fill="#4285f4"
                    />
                    <path
                      clipPath="none"
                      mask="none"
                      d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
                      fill="#34a853"
                    />
                    <path
                      clipPath="none"
                      mask="none"
                      d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
                      fill="#fbbc05"
                    />
                    <path
                      d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z"
                      fill="#ea4335"
                      clipPath="none"
                      mask="none"
                    />
                  </g>
                </svg>
                <p>구글로 로그인</p>
              </a>
            </ul>
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
