
import React from 'react';

function List() {
  const [abgerufen,setAbgerufen] = React.useState(false);
  const [daten,setDaten]         = React.useState(false);
  if ( ! abgerufen )
    fetch('/users/')
    .then( response => response.json() )
    .then( users => {
      setAbgerufen(true);
      console.log(users);
      setDaten(users);
    })
  return (
    <table>
    { daten ? (
      daten.map( user => (
        <tr>
        <td>{user.username}</td>
        </tr>
      ))
  ) : null }
  </table> )
}

export default List;
