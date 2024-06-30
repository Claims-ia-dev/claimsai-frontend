import React, {createContext, useState, useContext, useEffect, useCallback}from "react";
const ClaimContext = React.createContext();
const initialState = {
    userId: '',
    customerInfo: {},
    roomDetails: [{
      roomName: '',
      roomType: '',
      serviceType: '',
      categoryClaims: []
    }]
  };


const useClaim = () => {
  const [claim, setClaim] = useState({
    userId: '',
    customerInfo: {},
    roomDetails:[{
        roomName: '',
        roomType: '',
        serviceType: '',
        categoryClaims: []
      }]
  });

  const updateClaim = (newClaim) => {
    setClaim(newClaim);
  };

  const addRoomDetail = (newRoomDetail) => {
    setClaim((prevClaim) => ({
      ...prevClaim,
      roomDetails: [...prevClaim.roomDetails, newRoomDetail]
    }));
  };

  return { claim, updateClaim, addRoomDetail };
};

const ClaimProvider = ({ children }) => {
  const { claim, updateClaim, addRoomDetail } = useClaim();

  return (
    <ClaimContext.Provider value={{ claim, updateClaim, addRoomDetail }}>
      {children}
    </ClaimContext.Provider>
  );
};

export { ClaimProvider, useClaim };