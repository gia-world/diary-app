import React, { useEffect, useReducer, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import New from "./pages/New";

// interface Action<P> {
//   readonly type: string;
//   readonly payload: P;
// }

// type Action2 =
//   | { type: "INIT"; payload: number }
//   | { type: "CREATE"; payload: Diary }
//   | { type: "REMOVE"; payload: number }
//   | { type: "EDIT"; payload: Diary };
// type Diary = {
//   data: string;
//   id: number;
//   emotion:number;
// };
// type Diarys=Diary[]
export type Data = {
  id?: number;
  date?: number;
  content?: string;
  emotion?: number;
  targetId?: number;
};
export type State = Data[];
type Action =
  | { type: "INIT"; data: State }
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
      // const newItem = { ...action.data };
      // newState = [newItem, ...state];
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

type DiaryDispatch = {
  onCreate: (date: number, content: string, emotion: number) => void;
  onEdit: (
    targetId: number,
    date: number,
    content: string,
    emotion: number
  ) => void;
  onRemove: (targetId: number) => void;
};
export const DiaryStateContext = React.createContext<State | null>(null);
export const DiaryDispatchContext = React.createContext<DiaryDispatch | null>(
  null
);

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

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);

  useEffect(() => {
    const localData = localStorage.getItem("diary");
    if (localData) {
      const diaryList = JSON.parse(localData).sort(
        (a: { id: string }, b: { id: string }) =>
          parseInt(b.id) - parseInt(a.id)
      ); //내림차순 정렬

      if (diaryList.length >= 1) {
        dataId.current = parseInt(diaryList[0].id) + 1;
        dispatch({ type: "INIT", data: diaryList });
      }
      console.log(diaryList);
    }
  }, []);

  //CREATE
  const dataId = useRef(0);
  const onCreate = (date: number, content: string, emotion: number) => {
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
  const onRemove = (targetId: number) => {
    dispatch({ type: "REMOVE", targetId });
  };

  //EDIT
  const onEdit = (
    targetId: number,
    date: number,
    content: string,
    emotion: number
  ) => {
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
