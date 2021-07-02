import React from 'react'
import { Tooltip, Typography } from '@material-ui/core';
import ComputerOutlinedIcon from '@material-ui/icons/ComputerOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

function OpenFromDisk() {
    return (
        <>

            <Tooltip title="Open a JSON file from disk">
                <>
                    <label htmlFor="json-file">
                        <MenuItem>
                            <ListItemIcon>
                                <ComputerOutlinedIcon fontSize="small"/>
                            </ListItemIcon>
                            <Typography variant="inherit">Open from Disk</Typography>
                        </MenuItem>                                                            
                    </label>
                </>
            </Tooltip>
        </>
    )
}

export default OpenFromDisk
