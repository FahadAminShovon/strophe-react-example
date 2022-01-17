import { useEffect } from 'react';
import { user1 } from './data/users';
import { getJabberUserId, wssGenerator } from './utils/helpers';
import { useStrophe } from './hooks/useStrophe';
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
  } = useStrophe({
    credentials,
    connection,
    showLogs: true,
  });

  useEffect(() => {
    connect();
  }, []);

  return (
    <div>
      {connecting && <p>Connecting...</p>}
      {disconnecting && <p>Disconnecting...</p>}
      <div>
        <p>The server is {connected ? 'connected' : 'disconnected'}</p>
      </div>

      <div>
        {connected && (
          <button onClick={() => disconnect('TESTING')}>Disconnect</button>
        )}
        {disconnected && <button onClick={connect}>Connect</button>}
      </div>
    </div>
  );
}

export default App;
