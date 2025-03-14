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
import { FadeUp, SlideLeft } from "../Animations/animation";

const QuizResults = () => {
  const {answers, questions } = useSelector((state) => state.quiz);

  return (

      <CardContent>
        <div className="border-2 rounded-lg p-4  gap-8 grid grid-cols-1 ">
          {
            questions.map((question)=>(
              <FadeUp  key={question.id} delay={question.id*0.2}>
                <QuizAnswer  {...question} answers={answers}/>
              </FadeUp>
            ))
          }
        </div>
      </CardContent>
   
  );
};

export default QuizResults;
