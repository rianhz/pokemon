import { TInitialState } from "@/types/redux";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TInitialState = {
  username: "",
  dataQuestions: [],
  score: 0,
};

export const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    addToResult: (state, action) => {
      state.dataQuestions.push(action.payload);

      const { picked, answer } = action.payload;

      if (picked.name === answer.name) {
        state.score = state.score + 10;
      }
    },
    resetResult: (state) => {
      state.dataQuestions = [];
      state.score = 0;
      state.username = "";
    },
  },
});

export const { addToResult, resetResult } = resultSlice.actions;
export default resultSlice.actions;
