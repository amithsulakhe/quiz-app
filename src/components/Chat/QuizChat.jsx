import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import { clearChat, setMessage } from "@/store/slices/chatSlice";
import { resetQuiz, setAnswer, setIsFeedback } from "@/store/slices/quizSlice";
import { subjects } from "@/utils/constant";
import quizHelper from "@/utils/helperfunctions";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Error from "../Quiz/error";
import Loader from "../Quiz/loader";
import QuestionChat from "./QuestionChat";
import SystemChat from "./SystemChat";
import UserChat from "./UserChat";
import Validator from "../Quiz/validator";
import { Loader2 } from "lucide-react";
import { PacmanLoader, PulseLoader } from "react-spinners";
import { useTheme } from "../theme-provider";
import { cn } from "@/lib/utils";
import WrapperComponent from "../Quiz/WrapperComponent";
import useBoolean from "@/hooks/useBoolean";
import CustomBarChart from "../Charts/BarChart";
import CustomPieChart from "../Charts/PieChart";
import QuizResults from "../Quiz/quiz-results";
import QuizAnalysis from "../Quiz/quiz-analysis";

const QuizChat = () => {
  // state
  const [count, setCount] = useState(1);
  const containerRef = useRef(null);

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
    if (!isSubmitted.value) {
      setCount((prev) => prev + 1);
      dispatch(
        setMessage({
          sender: "user",
          qid: currentQuestion.id,
          answer: `${answers[currentQuestion.id]}`,
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
  };

  const handleReset = async () => {
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
  };

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

  console.log(count);

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
                  <Fragment key={message.id}>
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
                    <CustomBarChart />
                    <CustomPieChart />
                  </div>
                </QuizAnalysis>
              ))}
          </div>
        </div>

        <div
          className={cn(
            "fixed bottom-0 left-0 right-0 py-4  border-t shadow-lg",
            theme === "light" ? "bg-white" : "bg-black"
          )}
        >
          <div className="container mx-auto px-4 md:max-w-3/4">
            {count === totalQuestions ? (
              <Button
                disabled={isSubmitted.value || loading}
                onClick={handleSubmitQuiz}
                className="w-full h-10 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    loading Question...
                  </>
                ) : isSubmitted.value ? (
                  "Submitted"
                ) : (
                  "Submit Quiz"
                )}
              </Button>
            ) : (
              <Button
                disabled={(!answers[count] || loading) && !isFeedback}
                onClick={isFeedback ? () => handleReset() : () => handleNext()}
                className="w-full cursor-pointer py-5"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    {isSubmitted.value
                      ? "Submitting..."
                      : " loading Question..."}
                  </>
                ) : isFeedback ? (
                  "Try again"
                ) : (
                  "Next"
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </WrapperComponent>
  );
};

export default QuizChat;
