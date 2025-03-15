import {
  CardContent
} from "@/components/ui/card";
import { useSelector } from "react-redux";
import { FadeUp } from "../animations/animation";
import QuizAnswer from "./quiz-answer";

// quiz results 
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
