import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";


// quiz analysis
const QuizAnalysis = ({ children, isQuizResults }) => {    
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Results</CardTitle>
          <CardDescription>Summary</CardDescription>
        </div>
        <div>
          <Button
          onClick={()=>isQuizResults.onToggle()}
            variant="outline"
            className="w-40 cursor-pointer border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-md"
          >
            {!isQuizResults?.value
              ? "View Result Analysis"
              : "Performance Charts"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default QuizAnalysis;
