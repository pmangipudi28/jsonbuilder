import React from 'react'
import { Grid, Tooltip, Badge, IconButton } from '@material-ui/core';
import UndoRoundedIcon from '@material-ui/icons/UndoRounded';
import { ActionCreators } from 'redux-undo';
import {useSelector, useDispatch} from 'react-redux';

const undoAction = () => {
    // dispatch(ActionCreators.undo())
}

function Undo() {

    const currentState = useSelector(state => state.jsonReducer.past);
    const dispatch = useDispatch();

    const undoAction = () => {
        dispatch(ActionCreators.undo())
    }

    return (
        <>
            <Grid item>
                <Tooltip title="Undo">
                    <IconButton onClick={undoAction}>
                        <Badge>
                            <UndoRoundedIcon style={{ color: "white" }} fontSize="medium"/>
                        </Badge>
                    </IconButton>
                </Tooltip>
            </Grid>
        </>
    )
}

export default Undo
