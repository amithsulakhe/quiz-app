import { setError, setLoading, setQuestions } from "@/store/slices/quizSlice";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to generate quiz questions based on subject
export async function generateQuizQuestions(subjectName) {
    try {
      const prompt = `
        Generate exactly 5 multiple-choice questions for a ${subjectName} quiz.
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
  
      const result = await model.generateContent(prompt);
      const response = await result.response.text();
      
      // Remove possible markdown code blocks
      const cleanResponse = response.replace(/```(json)?\n?|\n?```/g, '');
  
      try {
        const parsedQuestions = JSON.parse(cleanResponse);
        return parsedQuestions?.questions || [];
      } catch (parseError) {
        console.error("Error parsing questions:", parseError, cleanResponse);
        return [];
      }
    } catch (error) {
      console.error("Error generating questions:", error);
      return [];
    }
  }
  



export const loadQuestions = async (subjectId, dispatch) => {
    dispatch(setLoading(true));
    try {
      const generatedQuestions = await generateQuizQuestions(subjectId);
      
      if (Array.isArray(generatedQuestions) && generatedQuestions.length > 0) {
        dispatch(setQuestions(generatedQuestions));
      } else {
        dispatch(setError("No questions generated. Please try again."));
      }
    } catch (err) {
      dispatch(setError(`Failed to load quiz questions. Please try again. ${err.message}`));
    } finally {
      dispatch(setLoading(false));
    }
  };
  