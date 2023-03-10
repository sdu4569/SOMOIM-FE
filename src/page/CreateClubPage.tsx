import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import HeaderBackButton from "../components/HeaderBackButton";
import PageHeader from "../components/PageHeader";

interface CreateClubForm {
  location: string;
  clubName: string;
  description: string;
  maxMember: number;
}

export default function CreateClub() {
  const { register, handleSubmit, watch } = useForm<CreateClubForm>();

  const onSubmit = (data: CreateClubForm) => {
    console.log(data);
  };

  return (
    <div className="overflow-scroll h-full">
      <PageHeader>
        <div className="flex space-x-4 items-center">
          <HeaderBackButton />
          <h1>클럽 개설</h1>
        </div>
      </PageHeader>
      <section className="mt-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <label htmlFor="location" className="flex items-center">
            <div className="flex space-x-2 w-24 items-center">
              <FontAwesomeIcon icon={faLocation} />
              <p>지역</p>
            </div>
            <input
              type="text"
              id="location"
              className="rounded-md p-2 bg-gray-300 flex-1 outline-none"
              placeholder="동&middot;읍&middot;면 찾기"
              {...register("location")}
            />
          </label>
          <label htmlFor="clubName" className="flex items-center">
            <input
              type="text"
              id="clubName"
              className="rounded-md p-2 bg-gray-300 flex-1 outline-none"
              placeholder="클럽 이름"
              {...register("clubName")}
            />
          </label>
          <textarea
            {...register("description")}
            placeholder="클럽 목표를 설명해주세요."
            cols={30}
            rows={8}
            className="rounded-md outline-none resize-none bg-gray-300 p-4 leading-4"
          ></textarea>
          <label className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faUser} size="2xl" />
              <p>정원(300 ~ 300명)</p>
            </div>
            <input
              {...register("maxMember")}
              defaultValue={300}
              type="number"
              className="p-2 none rounded-md bg-gray-300 outline-none w-16 appearance-none text-center"
            />
          </label>
          <Button type="submit" className="w-full">
            클럽 만들기
          </Button>
        </form>
      </section>
    </div>
  );
}
