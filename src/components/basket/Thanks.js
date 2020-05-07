
import React          from 'react';
import { Button }     from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export default function(){
  const history = useHistory();
  const [ isTriggered , trigger ] = React.useState(false);
  if ( ! isTriggered ) {
    trigger(true);
    setTimeout( t => {
      if ( window.location.pathname === '/thanks' )
        history.push('/');
    }, 10000 );
  }
  return (
  <div>
    <h1>Vielen Dank!</h1>
    <p>Sie haben uns finanziell echt aus der patsche geholfen....</p>
    <p><Button onClick={e=>history.push('/orders')}>Bestellungen</Button></p>
    <p><Button onClick={e=>history.push('/')}>Zur Startseite</Button></p>
  </div>
  );
}
