
import React from 'react';

function List() {
  const [abgerufen,setAbgerufen] = React.useState(false);
  const [daten,setDaten]         = React.useState(false);
  if ( ! abgerufen )
    fetch('/records/')
    .then( response => response.json() )
    .then( records => {
      setAbgerufen(true);
      console.log(records);
      setDaten(records);
    })
  return (
    <table>
    { daten ? (
      daten.map( record => (
        <tr>
        <td>{record.year}</td>
        <td>{record.title}</td>
        <td>{record.artist}</td>
        <td>{record.price}</td>
        </tr>
      ))
  ) : null }
  </table> )
}

export default List;
