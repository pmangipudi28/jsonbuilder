import React from 'react'
import { Tooltip, Typography } from '@material-ui/core';
import CloudOutlinedIcon from '@material-ui/icons/CloudOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

function SaveToURL() {
    return (
        <>
           <Tooltip title="Open a JSON file from Cloud">
                <MenuItem>
                    <ListItemIcon>
                        <CloudOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Save to URL</Typography>
                </MenuItem>
            </Tooltip> 
        </>
    )
}

export default SaveToURL
