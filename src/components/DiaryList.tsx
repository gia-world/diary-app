import React, { useState } from "react";
import { Data } from "../App";
import ControlMenu from "./ControlMenu";

const sortOptionList = [
  { value: "latest", name: "latest" },
  { value: "oldest", name: "oldest" },
];

const filterOptionList = [
  { value: "all", name: "All" },
  { value: "good", name: "Good emotion only" },
  { value: "bad", name: "Bad emotion only" },
];

type DiaryListType = {
  diaryList: Data[];
};
const DiaryList = ({ diaryList }: DiaryListType) => {
  const [sortType, setSortType] = useState<string>("latest");
  const [filter, setFilter] = useState("all");
  return (
    <div>
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
      {diaryList.map((it) => (
        <div key={it.id}>{it.content}</div>
      ))}
    </div>
  );
};
DiaryList.defaultProps = {
  diaryList: [],
};
export default DiaryList;
