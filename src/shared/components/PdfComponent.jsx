import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './PdfComponent.css';

const PdfComponent = ({ rooms, totalCost, logo }) => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.internal.pageSize.width = 210; // set fixed width
    doc.internal.pageSize.height = 297; // set fixed height

    const margin = 20;
    const logoWidth = 60;
    const logoHeight = logoWidth/4;
    const tableWidth = 180;

    // Logo
    doc.addImage(logo, 'PNG', margin, margin, logoWidth, logoHeight);
    doc.setFontSize(12);
    // Address and number
    doc.text('696 Marsat Court\nSuite B\nChula Vista, CA 91911\n619-482-1131', margin, margin+logoHeight+10, { align: 'left' });

    // Table
    const tableData = rooms.map((room) => [room.name, room.type, room.category, `$${room.cost.toFixed(2)}`]);
    doc.autoTable({
      head: [['Name Room', 'Room Type', 'Category', 'Cost']],
      body: tableData,
      startY: margin + 50,
      theme: 'grid',
      columnStyles: {
        0: { cellWidth: tableWidth / 4 },
        1: { cellWidth: tableWidth / 4 },
        2: { cellWidth: tableWidth / 4 },
        3: { cellWidth: tableWidth / 4, halign: 'right' },
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

    // Total Cost
    doc.text(`The estimated amount for this project is: $${totalCost.toFixed(2)}`, margin, doc.autoTable.previous.finalY + 20, { align: 'left' });

    doc.save('project_receipt.pdf');
  };

  return (
    <button className="receipt-button pdf-button" onClick={handleDownloadPDF}>
      Download PDF
    </button>
  );
};

export default PdfComponent;