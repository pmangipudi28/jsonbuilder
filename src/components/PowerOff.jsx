import React from 'react'
import { Grid, Tooltip, Badge, IconButton } from '@material-ui/core';
import PowerOffSharpIcon from '@material-ui/icons/PowerOffSharp';

const closeWindow = () => {
    window.open("", "_self");
    window.close();
}

function PowerOff() {
    return (
        <>
            <Grid item>
                <Tooltip title="Close the application">
                    <IconButton onClick={closeWindow}>
                        <Badge>
                            <PowerOffSharpIcon style={{ color: "white" }} fontSize="medium"/>
                        </Badge>
                    </IconButton>
                </Tooltip>                    
            </Grid>
        </>
    )
}

export default PowerOff
