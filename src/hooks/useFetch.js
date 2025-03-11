import { subjects } from "@/utils/constant";
import { loadQuestions } from "@/utils/helperfunctions";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useFetch = (subjectId, dispatch) => {
  const navigate = useNavigate();
  const [isValidated, setIsValidated] = useState(false);
  const { loading, error, questions } = useSelector((state) => state.quiz);

  useEffect(() => {
    const validateAndLoad = async () => {
      const findSubjectId = subjects.find((subject) => subject.id === subjectId);

      if (!findSubjectId) {
        navigate("/", { 
          replace: true,
          state: { error: "Invalid subject selected" } 
        });
        return;
      }

      // Set validated only after we confirm the subject exists
      setIsValidated(true);
      // Load questions only if subject is valid
      await loadQuestions(subjectId, dispatch);
    };

    validateAndLoad();

    // Cleanup function
    return () => {
      setIsValidated(false);
    };
  }, [subjectId, dispatch, navigate]);

  return {
    loading,
    error,
    questions,
    isValidated // Return validation state
  };
};

export default useFetch;
