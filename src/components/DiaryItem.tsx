import React from "react";
import { useNavigate } from "react-router-dom";
import { Data } from "../App";
import Button from "./Button";

interface DiaryItemType extends Data {
  children: React.ReactNode;
}

const DiaryItem = ({ id, emotion, content, date }: DiaryItemType) => {
  const navigate = useNavigate();

  const strDate = new Date(date).toLocaleDateString();

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };
  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="DiaryItem">
      <div className={["img-wrap", `emotion-img${emotion}`].join(" ")} onClick={goDetail}>
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </div>
      <div className="desc-wrap" onClick={goDetail}>
        <div className="date">
          <strong>{strDate}</strong>
        </div>
        <div className="preview">
            {content.slice(0,25)}
        </div>
      </div>
      <div className="btn-wrap">
        <Button text={"Edit"} onClick={goEdit} />
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
