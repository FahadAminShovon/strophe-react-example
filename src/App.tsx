import { useEffect } from 'react';
import { user1 } from './data/users';
import { getJabberUserId } from './utils/helpers';
import { useStrophe } from './hooks/useStrophe';

function App() {
  const {
    connected,
    connecting,
    disconnecting,
    stropheConnect,
    stropheDisconnect,
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
      {connected ? (
        <div>
          <p>The server is connected</p>
          <button
            onClick={() => {
              stropheDisconnect('TESTING');
            }}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <div>
          <p>The server got disconnected</p>
          <button onClick={stropheConnect}>Connect</button>
        </div>
      )}
    </div>
  );
}

export default App;
