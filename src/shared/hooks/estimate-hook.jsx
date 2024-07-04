import { useState } from 'react';

const useEstimateData = () => {
  const [estimateData, setEstimateData] = useState({}); //stores the entire estimate i get from the backend

  const updateEstimateData = (newData) => {
    setEstimateData((prevData) => ({ ...prevData, ...newData })); //updates the entire estimateData object with new data.
  };

  const updateEstimateDetail = (estimateDetailId, newData) => { //updates a specific estimate_detail object with new data, identified by its id.
    setEstimateData((prevData) => {
      const estimateDetails = prevData.estimate_details.map((detail) => {
        if (detail.id === estimateDetailId) {
          return { ...detail, ...newData };
        }
        return detail;
      });
      return { ...prevData, estimate_details: estimateDetails };
    });
  };

  const updateDetail = (estimateDetailId, detailId, newData) => {  //updates a specific detail object within an estimate_detail object, identified by its code.
    setEstimateData((prevData) => {
      const estimateDetails = prevData.estimate_details.map((detail) => {
        if (detail.id === estimateDetailId) {
          const details = detail.details.map((d) => {
            if (d.code === detailId) {
              return { ...d, ...newData };
            }
            return d;
          });
          return { ...detail, details };
        }
        return detail;
      });
      return { ...prevData, estimate_details: estimateDetails };
    });
  };

  return [estimateData, updateEstimateData, updateEstimateDetail, updateDetail];
};

export default useEstimateData;