import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {Modal, Backdrop, Fade, Button}   from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import {fetch_json_request, fetch_json_success, fetch_json_failure} from '../actions'
import {useSelector, useDispatch} from 'react-redux';
import {handleClose} from './FileUpload'

import { FileErrorComponent, handleDropFileValidation } from './helper/InputFileValidationHelper';

function DropzoneComponent(props) {
  const dispatch = useDispatch(); 
  
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleError = (status, errorMsg) => {
    setIsValid(status);
    setErrorMessage(errorMsg);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setIsValid(false);
};

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file) => {
        console.log(file);
        const isValid = handleDropFileValidation(file);

        if (!isValid) {
            const message = "Please upload a proper JSON file";
            handleError(true, message);
        } else {
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
            
            const binaryStr = reader.result
              try{              
                dispatch(fetch_json_success(eval(JSON.parse(JSON.stringify(binaryStr)))));
              }
              catch {
                dispatch(fetch_json_success(JSON.parse(eval(JSON.stringify(unescape(binaryStr))))));
              }
            }
            reader.readAsText(file);
            props.handleClose();
        }
      
    })
    
  }, []); 
  

  const {
    getRootProps,
    getInputProps
  } = useDropzone({
    onDrop
  });
 

  return (
    <div {...getRootProps()}>
      {errorMessage && <FileErrorComponent isValid={isValid} handleClose={handleClose} errorMessage={errorMessage} />}
      
      <input {...getInputProps()} />
      <div>Drag and drop your file here.</div>
    </div>
    
  )
}

export default DropzoneComponent;