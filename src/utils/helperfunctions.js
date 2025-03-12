import { setError, setLoading, setQuestions } from "@/store/slices/quizSlice";
import { GoogleGenerativeAI } from "@google/generative-ai";

class QuizHelper {
  constructor() {
    this.genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  async generateQuizQuestions(subjectName) {
    try {
      // const prompt = `
      //   Generate exactly 5 multiple-choice questions for a ${subjectName} quiz.
      //   Return **valid JSON only**, no additional text.
      //   {
      //     "questions": [
      //       {
      //         "id": 1,
      //         "question": "Question text here",
      //         "options": ["option1", "option2", "option3", "option4"],
      //         "correct": "correct answer here",
      //         "explanation": "brief explanation why this is correct"
      //       }
      //     ]
      //   }
      //   Ensure:
      //   - Each question has 4 options.
      //   - The correct answer exists in the options.
      //   - Questions are engaging and relevant.
      // `;

      // const result = await this.model.generateContent(prompt);
      // const response = await result.response.text();
      
      // // Remove possible markdown code blocks
      // const cleanResponse = response.replace(/```(json)?\n?|\n?```/g, '');

      try {
        const parsedQuestions = JSON.parse(`
          {
            "questions": [
              {
                "id": 1,
                "question": "A ball is thrown vertically upward. At its highest point, what is its acceleration?",
                "options": ["0 m/s²", "9.8 m/s² downward", "9.8 m/s² upward", "It depends on the initial velocity"],
                "correct": "9.8 m/s² downward",
                "explanation": "Gravity acts downward constantly, even at the highest point."
              },
              {
                "id": 2,
                "question": "Two objects of different masses are dropped from the same height in a vacuum. Which object hits the ground first?",
                "options": ["The heavier object", "The lighter object", "They hit at the same time", "It depends on their shapes"],
                "correct": "They hit at the same time",
                "explanation": "In a vacuum, there's no air resistance, so gravity affects both objects equally."
              },
              {
                "id": 3,
                "question": "What is the unit of power?",
                "options": ["Joule", "Newton", "Watt", "Pascal"],
                "correct": "Watt",
                "explanation": "Power is the rate of energy transfer, measured in Watts (Joules per second)."
              },
              {
                "id": 4,
                "question": "A car travels 60 km in 1 hour. What is its average speed in meters per second?",
                "options": ["16.7 m/s", "60 m/s", "3600 m/s", "100 m/s"],
                "correct": "16.7 m/s",
                "explanation": "Convert kilometers to meters and hours to seconds: (60 km * 1000 m/km) / (1 hr * 3600 s/hr) ≈ 16.7 m/s"
              },
              {
                "id": 5,
                "question": "Which of the following is NOT a vector quantity?",
                "options": ["Velocity", "Acceleration", "Force", "Mass"],
                "correct": "Mass",
                "explanation": "Mass is a scalar quantity; it has only magnitude, not direction. Velocity, acceleration, and force are vector quantities."
              }
            ]
          }
          `);
          
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
        dispatch(setQuestions(generatedQuestions));
      } else {
        dispatch(setError("No questions generated. Please try again."));
      }
    } catch (err) {
      dispatch(setError(`Failed to load quiz questions. Please try again. ${err.message}`));
    } finally {
      dispatch(setLoading(false));
    }
  }

  finderFunction(arr, key, value) {
    return Array.isArray(arr) ? arr.find(ele => ele[key] === value) : false;
  }

  async validateAndLoad(subjects, subjectCode, navigate, setIsValidated, dispatch) {
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
