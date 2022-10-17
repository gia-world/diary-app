import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Data } from "../App";
import Button from "./Button";
import ControlMenu from "./ControlMenu";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: "latest", name: "latest" },
  { value: "oldest", name: "oldest" },
];

const filterOptionList = [
  { value: "all", name: "Emotion all" },
  { value: "good", name: "Good one only" },
  { value: "bad", name: "Bad one only" },
];

type DiaryListType = {
  diaryList: Data[];
};
const DiaryList = ({ diaryList }: DiaryListType) => {
  const navigate = useNavigate();

  const [sortType, setSortType] = useState<string>("latest");
  const [filter, setFilter] = useState("all");

  // 분기를 나눠 정렬된 리스트 반환하기
  // type getProcessedDiaryListType = () => Data[]; //?
  // 함수의 타입을 줄 필요 없음,
  // copyList가 깊은 복사를 하면서 타입이 해제되었기 때문
  const getProcessedDiaryList = () => {
    //깊은 복사, 원본을 건들지 않기 위해
    const copyList: Data[] = JSON.parse(JSON.stringify(diaryList));

    const filteredList =
      filter === "all"
        ? copyList
        : copyList.filter((it: Data) => filterCallBack(it));

    const sortedList = filteredList.sort(compare);
    return sortedList;

    // 필터링 함수 만들기
    function filterCallBack(item: Data) {
      if (item.emotion) {
        if (filter === "good") {
          return item.emotion <= 3;
        } else {
          return item.emotion > 3;
        }
      }
    }

    // 객체로 이루어진 배열 데이터를 정렬할 때는 비교함수 만들기
    function compare(a: { date: number }, b: { date: number }) {
      if (sortType === "latest") {
        // return parseInt(b.date) - parseInt(a.date);
        // 타입 지정을 하니까 parseInt 쓸 필요 없음
        return b.date - a.date;
      } else {
        return a.date - b.date;
      }
    }
  };

  return (
    <div className="DiaryList">
      <nav>
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <Button
            type={"positive"}
            text={"Create"}
            onClick={() => navigate("/new")}
          />
        </div>
      </nav>
      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};
DiaryList.defaultProps = {
  diaryList: [],
};
export default DiaryList;
