import React, { createContext, useEffect, useState } from 'react';
import { database } from '../misc/firebase';
import { arrayWithId } from '../misc/Helper';

const RoomsContext = createContext();

export const RoomsProvider = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    const roomListRef = database.ref('rooms');

    roomListRef.on('value', (snap) => {
      const data = arrayWithId(snap.val());
      setRooms(data);
    });

    return () => {
      roomListRef.off();
    };
  }, []);

  return (
    <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
  );
};
