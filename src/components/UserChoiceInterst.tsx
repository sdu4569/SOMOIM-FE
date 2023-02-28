import { useEffect, useState } from "react";

const UserChoiceInterest = () => {
  const [userChoice, setUserChoice] = useState<any[]>([]);
  useEffect(() => {
    let getItem = localStorage.getItem("userChoice");
    if (getItem !== null) {
      setUserChoice(JSON.parse(getItem));
    }
  }, []);
  return userChoice;
};

export default UserChoiceInterest;
