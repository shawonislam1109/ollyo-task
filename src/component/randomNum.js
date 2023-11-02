const useRandomIdGenerator = (inputString, idLength) => {
  const generateRandomId = () => {
    let randomNum = "";
    for (let i = 0; i < idLength; i++) {
      const index = Math.floor(Math.random() * inputString.length);
      randomNum += inputString[index];
    }
    return randomNum;
  };
  const getRandomId = () => generateRandomId();
  return getRandomId;
};

export default useRandomIdGenerator;
