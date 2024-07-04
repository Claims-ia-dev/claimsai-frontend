import { useState, useEffect, useContext } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

const useServiceTypes = () => {
  const [serviceTypeOptions, setServiceTypeOptions] = useState([]);
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchServiceTypes = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/servicetype/services`,
          'GET',
          null,
          {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          auth.token,
        );
        const serviceTypeOptions = responseData.map((service) => ({
          value: service.code_service,
          label: service.service,
        }));
        setServiceTypeOptions(serviceTypeOptions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchServiceTypes();
  }, [sendRequest, auth.token]);

  const getServiceLabel = (codeService) => {
    const service = serviceTypeOptions.find((service) => service.value === codeService);
    return service ? service.label : 'Unknown service type';
  };

  return { serviceTypeOptions, getServiceLabel };
};

export default useServiceTypes;