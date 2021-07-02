import React from 'react'
import { Grid, Tooltip, Badge, IconButton } from '@material-ui/core';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

function Settings() {

    const openSettings = () => {
        console.log("Open JSON Schema File component here!")
    }

    return (
        <>
            <Grid item>
                <Tooltip title="Settings">
                    <IconButton>
                        <Badge>
                            <SettingsOutlinedIcon style={{ color: "white" }} fontSize="medium" onClick={openSettings}/>
                        </Badge>
                    </IconButton>
                </Tooltip>                    
            </Grid>
        </>
    )
}

export default Settings
