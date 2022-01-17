import { useEffect, useState } from 'react';
import { user1 } from './data/users';
import { getJabberUserId } from './utils/helpers';
import useStrophe from './hooks/useStrophe';

function App() {
  const [connected, setConnected] = useState(false);
  const onConnect = () => setConnected(true);
  const onDisconnect = (reason: string) => {
    console.log('This is the reason', reason);
    setConnected(false);
  };

  const { stropheDisconnect, stropheConnect, connection } = useStrophe({
    credentials: {
      jabid: getJabberUserId(user1.id),
      pass: user1.password,
    },
    onConnect,
    onDisconnect,
  });

  useEffect(() => {
    stropheConnect();
  }, []);

  return (
    <div>
      {connected ? (
        <div>
          <p>The server is connected</p>
          <button
            onClick={() => {
              connection.disconnect('TESTING');
            }}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <div>
          <p>The server got disconnected</p>
          <button
            onClick={() => {
              stropheDisconnect('TESTING');
            }}
          >
            Connect
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
