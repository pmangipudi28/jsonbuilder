import React from 'react';
import { Typography } from '@material-ui/core';
// import BookIcon from '@material-ui/icons/Book';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';

import DisplayJsonSchema from './jsonschema/DisplayJsonSchema';

 
function rand() {
  return Math.round(Math.random() * 20) - 10;
}
 
function getModalStyle() {
  const top = 40 + rand();
  const left = 50 + rand();
 
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
 
const useStyles = makeStyles((theme) => ({
  closeImg: {
    cursor:'pointer', 
    float:'right', 
    marginTop: '5px', 
    width: '20px'
  }
}));
 
function ShowJsonSchema() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
 
  const handleClickOpen = () => {
    setOpen(true);
  };
 
  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <>
      {/* <SchemaView /> */}
    </>
  );
  return (<>
    <MenuItem onClick={handleClickOpen}>
      <ListItemIcon>
        <AssignmentTurnedInOutlinedIcon fontSize="small" />
      </ListItemIcon>
      <Typography component={'span'} variant="inherit">Configure Schema</Typography>
    </MenuItem>
    <Dialog
      open={open}      
      fullWidth={true}
      maxWidth="lg"
      disableBackdropClick={true}
    >
      <DialogActions>
        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
          <CancelIcon fontSize="large" style={{ color: "#545A61" }} />
        </IconButton>
      </DialogActions>
      <DialogContent>
      
        <DialogContentText>
          {body}
        </DialogContentText>
      </DialogContent>
     
    </Dialog >
  </>)
}
 
export default ShowJsonSchema;