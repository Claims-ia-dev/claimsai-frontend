/*import useEstimateData from './useEstimateData';

const MyComponent = () => {
  const [estimateData, updateEstimateData, updateEstimateDetail, updateDetail] = useEstimateData();

  // Initialize the data with the backend response
  useEffect(() => {
    updateEstimateData(backendResponse);
  }, [backendResponse]);

  // Update the entire estimate data
  const handleUpdateEstimateData = (newData) => {
    updateEstimateData(newData);
  };

  // Update a specific estimate detail
  const handleUpdateEstimateDetail = (estimateDetailId, newData) => {
    updateEstimateDetail(estimateDetailId, newData);
  };

  // Update a specific detail within an estimate detail
  const handleUpdateDetail = (estimateDetailId, detailId, newData) => {
    updateDetail(estimateDetailId, detailId, newData);
  };

  return (
    <div>
      {/* Render the estimate data */
//       {estimateData && (
//         <div>
//           <h2>{estimateData.customer_name}</h2>
//           <ul>
//             {estimateData.estimate_details.map((detail) => (
//               <li key={detail.id}>
//                 <h3>{detail.description}</h3>
//                 <ul>
//                   {detail.details.map((d) => (
//                     <li key={d.code}>
//                       <span>{d.code}</span>
//                       <span>{d.answer ? 'Yes' : 'No'}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };*/