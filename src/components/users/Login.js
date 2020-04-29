
import React    from 'react'
import { Link, useHistory } from 'react-router-dom'

import {
  Paper,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

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

export default function(props){

    const history = useHistory();
    const classes = useStyles();

    const [ showPassword, setShowPassword ] = React.useState(false);

    const [ error, setError ] = React.useState(false);

    const [ field, setField ] = React.useState({
      email:'',
      password:'',
      remember:false
    });

    const submit = async e => {
      try {
        const resp = await fetch(
          '/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...field})
        });
        // das auth token steht in dem http header x-auth
        // (siehe backend/controller/users.js:loginController)
        const token = resp.headers.get('x-auth');
        if ( ! token ) throw new Error('login failed');
        // auth token speichern (alle tabs)
        if ( field.remember )
             window.localStorage.setItem('token',token);
        else window.localStorage.removeItem('token');
        // auth token speichern (dieses tab)
        window.AUTH_TOKEN = token;
        const result = resp.json();
        window.USER = await result;
        // auf startseite umleiten
        history.push('/');
      } catch (e){
        setError(e);
      }
    }

    const change = e => setField({...field,[e.target.name]:e.target.value});
    const checkboxChange = e => setField({...field,remember:!field.remember});

    return ( <div className={classes.wrapper}>
      <Paper className={classes.paper}>
        { ! error ? null :
          <Paper className={classes.error}>{error.toString()}</Paper>
        }
        <TextField label="eMail" className={classes.input} name="email"                    value={field.email} onChange={change} />
        <TextField label="Passwort" className={classes.input} type={
          showPassword ? 'text' : 'password'
        } name="password" value={field.password} onChange={change} />
        <FormControlLabel
          control={<Checkbox checked={field.remember} onChange={checkboxChange} />}
          label="Angemeldet bleiben"
        />
        <FormControlLabel
          control={<Checkbox checked={showPassword} onChange={e => setShowPassword(!showPassword)} />}
          label="Passwort Zeigen"
        />
        <br/>
        <Button style={{float:'right'}} variant="contained" color="primary" onClick={submit}>Anmelden</Button>
        <br/>
        Noch kein Kunde? <Link to='/register'>Hier Registrieren</Link>
      </Paper>
    </div> );
}
