import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import HeaderBackButton from "../../../components/HeaderBackButton";
import Overlay from "../../../components/Overlay";
import PageHeader from "../../../components/PageHeader";

interface RegisterFormData {
  id: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const location = useLocation();
  const [isMasked, setIsMasked] = useState<boolean>(true);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const [submittedEmail, setSubmittedEmail] = useState<string>("");
  const [inVerifyOverlay, setInVerifyOverlay] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm<RegisterFormData>();
  const navigate = useNavigate();
  const onVerifyClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (isEmailVerified) {
      setIsEmailVerified(false);
      return;
    }
    const email = watch("id");
    if (!email) {
      setError("id", {
        type: "required",
        message: "이메일을 입력해주세요.",
      });
      return;
    }
    if (!/^\S+@\S+$/.test(email)) {
      setError("id", {
        type: "pattern",
        message: "이메일 형식이 아닙니다.",
      });
      return;
    }
    setSubmittedEmail(email);
    setInVerifyOverlay(true);
  };
  const onSubmit = () => {
    // if (!isEmailVerified) {
    //   setError("id", {
    //     type: "manual",
    //     message: "이메일 인증을 해주세요.",
    //   });
    //   return;
    // }
    navigate("/signup/profile");
  };
  return (
    <motion.div
      initial={{ opacity: 0, translateX: 100 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: "tween", ease: "easeInOut" }}
      className="flex items-center h-full w-full justify-center"
      key={location.pathname}
    >
      <AnimatePresence>
        {inVerifyOverlay && (
          <Overlay onClick={() => setInVerifyOverlay(false)}>
            <form
              onClick={(e) => e.stopPropagation()}
              className="p-4 rounded-md bg-white flex flex-col space-y-8"
            >
              <div className="flex flex-col space-y-2">
                <p>{submittedEmail}로 발송된 코드를 입력해주세요.</p>
                <p>메일 전송에는 몇 분의 시간이 소요될 수 있습니다.</p>
              </div>
              <input
                type="text"
                className="p-4 bg-gray-300 rounded-md outline-none"
              />
              <div className="w-full flex justify-between space-x-2">
                <Button
                  onClick={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => {
                    e.preventDefault();
                    setInVerifyOverlay(false);
                  }}
                  className="flex-1 !bg-white !text-black border border-black"
                >
                  취소
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    clearErrors();
                    setIsEmailVerified(true);
                    setInVerifyOverlay(false);
                  }}
                  className="flex-1"
                >
                  확인
                </Button>
              </div>
            </form>
          </Overlay>
        )}
      </AnimatePresence>
      <PageHeader>
        <div className="flex items-center space-x-2">
          <HeaderBackButton />
          <h1 className="text-lg">회원가입</h1>
        </div>
      </PageHeader>
      <form
        className="flex justify-center items-center h-full w-full p-4"
        onSubmit={handleSubmit((data) => onSubmit())}
      >
        <div className="rounded-md border w-full border-black p-4 flex flex-col space-y-8">
          <ul className="flex flex-col space-y-4">
            <li>
              <label htmlFor="id" className="flex flex-col space-y-2">
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <p className="text-base">이메일</p>
                    {errors.id && (
                      <p className="text-red-500 text-sm">
                        {errors.id.message}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      onVerifyClick(e);
                    }}
                    className={`text-xs flex justify-center items-center min-w-[65px] p-2 rounded-md border border-black 
                    ${
                      isEmailVerified
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black hover:bg-black hover:text-white"
                    }
                    `}
                  >
                    {isEmailVerified ? (
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className={"w-4"}
                      >
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5 }}
                          stroke="#fff"
                          strokeWidth={"64px"}
                          fill={"transparent"}
                          d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                        />
                      </motion.svg>
                    ) : (
                      "인증하기"
                    )}
                  </button>
                </div>
                <input
                  {...register("id", {
                    required: "이메일을 입력해주세요.",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "이메일 형식이 아닙니다.",
                    },
                  })}
                  disabled={isEmailVerified}
                  type="email"
                  id="id"
                  className="w-full rounded-md bg-gray-300 p-4 outline-none"
                />
              </label>
            </li>
            <li>
              <label
                htmlFor="password"
                className="relative flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <p className="text-base">비밀번호</p>
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <input
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
                  className="w-full rounded-md bg-gray-300 p-4 pr-14 outline-none"
                />
                <FontAwesomeIcon
                  onClick={() => setIsMasked((prev) => !prev)}
                  icon={isMasked ? faEye : faEyeSlash}
                  size="lg"
                  className="absolute right-0 inset-y-6 p-4 cursor-pointer"
                />
              </label>
            </li>
            <li>
              <label
                htmlFor="confirmPassword"
                className="relative flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <p className="text-base">비밀번호 확인</p>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <input
                  {...register("confirmPassword", {
                    required: "비밀번호를 확인해주세요.",
                    validate: (value) => {
                      return (
                        value === watch("password") ||
                        "비밀번호가 일치하지 않습니다."
                      );
                    },
                  })}
                  type={isMasked ? "password" : "text"}
                  id="confirmPassword"
                  className="w-full rounded-md bg-gray-300 p-4 pr-14 outline-none"
                />
                <FontAwesomeIcon
                  onClick={() => setIsMasked((prev) => !prev)}
                  icon={isMasked ? faEye : faEyeSlash}
                  size="lg"
                  className="absolute right-0 inset-y-6 p-4 cursor-pointer"
                />
              </label>
            </li>
          </ul>
          <Button className="w-full">
            <p>회원가입</p>
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
