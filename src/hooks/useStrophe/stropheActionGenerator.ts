import {
  ReasonType,
  StropheConnectedAction,
  StropheConnectingAction,
  StropheDisconnectedAction,
  StropheDisconnectingAction,
} from './strophe.types';
import {
  CONNECTED,
  CONNECTING,
  DISCONNECTED,
  DISCONNECTING,
} from './stropheActions';

export const setConnectingAction = (
  reason: ReasonType
): StropheConnectingAction => ({
  type: CONNECTING,
  payload: { reason },
});

export const setConnectedAction = (
  reason: ReasonType
): StropheConnectedAction => ({
  type: CONNECTED,
  payload: { reason },
});

export const setDisconnectingAction = (
  reason: string
): StropheDisconnectingAction => ({
  type: DISCONNECTING,
  payload: { reason },
});

export const setDisconnectedAction = (
  reason: string
): StropheDisconnectedAction => ({
  type: DISCONNECTED,
  payload: { reason },
});
