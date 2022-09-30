import React, { useState } from "react";
import { Data } from "../App";

const sortOptionList = [
  { value: "latest", name: "latest" },
  { value: "oldest", name: "oldest" },
];

const filterOptionList = [
  { value: "all", name: "All" },
  { value: "good", name: "Good emotion only" },
  { value: "bad", name: "Bad emotion only" },
];

type ControlType={
    // value:string;
    // onChange:React.FC;
    // optionList:[]
     value: "latest"|"oldest"|"all"|"good"|"bad";
     onChange: (e:React.ChangeEventHandler<HTMLSelectElement>) => void;
     optionList: { value: "latest"|"oldest"|"all"|"good"|"bad"; name: string; }[]; 
}
const ControlMenu = React.memo(({ value, onChange, optionList }:ControlType) => {
  // 컴포넌트를 감싸면, 강화된 컴포넌트를 돌려주는 고착 컴포넌트
  // 전달 받는 props의 값이 바뀌지 않으면 렌더링이 일어나지 않음
  // useEffect(() => {
  //   console.log("Control menu");
  // });
  return (
    <select className="ControlMenu" value={value} onChange={(e) => onChange(e.currentTarget.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

type DiaryList = {
  diaryList: Data[];
};
const DiaryList = ({ diaryList }: DiaryList) => {
    const [sortType, setSortType] = useState<HTMLSelectElement|string>("latest");
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
