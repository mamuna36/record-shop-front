
import { connect } from 'react-redux';

const defaultState = {
  items:       [],
  total:       0,
  records:     0,
  shippingFee: 0,
  weight:      0,
  vat:         0
};

const sumItUp = (basket)=> {
  const kgPerRecord  = 0.04;
  const feePerPacket = 4.75;
  const recordsPerPacket = 10;
  basket.total   = 0;
  basket.records = 0;
  basket.weight  = 0;
  basket.items
  .forEach( item => {
    basket.total   += item.product.price * item.count
    basket.records += item.count
    basket.weight  += item.count * kgPerRecord
  });
  basket.vat = ( basket.total / 1.19 ) * 0.19;
  basket.shippingFee = Math.ceil( basket.records / recordsPerPacket ) * feePerPacket;
  if ( basket.total > 100 ) basket.shippingFee *= 0.5;
  return basket;
}

export function basketReducer( state, action ){
  if ( ! state ) state = { ...defaultState };

  let newItems, product, count;
  let { index } = action;

  switch ( action.type ) {

    case "b/add":
      ({ product, count } = action);
      const existsAlready = state.items.find( item => item.product._id === product._id );
      if ( existsAlready ){
        index    = state.items.indexOf(existsAlready);
        newItems = state.items.slice();
        newItems[index] = { count: existsAlready.count + count, product };
        state = { ...state, items: newItems };
      } else {
        state = ({ ...state, items: [ ...state.items, { product, count } ] });
      }
      break;

    case "b/delete":
      newItems = state.items.slice();
      newItems.splice(index,1);
      state = { ...state, items: newItems };
      break;

    case "b/increment":
      ({ product, count } = state.items[index]);
      newItems = state.items.slice();
      newItems[index] = { count: Math.min(10, count+1), product };
      state = { ...state, items: newItems };
      break;

    case "b/decrement":
      ({ product, count } = state.items[index]);
      newItems = state.items.slice();
      newItems[index] = { count: Math.max(1, count-1), product };
      state = { ...state, items: newItems };
      break;

    case "b/clear":
      state = { ...defaultState };
      break;

    // im den login bildschirm anzuzeigen
    case "b/authRequired":   state = { ...state, authRequired:true  }; break;
    case "b/returnToBasket": state = { ...state, authRequired:false }; break;

    default: return state;
  }
  return sumItUp(state);
}

export function mapBasketActionsProps(dispatch){
  return { basketActions: {
           add: (product,count=1)=> dispatch({ type:"b/add", product,count }),
        delete:           (index)=> dispatch({ type:"b/delete", index }),
     increment:           (index)=> dispatch({ type:"b/increment", index }),
     decrement:           (index)=> dispatch({ type:"b/decrement", index }),
         clear:                ()=> dispatch({ type:"b/clear" }),
  authRequired:                ()=> dispatch({ type:"b/authRequired" }),
returnToBasket:                ()=> dispatch({ type:"b/returnToBasket" })
}}}

export function mapBasketStateToProps(state){
  return { basket: state.basket }
}

export const withBasket = connect(
  mapBasketStateToProps,
  mapBasketActionsProps
)
