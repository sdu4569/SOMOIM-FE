import Button from "../components/Button";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import PageHeader from "../components/PageHeader";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [gender, setGender] = useState<number>(0);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <PageHeader title="회원가입" />
      <div>
        <form className="space-y-2" action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-x-2 w-full flex">
            <input
              type="text"
              {...register("name", { required: "이름을 입력해주세요." })}
              placeholder="이름"
              className="flex-1 rounded-md bg-gray-300 text-black outline-none p-4"
            />
            <div className="flex rounded-md border-gray-300 font-bold text-gray-300 border">
              <label
                htmlFor="male"
                className={`p-4 cursor-pointer rounded-md relative ${
                  gender === 1 ? "bg-blue-500" : ""
                }`}
              >
                <input
                  {...register("gender", { required: true })}
                  onChange={() => setGender(1)}
                  value="male"
                  className="absolute invisible"
                  type="radio"
                  id="male"
                ></input>
                남
              </label>
              <label
                htmlFor="female"
                className={`p-4 cursor-pointer rounded-md relative ${
                  gender === 2 ? "bg-blue-500" : ""
                }`}
              >
                <input
                  {...register("gender", { required: true })}
                  onChange={() => setGender(2)}
                  value="female"
                  className="absolute invisible"
                  type="radio"
                  id="female"
                ></input>
                여
              </label>
            </div>
          </div>
          <div className="flex w-full space-x-2">
            <input
              type="date"
              {...register("birthday", { required: true })}
              className="w-1/2 rounded-md bg-gray-300 text-black outline-none p-4"
            />
            <input
              type="text"
              onClick={() => console.log("onlocationclick")}
              {...register("location", { required: true })}
              placeholder="지역"
              className="w-1/2 rounded-md bg-gray-300 text-black outline-none p-4"
            />
          </div>
          <Button className="w-full focus:ring-2 ring-offset-2 focus:ring-blue-500">
            가입하기
          </Button>
        </form>
      </div>
    </>
  );
};

export default SignUpPage;
