import {
  faCalendar,
  faClock,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faLocation, faWonSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm, Controller } from "react-hook-form";
import Button from "@/components/Button";
import HeaderBackButton from "@/components/HeaderBackButton";
import PageHeader from "@/components/PageHeader";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";

import "react-datepicker/dist/react-datepicker.css";
import useMutation from "@/hooks/useMutation";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { formatDate, formatTime } from "@/util/formatActivityTime";
import { ActivityForm } from "@/libs/types";
import { useEffect } from "react";

import { motion } from "framer-motion";
import { pageSlideIn } from "@/libs/variants";
import Spinner from "@/components/Spinner";
import { mutate } from "swr";
import Overlay from "@/components/Overlay";

export default function EditActivity() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isValid },
  } = useForm<ActivityForm>({
    defaultValues: {
      ...location.state.activity,
      date: new Date(location.state.activity.activityTime),
      time: location.state.activity.activityTime.substring(11, 16),
    },
  });
  const { clubId } = useParams();

  const { mutate: editActivity, isLoading: editLoading } = useMutation(
    `clubs/activities/${location.state.activity.id}`,
    {
      authorized: true,
      method: "PATCH",
    }
  );

  const onSubmit = async (data: ActivityForm) => {
    if (editLoading) {
      return;
    }

    const response = await editActivity({
      title: data.title,
      activityTime: formatDate(data.date).YYYYMMDD + "T" + data.time + ":00",
      fee: data.fee,
      location: data.location,
      memberLimit: data.memberLimit,
    });

    if (response.ok) {
      await mutate(`clubs/${clubId}/activities`);
      navigate(-1);
    } else {
      alert(response.message || "알 수 없는 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (location && !location.state) {
      alert("잘못된 접근입니다.");
      navigate(-1);
    }
  }, [location]);

  return (
    <>
      {editLoading && (
        <Overlay>
          <Spinner size="lg" />
        </Overlay>
      )}
      <motion.div
        variants={pageSlideIn}
        initial="initial"
        animate="animate"
        className="overflow-scroll h-full p-4"
      >
        <PageHeader className="!bg-gray-100">
          <div className="flex space-x-4 items-center">
            <HeaderBackButton />
            <h1>C.A 스케줄 추가</h1>
          </div>
        </PageHeader>
        <section className="mt-12">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <label htmlFor="title" className="flex items-center">
              <input
                type="text"
                id="title"
                className="rounded-md p-2 bg-gray-100 flex-1 outline-none"
                placeholder="C.A 제목을 입력하세요."
                {...register("title", { required: true })}
              />
            </label>
            <div className="justify-between flex">
              <div className="flex flex-col space-y-4 w-full">
                <label htmlFor="date" className="flex items-center space-x-4">
                  <FontAwesomeIcon
                    icon={faCalendar}
                    size="xl"
                    className="w-6"
                  />
                  <div className="flex-1">
                    <Controller
                      control={control}
                      name="date"
                      rules={{ required: true }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <DatePicker
                          id="date"
                          placeholderText="12월 31일 (일)"
                          className="rounded-md p-2 bg-gray-100 w-full outline-none"
                          onChange={onChange}
                          onBlur={onBlur}
                          selected={value}
                          locale={ko}
                          dateFormat="MM월 dd일 (EEE)"
                          minDate={new Date()}
                        />
                      )}
                    />
                  </div>
                </label>
                <label htmlFor="time" className="flex items-center space-x-4">
                  <FontAwesomeIcon icon={faClock} size="xl" className="w-6" />
                  <input
                    type="time"
                    id="time"
                    className="rounded-md p-2 bg-gray-100 flex-1 outline-none"
                    {...register("time", { required: true })}
                  />
                </label>
              </div>
              <div className="border ml-8 w-32 text-gray-400 rounded-md p-2 flex flex-col justify-center items-center">
                <p className="text-sm">
                  {watch("date")
                    ? formatDate(watch("date")).dayOfWeekLabel
                    : "일요일"}
                </p>
                <p className="text-2xl">
                  {watch("date") ? formatDate(watch("date")).day : "31"}
                </p>
                <p className="text-xs">{formatTime(watch("time"))}</p>
              </div>
            </div>
            <label htmlFor="location" className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faLocation} size="xl" className="w-6" />
              <input
                placeholder="위치를 입력하세요."
                type="text"
                id="location"
                className="rounded-md p-2 bg-gray-100 flex-1 outline-none"
                {...register("location", { required: true })}
              />
            </label>
            <label htmlFor="fee" className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faWonSign} size="xl" className="w-6" />
              <input
                placeholder="식사비 15000원"
                type="text"
                id="fee"
                className="rounded-md p-2 bg-gray-100 flex-1 outline-none"
                {...register("fee", { required: true })}
              />
            </label>
            <label className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faUser} size="2xl" />
                <p>정원(5 ~ 300명)</p>
              </div>
              <input
                type="number"
                {...register("memberLimit", {
                  required: true,
                  min: 5,
                  max: 300,
                })}
                className="p-2 rounded-md bg-gray-100 outline-none w-16 appearance-none text-center"
              />
            </label>
            <Button
              className={`w-full ${!isValid && "!bg-gray-500 cursor-default"}`}
            >
              C.A 스케줄 추가
            </Button>
          </form>
        </section>
      </motion.div>
    </>
  );
}
