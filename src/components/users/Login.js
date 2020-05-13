
import React                from 'react'

import {
  useSelector,
  useDispatch }
from 'react-redux'

import { Link, useHistory } from 'react-router-dom'

import {
  Paper,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';

import { mapBasketActionsProps } from '../../basket';
import { hashPassword }          from '../../crypto';
import { withAuth }              from '../../auth';
import useStyles                 from './styles';

export default withAuth( function(props){

    const history      = useHistory();
    const classes      = useStyles();
    const dispatch     = useDispatch();
    const authRequired = useSelector( state => state.basket.authRequired );

    const { basketActions } = mapBasketActionsProps(dispatch);

    const [ showPassword, setShowPassword ] = React.useState(false);

    const [ error, setError ] = React.useState(false);

    const [ field, setField ] = React.useState({
      email:'',
      password:'',
      remember:false
    });

    const submit = async e => {
      try {
        const result = await window.Axios.post( '/users/login', {
          email: field.email,
          password: hashPassword(field.password)
        });
        // das auth token steht in dem http header x-auth
        // (siehe backend/controller/users.js:loginController)
        const token = result.headers['x-auth'];
        if ( ! token ) throw new Error('login failed');
        const user = result.data;
        props.authActions.success(user,token,field.remember);

        // auf startseite umleiten
        if ( authRequired ){
          basketActions.returnToBasket();
          history.push('/basket');
        }
        else history.push('/');

      } catch (e){
        setError(e);
      }
    }

    const change = e => setField({...field,[e.target.name]:e.target.value});
    const checkboxChange = e => setField({...field,remember:!field.remember});

    return ( <div className={classes.wrapper}>
      <Paper className={classes.paper}>
        { ! authRequired ? null :
          <Paper className={classes.error}>
            Um ihre Bestellung abschließen zu können...
          </Paper>
        }
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
        Noch kein Kunde? <Link to='/register'>Registrieren!</Link><br/>
        Passwort vergessen? <Link to='/reset'>Anfordern!</Link>
      </Paper>
    </div> );
})
