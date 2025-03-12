import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "../ui/label";

const QuestionPage = ({currentQuestion,answers,handleAnswerSelect,count}) => {
    console.log('====================================');
    console.log(count);
    console.log('====================================');
  return (
    <div className="mb-6 w-full md:w-1/2 m-auto space-y-4">
    <p className="font-medium">
      {currentQuestion.id}) {currentQuestion.question}
    </p>
    <RadioGroup
      onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
      value={answers[currentQuestion.id] || ""}
    >
      {currentQuestion.options.map((option) => (
        <div key={option} className="flex items-center space-x-2">
          <RadioGroupItem value={option} disabled={answers[currentQuestion.id] && count!==currentQuestion.id} id={`${currentQuestion.id}-${option}`} />
          <Label htmlFor={`${currentQuestion.id}-${option}`}>{option}</Label>
        </div>
      ))}
    </RadioGroup>
  </div>
  )
}

export default QuestionPage