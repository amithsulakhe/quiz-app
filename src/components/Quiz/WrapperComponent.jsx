import { clearChat } from '@/store/slices/chatSlice';
import { resetQuiz } from '@/store/slices/quizSlice';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const WrapperComponent = ({children}) => {
    const navigate=useNavigate()
    const dispatch=useDispatch()


      useEffect(() => {
        const handleBeforeUnload = (event) => {
          event.preventDefault();
          event.returnValue = ""; // Required for modern browsers
          if (confirm("Are you sure you want to end the quiz?")) {
            dispatch(resetQuiz())
            dispatch(clearChat())
            return true; // Allows the refresh to proceed
          }
          return false; // Prevents refresh
        };
    
        const handlePopState = () => {
          if (confirm("Are you sure you want to end the quiz?")) {
            dispatch(resetQuiz())
            dispatch(clearChat())
            navigate(-1); // Go back if confirmed
          } else {
            window.history.pushState(null, null, window.location.href); // Prevent back navigation
          }
        };
    
        // Push a new state to detect back navigation
        window.history.pushState(null, null, window.location.href);
    
        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("popstate", handlePopState);
    
        return () => {
          window.removeEventListener("beforeunload", handleBeforeUnload);
          window.removeEventListener("popstate", handlePopState);
        };
      }, [dispatch, navigate]);
    
  return children
}

export default WrapperComponent