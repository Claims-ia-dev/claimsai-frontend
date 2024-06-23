// PdfComponent.js
import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './PdfComponent.css';

const PdfComponent = ({ rooms, totalCost, logo }) => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.internal.pageSize.width = 210; // set fixed width
    doc.internal.pageSize.height = 297; // set fixed height

    let xPos=20;
    let yPos = 10;
    let cellWidthSize=40;

    // Logo
    doc.addImage(logo, 'PNG', xPos+50, yPos, 100, 30);
    yPos += 0;

    // Address and number
    doc.text('696 Marsat Coutr \nSuite B \nChula Vista\n CA 91911\n619-482-1131', xPos, yPos, { align: 'left' });
    yPos += 60;

   

    // Table
    doc.autoTable({
      head: [['Name Room', 'Room Type', 'Category', 'Cost']],
      body: rooms.map((room) => [room.name, room.type, room.category, `$${room.cost.toFixed(2)}`]),
      startY: yPos,
      theme: 'grid',
      columnStyles: {
        0: { cellWidth: cellWidthSize },
        1: { cellWidth: cellWidthSize },
        2: { cellWidth: cellWidthSize },
        3: { cellWidth: cellWidthSize, halign: 'right' },
      },
      headerStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        fontSize: 12,
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        fontSize: 12,
      },
    });
    yPos += doc.autoTable.previous.finalY;

    // Total Cost
    doc.text('The estimated amount for this project is: $' + totalCost.toFixed(2), xPos, yPos, { align: 'left' });
    yPos += 20;

    doc.save('project_receipt.pdf');
  };

  return (
    <button className='receipt-button pdf-button' onClick={handleDownloadPDF}>
      Download PDF
    </button>
  );
};

export default PdfComponent;