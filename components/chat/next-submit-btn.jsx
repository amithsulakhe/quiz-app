import { cn } from "@/lib/utils";
import React, { memo } from "react";
import { useTheme } from "../theme-provider";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const NextSubmitButton = ({count,isSubmitted,handleSubmitQuiz,handleReset,handleNext}) => {
    const { answers, isFeedback, totalQuestions ,loading} = useSelector(
      (state) => state.quiz
    );
    // theme
    const {theme}=useTheme()
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 py-4  border-t shadow-lg",
        theme === "light" ? "bg-white" : "bg-black"
      )}
    >
      <div className="container mx-auto px-4 md:max-w-3/4">
        {count === totalQuestions ? (
          <Button
            disabled={isSubmitted.value || loading}
            onClick={handleSubmitQuiz}
            className="w-full h-10 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                loading Question...
              </>
            ) : isSubmitted.value ? (
              "Submitted"
            ) : (
              "Submit Quiz"
            )}
          </Button>
        ) : (
          <Button
            disabled={(!answers[count] || loading) && !isFeedback}
            onClick={isFeedback ? () => handleReset() : () => handleNext()}
            className="w-full cursor-pointer py-5"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                {isSubmitted.value ? "Submitting..." : " loading Question..."}
              </>
            ) : isFeedback ? (
              "Try again"
            ) : (
              "Next"
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default memo(NextSubmitButton);
