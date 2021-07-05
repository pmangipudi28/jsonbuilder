import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    alertRadius: {
        borderRadius: 0,
        backgroundColor: '#f23f2e',
        color: '#ffffff',
        "& .MuiAlert-icon": {
            color: '#ffffff',
        }
    }
}));
export const ErrorMessage = ({ errorMessage }) => {
    const classes = useStyles();
    return (
        <Alert severity="error" className={classes.alertRadius}>
            {errorMessage}
        </Alert>
    )
}
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export const SuccessMessage = ({ openAlertbar, successMessage, vertical, horizontal, handleCloseSuccess }) => {

    return (
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={openAlertbar}
            autoHideDuration={1000}
            key={vertical + horizontal}
            onClose={() => handleCloseSuccess()}
        >
            <Alert severity="info" onClose={() => handleCloseSuccess()}>
                {successMessage}
            </Alert>
        </Snackbar>
    )
}