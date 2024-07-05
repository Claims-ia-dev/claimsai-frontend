import { useState, useEffect, useContext } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

const useServiceTypes = () => {
  const [serviceTypeOptions, setServiceTypeOptions] = useState([]);
  const roomTypeOptions = [
    { value: "BATHROOM", label: "Bathroom" },
    { value: "BEDROOM", label: "Bedroom" },
    { value: "CLOSET", label: "Closet" },
    { value: "Dining_room", label: "Dining room" },
    { value: "ENTRY", label: "Entry" },
    { value: "FAMILY_ROOM", label: "Family room" },
    { value: "FOYER", label: "Foyer" },
    { value: "GARAGE", label: "Garage" },
    { value: "GENERAL", label: "General" },
    { value: "HALLWAY", label: "Hallway" },
    { value: "KITCHEN", label: "Kitchen" },
    { value: "LAUNDRY", label: "Laundry" },
    { value: "LIVING_ROOM", label: "Living room" },
    { value: "MAIN_LEVEL", label: "Main level" },
    { value: "OFFICE", label: "Office" },
    { value: "PACKOUT", label: "Packout" },
    { value: "STAIRS", label: "Stairs" },
    { value: "STORAGE_AREA", label: "Storage area" },
    { value: "TOILET_ROOM", label: "Toilet room" },
    { value: "VANITY_AREA", label: "Vanity area" },
  ];
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

  // useEffect(() => {
  //   const fetchRoomTypes = async () => {
  //     try {
  //       const responseData = await sendRequest(
  //         `${process.env.REACT_APP_BACKEND_URL}/api/roomtype/rooms`,
  //         'GET',
  //         null,
  //         {
  //           'Content-Type': 'application/x-www-form-urlencoded',
  //         },
  //         auth.token,
  //       );
  //       const roomTypeOptions = responseData.map((room) => ({
  //         value: room.code_room,
  //         label: room.room,
  //       }));
  //       setRoomTypeOptions([...roomTypeOptions, ...roomTypeOptions]);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchRoomTypes();
  // }, [sendRequest, auth.token]);

  const getServiceLabel = (codeService) => {
    const service = serviceTypeOptions.find((service) => service.value === codeService);
    return service ? service.label : 'Unknown service type';
  };

  const getRoomLabel = (codeRoom) => {
    const room = roomTypeOptions.find((room) => room.value === codeRoom);
    return room ? room.label : 'Unknown room type';
  };

  return { serviceTypeOptions, getServiceLabel, roomTypeOptions, getRoomLabel };
};

export default useServiceTypes;