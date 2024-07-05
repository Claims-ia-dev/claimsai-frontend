import { createContext, useReducer, useState, useContext } from "react";

const initialState = {
  userId: "",
  customer_info: {},
  estimate_details: [],
};

const claimReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_CLAIM":
      return { ...state, ...action.payload };
    case "ADD_ROOM_DETAIL":
      return {
        ...state,
        estimate_details: [...state.estimate_details, action.payload],
      };
    case "DELETE_ROOM_DETAIL":
      return {
        ...state,
        estimate_details: state.estimate_details.filter(
          (room) => room.id !== action.payload
        ),
      };
    case "UPDATE_ROOM_DETAIL":
      const updatedRoomDetails = state.estimate_details.map((room) => {
        if (room.id === action.payload.roomId) {
          return { ...room, ...action.payload.updatedRoomDetail };
        }
        return room;
      });
      return { ...state, estimate_details: updatedRoomDetails };
    default:
      return state;
  }
};

const ClaimContext = createContext();

const ClaimProvider = ({ children }) => {
  const [claim, dispatch] = useReducer(claimReducer, initialState);
  const [claimId, setClaimId] = useState(null);
  const [estimate, setEstimate] = useState({});
  const [roomIdCounter, setRoomIdCounter] = useState(0);

  const updateClaim = (newClaim) => {
    dispatch({ type: "UPDATE_CLAIM", payload: newClaim });
  };

  const addRoomDetail = (newRoomDetail) => {
    dispatch({ type: "ADD_ROOM_DETAIL", payload: newRoomDetail });
  };

  const deleteRoomDetail = (roomId) => {
    dispatch({ type: "DELETE_ROOM_DETAIL", payload: roomId });
  };

  const updateRoomDetail = (roomId, updatedRoomDetail) => {
    dispatch({
      type: "UPDATE_ROOM_DETAIL",
      payload: { roomId, updatedRoomDetail },
    });    
  };

  return (
    <ClaimContext.Provider
      value={{
        claim,
        updateClaim,
        addRoomDetail,
        deleteRoomDetail,
        updateRoomDetail,
        claimId,
        setClaimId,
        estimate,
        setEstimate
      }}
    >
      {children}
    </ClaimContext.Provider>
  );
};

const useClaim = () => {
  return useContext(ClaimContext);
};

export { ClaimProvider, useClaim };
