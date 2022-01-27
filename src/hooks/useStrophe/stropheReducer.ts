import { StropheReducerState, StropheAllActions } from './strophe.types';
import {
  CONNECTED,
  CONNECTING,
  DISCONNECTED,
  DISCONNECTING,
} from './stropheActions';

const singleStateGenerator = (
  stateKey: keyof StropheReducerState
): StropheReducerState => ({
  connecting: false,
  connected: false,
  disconnecting: false,
  disconnected: false,
  reason: null,
  [stateKey]: true,
});

/* eslint-disable default-param-last */
export const strophReducer = (
  state: StropheReducerState = {
    connecting: false,
    connected: false,
    disconnecting: false,
    disconnected: false,
    reason: null,
  },
  action: StropheAllActions
): StropheReducerState => {
  /* eslint-enable default-param-last */
  switch (action.type) {
    case CONNECTING:
      return {
        ...singleStateGenerator('connecting'),
      };
    case CONNECTED:
      return { ...singleStateGenerator('connected') };
    case DISCONNECTING:
      return {
        ...singleStateGenerator('disconnecting'),
        ...action.payload,
      };
    case DISCONNECTED:
      return { ...singleStateGenerator('disconnected'), ...action.payload };
    default:
      return { ...state };
  }
};
