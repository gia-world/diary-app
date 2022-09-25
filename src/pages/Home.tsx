import React, { useContext, useEffect, useState } from "react";
import { Data, DiaryStateContext, State } from "../App";
import Button from "../components/Button";
import Header from "../components/Header";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);
  console.log(diaryList);

  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const headerText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  useEffect(() => {
    const firstDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth(),
      1
    ).getTime();
    const lastDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth() + 1,
      0
    ).getTime();

    setData(
      diaryList?.filter(
        (it: State) => firstday <= it.date && it.date <= lastDay
      )
    );
  }, [curDate]);

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
      <Header
        headerText={headerText}
        left={<Button text={"<"} onClick={decreaseMonth} />}
        right={<Button text={">"} onClick={increaseMonth} />}
      />
    </>
  );
};

export default Home;
