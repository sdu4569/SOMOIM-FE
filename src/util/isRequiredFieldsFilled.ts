import { User } from "@/libs/types";

export default function isUserRequiredFieldsFilled(user: User) {
  const { name, birth, gender, area } = user;

  return name && birth && gender && area;
}
