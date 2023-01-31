import type { RootState } from "../store";

// Other code such as selectors can use the imported `RootState` type
export const quizList = (state: RootState) => state.quizInfo.quizList;
export const answerList = (state: RootState) => state.quizInfo.answerList;
export const quizIndex = (state: RootState) => state.quizInfo.index;
