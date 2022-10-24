import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import { getStringDate } from "../utill/date";
import { emotionList } from "../utill/emotion";

import EmotionItem from "./EmotionItem";
import Button from "./Button";
import Header from "./Header";
import { Data, DiaryDispatch, DiaryDispatchContext } from "../App";

type Props = {
  isEdit?: boolean;
  originData?: Data;
};

const DiaryEditor = ({ isEdit, originData }: Props) => {
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

    if (
      window.confirm(
        isEdit ? "Are you editing current one?" : "Are you creating new one?"
      )
    ) {
      if (!isEdit) {
        // 새 일기 작성일 때
        // 일기를 작성하면 앱 컴포넌트가 가지고 있는 데이터 스테이트에 일기 데이터를 추가하기
        // provider로 공급을 했기 때문에-
        onCreate(date, content, emotion);
      } else if (isEdit && originData) {
        // 일기 수정일 때
        onEdit(originData.id, date, content, emotion);
      }
    }

    navigate("/", { replace: true });
  };

  // 일기 수정할 때 기존 데이터 가져오기
  useEffect(() => {
    if (originData && isEdit) {
      setDate(getStringDate(new Date(originData.date)));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  // 일기 삭제
  const handleRemove = () => {
    if (window.confirm("Are you sure to delete it?") && originData) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="DiaryEditor">
      <Header
        headerText={isEdit ? "Edit" : "New"}
        left={<Button text={"< Back"} onClick={() => navigate(-1)} />}
        right={
          isEdit && (
            <Button text={"Delete"} type={"negative"} onClick={handleRemove} />
          )
        }
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
