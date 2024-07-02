// CardContext.js
import { createContext, useState } from 'react';

const CardContext = createContext();

const CardProvider = ({ children }) => {
  const [cards, setCards] = useState([]);

  const addCard = (card) => {
    setCards((prevCards) => [...prevCards, card]);
  };

  return (
    <CardContext.Provider value={{ cards, addCard }}>
      {children}
    </CardContext.Provider>
  );
};

export { CardProvider, CardContext };