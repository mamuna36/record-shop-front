
import React          from 'react';
import { withBasket } from '../../basket';
import { useHistory } from 'react-router-dom';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import {
  Button,
  InputGroup
} from 'react-bootstrap'

export default withBasket( function(
  { basketActions, basket:{ total, records, authRequired } }
){
  const history = useHistory();
  if ( total === 0 ) return null;
  return (
  <InputGroup style={{ position:'fixed', bottom:'10px', right:'10px', width:'fit-content', zIndex:'1' }}>
    <Button onClick={e => {
      if ( authRequired ) basketActions.returnToBasket();
      history.push('/basket');
    }}>
      <ShoppingBasketIcon/>
    </Button>
    <InputGroup.Append>
      <InputGroup.Text>{records}</InputGroup.Text>
      <InputGroup.Text>{total.toFixed(2)}&euro;</InputGroup.Text>
    </InputGroup.Append>
  </InputGroup> );
})
