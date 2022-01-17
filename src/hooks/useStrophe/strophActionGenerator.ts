import {
  disconnectionReasonType,
  StrophConnectedAction,
  StrophConnectingAction,
  StrophDisconnectedAction,
  StrophDisconnectingAction,
} from './stroph.types';
import {
  CONNECTED,
  CONNECTING,
  DISCONNECTED,
  DISCONNECTING,
} from './strophActions';

export const setConnectingAction = (): StrophConnectingAction => ({
  type: CONNECTING,
  payload: { reason: null },
});

export const setConnectedAction = (): StrophConnectedAction => ({
  type: CONNECTED,
  payload: { reason: null },
});

export const setDisconnectingAction = (
  reason: disconnectionReasonType
): StrophDisconnectingAction => ({
  type: DISCONNECTING,
  payload: { reason },
});

export const setDisconnectedAction = (
  reason: disconnectionReasonType
): StrophDisconnectedAction => ({
  type: DISCONNECTED,
  payload: { reason },
});