import React, { useState, useEffect, useContext } from "react";
import Card from "../../shared/components/UIElements/Card";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import "jspdf-autotable";
import "./ProjectReceipt.css";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import PdfComponent from "../../shared/components/PdfComponent";
import Logo from "../../images/LogoClaimsIA.png";
import EditImg from "../../images/edit.svg";
import DeleteImg from "../../images/delete.svg";
import { useClaim } from "../../shared/hooks/claim-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

const ProjectReceipt = () => {
  const { claim, deleteRoomDetail, claimId } = useClaim();
  
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [serviceTypes, setServiceTypes] = useState([]);

  const [rooms, setRooms] = useState(claim.room_details);

  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const calculateTotalCost = () => {
      let total = 0;
      rooms.forEach((room) => {
        total += room.cost;
      });
      setTotalCost(total);
    };
    calculateTotalCost();
  }, [rooms]);

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
          `/api/servicetype/services`, // API endpoint
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
    const controller = new AbortController();
    const fetchEstimatePredict = async () => {
      const formData = new URLSearchParams();
    formData.append('estimate_id', claimId);
     
      try {
        const responseData = await sendRequest(
          `/api/estimates/predict`, // API endpoint
          "GET",
          formData.toString(), // pass claimId as estimate_id
          {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          auth.token,
          {
            signal:controller.signal,
          }
        );
        // process the response data here
       
      } catch (error) {
        console.error(error);
      }
    };
    fetchEstimatePredict();
  }, [sendRequest, auth.token, claimId]);

  return (
    <Card className="receipt">
      <ErrorModal error={error} onClear={clearError} />
       {isLoading && <LoadingSpinner asOverlay />}
      <h3>The estimated amount for this project is:</h3>
      <h1>${totalCost.toFixed(2)}</h1>

      <div>
        <PdfComponent rooms={rooms} totalCost={totalCost} logo={Logo} />
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
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.room_name}</td>
                  <td>{room.room_type}</td>
                  <td>
                    {serviceTypes.find(
                      (service) => service.service_code === room.service_type
                    )
                      ? serviceTypes.find(
                          (service) =>
                            service.service_code === room.service_type
                        ).service_labels
                      : "Unknown service type"}
                  </td>
                  {/* <td>${room.cost.toFixed(2)}</td> */}
                  <td>
                    
                    <Link to={`/claims/${claimId}/rooms/${room.id}`}>
                      <img src={EditImg} alt="Edit button" />
                    </Link>
                    {/* delete button */}
                    <button
                      className="receipt-action__button"
                      danger
                      onClick={() => handleDeleteRoom(room.id)}
                    >
                      <a>
                        <img src={DeleteImg} alt="Delete button" />
                      </a>
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
