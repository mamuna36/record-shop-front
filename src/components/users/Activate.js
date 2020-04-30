
import React from 'react';
import { Redirect } from 'react-router-dom';

export default function({match}){

  const token = match.params.token;

  const [ activated, setActivated ] = React.useState(false);
  const [ error,     setError     ] = React.useState(false);

  if ( error ) return <h1 style={{color:'white'}}>{error}</h1>;

  if ( ! activated ){
    fetch(`/users/activate/${token}`)
    .then( response => response.json() )
    .then( result => {
      if ( result.status === "success" ){
        setActivated(true);
      } else {
        setError('Dieser Link ist verbraucht!')
      }
    });
    return <h1 style={{color:'white'}}>Loading...</h1>;
  }

  return <Redirect to="/login"/>;
}
