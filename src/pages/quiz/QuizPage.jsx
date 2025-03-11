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

const QuizPage = () => {
  const { subjectId } = useParams();
  const dispatch = useDispatch();
  const { answers, messages, isSubmitted } = useSelector((state) => state.quiz);

  const { loading, error, questions, isValidated } = useFetch(
    subjectId,
    dispatch
  );

  // Don't render anything until validation is complete
  if (!isValidated) {
    return <Validator />;
  }

  // Now we can show loading state for actual quiz data
  if (loading && !error) {
    return <Loader />;
  }

  if (error) {
    return (
     <Error error={error} />
    );
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
    <div className="flex min-h-screen p-4 gap-4">
      {/* Quiz Section (60%) */}
      <div className="w-[60%] space-y-6">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6 capitalize">
            {subjectId} Quiz
          </h2>
          {questions.map((q) => (
            <div key={q.id} className="mb-6 space-y-4">
              <p className="font-medium">{q.question}</p>
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
          <Button
            onClick={handleSubmitQuiz}
            disabled={
              Object.keys(answers).length !== questions.length || isSubmitted
            }
            className="w-full mt-4"
          >
            Submit Quiz
          </Button>
        </Card>
      </div>

      {/* Chat Section (40%) */}
      <div className="w-[40%]">
        <Card className="h-full">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Chat Assistant</h3>
          </div>
          <ScrollArea className="h-[calc(100vh-200px)] p-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-4 p-3 rounded-lg ${
                  msg.type === "user" ? "bg-primary/10 ml-auto" : "bg-muted"
                } max-w-[80%]`}
              >
                {msg.type === "system" && msg.score !== undefined ? (
                  <div className="space-y-4">
                    <p>{msg.content}</p>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Correct", value: msg.score },
                            { name: "Incorrect", value: msg.total - msg.score },
                          ]}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                        >
                          <Cell fill="#4CAF50" />
                          <Cell fill="#f44336" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <p>{msg.content}</p>
                )}
              </div>
            ))}
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};

export default QuizPage;
