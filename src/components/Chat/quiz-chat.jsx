import useBoolean from "@/hooks/use-boolean";
import useFetch from "@/hooks/use-fetch";
import { clearChat, setMessage } from "@/store/slices/chat-slice";
import { resetQuiz, setAnswer, setIsFeedback } from "@/store/slices/quiz-slice";
import { subjects } from "@/utils/constant";
import quizHelper from "@/utils/helper-functions";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PacmanLoader, PulseLoader } from "react-spinners";
import CustomBarChart from "../charts/bar-chart";
import CustomPieChart from "../charts/pie-chart";
import Error from "../Quiz/error";
import Loader from "../Quiz/loader";
import QuizAnalysis from "../Quiz/quiz-analysis";
import QuizResults from "../Quiz/quiz-results";
import Validator from "../Quiz/validator";
import WrapperComponent from "../Quiz/wrapper-component";
import { useTheme } from "../theme-provider";
import NextSubmitButton from "./next-submit-btn";
import QuestionChat from "./question-chat";
import SystemChat from "./system-chat";
import UserChat from "./user-chat";

// main component quiz
const QuizChat = () => {
  // state
  const [count, setCount] = useState(1);
  const containerRef = useRef(null);

  // custom hooks
  const { theme } = useTheme();
  const isSubmitted = useBoolean();
  const isQuizResults = useBoolean();

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
  const { answers, isFeedback, totalQuestions } = useSelector(
    (state) => state.quiz
  );

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

  // change handler to select answer
  const handleAnswerSelect = (questionId, answer) => {
    dispatch(setAnswer({ questionId, answer }));
  };

  // for next question
  const handleNext =useCallback( async () => {
    dispatch(
      setMessage({
        sender: "user",
        qid: currentQuestion?.id,
        answer: `${answers[currentQuestion?.id]}`,
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
  },[answers, currentQuestion?.id, dispatch, navigate, revalidate, setIsValidated, subjectCode])


  // click handler to submit quiz 
  const handleSubmitQuiz = useCallback(() => {
    if (!isSubmitted.value) {
      setCount((prev) => prev + 1);
      dispatch(
        setMessage({
          sender: "user",
          qid: currentQuestion?.id,
          answer: `${answers[currentQuestion?.id]}`,
        })
      );
      dispatch(
        setMessage({
          sender: "system",
          content: "Congratulations on completing your quiz! 🎉",
          timestamp: new Date().toISOString(),
        })
      );
      isSubmitted.onTrue();
    }
  },[answers, currentQuestion?.id, dispatch, isSubmitted])

  // quiz try again
  const handleReset = useCallback(async () => {
    try {
      setCount(1);
      dispatch(resetQuiz());
      dispatch(setIsFeedback(false));
      dispatch(clearChat());
      await revalidate.validateAndLoad(
        subjects,
        subjectCode,
        navigate,
        setIsValidated,
        dispatch
      );
    } catch (error) {
      console.log(error);
    }
  },[dispatch, navigate, revalidate, setIsValidated, subjectCode])

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

  // scroll automatically
  useEffect(() => {
    if (containerRef.current && count !== 1) {
      containerRef.current.scrollTo({
        // scroll upto bottom but leaves 200 px gap
        top:
          containerRef.current.scrollHeight -
          containerRef.current.clientHeight -
          (isFeedback ? 200 : 50),
        behavior: "smooth",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, messages, isQuizResults.value]);

  // feedback
  useEffect(() => {
    if (isSubmitted.value && Object.keys(answers).length === totalQuestions) {
      quizHelper.generateFeedBack(questions, answers, isSubmitted, dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, isSubmitted.value]);

  // optimising performance
  const groupedMessages = useMemo(() => {
    // Group messages by question to add separation
    const groupedMessages = [];
    let currentGroup = [];

    messages.forEach((message) => {
      if (message.sender === "question" && currentGroup.length) {
        groupedMessages.push(currentGroup);
        currentGroup = [];
      }
      currentGroup.push(message);
    });

    // last message
    if (currentGroup.length) groupedMessages.push(currentGroup);
    return groupedMessages;
  }, [messages]);

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
    <WrapperComponent>
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
                  <Fragment key={message?.id}>
                    {message.sender === "system" && (
                      <SystemChat message={message} />
                    )}
                    {message.sender === "question" && (
                      <QuestionChat
                        answers={answers}
                        count={count}
                        currentQuestion={message.question}
                        handleAnswerSelect={handleAnswerSelect}
                      />
                    )}
                    {message.sender === "user" && (
                      <UserChat message={message} />
                    )}
                  </Fragment>
                ))}
              </div>
            ))}

            {/* loading question */}
            {loading && count !== totalQuestions + 1 && (
              <div className="w-full md:w-1/2 m-auto ">
                <PulseLoader
                  size={10}
                  color={theme === "dark" ? "#ffffff" : "#000000"}
                />
              </div>
            )}

            {/* results loading */}
            {loading && isSubmitted.value && (
              <div className="flex items-center mb-8 gap-8">
                <PacmanLoader
                  size={12}
                  color={theme === "dark" ? "#ffffff" : "#000000"}
                />
                <h1 className="font-bold text-xl">Validating Results</h1>
              </div>
            )}

            {/* quiz results feedback */}
            {isFeedback &&
              (isQuizResults.value ? (
                <QuizAnalysis isQuizResults={isQuizResults}>
                  <QuizResults />
                </QuizAnalysis>
              ) : (
                <QuizAnalysis isQuizResults={isQuizResults}>
                  <div className="w-full md:w-[80%] m-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CustomBarChart questions={questions} answers={answers} />
                    <CustomPieChart questions={questions} answers={answers} />
                  </div>
                </QuizAnalysis>
              ))}
          </div>
        </div>

          {/* submit button */}
        <NextSubmitButton
          count={count}
          handleNext={handleNext}
          handleReset={handleReset}
          handleSubmitQuiz={handleSubmitQuiz}
          isSubmitted={isSubmitted}
        />
      </div>
    </WrapperComponent>
  );
};

export default QuizChat;
