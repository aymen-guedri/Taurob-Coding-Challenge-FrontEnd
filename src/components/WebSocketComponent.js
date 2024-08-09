import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

const WebSocketComponent = () => {
  const [socketUrl] = useState('ws://localhost:8000/ws/robots/');
  const { lastMessage, readyState } = useWebSocket(socketUrl);

  const connectionStatus = {
    0: 'Connecting',
    1: 'Connected',
    2: 'Closing',
    3: 'Closed',
  }[readyState];

  return (
    <div>
    </div>
  );
};

export default WebSocketComponent;