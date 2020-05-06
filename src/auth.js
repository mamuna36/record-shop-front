
import React from 'react';
import { connect } from 'react-redux';

const defaultState = {
  verified: false,
  user:     false,
  token:    null
};

export function authReducer( state=defaultState, action ){
  switch ( action.type ) {
    case "auth:logout":
      return { ...state, user:false, token:null, verified:false };
    case "auth:login:success":
      const  { user, token, remember } = action;
      return { ...state, user, token, remember, verified:true };
    default:
  }
  return state;
}

/* Diese Funktion speichert token und userdaten in einer globalen
   variable und ggf. in localStorage.
   sie wird an die store.js datei exportiert, diese ruft die
   äussere Funktion mit (store) auf und gibt den callback
   handler zurück.
   Bei jeder Änderung der redux state, wir diese nun aufgerufen.
*/
export const authSideEffects = store => () => {
  // bei jeder änderung wir folgender callback aufgerufen
  const { auth: { remember, token, user } } = store.getState();
  // auth token speichern (alle tabs)
  if ( remember )
       window.localStorage.setItem('record-shop-auth-data',JSON.stringify({user,token}));
  else window.localStorage.removeItem('record-shop-auth-data');
  window.AUTH_TOKEN = token;
  window.USER       = user;
}

// für withAuth: Gibt das auth: objekt als prop weiter
export function mapAuthStateToProps(state){
  return { auth: state.auth }
}

// für withAuth: Gibt die aktionen als prop weiter
export function mapAuthActionsProps(dispatch){
  return { authActions: {
    success: (user,token,remember)=>
      dispatch({type:"auth:login:success",user,token,remember})
  }}
}

// versorgt eine komponente mit den auth: und authActions: props
export const withAuth = connect(
  mapAuthStateToProps,
  mapAuthActionsProps
)

// komponente um admin-elemente einzublenden
export const IfAdmin = withAuth(
  function({auth,authActions,children}){
    return auth &&
      auth.user &&
      auth.user.role &&
      auth.user.role ===  'Admin' ? children : null;
  }
)

// komponente um elemente für bestimmte gruppen einzublenden
export const IfGroup = withAuth(
  function({auth,authActions,children,group}){
    return auth &&
      auth.user &&
      auth.user.role &&
      auth.user.role === group ? children : null;
  }
)

// komponente um elemente für angemeldete benutzer einzublenden
export const IfAuth = withAuth(
  function({auth,authActions,children,group}){
    return auth &&
      auth.user &&
      auth.verified ? children : null;
  }
)

// komponente um elemente für NICHT angemeldete benutzer einzublenden
export const IfNotAuth = withAuth(
  function({auth,authActions,children,group}){
    return auth && auth.user && auth.verified ? null : children;
  }
)

/* Soll beim laden der Seite nachsehen obe bereits ein Token / User
    in localStorage gepeischert wurde und mittels fetch nachsehen
    ob dieses noch gilt.
*/

export const CheckAuth =
withAuth(
  function({authActions:{success}}){
    // soll verhindern das die komponente mehrfach ein fetch sendet
    const [ loading, setLoading ] = React.useState(false);
    if ( ! loading ){
      setLoading(true);
      // versuche aus localStorage einen gepseicherten auth-zustand zu laden
      const existingToken = localStorage.getItem('record-shop-auth-data');
      if ( existingToken ){
        // parse json aud sem sting aus localStorage und destrukturiere user daten
        const {user,token,verified,remember} = JSON.parse(existingToken);
        // sende ein fetch auf die resource die uns das user objekt gibt
        // nur ein angemeldeter benutzer mit gueltigem token kann die anfrage
        // machen
        fetch(`/users/${user.id}`,{headers:{'x-auth':token}})
        .catch( error => false )
        .then( response => {
          if ( response.status === 200 ) return response.json()
          return false;
        })
        .then( result => {
          if ( result ) success( result, token, true );
          else localStorage.removeItem('record-shop-auth-data');
        });
      }
    }
    return null;
  }
);
