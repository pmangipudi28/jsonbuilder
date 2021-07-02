import React, {Component} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
//import {save_json_schema, save_json_schema_status } from '../../actions'

function NotificationDisplay(props) {
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;
  const [notification, setNotification] = React.useState("");
  console.log("props.errorMessage", props.errorMessage)
  if (props.errorMessage.length) {
    const listItems = props.errorMessage.map((ValidationError) =>
      <li><div>{ValidationError.path['0']}</div><div>{ValidationError.message}</div></li>
    );
    setState({ open: true, vertical: 'top', horizontal: 'center' });
    console.log("listItems",listItems);
    try {
      setNotification(listItems);
    } catch (e) {
      console.log("error", e);
    }

    console.log("notification", notification);
  }
  console.log("notification", notification);
  const handleClose = () => {
    setState({ ...state, open: false });
  };
    
   
    return(<div><Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={true}
      onClose={handleClose}
      color="primary"
      message={notification}
      key={vertical + horizontal}
    /></div>)
   
}

export default NotificationDisplay;