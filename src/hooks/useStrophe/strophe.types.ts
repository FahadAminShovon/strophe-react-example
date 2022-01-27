import {
  CONNFAIL,
  CONNECTED,
  CONNECTING,
  DISCONNECTED,
  DISCONNECTING,
} from './stropheActions';

export type ReasonType = string | null | undefined;
export interface ReasonPayload {
  reason: ReasonType;
}

type ConnectionPayload = {
  payload: ReasonPayload;
};
export interface StropheReducerState extends ReasonPayload {
  connecting: boolean;
  connected: boolean;
  disconnecting: boolean;
  disconnected: boolean;
  connFail: boolean;
}

export interface StropheConnectingAction extends ConnectionPayload {
  type: typeof CONNECTING;
}

export interface StropheConnectedAction extends ConnectionPayload {
  type: typeof CONNECTED;
}

export interface StropheConnFailAction extends ConnectionPayload {
  type: typeof CONNFAIL;
}

export interface StropheDisconnectingAction extends ConnectionPayload {
  type: typeof DISCONNECTING;
}

export interface StropheDisconnectedAction extends ConnectionPayload {
  type: typeof DISCONNECTED;
}

export type StropheAllActions =
  | StropheConnectingAction
  | StropheConnectedAction
  | StropheDisconnectingAction
  | StropheDisconnectedAction
  | StropheConnFailAction;
