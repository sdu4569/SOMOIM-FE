import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import HeaderBackButton from "@/components/HeaderBackButton";
import Overlay from "@/components/Overlay";
import PageHeader from "@/components/PageHeader";
import { pageSlideIn } from "@/libs/variants";
import { emailRegex } from "@/libs/regex";
import EmailVerifyModal from "@/components/EmailVerifyModal";
import usePostRequest from "@/hooks/usePostRequest";

export interface RegisterFormData {
  email: string;
  password: string;
  passwordCheck: string;
}

export default function Register() {
  const location = useLocation();
  const [isMasked, setIsMasked] = useState<boolean>(true);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const [submittedEmail, setSubmittedEmail] = useState<string>("");
  const [inVerifyOverlay, setInVerifyOverlay] = useState<boolean>(false);

  // to do : store verification code

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    watch,
  } = useForm<RegisterFormData>();

  const navigate = useNavigate();

  const { mutate: sendVerifyEmail, isLoading: sendVerifyEmailLoading } =
    usePostRequest("users/auth/email/send");
  const { mutate: createAccount, isLoading: createAccountLoading } =
    usePostRequest("users/auth/signup");
  const { mutate: login } = usePostRequest("users/auth/signin");

  const onVerifyClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (isEmailVerified) {
      return;
    }
    const email = watch("email");
    if (!email) {
      setError("email", {
        type: "required",
        message: "이메일을 입력해주세요.",
      });
      return;
    }
    if (!emailRegex.test(email)) {
      setError("email", {
        type: "pattern",
        message: "이메일 형식이 아닙니다.",
      });
      return;
    }

    setSubmittedEmail(email);
    setInVerifyOverlay(true);

    const response = await sendVerifyEmail({ email });

    console.log(response);
  };

  const onSubmit = async (data: RegisterFormData) => {
    if (!isEmailVerified) {
      setError("email", {
        type: "manual",
        message: "이메일 인증을 해주세요.",
      });
      return;
    }

    // to do : create account
    const response = await createAccount(data);

    if (response.ok) {
      // store token
      await login({ email: data.email, password: data.password });
      navigate("/register/profile");
    } else {
      alert(response.data.detail);
    }
  };

  // to do : prevent direct access

  return (
    <motion.div
      variants={pageSlideIn}
      initial="initial"
      animate="animate"
      className="flex items-center h-full w-full justify-center"
      key={location.pathname}
    >
      <AnimatePresence>
        {inVerifyOverlay && submittedEmail && (
          <Overlay onClick={() => setInVerifyOverlay(false)}>
            <EmailVerifyModal
              email={submittedEmail}
              closeModal={() => setInVerifyOverlay(false)}
              setVerified={() => setIsEmailVerified(true)}
            />
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
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="rounded-md border w-full border-black p-4 flex flex-col space-y-8">
          <ul className="flex flex-col space-y-4">
            <li>
              <label htmlFor="email" className="flex flex-col space-y-2">
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <p className="text-base">이메일</p>
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
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
                  {...register("email", {
                    required: "이메일을 입력해주세요.",
                    pattern: {
                      value: emailRegex,
                      message: "이메일 형식이 아닙니다.",
                    },
                  })}
                  disabled={isEmailVerified}
                  type="email"
                  id="email"
                  className="w-full rounded-md bg-gray-100 p-4 outline-none"
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
                  className="w-full rounded-md bg-gray-100 p-4 pr-14 outline-none"
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
                htmlFor="passwordCheck"
                className="relative flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <p className="text-base">비밀번호 확인</p>
                  {errors.passwordCheck && (
                    <p className="text-red-500 text-sm">
                      {errors.passwordCheck.message}
                    </p>
                  )}
                </div>
                <input
                  {...register("passwordCheck", {
                    required: "비밀번호를 확인해주세요.",
                    validate: (value) => {
                      return (
                        value === watch("password") ||
                        "비밀번호가 일치하지 않습니다."
                      );
                    },
                  })}
                  type={isMasked ? "password" : "text"}
                  id="passwordCheck"
                  className="w-full rounded-md bg-gray-100 p-4 pr-14 outline-none"
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
