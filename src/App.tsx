import React, { useEffect } from 'react';
import { Strophe } from 'strophe.js';
import { user1 } from './data/users';
import { getJabberUserId, wssGenerator } from './utils/helpers';
import { useStrophe, stropheBuilder } from './hooks/useStrophe';
import { variables } from './constants/Variables';

const connection = new Strophe.Connection(wssGenerator(variables.boshServer));
const credentials = {
  jabid: getJabberUserId(user1.id),
  pass: user1.password,
};

function App() {
  const {
    connect,
    connected,
    disconnect,
    connecting,
    disconnecting,
    disconnected,
    domainName,
    resource,
    bareJid,
  } = useStrophe({
    credentials,
    connection,
    showLogs: true,
  });

  useEffect(() => {
    connect();
    return () => {
      disconnect('unmounted');
    };
  }, []);

  const createPing = (to: string) => {
    const ping = stropheBuilder
      .iq({
        to,
        type: 'get',
        id: 'ping1',
      })
      .c('ping', { xmlns: 'urn:xmpp:ping' });
    return ping;
  };

  useEffect(() => {
    if (domainName) {
      console.log({ domainName, bareJid, resource });
      const ping = createPing(domainName);
      connection.send(ping);
    }
  }, [domainName]);

  return (
    <div>
      {connecting && <p>Connecting...</p>}
      {disconnecting && <p>Disconnecting...</p>}
      <div>
        <p>The server is {connected ? 'connected' : 'disconnected'}</p>
      </div>

      <div>
        {connected && (
          <button type="button" onClick={() => disconnect('TESTING')}>
            Disconnect
          </button>
        )}
        {disconnected && (
          <button type="button" onClick={connect}>
            Connect
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
