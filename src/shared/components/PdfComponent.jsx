import React from 'react';
import useServiceTypes from '../hooks/service-hook';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './PdfComponent.css';

const PdfComponent = ({customer_info,rooms, totalCost, logo }) => {
  const { getServiceLabel } = useServiceTypes();

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
    doc.text(`${customer_info.customer_name}\n${customer_info.address}\n${customer_info.city}, ${customer_info.state} ${customer_info.zip}\n${customer_info.phone_number}`, margin, margin+logoHeight+10, { align: 'left' });

    // Table
    const tableData = rooms.map((room) => [room.room_name, room.room_type, getServiceLabel(room.service_type), `$${room.cost?.toFixed(2)}`]);
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
      headStyles: {
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
    doc.text(`The estimated amount for this project is: $${totalCost?.toFixed(2)}`, margin, doc.autoTable.previous.finalY + 20, { align: 'left' });

    doc.save('project_receipt.pdf');
  };

  return (
    <button className="receipt-button pdf-button" onClick={handleDownloadPDF}>
      Download PDF
    </button>
  );
};

export default PdfComponent;