import React, { useState, useContext, useEffect } from "react";
import './AnswerQuestions.css';
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import Button from "../../../shared/components/FormElements/Button";
import { useLocation } from 'react-router-dom';
import { useClaim } from "../../../shared/hooks/claim-hook";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import { Link } from "react-router-dom";

const AnswerQuestions = (props) => {
  
  const location = useLocation();
  const roomData = location.state?.roomData;  
  const auth = useContext(AuthContext);
  const { claim, addRoomDetail, claimId, setClaimId } = useClaim();
  const navigate = useNavigate(); 
  const [data, setData] = useState(null);
  const [questions, setQuestions] = useState([]);
 const { isLoading, error, sendRequest, clearError } = useHttpClient();
  
 useEffect(() => { 
  // retrieves questions from categoryclaims
    getData();
  }, []); // Call getData when the component mounts

  const getData = async () => {
    try { 
      const formData = new URLSearchParams();
      formData.append('service', roomData?.service_type.value);
      const requestBody = roomData?.service_type.value ? formData.toString() : null;
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
      console.log("response data retrieving questions")
      console.log(responseData);
      // display the results here
    } catch (err) {}
  };

 


  const handleSubmitRoom = async (event) => { 
    event.preventDefault();   
    const questionsAnswers = questions.map((question) => ({
      code: question.code,
      answer: question.answer,
    }));

    const newRoomDetail = {
      room_name: roomData?.room_name.value,
      room_type: roomData?.room_type.value,
      service_type: roomData?.service_type.value,
      category_claims: questionsAnswers  
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

    const newRoomDetail = {
      room_name: roomData?.room_name.value,
      room_type: roomData?.room_type.value,
      service_type: roomData?.service_type.value,
      category_claims: questionsAnswers  
    };
   await addRoomDetail(newRoomDetail);    
   const updatedClaim = { ...claim, room_details: [...claim.room_details, newRoomDetail] };
 
   console.log('final claim state for create estimate');
   console.log(await updatedClaim);

   try {
    const response = await sendRequest(
      `/api/estimates/create`,
      'POST',
      JSON.stringify(updatedClaim),
      {
        'Content-Type': 'application/json'
      },
      auth.token)    

      if (response!=null) {
        console.log("response from backend when estimate creation");
        console.log(response);
        const id = response[0].id; // access the id property of the first element in the response array
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
       <ErrorModal error={error} onClear={clearError} />
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
