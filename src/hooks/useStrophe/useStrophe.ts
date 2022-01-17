import { Strophe } from 'strophe.js';
import { variables } from '../../constants/Variables';
import { wssGenerator, executeFunction } from '../../utils/helpers';
import { useCallback, useReducer } from 'react';
import { disconnectionReasonType, strophReducerState } from './stroph.types';
import { strophReducer } from './strophReducer';
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
}: PropType) => {
  const [
    { connected, connecting, disconnected, disconnecting, reason },
    dispatch,
  ] = useReducer(strophReducer, initialState);

  const connection = new Strophe.Connection(wssGenerator(variables.boshServer));
  const stropheConnect = useCallback(() => {
    connection.connect(jabid, pass, (status: number, reason: string) => {
      const realReason = reason as disconnectionReasonType;

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
          dispatch(setDisconnectingAction(realReason));
          executeFunction(onDisconnecting);
          break;
        case Strophe.Status.DISCONNECTED:
          dispatch(setDisconnectedAction(realReason));
          executeFunction(onDisconnect);
          break;
        default:
          console.log('Default');
      }
    });
  }, []);

  const stropheDisconnect = (reason: disconnectionReasonType) => {
    connection.disconnect(reason);
  };

  return {
    stropheConnect,
    stropheDisconnect,
    connected,
    connecting,
    disconnected,
    disconnecting,
    reason,
    connection,
  };
};

export default useStrophe;
