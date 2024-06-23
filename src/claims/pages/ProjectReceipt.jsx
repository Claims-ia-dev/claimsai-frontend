import React, { useState, useEffect } from 'react';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './ProjectReceipt.css';
import PdfComponent from '../../shared/components/PdfComponent';
import Logo from '../../images/LogoClaimsIA.png';
import EditImg from  '../../images/edit.svg';
import DeleteImg from  '../../images/delete.svg';

const ProjectReceipt = () => {
  const [rooms, setRooms] = useState([
    { id: 1, name: 'Room 1', type: 'Bedroom', category: 'Water Damage', cost: 1000 },
    { id: 2, name: 'Room 2', type: 'Kitchen', category: 'Cleaning', cost: 2000 },
    { id: 3, name: 'Room 3', type: 'Terrace', category: 'Repairs', cost: 3000 },
  ]);


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
    setRooms(rooms.filter((room) => room.id !== roomId));
  };

 

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
              <td>{room.name}</td>
              <td>{room.type}</td>
              <td>{room.category}</td>
              <td>${room.cost.toFixed(2)}</td>
              <td>
                {/* edit button-> will go to the route of the claim id to edit */}
              <button className="receipt-action__button" to={`/`}>
               <a> <img src={EditImg} alt="Edit button" /></a>
              </button>         
              {/* delete button */}
              <button className="receipt-action__button" danger  onClick={() => handleDeleteRoom(room.id)}>
              <a><img src={DeleteImg} alt="Delete button" /></a>
              </button>
              
              </td>
            </tr>
          ))}
        </tbody>
      </table>
</Card>
     <Card className="receipt-total">
      <div >
      <p>Total</p> <h3>${totalCost.toFixed(2)}</h3>
      </div>
     </Card>
     </div>
 
      <Link className="receipt-button filled-white" to="/claims/new">Add new room</Link> 

    </Card>
  );
};

export default ProjectReceipt;