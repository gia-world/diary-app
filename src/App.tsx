import React, { useEffect, useReducer, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import New from "./pages/New";

export type Data = {
  id?: number;
  date?: number;
  content?: string;
  emotion?: number;
  targetId?: number;
};
export type State = Data[];
type Action =
  | { type: "INIT"; data: Data[] }
  | { type: "CREATE"; data: Data }
  | { type: "REMOVE"; id?: number; targetId: number }
  | { type: "EDIT"; data: Data };

const reducer = (state: State, action: Action): State => {
  let newState: State = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1",
    date: 1664094313430,
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의 일기 2",
    date: 1664094313431,
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의 일기 3",
    date: 1664094313432,
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기 4",
    date: 1664094313433,
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의 일기 5",
    date: 1664094313434,
  },
];

type OnCreate = (date: number, content: string, emotion: number) => void;
type OnEdit = (
  targetId: number,
  date: number,
  content: string,
  emotion: number
) => void;
type OnRemove = (targetId: number) => void;
type DiaryDispatch = {
  onCreate: OnCreate;
  onEdit: OnEdit;
  onRemove: OnRemove;
};
export const DiaryStateContext = React.createContext<State | null>(null);
export const DiaryDispatchContext = React.createContext<DiaryDispatch | null>(
  null
);

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);

  //CREATE
  const dataId = useRef(0);
  const onCreate: OnCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  //REMOVE
  const onRemove: OnRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  //EDIT
  const onEdit: OnEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  // useEffect(() => {
  //   const localData = localStorage.getItem("diary");
  //   if (localData) {
  //     const diaryList = JSON.parse(localData).sort(
  //       (a: { id: number }, b: { id: number }) =>
  //         parseInt(String(b.id)) - parseInt(String(a.id))
  //     ); //내림차순 정렬

  //     if (diaryList.length >= 1) {
  //       dataId.current = parseInt(diaryList[0].id) + 1;
  //       dispatch({ type: "INIT", data: diaryList });
  //     }
  //     console.log(diaryList);
  //   }
  // }, []);

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
