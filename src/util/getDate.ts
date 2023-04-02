export const getDate = (e: number) => {
  let d = new Date(e);
  let month = d.getMonth() + 1;
  let date = d.getDate();
  let hour: number | string = d.getHours();
  let minute: number | string = d.getMinutes();
  let amPm = hour >= 12 ? "오후" : "오전";
  hour =
    hour > 12
      ? hour - 12 >= 10
        ? hour - 12
        : `0${hour - 12}`
      : hour >= 10
      ? hour
      : `0${hour}`;
  minute = minute < 10 ? `0${minute}` : minute;
  return month + "월 " + date + "일 " + amPm + " " + hour + ":" + minute;
};
