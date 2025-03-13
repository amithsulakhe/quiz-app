import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { CircleCheckBig, CircleX, Terminal } from "lucide-react";

const QuizAnswer = ({ question, correct, id, answers }) => {
  const isCorrect = Object.keys(answers).find((id) => answers[id] === correct);
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm">
        Question {id}) {question}
      </h2>
      <Alert className={"w-full md:w-1/2"} variant={cn(isCorrect ? "success" : "destructive",)}>
        <CircleX className="h-4 w-4" />
        <AlertTitle>Candidate's answer</AlertTitle>
        <AlertDescription>{answers[id]}</AlertDescription>
      </Alert>
      <Alert className={"w-full md:w-1/2"} variant="success">
        <CircleCheckBig className="h-4 w-4" />
        <AlertTitle>Correct Answer</AlertTitle>
        <AlertDescription>{correct}</AlertDescription>
      </Alert>
    </div>
  );
};

export default QuizAnswer;
