
import React           from 'react';
import { useSelector } from 'react-redux';
import { withBasket }  from '../../basket';
import DeleteIcon      from '@material-ui/icons/Delete';
import CreditCardIcon  from '@material-ui/icons/CreditCard';

import {
  Redirect,
  useHistory
} from 'react-router-dom';

import {
  Table,
  Button,
  InputGroup
} from 'react-bootstrap'

const buy = async ( basket, auth, basketActions, history ) => {
  // problem: user muss angemeldet sein
  // loesung: wir zwingen den user zum anmelden oder registrieren
  // es geht nur zu buy wenn witr schon angemeldet sind
  if ( auth.verified ){
    // dem backend die order uebergeben
    const order = {
      quantity: [],
      record:   []
    }
    basket.items.forEach( ({ count, product })=> {
      order.quantity.push(count);
      order.record.push(product._id);
    });
    console.log('direkt zum paket', order);
    const response = await fetch(
      `/orders/`, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'x-auth': auth.token
      },
      body: JSON.stringify( order )
    });
    const result = await response.json();
    console.log('bestellt', result);
    history.push('/thanks');
    basketActions.clear();
  } else {
    // redirect zur registierung / anmeldung
    console.log('erstmal papierkram');
    basketActions.authRequired();
  }
}

export default withBasket( function(
  { basketActions, basket }
){
  const { total, records, items, shippingFee, vat, authRequired } = basket;
  // gegenbeispiel zu withAuth: benutze redux hooks
  const auth = useSelector( state => state.auth );
  const history = useHistory();

  const onBuy = e => buy( basket, auth, basketActions, history );

  if ( authRequired )
    return <Redirect to="/login"/>;

  return (
    <Table striped bordered hover style={{background:'#ffffffd1'}}>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Artist</th>
          <th>Price</th>
          <th>Count</th>
          <th>Sum</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      { items.map( ( {count,product:{title,artist,price}}, index )=>
        <tr>
          <td>{index+1}</td>
          <td>{title}</td>
          <td>{artist}</td>
          <td>{price.toFixed(2)}</td>
          <td>
            <InputGroup>
              <InputGroup.Prepend>
                <Button
                  variant="warning"
                  onClick={e => basketActions.increment(index) }
                >+</Button>
                <InputGroup.Text>{count}</InputGroup.Text>
              </InputGroup.Prepend>
              <Button
                variant="warning"
                onClick={e => basketActions.decrement(index) }
              >-</Button>
            </InputGroup>
          </td>
          <td>{(count*price).toFixed(2)}</td>
          <td>
            <Button
              variant="danger"
              onClick={e => basketActions.delete(index)}
            >
              <DeleteIcon/>
            </Button>
          </td>
        </tr>
      ) }
      </tbody>
      <tfoot>
        <tr><td colspan={4}></td><td>Summe:</td><td>{total}</td></tr>
        <tr><td colspan={4}></td><td>MwSt:</td><td>{vat.toFixed(2)}</td></tr>
        <tr><td colspan={4}></td><td>Versandkosten:</td><td>{shippingFee.toFixed(2)}</td></tr>
        <tr><td colspan={4}></td><td>Total:</td><td>{(total + shippingFee).toFixed(2)}</td></tr>
        <tr><td colspan={6}></td><td>
          <Button variant="success" onClick={onBuy}>
            <CreditCardIcon/>
          </Button>
        </td></tr>
      </tfoot>
    </Table>
  );
})
