import React from "react";

type Props = {
  emotion_id: number;
  emotion_url: string;
  emotion_descript: string;
  onClick: (i: number) => void;
  isSelected: boolean;
};
const EmotionItem = ({
  emotion_id,
  emotion_url,
  emotion_descript,
  onClick,
  isSelected,
}: Props) => {
  return (
    <div
      className={[
        "EmotionItem",
        isSelected ? `emotion-img${emotion_id}` : `EmotionItem__off`,
      ].join(" ")}
      onClick={() => onClick(emotion_id)}
    >
      <img src={emotion_url} alt={emotion_descript} />
      <span>{emotion_descript}</span>
    </div>
  );
};

export default React.memo(EmotionItem);
