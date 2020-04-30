
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles( theme => ({
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
