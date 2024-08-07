import React, { useState, useEffect, useContext } from "react";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Card from "../../shared/components/UIElements/Card";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import "jspdf-autotable";
import "./ProjectReceipt.css";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import PdfComponent from "../../shared/components/PdfComponent";
import useServiceTypes from '../../shared/hooks/service-hook';
import Logo from "../../images/LogoClaimsIA.png";
import EditImg from "../../images/edit.svg";
import DeleteImg from "../../images/delete.svg";
import { useClaim } from "../../shared/hooks/claim-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

const ProjectReceipt = () => {
  
  const { claim, claimId, updateClaim, deleteRoomDetail } = useClaim();
  const { getServiceLabel , getRoomLabel} = useServiceTypes();
  
  const [estimateid, setEstimateid] = useState(null); //rooms
  
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest , clearError } = useHttpClient();
  const [rooms, setRooms] = useState(claim.estimate_details);
  const [roomCosts, setRoomCosts] = useState([]);
  const [mergedRooms, setMergedRooms] = useState([]);
  const [totalCost, setTotalCost] = useState(0);  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  

  /*Getting claim by id*/

  useEffect(() => {
    //GETT ESTIMATE
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
        
        // console.log("response from get estimate by id");
        // console.log(responseData);
        updateClaim(responseData);
        setEstimateid(responseData.id);
        setRooms(responseData.estimate_details);
      
       
      } catch (error) {
        console.error(error);
      }
    };
    fetchEstimateById();

    //GET COSTS 
    const fetchEstimatePredict = async () => {
      const formData = new URLSearchParams();
    formData.append('estimate_id', claimId);
   // console.log(formData.toString());
    
     
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
       // console.log("room ids and cost")
        //console.log(predictResponseData);
     
        const roomsData = Object.entries(predictResponseData).map(([cost, roomKey]) => ({
          cost: parseFloat(cost),
          room_key: roomKey,
        }));
        // process the response data here
        setRoomCosts(roomsData);
       // console.log("roomsData");
        //console.log(roomsData);
        
        // process the response data here
        setRoomCosts(roomsData);
      } catch (error) { 
        console.log("Problem  retrieving costs")
        console.error(error);
       
      }
    };
    fetchEstimatePredict();
  }, [sendRequest, claimId, auth.token, updateClaim]); 


  



 
  
  // useEffect(() => {
  //   updateEstimateData(estimatebyidData);
  // }, [estimatebyidData]);

  

  useEffect(() => {
   // console.log("rooms")
    //console.log(rooms);
    //console.log(roomCosts);  
     
    
    if (rooms.length > 0 && roomCosts.length > 0) {
      const mergedRooms = rooms.map((room) => {
        const costRoom = roomCosts.find((costRoom) => costRoom.room_key === room.id);
       // console.log(`costRoom.roomKey: ${costRoom?.room_key}, room.id: ${room.id}`);
        if (costRoom) {
          console.log(costRoom);
          return {...room, cost: costRoom.cost, id: costRoom.room_key };
        } else {
          console.log("merge error");
         // console.log (costRoom);
         // console.log (room);
          return room; // or some default value
        }
      });
      setMergedRooms(mergedRooms);    
      console.log("mergedRooms");
      //console.log(mergedRooms);
    }else if (roomCosts.length > 0) {
      setMergedRooms(roomCosts);
      console.error("There are no costs generated");
    }else if (rooms.length >0){
      setMergedRooms(rooms);
    }else{
      console.error("rooms and costs empty");
    }
  }, [rooms, roomCosts]);

  useEffect(() => {
    let total = 0;
    mergedRooms?.forEach((roomCost) => {
      total += roomCost.cost? roomCost.cost : 0;

    });
    setTotalCost(total);
  }, [mergedRooms]);

  // useEffect(() => {
  //   const totalCost = mergedRooms.reduce((acc, room) => acc + room.cost? room.cost : 0, 0);

  //   setTotalCost(totalCost);
  // }, [mergedRooms]);

  const handleDeleteRoom = async (roomId) => {
    setRoomToDelete(roomId );
    setShowDeleteModal(true);
  };

  const confirmDeleteHandler = async () => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/estimates/deleteroom`,
        "DELETE",
        new URLSearchParams({ estimate_id: claimId, room_id: roomToDelete }),
        {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth.token
      );
      console.log(response);
      const updatedMergedRooms = mergedRooms.filter((room) => room.id!== roomToDelete);
       
      setMergedRooms(updatedMergedRooms);
      deleteRoomDetail(roomToDelete);
      let total = 0;
      updatedMergedRooms.forEach((roomCost) => {
        total += roomCost.cost;
      });
      setTotalCost(total);
       // setMergedRooms((prevMerged)=>prevMerged.filter((room) => room.id !== roomId)); 
        
       
     
    } catch (error) {
      console.error(error);
    }
    setShowDeleteModal(false);
  };

  const cancelDeleteHandler = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="receipt_page">
       <ErrorModal error={error} onClear={clearError}></ErrorModal>
      {isLoading && <LoadingSpinner asOverlay />}
      {showDeleteModal && (
        <Modal
          onCancel={cancelDeleteHandler}
          header="Are you sure?"
          show={showDeleteModal}
        > 
         <p>Do you want to proceed and delete this room from your estimate project? Please note that it
         can't be undone thereafter.</p>
          
          <Button inverse className="btn" onClick={cancelDeleteHandler}>
            Cancel
          </Button>         
          <Button danger className="btn btn-danger" onClick={confirmDeleteHandler}>
            Delete
          </Button>
         
        </Modal>
      )}
   {!isLoading && <Card className="receipt">
      {/* <ErrorModal error={error} onClear={clearError} /> */}
       
      <h3>The estimated amount for this project is:</h3>
      {totalCost<=0&&<h1>...</h1>}
      {totalCost>0&&<h1>${totalCost?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h1>}

      <div>
        <PdfComponent customer_info={claim?.customer_info} rooms={mergedRooms} totalCost={totalCost} logo={Logo} />
      </div>

      <div className="receipt-data">
      {mergedRooms.length>0 && ( <Card className="receipt_table">
          <table>
            <thead>
              <th>Room Name </th>
              <th>Room Type</th>
              <th>Category</th>
              <th>Cost</th>
              <th></th>
              
            </thead>
            <tbody>
              {mergedRooms.map((r) => (                
                <tr key={r.id}>
                  <td>{r.room_name}</td>
                  <td>{getRoomLabel(r.room_type)}</td>
                  <td>{getServiceLabel(r.service_type)}
                  </td>
                  <td>{r.cost && `$${r.cost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</td>
                  <td>
                    
                    <Link to={`/claims/${claimId}/rooms/${r.id}`}>
                      <img src={EditImg} alt="Edit button" />
                    </Link>
                    {/* delete button */}
                    <button
                      className="receipt-action__button"
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

       
      </div>

      <Link className="receipt-button filled-white" to={`/claims/${estimateid?estimateid:claimId}/addroom`}>
        Add new room
      </Link>
    </Card>}
    </div>
  );
};

export default ProjectReceipt;
