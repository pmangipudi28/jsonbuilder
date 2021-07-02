import React from 'react'
import { Tooltip, Typography } from '@material-ui/core';
// import BookIcon from '@material-ui/icons/Book';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import JsonSchemaWindow from './jsonschema/JsonSchemaWindow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  /*function getModalStyle() {
    const top = 40 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }*/
  
  const useStyles = makeStyles((theme) => ({
    dialogstyle: {
      padding: "10px",
    }
  }));


function OpenJsonSchema() {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = React.useState(false);
  

  const handleOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  
  const body = (
    <div>
      <JsonSchemaWindow />
    </div>
  );
    return (
        <>
            
        {/* <div onClick={handleOpen}> */}
          <MenuItem onClick={handleOpen}>
            <ListItemIcon>
              <AssignmentOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">JSON Schema</Typography>
          </MenuItem>

          {openDialog ?
            <>
                <Dialog
                  open={openDialog}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  fullWidth="true"
                  maxWidth="sm"
                >
                  <DialogContent className={classes.dialogstyle}>
                    <DialogContentText id="alert-dialog-description">
                      {body}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                  <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                    <CancelIcon fontSize="large" style={{ color: "#545A61" }} />
                  </IconButton>
                  </DialogActions>

                </Dialog>
            </>
            : null
          }
        {/* </div> */}
      
        </>
    )
}

export default OpenJsonSchema