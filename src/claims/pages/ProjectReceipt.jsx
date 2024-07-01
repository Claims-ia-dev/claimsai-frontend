import React, { useState, useEffect, useContext } from "react";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import { Link, useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./ProjectReceipt.css";
import PdfComponent from "../../shared/components/PdfComponent";
import Logo from "../../images/LogoClaimsIA.png";
import EditImg from "../../images/edit.svg";
import DeleteImg from "../../images/delete.svg";
import { useClaim } from "../../shared/hooks/claim-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

const ProjectReceipt = () => {
  const { claim, deleteRoomDetail, claimId, setClaimId } = useClaim();
  
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
    console.log(claim.room_details);
    console.log(roomId);
    console.log(rooms.map(room=>room.id));
    deleteRoomDetail(roomIdNumber);
    setRooms(rooms.filter((room) => room.id !== roomIdNumber));
  };

  useEffect(() => {
    const fetchServiceTypes = async () => {
      try {
        const responseData = await sendRequest(
          "/api/servicetype/services", // API endpoint
          "GET",
          null,
          {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          auth.token
        );
        console.log(responseData);
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

  return (
    <Card className="receipt">
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
