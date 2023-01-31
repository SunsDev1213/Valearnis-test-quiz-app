import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getQuiz = createAsyncThunk("get/quiz/list", async () => {
  const response = await axios.get(
    "https://opentdb.com/api.php?amount=5&category=21&difficulty=hard&type=multiple"
  );
  return response?.data?.results;
});
