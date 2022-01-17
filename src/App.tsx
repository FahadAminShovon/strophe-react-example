import { useEffect } from 'react';
import { user1 } from './data/users';
import { getJabberUserId } from './utils/helpers';
import { useStrophe } from './hooks/useStrophe';

function App() {
  const {
    stropheConnect,
    connected,
    disconnect,
    connecting,
    disconnecting,
    disconnected,
  } = useStrophe({
    credentials: { jabid: getJabberUserId(user1.id), pass: user1.password },
  });

  useEffect(() => {
    stropheConnect();
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
        {disconnected && <button onClick={stropheConnect}>Connect</button>}
      </div>
    </div>
  );
}

export default App;
