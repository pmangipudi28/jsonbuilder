import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    alertRadius: {
        borderRadius: 0
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