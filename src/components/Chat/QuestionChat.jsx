import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "../ui/label";
import { FadeUp, SlideLeft } from "../Animations/animation";

const QuestionPage = ({currentQuestion,answers,handleAnswerSelect,count}) => {
console.log(count);

  return (
    <div className="mb-6 w-full md:w-1/2 m-auto space-y-4">
    <FadeUp className="font-medium">
      {currentQuestion.id}) {currentQuestion.question}
    </FadeUp>
    <RadioGroup
      onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
      value={answers[currentQuestion.id] || ""}
    >
      {currentQuestion.options.map((option,index) => (
        <SlideLeft key={option} delay={index*4}
        duration={1}
        x={-500}
        className="flex items-center space-x-2">
          <RadioGroupItem value={option} disabled={answers[currentQuestion.id] && count!==currentQuestion.id } id={`${currentQuestion.id}-${option}`} />
          <Label htmlFor={`${currentQuestion.id}-${option}`}>{option}</Label>
        </SlideLeft>
      ))}
    </RadioGroup>
  </div>
  )
}

export default QuestionPage