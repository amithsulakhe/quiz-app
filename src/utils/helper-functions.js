import { setMessage } from "@/store/slices/chat-slice";
import {
  setError,
  setIsFeedback,
  setLoading,
  setQuestions,
} from "@/store/slices/quiz-slice";
import { GoogleGenerativeAI } from "@google/generative-ai";

class QuizHelper {
  constructor() {
    this.genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  async generateQuizQuestions(subjectName) {
    try {
      const prompt = `
        Generate exactly 1 multiple-choice questions for a ${subjectName} quiz.
        Return **valid JSON only**, no additional text.
        {
          "questions": [
            {
              "id": 1,
              "question": "Question text here",
              "options": ["option1", "option2", "option3", "option4"],
              "correct": "correct answer here",
              "explanation": "brief explanation why this is correct"
            }
          ]
        }
        Ensure:
        - Each question has 4 options.
        - The correct answer exists in the options.
        - Questions are engaging and relevant.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response.text();

      // Remove possible markdown code blocks
      const cleanResponse = response.replace(/```(json)?\n?|\n?```/g, "");

      try {
        const parsedQuestions = JSON.parse(cleanResponse);
        return parsedQuestions?.questions || [];
      } catch (parseError) {
        console.error("Error parsing questions:", parseError, "cleanResponse");
        return [];
      }
    } catch (error) {
      console.error("Error generating questions:", error);
      return [];
    }
  }

  async loadQuestions(subjectId, dispatch) {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const generatedQuestions = await this.generateQuizQuestions(subjectId);

      if (Array.isArray(generatedQuestions) && generatedQuestions.length > 0) {
        dispatch(setQuestions(generatedQuestions[0]));
      } else {
        dispatch(setError("No questions generated. Please try again."));
      }
    } catch (err) {
      dispatch(
        setError(
          `Failed to load quiz questions. Please try again. ${err.message}`
        )
      );
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  }

  finderFunction(arr, key, value) {
    return Array.isArray(arr) ? arr.find((ele) => ele[key] === value) : false;
  }

  async validateAndLoad(
    subjects,
    subjectCode,
    navigate,
    setIsValidated,
    dispatch
  ) {
    if (!this.finderFunction(subjects, "code", subjectCode)) {
      navigate("/", {
        replace: true,
        state: { error: "Invalid subject selected" },
      });
      return;
    }
    setIsValidated(true);
    await this.loadQuestions(subjectCode, dispatch);
  }

  async generateFeedBack(question, answers, isSubmitted, dispatch) {
    dispatch(setLoading(true));
    dispatch(setError(null));
    dispatch(setIsFeedback(false));

    const prompt = `
    Analyze the candidate's responses and generate a structured review in HTML format.  
    
    Use the following structure enclosed within a single <div>:  
    - Use <h3> for the title.  
    - Strengths in <p><strong>✔ Strengths:</strong>...</p>.  
    - Mistakes in <p><strong>❌ Mistakes:</strong>...</p>.  
    - Misconceptions in <p><strong>⚠ Misconceptions:</strong>...</p>.  
    - Areas for improvement in <p><strong>📌 Areas for Improvement:</strong>...</p>.  
    - Summary in <p><strong>📊 Summary:</strong>...</p>.  
    
    Ensure the response is **brief (max 6 lines)** and highlights key points with <strong>.  
    
    Candidate's Question & Answer Data:  
    ${JSON.stringify(question, null, 2)}  
    ${JSON.stringify(answers, null, 2)}
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response.text();
      const cleanResponse = response.replace(/```(html|json)?\n?|```/g, "");
      dispatch(
        setMessage({
          sender: "system",
          content: cleanResponse,
          type: "ai",
          timestamp: new Date().toISOString(),
        })
      );
      dispatch(setIsFeedback(true));
    } catch (error) {
      dispatch(
        setError(
          `Failed to load quiz questions. Please try again. ${err.message}`
        )
      );

      throw error;
    } finally {
      dispatch(setLoading(false));
      isSubmitted.onFalse();
    }
  }

  generateChartData(questions, answers) {
    const correctAnsSum = questions.reduce((acc, question) => {
      if (answers[question.id] === question.correct) {
        return acc + 1;
      }
      return acc;
    }, 0);
    const incorrectAnsSum = questions.length - correctAnsSum;
    const barData = [
      { name: "Correct", value: correctAnsSum, fill: "#22577A" },
      { name: "Incorrect", value: incorrectAnsSum, fill: "#FF7F50" },
    ];
    const pieData = [
      {
        name: "Correct",
        value: correctAnsSum,
        percentage: `${correctAnsSum * 10*2}`,
      },
      {
        name: "Incorrect",
        value: incorrectAnsSum,
        percentage: `${incorrectAnsSum * 10*2}`,
      },
    ];
    return {
      barData,
      pieData,
    };
  }
}

const quizHelper = new QuizHelper();

export default quizHelper;
