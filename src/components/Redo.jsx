import React from 'react'
import { Grid, Tooltip, Badge, IconButton } from '@material-ui/core';
import RedoRoundedIcon from '@material-ui/icons/RedoRounded';
import { ActionCreators } from 'redux-undo';
import {useDispatch} from 'react-redux';

function Redo() {

    const dispatch = useDispatch();

    const redoAction = () => {
        dispatch(ActionCreators.redo())
    }

    return (
        <>
            <Grid item>
                <Tooltip title="Redo">
                    <IconButton onClick={redoAction}>
                        <Badge>
                            <RedoRoundedIcon style={{ color: "white" }} fontSize="medium"/>
                        </Badge>
                    </IconButton>
                </Tooltip>
            </Grid>
        </>
    )
}

export default Redo