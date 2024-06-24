// TestComponent.jsx
import React, { useState, useEffect } from 'react';
import { getCategoryClaims, getMySubscription, /* other get APIs */ } from './api';

const TestComponent = () => {
  const [results, setResults] = useState({});

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const getCategoryClaimsResponse = await getCategoryClaims();
        const getMySubscriptionResponse = await getMySubscription();
        // Get APIs to call here...

        setResults({
          getCategoryClaims: getCategoryClaimsResponse,
          getMySubscription: getMySubscriptionResponse,
          // More results here...
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllData();
  }, []);

  return (
    <div>
      <h2>API Test Results</h2>
      <pre>
        {JSON.stringify(results, null, 2)}
      </pre>
    </div>
  );
};

export default TestComponent;