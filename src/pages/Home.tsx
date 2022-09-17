import React, { useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";

interface home{

}

const Home = () => {
  const [curDate, setCurDate] = useState(new Date());
  const headerText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
  
  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };
  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  return (
    <>
      <Header headerText={headerText} left={<Button text={"<"} onClick={decreaseMonth}/>} right={<Button text={">"} onClick={increaseMonth}/>} />
    </>
  );
};

export default Home;
