import React, { useState, useEffect } from 'react';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ProjectReceipt = () => {
  const [rooms, setRooms] = useState([
    { id: 1, name: 'Room 1', type: 'Bedroom', category: 'Water Damage', cost: 1000 },
    { id: 2, name: 'Room 2', type: 'Kitchen', category: 'Cleaning', cost: 2000 },
    { id: 3, name: 'Room 3', type: 'Terrace', category: 'Repairs', cost: 3000 },
  ]);

  const [newRoom, setNewRoom] = useState({ name: '', type: '', category: '', cost: 0 });

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

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Name Room', 'Room Type', 'Category', 'Cost']],
      body: rooms.map((room) => [room.name, room.type, room.category, `$${room.cost.toFixed(2)}`]),
    });
    doc.text(`The estimated amount for this project is: $${totalCost.toFixed(2)}`, 10, 10);
    doc.save('project_receipt.pdf');
  };

  return (
    <Card className="">
      <h2>The estimated amount for this project is:</h2>
      <h1>${totalCost.toFixed(2)}</h1>

      <Button type="submit" onClick={handleDownloadPDF}>
        Download PDF
      </Button>

      <table>
        <thead>
          <th>Name Room</th>
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
                <Button type="submit" onClick={() => handleDeleteRoom(room.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     

      <Button type="submit">New estimate</Button>
      <Button type="submit">Log out</Button>
    </Card>
  );
};

export default ProjectReceipt;