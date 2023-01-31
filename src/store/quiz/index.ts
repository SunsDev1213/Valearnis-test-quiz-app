import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getQuiz } from "./actions";
import type { QuizState } from "./types";

const PREFIX = "quiz";

const initialState: QuizState = {
  quizList: [],
  answerList: [],
  index: 0,
  score: 0,
};

export const quizSlice = createSlice({
  name: PREFIX,
  initialState,
  reducers: {
    updateIndex(state: QuizState, action: PayloadAction<any>) {
      state.index = action.payload;
    },
    updateScore(state: QuizState, action: PayloadAction<any>) {
      state.score = action.payload;
    },
    updatedAnswer(state: QuizState, action: PayloadAction<any>) {
      state.answerList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getQuiz.fulfilled.type,
      (state: QuizState, action: PayloadAction<any>) => {
        state.quizList = action.payload;
      }
    );
  },
});

export { getQuiz };

export const { updateIndex, updateScore, updatedAnswer } = quizSlice.actions;

export default quizSlice.reducer;
