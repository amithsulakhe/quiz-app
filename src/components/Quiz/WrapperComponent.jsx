import { clearChat } from '@/store/slices/chatSlice';
import { resetQuiz } from '@/store/slices/quizSlice';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const QuizWrapperComponent = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasConfirmedExit = useRef(false);

  useEffect(() => {
    // For page refresh/close
    const handleBeforeUnload = (event) => {
      if (!hasConfirmedExit.current) {
        event.preventDefault();
        event.returnValue = ""; 
        return "";
      }
    };

    // For browser back button
    const handlePopState = (event) => {
      // Prevent immediate navigation
      event.preventDefault();
      
      // Show confirmation dialog
      if (window.confirm("Are you sure you want to end the quiz?")) {
        // Set flag to prevent double confirmation
        hasConfirmedExit.current = true;
        
        // Clean up quiz state
        dispatch(resetQuiz());
        dispatch(clearChat());
        
        // Navigate away
        navigate(-1);
      } else {
        // Stay on current page by pushing state again
        window.history.pushState(null, null, window.location.href);
      }
    };

    // Clean exit function 
    const cleanExit = () => {
      hasConfirmedExit.current = true;
      dispatch(resetQuiz());
      dispatch(clearChat());
    };

    // Make available to parent components if needed
    if (window) {
      window.quizCleanExit = cleanExit;
    }

    window.history.pushState(null, null, window.location.href);

    // Register event listeners
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
      if (window && window.quizCleanExit) {
        delete window.quizCleanExit;
      }
    };
  }, [dispatch, navigate]);

  return children;
};

export default QuizWrapperComponent;