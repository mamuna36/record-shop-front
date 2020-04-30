
import React from 'react';
import { Redirect } from 'react-router-dom';

export default function({match}){

  // der paramter token kommt aus der react router
  // da unsere url /activate/:token ist
  const token = match.params.token;

  const [ activated, setActivated ] = React.useState(false);
  const [ error,     setError     ] = React.useState(false);

  // wenn ein fehler im state gepeichert wurde,
  //   stelle diesen dar und beende die funktion
  if ( error ) return <h1 style={{color:'white'}}>{error}</h1>;

  // wenn die aktivierung noch nicht erfolgt ist
  //   sende anfrage an das backend und verabeite das ergebnis
  if ( ! activated ){
    fetch(`/users/activate/${token}`)
    .then( response => response.json() )
    .then( result => {
      if ( result.status === "success" ){
        setActivated(true); // aktivierung erfolgreich
      } else {
        setError('Dieser Link ist verbraucht!')
      }
    });
    return <h1 style={{color:'white'}}>Loading...</h1>;
  }

  // hier ist activated === true
  // leite den benutzer weiter an die /login seite
  return <Redirect to="/login"/>;
}
