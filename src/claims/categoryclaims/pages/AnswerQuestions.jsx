import React, { useState, useContext, useEffect } from "react";
import './AnswerQuestions.css';
import Card from "../../../shared/components/UIElements/Card";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import Button from "../../../shared/components/FormElements/Button";
import { useLocation } from 'react-router-dom';
import { useClaim } from "../../../shared/hooks/claim-hook";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import { Link } from "react-router-dom";

const AnswerQuestions = (props) => {

  ;
  const location = useLocation();
  const roomData = location.state?.roomData;
  //  console.log(customerData );
  //  console.log(roomData);
  const auth = useContext(AuthContext);
  const { claim, addRoomDetail } = useClaim();
  const [data, setData] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => { // retrieves questions from categoryclaims
    getData();
  }, []); // Call getData when the component mounts
  const getData = async () => {
    try { 
      const formData = new URLSearchParams();
      formData.append('service', roomData?.servicetype.value);
      const requestBody = roomData?.servicetype.value ? formData.toString() : null;
       console.log(requestBody);
    console.log(auth.token);
      const responseData = await sendRequest(
        `/api/categoryclaims/category?${requestBody}`,
        // `/api/categoryclaims/categoryclaims`, // api endpoint
        'GET',
        null,
        {
        },
        auth.token
      );
      setData(responseData);
      setQuestions(responseData.map((item) => ({ 
        description: item.claims_description, 
        full_description:item.full_description,
        code: item.code, 
        answer: false 
      })));
     
      console.log(responseData);
      // display the results here
    } catch (err) {}
  };

  const { isLoading, error, sendRequest, clearError } = useHttpClient();



  const handleSubmit = async (event) => { 
    event.preventDefault();   
    const questionsAnswers = questions.map((question) => ({
      code: question.code,
      answer: question.answer,
    }));

    const newRoomDetail = {
      room_name: roomData?.roomname.value,
      room_type: roomData?.roomtype.value,
      service_type: roomData?.servicetype.value,
      category_claims: questionsAnswers  
    };
    addRoomDetail(newRoomDetail);  

  
    // const dataToSend = {
    //   userId: auth.userId,
    //   customer_info: customerInfo,
    //   room_details:room_details  
    // };

    console.log(claim);
  
    // try {
    //   const responseData = await sendRequest(
    //     '/api/estimates/create', // api endpoint
    //     'POST',
    //     JSON.stringify(dataToSend),
    //     {
    //       'Content-Type': 'application/json',
    //     },
    //     auth.token
    //   );  
    //   // Handle the response data
    //   console.log(responseData);
    // } catch (err) {
    //   // Handle the error
    //   console.error(err);
    // }

  };


  const handleAnswerChange = (questionCode, answer) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.code === questionCode ? { ...question, answer } : question
      )
    );
  };

  return (<>
       
      <table className="questions-table"> {/* Display the received data */}
     
        <thead>          
            <th className="question-column"> Question</th>
            <th className="toggle-column">Select</th>          
        </thead>
        <tbody>
        {questions.map((question, index) => (
          <tr key={index}>
            <td className="question-column">{question.description} <p className="full_description_text">{question.full_description}</p></td>
            <td className="toggle-column">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={question.answer}
                  onChange={(event) => handleAnswerChange(question.code, event.target.checked)}
                />
                <span className="slider round"></span>
              </label>
            </td>
          </tr>
        ))}
        </tbody> 
       
      </table>
     <div className="questions_actions">
        <Button inverse >
              Cancel
         </Button>
         <Link to="/claims/new">Add room</Link>
         <Button onClick={handleSubmit}>Finish</Button>
         </div>
      </>
    
  );
};

export default AnswerQuestions;
