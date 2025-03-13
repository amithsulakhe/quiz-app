import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import QuizAnswer from "./quiz-answer";
import { useSelector } from "react-redux";
import { SlideLeft } from "../Animations/animation";

const QuizResults = () => {
  const {answers, questions } = useSelector((state) => state.quiz);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Results</CardTitle>
        <CardDescription>summury</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border-2 rounded-lg p-4  gap-8 grid grid-cols-1 ">
          {
            questions.map((question)=>(
              <SlideLeft>
                <QuizAnswer  {...question} answers={answers}/>
              </SlideLeft>
            ))
          }
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizResults;
