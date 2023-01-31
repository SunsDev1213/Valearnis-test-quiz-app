import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { quizList, quizIndex, answerList } from "../../../store/quiz/selectors";
import { updateIndex, updatedAnswer } from "../../../store/quiz";

const decodeHTML = function (html: any) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

function Question() {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const quizData = useAppSelector(quizList);
  const answerData = useAppSelector(answerList);
  const questionIndex = useAppSelector(quizIndex);

  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState<any>([]);
  const [submitAnswers, setSubmitAnswers] = useState(answerData);
  const [answerSelected, setAnswerSelected] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const question: any = questions[questionIndex];

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const handleLast = () => {
    if (questionIndex !== 0) {
      dispatch(updateIndex(questionIndex - 1));
    }
  };

  const handleNext = () => {
    if (questionIndex + 1 < quizData?.length && answerSelected) {
      dispatch(updateIndex(questionIndex + 1));
      setAnswerSelected(false);
    }

    if (
      answerData?.length === quizData?.length &&
      questionIndex + 1 === quizData?.length &&
      answerSelected
    ) {
      history.push("/final");
    }
  };

  const handleItemClick = (data: any) => {
    setAnswerSelected(true);
    setSelectedAnswer(data);

    const submitData = {
      id: questionIndex,
      answer: data,
    };
    if (answerData?.find((data: any) => data?.id === questionIndex)) {
      setSubmitAnswers(
        answerData?.map((item: any) =>
          item?.id === submitData?.id
            ? {
                ...item,
                answer: data,
              }
            : item
        )
      );
    } else {
      setSubmitAnswers([...submitAnswers, submitData]);
    }
  };

  useEffect(() => {
    const decodedQuestions = quizData.map((item: any) => {
      return {
        ...item,
        question: decodeHTML(item.question),
        correct_answer: decodeHTML(item.correct_answer),
        incorrect_answers: item.incorrect_answers.map((a: any) =>
          decodeHTML(a)
        ),
      };
    });

    setQuestions(decodedQuestions);
  }, [quizData]);

  useEffect(() => {
    if (!question) {
      return;
    }
    let answers = [...question?.incorrect_answers];
    answers.splice(
      getRandomInt(question?.incorrect_answers.length),
      0,
      question?.correct_answer
    );

    setOptions(answers);
  }, [question]);

  useEffect(() => {
    dispatch(updatedAnswer(submitAnswers));
  }, [submitAnswers]);

  useEffect(() => {
    if (answerData?.find((data: any) => data?.id === questionIndex)) {
      setAnswerSelected(true);
    }
  }, [questionIndex]);

  return (
    <div className="sub-container">
      <p className="questionId">Question {questionIndex + 1}</p>
      <h3>{question?.question}</h3>
      <ul>
        {options?.map((option: any, key: any) => (
          <li key={key} onClick={() => handleItemClick(option)}>
            <div
              className={
                selectedAnswer === option ||
                answerData?.find((item: any) => item?.answer === option)
                  ? "activeId"
                  : "id"
              }
            >
              {key + 1}
            </div>
            <div
              className={
                selectedAnswer === option ||
                answerData?.find((item: any) => item?.answer === option)
                  ? "activeText"
                  : ""
              }
            >
              {option}
            </div>
          </li>
        ))}
      </ul>
      <div className="btnDiv">
        <button className="nextBtn" onClick={handleLast}>
          Back
        </button>
        <button className="nextBtn" onClick={handleNext}>
          {answerData?.length === quizData?.length &&
          answerSelected &&
          questionIndex + 1 === quizData?.length
            ? "Submit"
            : "Next"}
        </button>
      </div>
    </div>
  );
}

export default Question;
