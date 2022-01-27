import { useReducer } from 'react';
import { Strophe } from 'strophe.js';
import { strophReducer } from './stropheReducer';
import { executeFunction } from './utils/helpers';
import {
  setConnectedAction,
  setConnectingAction,
  setDisconnectedAction,
  setDisconnectingAction,
} from './stropheActionGenerator';
import { StropheReducerState } from './strophe.types';

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

const initialState: StropheReducerState = {
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
        // eslint-disable-next-line
        for (const stropheStatus in Strophe.Status) {
          if (Number(Strophe.Status[stropheStatus]) === status) {
            // eslint-disable-next-line
            console.info(
              `Strophe status: ${stropheStatus} reason ${stropheReason}`
            );
          }
        }
      }
      switch (status) {
        case Strophe.Status.CONNECTING:
          dispatch(setConnectingAction(stropheReason));
          executeFunction(onConnecting);
          break;
        case Strophe.Status.CONNECTED:
          dispatch(setConnectedAction(stropheReason));
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
