import React from 'react'
import { Grid, Tooltip, Badge, IconButton } from '@material-ui/core';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import {useDispatch} from 'react-redux';

import {clear_json} from '../actions'
import { selected_node_clear_json } from '../editactions'

function Refresh() {
    
    const dispatch = useDispatch();    

    const refreshApp = () => {
        dispatch(clear_json());
        dispatch(selected_node_clear_json());
    }

    return (
        <>
            <Grid item>
                <Tooltip title="Refresh application">
                    <IconButton>
                        <Badge>
                            <RefreshOutlinedIcon style={{ color: "white" }} fontSize="medium" onClick={refreshApp}/>
                        </Badge>
                    </IconButton>
                </Tooltip>
            </Grid>
        </>
    )
}

export default Refresh
