import { subjects } from "@/utils/constant";
import quizHelper from "@/utils/helperfunctions";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useFetch = (subjectId, dispatch) => {
  const navigate = useNavigate();
  const [isValidated, setIsValidated] = useState(false);
  const { loading, error, questions } = useSelector((state) => state.quiz);

  useEffect(() => {
    quizHelper.validateAndLoad(subjects, subjectId, navigate, setIsValidated, dispatch);
  }, [dispatch, subjectId, navigate]);

  return {
    loading,
    error,
    questions,
    isValidated
  };
};

export default useFetch;
