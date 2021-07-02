import React, {useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { Grid, Button, Tooltip, Icon, Paper, makeStyles } from '@material-ui/core';
import {theme} from '../themes/theme'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    pageContent: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        backgroundColor: theme.palette.pageContent.main,
        borderRadius: '0px'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: "500px",
        overflow: 'auto',
        elevation: 1,
        backgroundColor: theme.palette.editorPaper.main,
        borderRadius: '0px'
      },     
}))

function JsonView() {
    
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
            <Paper className={classes.pageContent}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Paper variant="elevation" className={classes.paper}>  
                            In Progress 
                        </Paper>
                    </Grid>
                </Grid>
            </Paper> 
    )
}

export default JsonView;