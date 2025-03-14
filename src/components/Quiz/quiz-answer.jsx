import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { CircleCheckBig, CircleX, Terminal } from "lucide-react";

const QuizAnswer = ({ question, correct, id, answers }) => {
  const isCorrect = Object.values(answers).includes(correct);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xs md:text-sm">
        Question {id}) {question}
      </h2>
      <Alert
        className={"w-full md:w-1/2"}
        variant={cn(isCorrect ? "success" : "destructive")}
      >
        {isCorrect ? (
          <CircleCheckBig className="h-4 w-4" />
        ) : (
          <CircleX className="h-4 w-4" />
        )}
        <AlertTitle className="text-xs md:text-sm">Candidate's answer</AlertTitle>
        <AlertDescription className="text-xs md:text-sm">{answers[id]}</AlertDescription>
      </Alert>
      <Alert className={"w-full md:w-1/2"} variant="success">
        <CircleCheckBig className="h-4 w-4" />
        <AlertTitle className="text-xs md:text-sm">Correct Answer</AlertTitle>
        <AlertDescription className="text-xs md:text-sm">{correct}</AlertDescription>
      </Alert>
    </div>
  );
};

export default QuizAnswer;
