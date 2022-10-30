import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Data, DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const [originData, setOriginData] = useState<Data>();
  const navigate = useNavigate();
  console.log(useParams());
  const { listId } = useParams();
  // useParams 는 자동으로 타입이 string|undefined 지정됨
  const id = Number(listId);

  useEffect(() => {
    const titleEl = document.getElementsByTagName("title")[0];
    titleEl.innerHTML = `Emotion Diary - Editing the diary no.${id}`;
  }, []);

  //data state에 있는 일기 목록 가져오기
  const diaryList = useContext(DiaryStateContext);
  // console.log(diaryList);

  // Edit component가 마운트되었을 때
  // diaryList를 가져오고, 그 중 id가 일치하는 데이터 가져오기
  useEffect(() => {
    if (diaryList && diaryList.length >= 1) {
      const targetDiary = diaryList.find((it) => it.id === id);
      // console.log(targetDiary);

      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        // undefined 일때 = falsy 값 , id가 잘못 전달 되었을때
        alert("There's no diary for this id.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
