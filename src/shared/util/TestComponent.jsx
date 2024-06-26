
import React, { useState,useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth-context';
import { useHttpClient } from '../hooks/http-hook';

const TestComponent = () => {
    const auth = useContext(AuthContext);
  
  const [data, setData] = useState(null);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();


  
  useEffect(() => {
    getData();
  }, []); // Call getData when the component mounts
  const getData = async () => {
    try { 
    console.log(auth.token);
      const responseData = await sendRequest(
        '/api/categoryclaims/categoryclaims', // api endpoint
        'GET',
        null,
        {}, 
        auth.token
      );
      setData(responseData);
     
      console.log(responseData);
      // display the results here
    } catch (err) {}
  };

  return (
    <div>
      <h2>API Test Results Get category claims</h2>
        {data && (
        <div>
        <h2>Data from API:</h2>
        <ul>
          {Object.keys(data).map((key) => (
            <li key={key}>{`${key}: ${data[key]}`}</li>
          ))}
        </ul>
      </div>
    )}
     {error && (
        <div>
          <h2>Error:</h2>
          <p>{error.message}</p>
        </div>
      )}
    </div>
  );
};

export default TestComponent;