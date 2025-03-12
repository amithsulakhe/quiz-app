import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import { setMessage } from "@/store/slices/chatSlice";
import { setAnswer } from "@/store/slices/quizSlice";
import { subjects } from "@/utils/constant";
import quizHelper from "@/utils/helperfunctions";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Error from "./error";
import Loader from "./loader";
import QuestionPage from "./QuestionPage";
import SystemPage from "./SystemPage";
import UserPage from "./UserPage";
import Validator from "./validator";

const QuizPage = () => {
  // state
  const [count, setCount] = useState(1);

  //params
  const { subjectCode } = useParams();

  // find subjec name
  const currentSubject = quizHelper.finderFunction(
    subjects,
    "code",
    subjectCode
  )?.title;

  // redux dispatch
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.chat);
  const { answers, isSubmitted } = useSelector((state) => state.quiz);

  // custom fetch
  const { loading, error, questions, isValidated } = useFetch(
    subjectCode,
    dispatch
  );

  const currentQuestion = questions[count - 1];

  useEffect(() => {
    if (currentQuestion) {
      dispatch(
        setMessage({
          sender: "question",
          content: currentQuestion,
          type: "text",
        })
      );
    }
  }, [currentQuestion, dispatch]);

  // Don't render anything until validation is complete
  if (!isValidated) {
    return <Validator />;
  }

  // Now we can show loading state for actual quiz data
  if (loading && !error) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const handleAnswerSelect = (questionId, answer) => {
    dispatch(setAnswer({ questionId, answer }));
  };

  // const handleSubmitQuiz = () => {
  //   const score = questions.reduce((acc, q) => {
  //     return acc + (answers[q.id] === q.correct ? 1 : 0);
  //   }, 0);

  //   dispatch(submitQuiz());
   
  // };

  const handleSubmit=()=>{
    dispatch(
      setMessage({
        sender: "user",
        qid: currentQuestion.id,
        content: `${answers[currentQuestion.id]}`,
        timestamp: new Date().toISOString(),
      })
    );
  }

  const handleNext = () => {
    dispatch(
      setMessage({
        sender: "user",
        qid: currentQuestion.id,
        content: `${answers[currentQuestion.id]}`,
        timestamp: new Date().toISOString(),
      })
    );
    setCount((prev) => prev + 1);
  };



  return (
    <div className="container h-[80vh] overflow-y-scroll relative p-8 mx-auto px-4 md:max-w-3/4">
      <div className="w-full ">
        <h2 className="text-3xl text-center font-bold mb-6 capitalize">
          {currentSubject} Quiz
        </h2>
        {messages.map((message) => (
          <Fragment key={message.id}>
            {message.sender === "system" && <SystemPage message={message} />}
            {message.sender === "question" && (
              <QuestionPage
                answers={answers}
                count={count}
                currentQuestion={message.content}
                handleAnswerSelect={handleAnswerSelect}
              />
            )}
            {message.sender === "user" && (
              <UserPage answer={message.content} id={message.qid} />
            )}
          </Fragment>
        ))}
      </div>

      {count === questions.length && (
        <div className="w-1/2 fixed bottom-[10%] left-0 transform translate-x-1/2">
          <Button
            onClick={handleSubmit}
            className="w-full h-10 cursor-pointer mt-4"
          >
            Submit Quiz
          </Button>
        </div>
      )}
      {count !== questions.length  && (
        <div className="w-1/2 fixed bottom-[10%] left-0 transform translate-x-1/2">
          <Button
            disabled={!answers[count]}
            onClick={handleNext}
            className="w-full h-10 cursor-pointer mt-4"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
