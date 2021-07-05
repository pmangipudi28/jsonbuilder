import React from 'react'
import { useSelector } from 'react-redux';

import { Tooltip, Typography } from '@material-ui/core';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { handleSaveToPC } from '../components/helper/helper';

function SaveToDisk() {

    const currentState = useSelector(state => state.jsonReducer.present);
    const handleSave = () =>
    {
        handleSaveToPC(currentState.jsonData);
    }

    return (
        <>
            <Tooltip title="Save JSON File">
                <>
                    <MenuItem onClick={handleSave}>
                        <ListItemIcon>
                                <SaveOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="inherit">Save to Disk</Typography>
                    </MenuItem>
                </>
            </Tooltip>
        </>
    )
}

export default SaveToDisk
