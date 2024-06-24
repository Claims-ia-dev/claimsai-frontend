import React, { useState, useEffect } from "react";
import './AnswerQuestions.css';
import Card from "../../../shared/components/UIElements/Card";


const AnswerQuestions = () => {

  const [categoryClaims, setCategoryClaims] = useState([]);



  const [questions, setQuestions] = useState([
    {
      text: "Is the damage caused by a natural disaster?",
      id: 1,
      answer: false,
    },
    {
      text: "Was the damage caused by a third party?",
      id: 2,
      answer: false,
    },
    {
      text: "Do you have a police report for the incident?",
      id: 3,
      answer: false,
    },
    {
      text: "Is the damage related to a pre-existing condition?",
      id: 4,
      answer: false,
    },
    {
      text: "Have you made any previous claims for similar damage?",
      id: 5,
      answer: false,
    },
    {
      text: "Do you have any witnesses to the incident?",
      id: 6,
      answer: false,
    },
    {
      text: "Is the damage caused by a maintenance issue?",
      id: 7,
      answer: false,
    },
    {
      text: "Do you have any evidence of the damage (e.g. photos, videos)?",
      id: 8,
      answer: false,
    },
  ]);

  const handleAnswerChange = (questionId, answer) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId ? { ...question, answer } : question
      )
    );
  };

  return (<>
     <div>
      {/* Render the category claims here */}
      {categoryClaims.map((claim) => (
        <div key={claim.id}>{claim.name}</div>
      ))}
    </div>
   
      <table className="questions-table">
        <thead>          
            <th className="question-column"> Question</th>
            <th className="toggle-column">Select</th>          
        </thead>
        <tbody>
        {questions.map((question, index) => (
          <tr key={index}>
            <td className="question-column">{question.text}</td>
            <td className="toggle-column">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={question.answer}
                  onChange={(event) => handleAnswerChange(question.id, event.target.checked)}
                />
                <span className="slider round"></span>
              </label>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      </>
    
  );
};

export default AnswerQuestions;
