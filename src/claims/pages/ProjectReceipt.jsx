import React, { useState, useEffect, useContext } from "react";
import Card from "../../shared/components/UIElements/Card";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import "jspdf-autotable";
import "./ProjectReceipt.css";
//import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import PdfComponent from "../../shared/components/PdfComponent";
import useServiceTypes from '../../shared/hooks/service-hook';

import Logo from "../../images/LogoClaimsIA.png";
import EditImg from "../../images/edit.svg";
import DeleteImg from "../../images/delete.svg";
import { useClaim } from "../../shared/hooks/claim-hook";
import useEstimateData from "../../shared/hooks/estimate-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

const ProjectReceipt = () => {
  const [updateEstimateData, deleteEstimateDetail] = useEstimateData();
  const { claim, claimId } = useClaim();
  const { serviceTypeOptions, getServiceLabel } = useServiceTypes();
  const [estimatebyidData, setEstimatebyidData] = useState(null); //claim
  const [estimateDetails, setEstimateDetails] = useState(null); //rooms
  //const estimateId = claimId;
  // console.log('stored claim created');
  // console.log(claim);
  // console.log('stored claim id');
  // console.log(claimId);
  
  const auth = useContext(AuthContext);
  const { isLoading,  sendRequest  } = useHttpClient();

  const [serviceTypes, setServiceTypes] = useState([]);

  const [rooms, setRooms] = useState(claim.room_details);
  const [roomCosts, setRoomCosts] = useState([]);
  const [mergedRooms, setMergedRooms] = useState([]);

  const [totalCost, setTotalCost] = useState(0);  
  

  /*Getting claim by id*/

  useEffect(() => {
    const fetchEstimateById = async () => {
      try {
       // console.log("tried");
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/estimates/estimatesbyid?estimate_id=${claimId}`,
          "GET",
          null,
          {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          auth.token
        );
        setEstimatebyidData(responseData);
        setEstimateDetails(responseData.estimate_details);
        setRooms(responseData.estimate_details)
       
      
        console.log("response from get estimate by id");
        console.log(responseData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEstimateById();
  }, [sendRequest, updateEstimateData,claimId, auth.token]); 

  /*Retieving costs from backend*/

  useEffect(() => { 
    const fetchEstimatePredict = async () => {
      const formData = new URLSearchParams();
    formData.append('estimate_id', claimId);
    console.log(formData.toString());
     
      try {
        const predictResponseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/estimates/predict`, // API endpoint
          "POST",
          formData.toString(), // pass claimId as estimate_id
          {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          auth.token
        );
        console.log("room ids and cost")
        console.log(predictResponseData);
     
        const roomsData = Object.entries(predictResponseData).map(([cost, roomKey]) => ({
          cost: parseFloat(cost),
          room_key: roomKey,
        }));
        // process the response data here
        setRoomCosts(roomsData);
        console.log("roomsData");
        console.log(roomsData);
        
        // process the response data here
        setRoomCosts(roomsData);
      } catch (error) { 
        console.log("Problem  retrieving costs")
        console.error(error);
       
      }
    };
    fetchEstimatePredict();
  }, [sendRequest, auth.token, claimId]);
  
  // useEffect(() => {
  //   updateEstimateData(estimatebyidData);
  // }, [estimatebyidData]);

  /*Getting services */

  useEffect(() => {
    const controller = new AbortController();
    const fetchServiceTypes = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/servicetype/services`, // API endpoint
          "GET",
          null,
          {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          auth.token,
          {
            signal: controller.signal,
          }
        );
        const servicesData = responseData.map((service) => ({
          service_code: service.code_service,
          service_labels: service.service,
        }));
        setServiceTypes(servicesData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchServiceTypes();
  }, [sendRequest, auth.token]);

  

  useEffect(() => {
    console.log("rooms")
    console.log(rooms);
    console.log(roomCosts);  
     
    
    if (rooms.length > 0 && roomCosts.length > 0) {
      const mergedRooms = rooms.map((room) => {
        const roomCost = roomCosts.find((cost) => cost.roomKey === room.id);
        return { ...room, cost: roomCost.cost, id: roomCost.roomKey };
      });
      setMergedRooms(mergedRooms);    
      console.log("mergedRooms")
      console.log(mergedRooms)
    }else if (roomCosts.length > 0) {
      setMergedRooms(roomCosts);
      console.error("There are no costs generated");
    }else if (rooms.length >0){
      setMergedRooms(rooms);
    }
    else{
      console.error("There was no estimate created");
    }
  }, [rooms, roomCosts]);

  useEffect(() => {
    let total = 0;
    roomCosts?.forEach((roomCost) => {
      total += roomCost.cost;
    });
    setTotalCost(total);
  }, [roomCosts]);



  const handleDeleteRoom = async (roomId) => {
    try {
      // const response = await sendRequest(
      //   `${process.env.REACT_APP_BACKEND_URL}/api/estimates/deleteroom`,
      //   "POST",
      //   new URLSearchParams({ estimate_id: estimateId, id: roomId }),
      //   {
      //     "Content-Type": "application/x-www-form-urlencoded",
      //   },
      //   auth.token
      // );
      // if (response.ok) {
        setRooms(rooms.filter((room) => room.id !== roomId));
        setMergedRooms(mergedRooms.filter((room) => room.id !== roomId));
        deleteEstimateDetail(roomId);
    //  }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="receipt-page">
    <Card className="receipt">
      {/* <ErrorModal error={error} onClear={clearError} /> */}
       {isLoading && <LoadingSpinner asOverlay />}
      <h3>The estimated amount for this project is:</h3>
      <h1>${totalCost?.toFixed(2)}</h1>

      <div>
        <PdfComponent customer_info={claim?.customer_info} rooms={mergedRooms} totalCost={totalCost} logo={Logo} />
      </div>

      <div className="receipt-data">
      {mergedRooms.length>0 && ( <Card className="receipt-table">
          <table>
            <thead>
              <th>Room Name </th>
              <th>Room Type</th>
              <th>Category</th>
              <th>Cost</th>
              <th></th>
              <th></th>
            </thead>
            <tbody>
              {mergedRooms.map((r) => (
                <tr key={r.id}>
                  <td>{r.description}</td>
                  <td>{r.room_type}</td>
                  <td>{getServiceLabel(r.service_type)}
                  </td>
                  {r.cost&& <td>${r.cost.toFixed(2)}</td> }
                  <td>
                    
                    <Link to={`/claims/${claimId}/rooms/${r.id}`}>
                      <img src={EditImg} alt="Edit button" />
                    </Link>
                    {/* delete button */}
                    <button
                      className="receipt-action__button"
                      danger
                      onClick={() => handleDeleteRoom(r.id)}
                    >
                      
                        <img src={DeleteImg} alt="Delete button" />
                      
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>)}

        <Card className="receipt-total">
          <div>
            <p>Total</p> <h3>${totalCost?.toFixed(2)}</h3>

          </div>
        </Card>
      </div>

      <Link className="receipt-button filled-white" to="/claims/new">
        Add new room
      </Link>
    </Card>
    </div>
  );
};

export default ProjectReceipt;
