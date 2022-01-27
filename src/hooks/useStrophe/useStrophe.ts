import { useReducer } from 'react';
import { Strophe } from 'strophe.js';
import { strophReducer } from './stropheReducer';
import { ConnectionFunctionType, executeFunction } from './utils/helpers';
import {
  setConnectedAction,
  setConnectingAction,
  setConnFailAction,
  setDisconnectedAction,
  setDisconnectingAction,
  setDomainNameAction,
} from './stropheActionGenerator';
import { StropheReducerState } from './strophe.types';

type PropType = {
  credentials: {
    jabid: string;
    pass: string;
  };
  showLogs?: boolean;
  onConnect?: ConnectionFunctionType;
  onConnecting?: ConnectionFunctionType;
  onDisconnect?: ConnectionFunctionType;
  onDisconnecting?: ConnectionFunctionType;
  onConnFail?: ConnectionFunctionType;
  connection: Strophe.Connection;
};

const initialState: StropheReducerState = {
  connecting: false,
  connected: false,
  disconnecting: false,
  disconnected: false,
  connFail: false,
  reason: null,
};

const useStrophe = ({
  credentials: { jabid, pass },
  showLogs = false,
  onConnecting,
  onConnect,
  onDisconnecting,
  onDisconnect,
  onConnFail,
  connection,
}: PropType) => {
  const [
    {
      connected,
      connecting,
      disconnected,
      disconnecting,
      reason,
      connFail,
      domainName,
      bareJid,
      resource,
    },
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
          executeFunction({ func: onConnecting, reason: stropheReason });
          break;
        case Strophe.Status.CONNECTED: {
          dispatch(setConnectedAction(stropheReason));
          const connectedDomainName = Strophe.getDomainFromJid(connection.jid);
          const connectedBareJid = Strophe.getBareJidFromJid(connection.jid);
          const connectedResource = Strophe.getResourceFromJid(connection.jid);
          dispatch(
            setDomainNameAction({
              domainName: connectedDomainName,
              bareJid: connectedBareJid,
              resource: connectedResource,
            })
          );
          executeFunction({ func: onConnect, reason: stropheReason });
          break;
        }
        case Strophe.Status.CONNFAIL:
          dispatch(setConnFailAction(stropheReason));
          executeFunction({ func: onConnFail, reason: stropheReason });
          break;
        case Strophe.Status.DISCONNECTING:
          dispatch(setDisconnectingAction(stropheReason));
          executeFunction({ func: onDisconnecting, reason: stropheReason });
          break;
        case Strophe.Status.DISCONNECTED:
          dispatch(setDisconnectedAction(stropheReason));
          executeFunction({ func: onDisconnect, reason: stropheReason });
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
    connFail,
    domainName,
    bareJid,
    resource,
  };
};

export default useStrophe;
