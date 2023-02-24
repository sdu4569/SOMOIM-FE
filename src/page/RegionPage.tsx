import { useForm } from "react-hook-form";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

const RegionPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form action="">
      <PageHeader
        back
        title="내 지역"
        next="저장"
        onNext={() => console.log("저장")}
      />
      <section>
        <header className="my-8">
          <span className="text-black text-xl">
            집, 직장 인근의 클럽을 찾습니다.
          </span>
        </header>
        <ul className="flex flex-col space-y-4">
          <li>
            <label htmlFor="home" className="flex justify-between space-x-4">
              <div className="flex space-x-2 items-center">
                <FontAwesomeIcon
                  icon={faHouseUser}
                  className="text-black text-xl w-10"
                />
                <span className="text-black text-xl w-20">집</span>
              </div>
              <input
                id="home"
                type="text"
                {...register("location", { required: true })}
                placeholder="필수"
                className="rounded-md bg-gray-300 text-black outline-none p-4 flex-1"
              />
            </label>
          </li>
          <li>
            <label htmlFor="work" className="flex justify-between space-x-4">
              <div className="flex space-x-2 items-center">
                <FontAwesomeIcon
                  icon={faBriefcase}
                  className="text-black text-xl w-10"
                />
                <span className="text-black text-xl w-20">직장</span>
              </div>
              <input
                id="work"
                type="text"
                {...register("work")}
                placeholder="권장"
                className="rounded-md bg-gray-300 text-black outline-none p-4 flex-1"
              />
            </label>
          </li>
          <li>
            <label
              htmlFor="interested"
              className="flex justify-between space-x-4"
            >
              <div className="flex space-x-2 items-center">
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-black text-xl w-10"
                />
                <span className="text-black text-xl w-20">관심지역</span>
              </div>
              <input
                id="interested"
                type="text"
                {...register("interested")}
                placeholder="선택"
                className="rounded-md bg-gray-300 text-black outline-none p-4 flex-1"
              />
            </label>
          </li>
        </ul>
      </section>
    </form>
  );
};

export default RegionPage;
