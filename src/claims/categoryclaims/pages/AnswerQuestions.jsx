import React, { useState, useContext, useEffect, useCallback } from "react";
import './AnswerQuestions.css';
//import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import Button from "../../../shared/components/FormElements/Button";
import { useLocation } from 'react-router-dom';
import { useClaim } from "../../../shared/hooks/claim-hook";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import { Link } from "react-router-dom";

const AnswerQuestions = () => {  
  const location = useLocation();
  const roomData = location.state?.roomData;  
  const auth = useContext(AuthContext);
  const { claim, addRoomDetail,  setClaimId } = useClaim();
  const navigate = useNavigate(); 
  const [questions, setQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
 const { isLoading, sendRequest } = useHttpClient();
  
 // Call getData when the component mounts

  const getData = useCallback (async () => {
    try { 
      const formData = new URLSearchParams();
      formData.append('service', roomData?.service_type.value);
      const requestBody = roomData?.service_type.value ? formData.toString() : null;
      
      const allQuestionsData=await sendRequest(
        `https://localhost:3003/api/categoryclaims/category`,
        'GET',
        null,
        {
        },
        auth.token
      );

      setAllQuestions(allQuestionsData);//to store all questions and the compare with the ones answered
      
      const responseData = await sendRequest(
        `https://localhost:3003/api/categoryclaims/category?${requestBody}`,
        'GET',
        null,
        {
        },
        auth.token
      );
      
      setQuestions(responseData.map((item) => ({ 
        description: item.claims_description, 
        full_description:item.full_description,
        code: item.code, 
        answer: false 
      })));
      // display the results here
    } catch (err) {}
  },[auth.token, roomData?.service_type.value, sendRequest]);

  useEffect(() => { 
  // retrieves questions from categoryclaims
    getData();
  }, [getData]);


  const handleSubmitRoom = async (event) => { 
    event.preventDefault();   

    const questionsAnswers = questions.map((question) => ({
      code: question.code,
      answer: question.answer,
    }));

    const CategoriesArrayToSend = allQuestions.map((item) => ({
      code: item.code,
      answer: questionsAnswers.find((qa) => qa.code === item.code)? questionsAnswers.find((qa) => qa.code === item.code).answer : false,
    }));

    const newRoomDetail = {
      room_name: roomData?.room_name.value,
      room_type: roomData?.room_type.value,
      service_type: roomData?.service_type.value,
      category_claims:  CategoriesArrayToSend
    };
    addRoomDetail(newRoomDetail);    


    navigate('/claims/new');
  };

  const handleSubmitProject = async (event) => { 
    event.preventDefault();   
    const questionsAnswers = questions.map((question) => ({
      code: question.code,
      answer: question.answer,
    }));

      const CategoriesArrayToSend = allQuestions.map((item) => ({
      code: item.code,
      answer: questionsAnswers.find((qa) => qa.code === item.code)? questionsAnswers.find((qa) => qa.code === item.code).answer : false,
    }));

    const newRoomDetail = {
      room_name: roomData?.room_name.value,
      room_type: roomData?.room_type.value,
      service_type: roomData?.service_type.value,
      category_claims: CategoriesArrayToSend 
    };
   await addRoomDetail(newRoomDetail);    
   const updatedClaim = { ...claim, room_details: [...claim.room_details, newRoomDetail] };
 

   try {
    const response = await sendRequest(
      `https://localhost:3003/api/estimates/create`,
      'POST',
      JSON.stringify(updatedClaim),
      {
        'Content-Type': 'application/json'
      },
      auth.token)    

      if (response!=null) {
       console.log(response);
        const id = response[0].id; // access the id property of the first element in the response array
        console.log("claim id");
        console.log(id);
        setClaimId(id);
        navigate('/projectreceipt', { state: { response, id } }); // pass the id as a separate prop
      } else {
        console.error('Error submitting claim:', response);
      }
    } catch (err) {
      console.error('Error submitting claim:', err);
    }

  };

  


  const handleAnswerChange = (questionCode, answer) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.code === questionCode ? { ...question, answer } : question
      )
    );
  };

  return (<>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      <table className="questions-table"> {/* Display the received data */}
      {isLoading && <LoadingSpinner asOverlay />}
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
         <Link to="/claims/new"></Link>
         <Button onClick={handleSubmitRoom}>Add room</Button>
         <Button onClick={handleSubmitProject}>Finish Project</Button>
         </div>
      </>
    
  );
};

export default AnswerQuestions;
