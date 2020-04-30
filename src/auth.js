
import React from 'react';
import { connect } from 'react-redux';

const defaultState = {
    verified: false,
    user:     false,
    token:    null
};

export function authReducer( state=defaultState, action ){
  console.log(state);
  switch (action.type) {
    case "auth:logout":
      return { ...state, user:false, token:null, verified:false };
    case "auth:login:success":
      const  { user, token, remember } = action;

      // auth token speichern (alle tabs)
      if ( remember )
           window.localStorage.setItem('token',token);
      else window.localStorage.removeItem('token');

      // auth token speichern (dieses tab)
      window.AUTH_TOKEN = token;
      window.USER = user;

      return { ...state, user, token, verified:true };
    default:
  }
  return state;
}

export function mapAuthStateToProps(state){
  return { auth: state.auth }
}

export function mapAuthActionsProps(dispatch){
  return { authActions: {
    success: (user,token)=> dispatch({type:"auth:login:success",user,token})
  }}
}

export const withAuth = connect(
  mapAuthStateToProps,
  mapAuthActionsProps
)

export const IfAdmin = withAuth(
  function({auth,authActions,children}){
    return auth &&
      auth.user &&
      auth.user.group &&
      auth.user.group.includes('admin') ? children : null;
  }
)

export const IfGroup = withAuth(
  function({auth,authActions,children,group}){
    return auth &&
      auth.user &&
      auth.user.group &&
      auth.user.group.includes(group) ? children : null;
  }
)

export const IfAuth = withAuth(
  function({auth,authActions,children,group}){
    return auth &&
      auth.user &&
      auth.verified ? children : null;
  }
)

export const IfNotAuth = withAuth(
  function({auth,authActions,children,group}){
    return auth && auth.user && auth.verified ? null : children;
  }
)
