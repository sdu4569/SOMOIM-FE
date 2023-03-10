const getUserChoiceInterest = () => {
  let getItem = localStorage.getItem("userChoice");
  if (getItem !== null) {
    const parsed = JSON.parse(getItem);
    return parsed;
  }

  return [];
};

export default getUserChoiceInterest;
