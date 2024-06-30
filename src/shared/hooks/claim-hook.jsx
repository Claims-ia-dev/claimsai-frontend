import { createContext, useReducer, useState, useContext } from 'react';

const initialState = {
  userId: '',
  customer_info: {},
  room_details: []
};

const claimReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_CLAIM':
      return { ...state, ...action.payload };
    case 'ADD_ROOM_DETAIL':
      return { ...state, room_details: [...state.room_details, action.payload] };
    default:
      return state;
  }
};

const ClaimContext = createContext();

const ClaimProvider = ({ children }) => {
  const [claim, dispatch] = useReducer(claimReducer, initialState);

  const updateClaim = (newClaim) => {
    dispatch({ type: 'UPDATE_CLAIM', payload: newClaim });
  };

  const addRoomDetail = (newRoomDetail) => {
    dispatch({ type: 'ADD_ROOM_DETAIL', payload: newRoomDetail });
  };

  return (
    <ClaimContext.Provider value={{ claim, updateClaim, addRoomDetail }}>
      {children}
    </ClaimContext.Provider>
  );
};

const useClaim = () => {
  return useContext(ClaimContext);
};

export { ClaimProvider, useClaim };