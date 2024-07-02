import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./AnswerQuestions.css";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
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
  const roomIdNumber = parseInt(roomId, 10);
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [data, setData] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const identifiedRoom = claim.room_details.find(
    (room) => room.id === roomIdNumber
  );

  console.log(identifiedRoom);

  const identifiedRoomData = identifiedRoom.category_claims;

  useEffect(() => {
    // retrieves questions from categoryclaims
    if (!identifiedRoom) {
      return;
    }
    const questionsStored = identifiedRoomData.map((item) => ({
      code: item.code,
      answer: item.answer,
    }));
    getData(questionsStored);
  }, []);

  const getData = async (questionsStored) => {
    try {
      const formData = new URLSearchParams();
      formData.append("service", roomData?.service_type.value);
      const requestBody = roomData?.service_type.value
        ? formData.toString()
        : null;
      console.log(requestBody);
      console.log(auth.token);
      const responseData = await sendRequest(
        `/api/categoryclaims/category?${requestBody}`,
        // `/api/categoryclaims/categoryclaims`, // api endpoint
        "GET",
        null,
        {},
        auth.token
      );
      setData(responseData);
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

      console.log(responseData);
      // display the results here
    } catch (err) {}
  };

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
      return updatedQuestions;
    });
  };

  const updateClaim = async () => {
    try {
      console.log("room details before patch request");
      console.log( JSON.stringify({
        estimate_id: claimId,
        room_details: claim.room_details,
      }));
    //   const response = await sendRequest(
    //     `/api/estimates/updaterooms`,
    //     "POST",
    //     JSON.stringify({
    //       estimate_id: claimId,
    //       room_details: claim.room_details,
    //     }),
    //     {
    //       "Content-Type": "application/json",
    //     },
    //     auth.token
    //   );
    //   if (response) {
    //     console.log("Claim updated successfully!");
       navigate("/projectreceipt", { state: { Idclaim } });
    //   } else {
    //     console.error("Error updating claim:", response);
    //   }
    } catch (err) {
      console.error("Error updating claim:", err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const questionsAnswers = questions.map((question) => ({
      code: question.code,
      answer: question.answer,
    }));

    const updates = {
      room_name: roomData?.room_name.value,
      room_type: roomData?.room_type.value,
      service_type: roomData?.service_type.value,
      category_claims: questionsAnswers,
    };

    console.log("updates to the room");
    console.log(updates);
    await updateRoomDetail(roomIdNumber, updates);
    setIsUpdated(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  useEffect(() => {
    if (isUpdated) {
      updateClaim();
    }
  }, [isUpdated]);

  return (
    <Card className="update-answers">
      {/* <ErrorModal error={error} onClear={clearError} /> */}
       {isLoading && <LoadingSpinner asOverlay />}
      <table className="questions-table">
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
        </tbody>
     
      <div>
        <Button className="center" onClick={handleSubmit}>
          Update Room
        </Button>
      </div> </table>
    </Card>
  );
};

export default UpdateAnswers;
