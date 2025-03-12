import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import useFetch from "@/hooks/useFetch";
import { addMessage, setAnswer, submitQuiz } from "@/store/slices/quizSlice";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import Loader from "./loader";
import Validator from "./validator";
import Error from "./error";
import quizHelper from "@/utils/helperfunctions";
import { subjects } from "@/utils/constant";
import { Avatar, AvatarFallback } from "../ui/avatar";

const QuizPage = () => {
  const { subjectId } = useParams();
  const dispatch = useDispatch();
  const { 
    answers, 
    messages, 
    isSubmitted 
  } = useSelector((state) => state.quiz);

  const { loading, error, questions, isValidated } = useFetch(subjectId, dispatch);

  // Don't render anything until validation is complete
  if (!isValidated) {
    return <Validator />;
  }

  // Show loading state for actual quiz data
  if (loading && !error) {
    return <Loader />;
  }

  // Show error state if there's an error
  if (error) {
    return <Error error={error} />;
  }

  const handleAnswerSelect = (questionId, answer) => {
    dispatch(setAnswer({ questionId, answer }));
    dispatch(
      addMessage({
        type: "user",
        content: `Selected answer: ${answer}`,
        timestamp: new Date().toISOString(),
      })
    );
  };

  const handleSubmitQuiz = () => {
    const score = questions.reduce((acc, q) => {
      return acc + (answers[q.id] === q.correct ? 1 : 0);
    }, 0);

    dispatch(submitQuiz());
    dispatch(
      addMessage({
        type: "system",
        content: `Quiz completed! Score: ${score}/${questions.length}`,
        timestamp: new Date().toISOString(),
        score,
        total: questions.length,
      })
    );
  };

  return (
    <div className="container min-h-[80vh] p-8 mx-auto px-4 w-3/4">
      <div className="w-full">
        <h2 className="text-3xl text-center font-bold mb-6 capitalize">
          {quizHelper.finderFunction(subjects, "code", subjectId)?.title} Quiz
        </h2>

        <div className="py-2 px-4 flex items-center gap-4 rounded-md bg-gray-400 w-fit">
          <Avatar className="w-10 h-10">
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <p className="text-md">Quiz Started</p>
        </div>

        {questions.map((q) => (
          <div key={q.id} className="mb-6 w-1/2 m-auto space-y-4">
            <p className="font-medium">
              {q.id}) {q.question}
            </p>
            <RadioGroup
              onValueChange={(value) => handleAnswerSelect(q.id, value)}
              value={answers[q.id] || ""}
            >
              {q.options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${q.id}-${option}`} />
                  <Label htmlFor={`${q.id}-${option}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}

        <div className="py-2 px-4 flex items-center justify-end gap-4 rounded-md bg-gray-400">
          <Avatar className="w-10 h-10">
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <p className="text-md">Quiz Started</p>
        </div>

        <Button
          onClick={handleSubmitQuiz}
          disabled={Object.keys(answers).length !== questions.length || isSubmitted}
          className="w-full mt-4"
        >
          Submit Quiz
        </Button>
      </div>
    </div>
  );
};

export default QuizPage; 