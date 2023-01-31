import React from "react";

// Components
import Question from "./components/Question";

// Store
import { useAppDispatch } from "../../store/hooks";
import { getQuiz } from "../../store/quiz";

function Quiz() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getQuiz());
  }, []);

  return (
    <div className="container">
      <Question />
    </div>
  );
}

export default Quiz;
