import React, { useState, useContext, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./AnswerQuestions.css";
//import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import Card from "../../../shared/components/UIElements/Card";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import Button from "../../../shared/components/FormElements/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useClaim } from "../../../shared/hooks/claim-hook";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";

const UpdateAnswers = () => {
  const location = useLocation();
  const roomData = location.state?.roomData;
  const auth = useContext(AuthContext);
  const { claim,claimId, updateRoomDetail } = useClaim();
  const Idclaim = useParams().claimId;
  const roomId = useParams().roomId;
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const { isLoading,  sendRequest } = useHttpClient();

  const identifiedRoom = claim.estimate_details.find(
    (room) => room.id === roomId
  );


  const identifiedRoomData = identifiedRoom.category_claims; //asnwers array



  const getData = useCallback(async (questionsStored) => {  
    try {
      const formData = new URLSearchParams();
      formData.append("service", roomData?.service_type.value);
      const requestBody = roomData?.service_type.value
        ? formData.toString()
        : null;

        const allQuestionsData = await sendRequest( //getting all questions in array
          `${process.env.REACT_APP_BACKEND_URL}/api/categoryclaims/category`,
          "GET",
          null,
          {},
          auth.token
        );

        setAllQuestions(allQuestionsData); //to store all questions and then compare with the ones answered
      
      const responseData = await sendRequest(//gets questions sorted by service
        `${process.env.REACT_APP_BACKEND_URL}/api/categoryclaims/category?${requestBody}`,
        // `/api/categoryclaims/categoryclaims`, // api endpoint
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
          answer: questionsStored.find(
            (storedQuestion) => storedQuestion.code === item.code
          )
            ? questionsStored.find(
                (storedQuestion) => storedQuestion.code === item.code
              ).answer
            : false,
        }))
      );

      
      // display the results here
    } catch (err) {}
  },[auth.token, roomData?.service_type.value, sendRequest]);
      

  useEffect(() => {
    
    if (!identifiedRoom) {
      console.log("unidentified room");
      return;
    }
    const questionsStored = identifiedRoomData.map((item) => ({
      code: item.code,
      answer: item.answer,
    }));
    // retrieves questions from categoryclaims
    getData(questionsStored);
  }, [identifiedRoomData, identifiedRoom, getData]);

  const handleAnswerChange = (questionCode, answer) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionCode]: answer }));
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      const questionIndex = updatedQuestions.findIndex(
        (q) => q.code === questionCode
      );
      if (questionIndex !== -1) {
        updatedQuestions[questionIndex].answer = answer;
      }
      console.log(answers);
      return updatedQuestions;
    });
  };

  const updateClaim = useCallback( async () => {

    try {
      console.log(claimId);
      console.log(claim.estimate_details);
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/estimates/updaterooms`,
        "PATCH",
        JSON.stringify(claim.estimate_details),
        {
          "Content-Type": "application/json",
        },
        auth.token
      );
      console.log(response);
      console.log("reques to backend done")
      if (response) {
        console.log("Claim updated successfully!");
       navigate("/projectreceipt", { state: { Idclaim } });
      } else {
        console.error("Error updating claim:", response);
      }
    } catch (err) {
      console.error("Error updating claim:", err);
    }
  },[Idclaim,claim.estimate_details, claimId]);

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

    const updates = {
      room_name: roomData?.room_name.value,
      room_type: roomData?.room_type.value,
      service_type: roomData?.service_type.value,
      category_claims: CategoriesArrayToSend,
    };

    await updateRoomDetail(roomId, updates);
    setIsUpdated(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  useEffect(() => {
    if (isUpdated) {
      updateClaim();
    }
  }, [isUpdated, updateClaim]);

  return (
    <>
    <div className="questions-page">
    <div className="table-container">
    
      {/* <ErrorModal error={error} onClear={clearError} /> */}
       
      <table className="questions-table">
        {isLoading && <LoadingSpinner asOverlay />}
        <thead>
          <th className="question-column">Question</th>
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
                      handleAnswerChange(question.code, event.target.checked)
                    }
                  />
                  <span className="slider round"></span>
                </label>
              </td>
            </tr>
          ))}
        </tbody></table>
        </div>
     
      <div>
        <Button className="center" onClick={handleSubmit}>
          Update Room
        </Button>
      </div> 
    </div></>
  );
};

export default UpdateAnswers;