import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(30),
      height: theme.spacing(5),
      padding:theme.spacing(5),
    },
  },
  fileuploadinput: {
  position: 'relative',
  margin: 0,
  padding: 0,
  width: '100%',
  height: '100%',
  outline: 'none',
  cursor: 'pointer',
  },
  fileUploadButton: {
    padding: "7px 25px",
    color: "#fff",
    backgroundColor: "#545A61"
  },
  labelPadding: {
    padding: 0,
  },
}));

function JsonSchemaUpload(props) {
  const classes = useStyles();
  const fileInput = useRef(null);
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.root}>
      
      <input
        accept="application/json"
        className={classes.fileuploadinput}
        id="json-file"  
        ref={fileInput}
        onChange={(e)=> props.getFileDetails(e.target.files[0])}
        type="file"
        required
    />    
    </div>
  );
}

export default JsonSchemaUpload