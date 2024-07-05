// useEstimateApi.js
import { useState,  useContext } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

const useEstimateApi = () => {
  const [estimateData, setEstimateData] = useState(null);
  const {sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);

  const fetchEstimateById = async (claimId) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/estimates/estimatesbyid?estimate_id=${claimId}`,
        "GET",
        null,
        {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth.token
      );
      setEstimateData(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  return { estimateData, setEstimateData, fetchEstimateById };
};

export {useEstimateApi};