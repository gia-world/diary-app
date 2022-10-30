import React, { useEffect } from "react";
import DiaryEditor from "../components/DiaryEditor";

const New = () => {
  useEffect(() => {
    const titleEl = document.getElementsByTagName("title")[0];
    titleEl.innerHTML = `Emotion Diary - new diary`;
  }, []);

  return (
    <div>
      <DiaryEditor />
    </div>
  );
};

export default New;
