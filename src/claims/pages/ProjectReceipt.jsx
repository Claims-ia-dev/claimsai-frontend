import React, { useState, useEffect, useContext } from "react";
import Card from "../../shared/components/UIElements/Card";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import "jspdf-autotable";
import "./ProjectReceipt.css";
//import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import PdfComponent from "../../shared/components/PdfComponent";
import Logo from "../../images/LogoClaimsIA.png";
import EditImg from "../../images/edit.svg";
import DeleteImg from "../../images/delete.svg";
import { useClaim } from "../../shared/hooks/claim-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

const ProjectReceipt = () => {
  const { claim, deleteRoomDetail, claimId } = useClaim();
  console.log('stored claim created');
  console.log(claim);
  console.log('stored claim id');
  console.log(claimId);
  
  const auth = useContext(AuthContext);
  const { isLoading,  sendRequest,  } = useHttpClient();

  const [serviceTypes, setServiceTypes] = useState([]);

  const [rooms, setRooms] = useState(claim.room_details);
  const [roomCosts, setRoomCosts] = useState([]);
  const [mergedRooms, setMergedRooms] = useState([]);

  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const calculateTotalCost = () => {
      let total = 0;
      mergedRooms.forEach((room) => {
        total += room.cost;
      });
      setTotalCost(total);
    };
    calculateTotalCost();
  }, [mergedRooms]);

  const handleDeleteRoom = (roomId) => {
    const roomIdNumber = parseInt(roomId, 10);
   
    deleteRoomDetail(roomIdNumber);
    setRooms(rooms.filter((room) => room.id !== roomIdNumber));
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchServiceTypes = async () => {
      try {
        const responseData = await sendRequest(
          `https://localhost:3003/api/servicetype/services`, // API endpoint
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
    const fetchEstimatePredict = async () => {
      const formData = new URLSearchParams();
    formData.append('estimate_id', claimId);
    console.log(formData.toString());
     
      try {
        const predictResponseData = await sendRequest(
          `https://localhost:3003/api/estimates/predict`, // API endpoint
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
      } catch (error) {
        console.error(error);
      }
    };
    fetchEstimatePredict();
  }, [sendRequest, auth.token, claimId]);

  useEffect(() => {
    if (rooms.length > 0 && roomCosts.length > 0) {
      const mergedRooms = rooms.map((room, index) => ({
        ...room,
        cost: roomCosts[index].cost,
        roomKey: roomCosts[index].room_key
      }));
      setMergedRooms(mergedRooms);
    }
  }, [rooms, roomCosts]);

  return (
    <Card className="receipt">
      {/* <ErrorModal error={error} onClear={clearError} /> */}
       {isLoading && <LoadingSpinner asOverlay />}
      <h3>The estimated amount for this project is:</h3>
      <h1>${totalCost.toFixed(2)}</h1>

      <div>
        <PdfComponent rooms={mergedRooms} totalCost={totalCost} logo={Logo} />
      </div>

      <div className="receipt-data">
        <Card className="receipt-table">
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
                  <td>{r.room_name}</td>
                  <td>{r.room_type}</td>
                  <td>
                    {serviceTypes.find(
                      (service) => service.service_code === r.service_type
                    )
                      ? serviceTypes.find(
                          (service) =>
                            service.service_code === r.service_type
                        ).service_labels
                      : "Unknown service type"}
                  </td>
                  { <td>${r.cost.toFixed(2)}</td> }
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
        </Card>
        <Card className="receipt-total">
          <div>
            <p>Total</p> <h3>${totalCost.toFixed(2)}</h3>
          </div>
        </Card>
      </div>

      <Link className="receipt-button filled-white" to="/claims/new">
        Add new room
      </Link>
    </Card>
  );
};

export default ProjectReceipt;
