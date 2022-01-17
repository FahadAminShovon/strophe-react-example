import {
  CONNECTED,
  CONNECTING,
  DISCONNECTED,
  DISCONNECTING,
} from './strophActions';

export type disconnectionReasonType = 'TESTING';

export interface strophReducerState {
  connecting: boolean;
  connected: boolean;
  disconnecting: boolean;
  disconnected: boolean;
  reason?: disconnectionReasonType | null;
}

type reasonPayload = {
  reason?: disconnectionReasonType | null;
};

export interface StrophConnectingAction {
  type: typeof CONNECTING;
  payload: reasonPayload;
}

export interface StrophConnectedAction {
  type: typeof CONNECTED;
  payload: reasonPayload;
}

export interface StrophDisconnectingAction {
  type: typeof DISCONNECTING;
  payload: reasonPayload;
}

export interface StrophDisconnectedAction {
  type: typeof DISCONNECTED;
  payload: reasonPayload;
}

export type StrophAllActions =
  | StrophConnectingAction
  | StrophConnectedAction
  | StrophDisconnectingAction
  | StrophDisconnectedAction;
