import React from 'react'
import AlertTitle from '@material-ui/lab/AlertTitle';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

export const handleFileValidation = (inputFile) => {
    let result;
    let inputFileName = inputFile.target.files[0].name;
    result = checkInputFileExtension(inputFileName);
    return result;
}

export const handleDropFileValidation = (inputFile) => {
    let result;
    console.log("inputFile ==== " + JSON.stringify(inputFile));
    let inputFileName = inputFile.path;
    result = checkInputFileExtension(inputFileName);
    return result;
}

export const handleCloudFilevalidation = (fileUrl) => {
    let result;
    let inputFileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
    result = checkInputFileExtension(inputFileName);
    return result;
}

const checkInputFileExtension = (fileName) => {
    if (!fileName.match(/\.(json)$/)) {
        return false;
    } else {
        return true;
    }
}

export const FileErrorComponent = (props) => {
    const { isValid, errorMessage, handleClose } = props;
    console.log(isValid);

    return (
        <Snackbar open={isValid} autoHideDuration={6000} onClose={() => handleClose()} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert variant="filled" severity="error" onClose={() => handleClose()}>                
                <strong>{errorMessage}</strong>
            </Alert>
        </Snackbar>
    )
}