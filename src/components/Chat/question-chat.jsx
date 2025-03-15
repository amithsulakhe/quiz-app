import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "../ui/label";
import { FadeUp, SlideLeft } from "../animations/animation";




// question chat

const QuestionPage = ({
  currentQuestion,
  answers,
  handleAnswerSelect,
  count,
}) => {

  return (
    <div className="mb-6 w-full md:w-1/2 m-auto space-y-4">
      <FadeUp className="text-sm md:text-lg font-medium">
        {currentQuestion.id}) {currentQuestion.question}
      </FadeUp>
      <RadioGroup
        onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
        value={answers[currentQuestion.id] || ""}
      >
        {currentQuestion.options.map((option, index) => (
          <SlideLeft
            key={option}
            delay={index * 4}
            duration={1}
            x={-500}
            className="flex items-center space-x-2"
          >
            <RadioGroupItem
              className={`w-6 h-6 border-2 border-blue-500`}
              value={option}
              disabled={
                answers[currentQuestion.id] && count !== currentQuestion.id
              }
              id={`${currentQuestion.id}-${option}`}
            />
            <Label
              className="text-sm md:text-lg font-medium"
              htmlFor={`${currentQuestion.id}-${option}`}
            >
              {option}
            </Label>
          </SlideLeft>
        ))}
      </RadioGroup>
    </div>
  );
};

export default QuestionPage;
