import { createContext, useReducer, useState, useContext } from "react";

const initialState = {
  userId: "",
  customer_info: {},
  room_details: [],
};

const estimateReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_ESTIMATE":
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

const EstimateContext = createContext();

const EstimateProvider = ({ children }) => {
  const [estimate, dispatch] = useReducer(estimateReducer, initialState);
  const [estimateId, setEstimateId] = useState(null);

  const updateEstimate = (newEstimate) => {
    dispatch({ type: "UPDATE_ESTIMATE", payload: newEstimate });
  };

  const addRoomDetail = (newRoomDetail) => {
    dispatch({ type: "ADD_ROOM_DETAIL"});
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
    <EstimateContext.Provider
      value={{
        estimate,
        updateEstimate,
        addRoomDetail,
        deleteRoomDetail,
        updateRoomDetail,
        estimateId,
        setEstimateId,
      }}
    >
      {children}
    </EstimateContext.Provider>
  );
};

const useEstimate = () => {
  return useContext(EstimateContext);
};

export  { EstimateProvider, useEstimate };
