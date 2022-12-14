import React, { useContext, useEffect, useState } from "react";
import { Data, DiaryStateContext } from "../App";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import Header from "../components/Header";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState<Data[]>([]);
  const [curDate, setCurDate] = useState(new Date());
  // const headerText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
  // 영문으로 바꾸기
  const headerText = `${
    monthNames[curDate.getMonth()]
  } ${curDate.getFullYear()}`;

  useEffect(() => {
    const titleEl = document.getElementsByTagName("title")[0];
    titleEl.innerHTML = `Emotion Diary`;
  }, []);

  // 해당 월의 일기만 가져오기
  useEffect(() => {
    if (diaryList && diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();
      const lastDay = new Date(
        //시간 객체를 사용할 때는 시분초까지 영향이 있음
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();

      setData(
        diaryList.filter(
          (it) => it && it.date && firstDay <= it.date && it.date <= lastDay
        )
      );
    }
  }, [diaryList, curDate]);

  // data가 제대로 들어오는지 확인
  // useEffect(() => {
  //   console.log(data);
  // });

  // 월 설정 버튼 함수
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
      <DiaryList diaryList={data} />
    </>
  );
};

export default Home;
