
import React    from 'react'
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

import { makeStyles } from '@material-ui/core/styles';
import { hashPassword } from '../../crypto';

const useStyles = makeStyles( theme => ({
  paper:{
    padding:theme.spacing(1)
  },
  input:{
    width:'100%'
  },
  wrapper:{
    padding:theme.spacing(1)
  },
  error:{
    padding: theme.spacing(1),
    background: 'red'
  }
}));

export default function(){

  const history = useHistory();
  const classes = useStyles();

  const [ showPassword, setShowPassword ] = React.useState(false);

  const [ error, setError ] = React.useState(false);

  const [ pwMatch,  setPwMatch ] = React.useState(false);

  const [field,setField] = React.useState({
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:'',
    street:'',
    city:''
  });

  const { firstName, lastName, email, password, confirmPassword, street, city } = field;

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
  const checkboxChange = e => setField({...field,remember:!field.remember});

  const submit = async e => {
    e.preventDefault()
    try {
      const resp = await fetch(
        '/users/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password: hashPassword(field.password),
            address: {
              street,
              city
            }
          })
      });
      if ( resp.status === 200 ){
        history.push('/');
      } else {
        setError(new Error('Benutzer Existiert'));
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
        label="eMail" className={classes.input}
        name="email" value={field.email} onChange={change}
        validators={['required', 'isEmail']}
        errorMessages={['this field is required', 'email is not valid']}
      />
      <TextValidator
        label="Vorname" className={classes.input} name="firstName" value={field.firstName} onChange={change}
        validators={['required']} errorMessages={['this field is required']}
      />
      <TextValidator
        label="Nachname" className={classes.input} name="lastName"  value={field.lastName}  onChange={change}
        validators={['required']} errorMessages={['this field is required']}
      />
      <TextValidator label="Strasse, Nr." className={classes.input} name="street" value={field.street} onChange={change} />
      <TextValidator label="PLZ, Ort" className={classes.input} name="city" value={field.city} onChange={change} />

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
        type="submit">Registrieren</Button>
      <br/>
      Schon Kunde? <Link to='/login'>Hier Anmelden</Link>
      </ValidatorForm>
    </Paper>
  </div> );
}
