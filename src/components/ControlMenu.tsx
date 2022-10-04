import React from "react";

type ControlType = {
  value: string;
  //  onChange: (v:string) => void;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  optionList: {
    value: string;
    name: string;
  }[];
};
const ControlMenu = React.memo(
  ({ value, onChange, optionList }: ControlType) => {
    // 컴포넌트를 감싸면, 강화된 컴포넌트를 돌려주는 고착 컴포넌트
    // 전달 받는 props의 값이 바뀌지 않으면 렌더링이 일어나지 않음
    const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(e.currentTarget.value);
    };
    return (
      <select className="ControlMenu" value={value} onChange={onChangeHandler}>
        {optionList.map((it, idx) => (
          <option key={idx} value={it.value}>
            {it.name}
          </option>
        ))}
      </select>
    );
  }
);

export default ControlMenu;
