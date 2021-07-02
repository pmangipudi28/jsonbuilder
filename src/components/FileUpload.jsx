import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {Modal, Backdrop, Fade}   from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import DropzoneComponent from './DropzoneComponent'
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '0px solid #fff'
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: '100px',
      width: '90%',
      minHeight: '500px',
      textAlign: 'center',
      backgroundColor: '#57a3eb'
    },
  }));

function FileUpload() {
    const classes = useStyles();
    const [open, setOpen] = useState(true);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    return (
      <>
            <Modal 
                aria-labelledby = "transition-modal-title"
                aria-describedby = "transition-modal-description"
                className={classes.modal}
                open = {open}
                onClose = {handleClose}
                disableBackdropClick={true}
        >
          
            <div className={classes.paper}>
                <CloudUploadOutlinedIcon/>
                <DropzoneComponent handleClose={handleClose} />                
            </div>
            
        </Modal>
      </>
    )
}

export default FileUpload;