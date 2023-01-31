import { useState, useEffect } from "react";
import { useAppSelector } from "../../../store/hooks";
import { quizList, answerList } from "../../../store/quiz/selectors";

function Final() {
  const quizData = useAppSelector(quizList);
  const answerData = useAppSelector(answerList);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let tempScore: number = 0;
    for (let i = 0; i < quizData?.length; i++) {
      if (quizData[i]?.correct_answer === answerData[i]?.answer) {
        ++tempScore;
      }
    }
    setScore(tempScore);
  }, []);

  return (
    <div className="container">
      <div className="final-container">
        <img src="/cup.png" width={100} height={100} />
        <h2>Congratulation!</h2>

        <h4>Score: {score}</h4>

        <a href="/quiz" className="reStartBtn">
          Restart
        </a>
      </div>
    </div>
  );
}

export default Final;
