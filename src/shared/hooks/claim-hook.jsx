import { createContext, useReducer, useState, useContext } from "react";

const initialState = {
  userId: "",
  customer_info: {},
  room_details: [],
};

const claimReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_CLAIM":
      return { ...state, ...action.payload };
    case "ADD_ROOM_DETAIL":
      return {
        ...state,
        room_details: [...state.room_details, action.payload],
      };
    case "DELETE_ROOM_DETAIL":
      return {
        ...state,
        room_details: state.room_details.filter(
          (room) => room.id !== action.payload
        ),
      };
    case "UPDATE_ROOM_DETAIL":
      const updatedRoomDetails = state.room_details.map((room) => {
        if (room.id === action.payload.roomId) {
          return { ...room, ...action.payload.updatedRoomDetail };
        }
        return room;
      });
      return { ...state, room_details: updatedRoomDetails };
    default:
      return state;
  }
};

const ClaimContext = createContext();

const ClaimProvider = ({ children }) => {
  const [claim, dispatch] = useReducer(claimReducer, initialState);
  const [claimId, setClaimId] = useState(null);
  const [roomIdCounter, setRoomIdCounter] = useState(0);

  const updateClaim = (newClaim) => {
    dispatch({ type: "UPDATE_CLAIM", payload: newClaim });
  };

  const addRoomDetail = (newRoomDetail) => {
    const newRoomWithId = {...newRoomDetail, id: roomIdCounter }; // Generate a unique ID
    dispatch({ type: "ADD_ROOM_DETAIL", payload: newRoomWithId });
    setRoomIdCounter(roomIdCounter + 1); 
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
