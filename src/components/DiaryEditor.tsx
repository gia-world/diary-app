import React, { useCallback, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getStringDate } from "../utill/date";
import { emotionList } from "../utill/emotion";

import EmotionItem from "./EmotionItem";
import Button from "./Button";
import Header from "./Header";
import { DiaryDispatch, DiaryDispatchContext } from "../App";

const DiaryEditor = () => {
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState<string>(getStringDate(new Date())); // input-date 에 저장되는 내용
  // console.log(date);

  const { onCreate, onEdit, onRemove } = useContext(
    DiaryDispatchContext as React.Context<DiaryDispatch>
  );

  // DiaryDispatchContext를 강제로 !null 하였으므로 혹시 모를 상황 대비
  if (!DiaryDispatchContext) throw new Error("DiaryDispatchContext is missing");

  const handleClickEmote = useCallback((emotion: number) => {
    setEmotion(emotion);
  }, []);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current?.focus();
      return;
    }

    // 일기를 작성하면 앱 컴포넌트가 가지고 있는 데이터 스테이트에 일기 데이터를 추가하기
    // provider로 공급을 했기 때문에-
    onCreate(date, content, emotion);
  };

  return (
    <div className="DiaryEditor">
      <Header
        headerText=""
        left={<Button text={"< Back"} onClick={() => navigate(-1)} />}
        right={<Button text={""} onClick={() => console.log("clicked")} />}
      />
      <div>
        <section>
          <h4>The date of today</h4>
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
        <section>
          <h4>Today's diary</h4>
          <div className="input-box">
            <textarea
              className="input-content"
              placeholder="How was your today?"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="btn-wrap">
            <Button text={"Back"} onClick={() => navigate(-1)} />
            <Button text={"Done"} type={"positive"} onClick={handleSubmit} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
