import { setError, setLoading, setQuestions } from "@/store/slices/quizSlice";
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
      const cleanResponse = response.replace(/```(json)?\n?|\n?```/g, '');

      try {
        const parsedQuestions = JSON.parse(cleanResponse);
          
          console.log(parsedQuestions);
          
        console.log(parsedQuestions);
        
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
    try {
      const generatedQuestions = await this.generateQuizQuestions(subjectId);
      
      if (Array.isArray(generatedQuestions) && generatedQuestions.length > 0) {
        dispatch(setQuestions(generatedQuestions[0]));
      } else {
        dispatch(setError("No questions generated. Please try again."));
      }
    } catch (err) {
      dispatch(setError(`Failed to load quiz questions. Please try again. ${err.message}`));
      throw err
    } finally {
      dispatch(setLoading(false));
    }
  }

  finderFunction(arr, key, value) {
    return Array.isArray(arr) ? arr.find(ele => ele[key] === value) : false;
  }

  async validateAndLoad(subjects, subjectCode, navigate, setIsValidated, dispatch) {
    console.log(!this.finderFunction(subjects, "code", subjectCode));
    
    if (!this.finderFunction(subjects, "code", subjectCode)) {
      navigate("/", { 
        replace: true,
        state: { error: "Invalid subject selected" } 
      });
      return;
    }
    setIsValidated(true);
    await this.loadQuestions(subjectCode, dispatch);
  }


  
}

// Create a singleton instance
const quizHelper = new QuizHelper();

// Export the instance
export default quizHelper;
