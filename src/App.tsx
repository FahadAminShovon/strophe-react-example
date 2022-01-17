import { Strophe } from 'strophe.js';
import { variables } from './constants/Variables';
import { user1 } from './data/users';
import { getJabberUserId, wssGenerator } from './utils/helpers';

function App() {
  const connection = new Strophe.Connection(
    wssGenerator(variables.boshServer),
    {
      protocol: 'wss',
    }
  );
  console.log(
    'I am here',
    wssGenerator(variables.boshServer),
    getJabberUserId(user1.id),
    user1.password
  );

  connection.connect(getJabberUserId(user1.id), user1.password);

  return <div>Strophe</div>;
}

export default App;
