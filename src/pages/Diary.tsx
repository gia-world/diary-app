import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Data, DiaryStateContext } from "../App";
import Button from "../components/Button";
import Header from "../components/Header";
import { getStringDate } from "../utill/date";
import { emotionList } from "../utill/emotion";

const Diary = () => {
  const { diaryId } = useParams();
  const id = Number(diaryId);
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState<Data>();

  useEffect(() => {
    const targetDiary = diaryList && diaryList.find((it) => it.id === id);
    if (targetDiary) {
      //일기가 존재할 때
      setData(targetDiary);
    } else {
      //일기가 없을 때
      alert("There's no specific diary!");
      navigate("/", { replace: true });
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">Loading...</div>;
  } else {
    // 감정 이모티콘에 따른 감정 설명 불러오기
    const curEmotionData = emotionList.find((it) => it.emotion_id === data.emotion);

    //? curEmotionData가 없을 수 있으니까
    if (!curEmotionData) {
      return <div className="DiaryPage">Loading...</div>;
    } else {
      return (
        <div className="DiaryPage">
          <Header
            headerText={`${getStringDate(new Date(data.date))}`}
            left={<Button text={"< Back"} onClick={() => navigate(-1)} />}
            right={<Button text={"Edit"} onClick={() => navigate(`/edit/${data.id}`)} />}
          />
          <article>
            <section>
              <h4>Emotion of the day</h4>
              <div className={["img-wrap", `emotion-img${data.emotion}`].join(" ")}>
                <img src={curEmotionData.emotion_url} alt={curEmotionData.emotion_descript} />
                <div className="desc">{curEmotionData.emotion_descript}</div>
              </div>
            </section>
            <section>
              <h4>Diary of the day</h4>
              <div className="content-wrap">
                <p>{data.content}</p>
              </div>
            </section>
          </article>
        </div>
      );
    }
  }
};

export default Diary;
