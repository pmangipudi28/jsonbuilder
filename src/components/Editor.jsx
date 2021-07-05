import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { Grid, Paper, makeStyles } from '@material-ui/core';
import Tree from "./Tree";
import PropertyUpdate from "./PropertyUpdate";
import { jsonBuilderTheme } from '../themes/JsonBuilderTheme'
import { fetch_json_success } from '../actions';
import { searchObject } from '../components/helper/helper';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    pageContent: {
        margin: jsonBuilderTheme.spacing(1),
        padding: jsonBuilderTheme.spacing(1),
        backgroundColor: jsonBuilderTheme.palette.pageContent.main,
        borderRadius: '0px',
        height: 'calc(100vh - 100px)'
    },
    paper: {
        padding: jsonBuilderTheme.spacing(2),
        textAlign: 'center',
        color: jsonBuilderTheme.palette.text.secondary,
        height: 'calc(100vh - 115px)',
        overflow: 'auto',
        elevation: 1,
        backgroundColor: jsonBuilderTheme.palette.editorPaper.main,
        borderRadius: '0px'
      },     
})

function Editor() {
    
    const classes = useStyles();
    const currentState = useSelector(state => state.jsonReducer.present);
    const dispatch = useDispatch();

    const checkROOT = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === "ROOT"; });

    useEffect(() => {
        dispatch(fetch_json_success(currentState.jsonData));
    },[checkROOT.length === 0])

    return (
        <>
            <Paper className={classes.pageContent}>
                <form>
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <Paper variant="elevation" className={classes.paper}>
                                {currentState.jsonData && Object.keys(currentState.jsonData).length > 0 ? <Tree data={currentState.jsonData} length={Object.keys(currentState.jsonData).length} /> : null }
                            </Paper>
                        </Grid>                        
                        <Grid item xs={8}>
                            <Paper  className={classes.paper}>
                                <PropertyUpdate />
                            </Paper>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </>    
    )
}

export default Editor