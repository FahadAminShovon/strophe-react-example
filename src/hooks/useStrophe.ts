import { Strophe } from 'strophe.js';
import { variables } from '../constants/Variables';
import { wssGenerator } from '../utils/helpers';
import { disconnectionReasonType } from '../constants/Reasons';

type PropType = {
  onConnecting?: () => void;
  onConnect?: () => void;
  onDisconnecting?: (reason: disconnectionReasonType) => void;
  onDisconnect?: (reason: disconnectionReasonType) => void;
  credentials: {
    jabid: string;
    pass: string;
  };
};

const logger = (msg: string) => {
  console.log(msg);
};

const useStrophe = ({
  onConnect = () => {
    logger('connected');
  },
  onConnecting = () => {
    logger('connecting');
  },
  onDisconnect = (reason) => {
    logger(`disconnected ${reason}`);
  },
  onDisconnecting = (reason) => {
    logger(`disconnecting ${reason}`);
  },
  credentials: { jabid, pass },
}: PropType) => {
  const connection = new Strophe.Connection(wssGenerator(variables.boshServer));

  const stropheConnect = () => {
    connection.connect(jabid, pass, (status: number, reason: string) => {
      const realReason = reason as disconnectionReasonType;

      console.log({ realReason });
      switch (status) {
        case Strophe.Status.CONNECTING:
          onConnecting();
          break;
        case Strophe.Status.CONNFAIL:
          console.log('Connection failed');
          break;
        case Strophe.Status.CONNECTED:
          console.log('Connected');
          onConnect();
          break;
        case Strophe.Status.DISCONNECTING:
          onDisconnecting(realReason);
          break;
        case Strophe.Status.DISCONNECTED:
          onDisconnect(realReason);
          break;
        default:
          console.log('Default');
      }
    });
  };

  const stropheDisconnect = (reason: disconnectionReasonType) => {
    connection.disconnect(reason);
  };

  return { stropheConnect, stropheDisconnect, connection };
};

export default useStrophe;
