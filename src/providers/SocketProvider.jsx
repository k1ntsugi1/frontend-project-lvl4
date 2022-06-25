
import React from 'react';
import { SocketContext} from '../contexts/index.jsx';

export const SocketProvider = ({socket, children}) => {
    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
  }