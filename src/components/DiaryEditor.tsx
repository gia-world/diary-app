import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getStringDate } from "../utill/date";
import { emotionList } from "../utill/emotion";

import EmotionItem from "./EmotionItem";
import Button from "./Button";
import Header from "./Header";

const DiaryEditor = () => {
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState<string>(getStringDate(new Date())); // input-date 에 저장되는 내용
  // console.log(date);

  const handleClickEmote = useCallback((emotion: number) => {
    setEmotion(emotion);
  }, []);

  const navigate = useNavigate();
  return (
    <div className="DiaryEditor">
      <Header
        headerText=""
        left={<Button text={"< Back"} onClick={() => navigate(-1)} />}
        right={<Button text={""} onClick={() => console.log("clicked")} />}
      />
      <div>
        <section>
          <h4>What's the date of today?</h4>
          <div className="input-box">
            <input
              className="input-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
        <section>
          <h4>Emotion Scale</h4>
          <div className="input-box list-wrap">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
