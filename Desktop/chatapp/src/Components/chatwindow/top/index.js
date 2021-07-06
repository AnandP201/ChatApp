import React, { memo } from 'react';
import { useCurrentRoom } from '../../../context/currentRoom.context';

const ChatTop = () => {
  const name = useCurrentRoom((value) => value.name);

  return <div>{name}</div>;
};

export default memo(ChatTop);