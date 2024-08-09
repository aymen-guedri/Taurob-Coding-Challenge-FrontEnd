import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

const WebSocketComponent = () => {
  const [socketUrl] = useState(process.env.REACT_APP_WS_URL);
  const { lastMessage, readyState } = useWebSocket(socketUrl);

  const connectionStatus = {
    0: 'Connecting',
    1: 'Connected',
    2: 'Closing',
    3: 'Closed',
  }[readyState];

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      {lastMessage ? <p>Last message: {lastMessage.data}</p> : null}
    </div>
  );
};

export default WebSocketComponent;