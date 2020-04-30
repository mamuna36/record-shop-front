
import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import {
  ValidatorForm,
  TextValidator
} from 'react-material-ui-form-validator';

import {
  Paper,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';

import { hashPassword } from '../../crypto';
import useStyles        from './styles';

export default function({match}){

  const history = useHistory();
  const classes = useStyles();

  // der paramter token kommt aus der react router
  // da unsere url /activate/:token ist
  const token = match.params.token;

  const [ showPassword, setShowPassword ] = React.useState(false);
  const [ error,        setError        ] = React.useState(false);
  const [ pwMatch,      setPwMatch      ] = React.useState(false);

  const [field,setField] = React.useState({
    password:'',
    confirmPassword:''
  });

  const { password, confirmPassword } = field;

  ValidatorForm.addValidationRule( 'isPasswordMatch', (value) => {
    return password === confirmPassword;
  });

  const change = e => {
    setField({...field,[e.target.name]:e.target.value});
    switch( e.target.name ){
      case "password":        setPwMatch(e.target.value === confirmPassword); break;
      case "confirmPassword": setPwMatch(password === e.target.value);        break;
      default:                setPwMatch(password === confirmPassword);
    }
  }

  const submit = async e => {
    e.preventDefault()
    try {
      const resp = await fetch(
        `/users/changePassword/${token}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            password: hashPassword(field.password),
          })
      });
      if ( resp.status === 200 ){
        history.push('/login');
      } else {
        setError(new Error('Token ist ungültig!'));
      }
    } catch (e){
      console.log('@',e);
      setError(e);
    }
  }

  return ( <div className={classes.wrapper}>
    <Paper className={classes.paper}>
      <ValidatorForm
        onSubmit={submit}
        onError={e=>console.log(e)}
      >
      { ! error ? null :
        <Paper className={classes.error}>{error.toString()}</Paper>
      }

      <TextValidator
        label="Passwort" className={classes.input}
        type={ showPassword ? 'text' : 'password' }
        name="password" value={field.password} onChange={change}
        validators={[
          'required',
          'matchRegexp:^[a-zA-Z0-9.!?:@ ]{10,64}$'
        ]}
        errorMessages={[
          'this field is required',
          'mindestens 10 zeichen, zahlen, grossbuchstaben, sonderzeichen'
        ]}
      />

      <TextValidator
        label="Passwort Bestätigen" className={classes.input}
        type={showPassword ? 'text' : 'password' }
        name="confirmPassword" value={field.confirmPassword} onChange={change}
        validators={[ 'isPasswordMatch' ]}
        errorMessages={[ 'Passwörter stimmen nicht überein' ]}
      />

      <FormControlLabel
        control={<Checkbox checked={showPassword} onChange={e => setShowPassword(!showPassword)} />}
        label="Passwort Zeigen"
      />

      <br/>
      <Button
        disabled={!pwMatch} style={{float:'right'}}
        variant="contained" color="primary"
        type="submit">Speichern</Button>
      <br/>
      Schon Kunde? <Link to='/login'>Anmelden!</Link><br/>
      Noch kein Kunde? <Link to='/register'>Registrieren!</Link><br/>
      </ValidatorForm>
    </Paper>
  </div> );
}
