import { useReducer } from 'react';
import { Strophe } from 'strophe.js';
import { strophReducerState } from './stroph.types';
import { strophReducer } from './strophReducer';
import { executeFunction } from './utils/helpers';
import {
  setConnectedAction,
  setConnectingAction,
  setDisconnectedAction,
  setDisconnectingAction,
} from './strophActionGenerator';

type PropType = {
  credentials: {
    jabid: string;
    pass: string;
  };
  showLogs?: boolean;
  onConnect?: () => void;
  onConnecting?: () => void;
  onDisconnect?: () => void;
  onDisconnecting?: () => void;
  connection: Strophe.Connection;
};

const initialState: strophReducerState = {
  connecting: false,
  connected: false,
  disconnecting: false,
  disconnected: false,
  reason: null,
};

const useStrophe = ({
  credentials: { jabid, pass },
  showLogs = false,
  onConnecting,
  onConnect,
  onDisconnecting,
  onDisconnect,
  connection,
}: PropType) => {
  const [
    { connected, connecting, disconnected, disconnecting, reason },
    dispatch,
  ] = useReducer(strophReducer, initialState);

  const connect = () =>
    connection.connect(jabid, pass, (status, stropheReason: string) => {
      if (showLogs) {
        /* eslint-disable */
        for (const stropheStatus in Strophe.Status) {
          if (Number(Strophe.Status[stropheStatus]) === status) {
            console.info(`Strophe status: ${stropheStatus}`);
          }
        }
        /* eslint-enable */
      }
      switch (status) {
        case Strophe.Status.CONNECTING:
          dispatch(setConnectingAction());
          executeFunction(onConnecting);
          break;
        case Strophe.Status.CONNECTED:
          dispatch(setConnectedAction());
          executeFunction(onConnect);
          break;
        case Strophe.Status.DISCONNECTING:
          dispatch(setDisconnectingAction(stropheReason));
          executeFunction(onDisconnecting);
          break;
        case Strophe.Status.DISCONNECTED:
          dispatch(setDisconnectedAction(stropheReason));
          executeFunction(onDisconnect);
          break;
        default:
          // eslint-disable-next-line
          console.log('Default');
      }
    });

  const disconnect = (disconnectingReason: string) => {
    connection.disconnect(disconnectingReason);
  };

  return {
    connect,
    disconnect,
    connected,
    connecting,
    disconnected,
    disconnecting,
    reason,
    connection,
  };
};

export default useStrophe;
