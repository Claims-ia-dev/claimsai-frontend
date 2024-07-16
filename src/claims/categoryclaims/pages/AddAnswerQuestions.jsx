import React, { useState, useContext, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./AnswerQuestions.css";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import Button from "../../../shared/components/FormElements/Button";
import { useLocation } from "react-router-dom";
import { useClaim } from "../../../shared/hooks/claim-hook";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";


const AddAnswerQuestions = () => {
  const location = useLocation();
  const roomData = location.state?.roomData;
  const auth = useContext(AuthContext);
 
  const { addRoomDetail} = useClaim(); 
  const estimateId=useParams().estimateId;

  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // Call getData when the component mounts

  const getData = useCallback(async () => {
    try {
      const formData = new URLSearchParams();
      formData.append("service", roomData?.service_type.value);
      const requestBody = roomData?.service_type.value
        ? formData.toString()
        : null;

      const allQuestionsData = await sendRequest( //gets all questions
        `${process.env.REACT_APP_BACKEND_URL}/api/categoryclaims/category`,
        "GET",
        null,
        {},
        auth.token
      );

      setAllQuestions(allQuestionsData); //to store all questions and then compare with the ones answered

      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/categoryclaims/category?${requestBody}`,
        "GET",
        null,
        {},
        auth.token
      );

      setQuestions(
        responseData.map((item) => ({
          description: item.claims_description,
          full_description: item.full_description,
          code: item.code,
          answer: false,
        }))
      );
      // display the results here
    } catch (err) {}
  }, [auth.token, roomData?.service_type.value, sendRequest]);

  useEffect(() => {
    // retrieves questions from categoryclaims
    getData();
  }, [getData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const questionsAnswers = questions.map((question) => ({
      code: question.code,
      answer: question.answer,
    }));

    const CategoriesArrayToSend = allQuestions.map((item) => ({
      code: item.code,
      answer: questionsAnswers.find((qa) => qa.code === item.code)
        ? questionsAnswers.find((qa) => qa.code === item.code).answer
        : false,
    }));

    const newRoomDetail = {
      estimate_id: estimateId,
      room_name: roomData?.room_name.value,
      room_type: roomData?.room_type.value,
      service_type: roomData?.service_type.value,
      category_claims: CategoriesArrayToSend,
    };
    addRoomDetail(newRoomDetail);
    // console.log("claim seen from addanswers");
    // console.log(claim);
    // console.log(claimId);
    // console.log ("room to add for update");
    // console.log (newRoomDetail);

    try {    
      console.log(newRoomDetail);
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/estimates/addroom`,
          "POST",
          JSON.stringify(newRoomDetail),
          {
            "Content-Type": "application/json",
          },
          auth.token
        );
  
        if (response != null) {
          // console.log("Estimate updated with new room");
          // console.log(response);
         
          navigate("/projectreceipt"); // pass the id as a separate prop
        } else {
          console.error("Error submitting the added room:", response);
        }
      } catch (err) {
        console.error("Error submitting the added room", err);
      }

    navigate("/projectreceipt");
  };


  const handleAnswerChange = (questionCode, answer) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.code === questionCode ? { ...question, answer } : question
      )
    );
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <div className="questions-page">
        <div className="table-container">
        
          <table className="questions-table">
            {" "}
            {/* Display the received data */}
            {isLoading && <LoadingSpinner asOverlay />}
            <thead>
              <th className="question-column"> Question</th>
              <th className="toggle-column">Select</th>
            </thead>
            <tbody>
              {questions.map((question, index) => (
                <tr key={index}>
                  <td className="question-column">
                    {question.description}{" "}
                    <p className="full_description_text">
                      {question.full_description}
                    </p>
                  </td>
                  <td className="toggle-column">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={question.answer}
                        onChange={(event) =>
                          handleAnswerChange(
                            question.code,
                            event.target.checked
                          )
                        }
                      />
                      <span className="slider round"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
        <div className="questions_actions">
            <Button onClick={handleSubmit} size="wide">Add room</Button>
          </div>
      </div>

    </>
  );
};

export default AddAnswerQuestions;
