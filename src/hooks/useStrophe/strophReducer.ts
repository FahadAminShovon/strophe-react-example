import { strophReducerState, StrophAllActions } from './stroph.types';
import {
  CONNECTED,
  CONNECTING,
  DISCONNECTED,
  DISCONNECTING,
} from './strophActions';

const singleStateGenerator = (
  stateKey: keyof strophReducerState
): strophReducerState => ({
  connecting: false,
  connected: false,
  disconnecting: false,
  disconnected: false,
  reason: null,
  [stateKey]: true,
});

/* eslint-disable default-param-last */
export const strophReducer = (
  state: strophReducerState = {
    connecting: false,
    connected: false,
    disconnecting: false,
    disconnected: false,
    reason: null,
  },
  action: StrophAllActions
): strophReducerState => {
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
