
import React    from 'react'
import { Link } from 'react-router-dom'

import {
  Paper,
  TextField,
  Button
} from '@material-ui/core';

import useStyles from './styles';

export default function(props){

    const classes = useStyles();

    const [ error, setError ] = React.useState(false);
    const [ field, setField ] = React.useState({ email:'' });

    const submit = async e => {
      try {
        const resp = await fetch(`/users/reset/${field.email}`);
        if ( resp.status === 200 ){
          setError('ok ist unterwegs');
        } else {
          throw new Error('Nicht möglich!');
        }
      } catch (e){
        setError(e);
      }
    }

    const change = e => setField({...field,[e.target.name]:e.target.value});

    return ( <div className={classes.wrapper}>
      <Paper className={classes.paper}>
        { ! error ? null :
          <Paper className={classes.error}>{error.toString()}</Paper>
        }
        <TextField label="eMail" className={classes.input} name="email" value={field.email} onChange={change} />
        <br/>
        <Button style={{float:'right'}} variant="contained" color="primary" onClick={submit}>
          eMail senden
        </Button>
        <br/>
        Schon Kunde? <Link to='/login'>Anmelden!</Link><br/>
        Noch kein Kunde? <Link to='/register'>Registrieren!</Link><br/>
      </Paper>
    </div> );
}
