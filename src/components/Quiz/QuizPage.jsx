import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import { setMessage } from "@/store/slices/chatSlice";
import { setAnswer } from "@/store/slices/quizSlice";
import { subjects } from "@/utils/constant";
import quizHelper from "@/utils/helperfunctions";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Error from "./error";
import Loader from "./loader";
import QuestionPage from "./QuestionPage";
import SystemPage from "./SystemPage";
import UserPage from "./UserPage";
import Validator from "./validator";
import { Loader2 } from "lucide-react";
import {  PulseLoader } from "react-spinners";

const QuizPage = () => {
  // state
  const [count, setCount] = useState(1);
  const containerRef = useRef(null);

  //params
  const { subjectCode } = useParams();

  // find subject name
  const currentSubject = quizHelper.finderFunction(
    subjects,
    "code",
    subjectCode
  )?.title;

  // redux dispatch and redux selector
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.chat);
  const { answers, isSubmitted } = useSelector((state) => state.quiz);

  // custom fetch
  const {
    loading,
    error,
    questions,
    isValidated,
    revalidate,
    setIsValidated,
    navigate,
  } = useFetch(subjectCode, dispatch);

  const currentQuestion = questions[count - 1];

  // to render next question
  useEffect(() => {
    if (currentQuestion) {
      dispatch(
        setMessage({
          sender: "question",
          question: currentQuestion,
          type: "text",
        })
      );
    }
  }, [currentQuestion, dispatch]);

  useEffect(() => {
    if (containerRef.current && count !== 1) {
      containerRef.current.scrollTo({
        // scroll upto bottom but leaves 200 px gap
        top:
          containerRef.current.scrollHeight -
          containerRef.current.clientHeight -
          50,
        behavior: "smooth",
      });
    }
  }, [count, messages]);

  // change handler to select answer
  const handleAnswerSelect = (questionId, answer) => {
    dispatch(setAnswer({ questionId, answer }));
  };

  // for next question
  const handleNext = async () => {
    dispatch(
      setMessage({
        sender: "user",
        qid: currentQuestion.id,
        answer: `${answers[currentQuestion.id]}`,
      })
    );
    setCount((prev) => prev + 1);
    await revalidate.validateAndLoad(
      subjects,
      subjectCode,
      navigate,
      setIsValidated,
      dispatch
    );
  };

  // click handler to submit quiz
  const handleSubmitQuiz = () => {
    dispatch(
      setMessage({
        sender: "user",
        qid: currentQuestion.id,
        answer: `${answers[currentQuestion.id]}`,
      })
    );
  };

  // Group messages by question to add separation
  const groupedMessages = [];
  let currentGroup = [];

  messages.forEach((message, index) => {
    if (message.sender === "question" && index > 0) {
      // When we hit a new question, save the previous group and start a new one
      groupedMessages.push([...currentGroup]);
      currentGroup = [message];
    } else {
      currentGroup.push(message);
    }
  });

  // Add the last group
  if (currentGroup.length > 0) {
    groupedMessages.push(currentGroup);
  }

  // Don't render anything until validation is complete
  if (!isValidated) {
    return <Validator />;
  }

  // Now we can show loading state for actual quiz data
  if (loading && !error && questions.length === 0) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="flex flex-col h-[80vh] relative">
      <div
        ref={containerRef}
        className="container overflow-y-scroll p-8 mx-auto px-4 md:max-w-3/4 pb-24"
      >
        <div className="w-full">
          <h2 className="text-3xl text-center font-bold mb-6 capitalize">
            {currentSubject} Quiz
          </h2>

          {groupedMessages.map((group, groupIndex) => (
            <div key={`group-${groupIndex}`} className="mb-12 border-b pb-8">
              {group.map((message) => (
                <Fragment key={message.id}>
                  {message.sender === "system" && (
                    <SystemPage message={message} />
                  )}
                  {message.sender === "question" && (
                    <QuestionPage
                      answers={answers}
                      count={message.question?.id || count}
                      currentQuestion={message.question}
                      handleAnswerSelect={handleAnswerSelect}
                    />
                  )}
                  {message.sender === "user" && <UserPage message={message} />}
                </Fragment>
              ))}
            </div>
          ))}

          {loading && (
            <div className="w-full md:w-1/2 m-auto ">
              <PulseLoader size={10} />
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white py-4 border-t shadow-lg">
        <div className="container mx-auto px-4 md:max-w-3/4">
          {count === 6 ? (
            <Button
              onClick={handleSubmitQuiz}
              className="w-full h-10 cursor-pointer"
            >
              Submit Quiz
            </Button>
          ) : (
            <Button
              disabled={!answers[count] || loading}
              onClick={handleNext}
              className="w-full h-10 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                "Next"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
