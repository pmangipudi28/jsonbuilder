import { Store } from '@material-ui/icons';
import React from 'react';
import {useDispatch, useStore} from 'react-redux';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import { Typography, Grid } from '@material-ui/core';

function DisplayJsonSchema() {
    const store = useStore();
    const [openDialog, setOpenDialog] = React.useState(false);
    const [schema, setSchema] = React.useState({});
    const [schemaStatus, setSchemaStatus] = React.useState({});

    const handleClose = () => {
        setOpenDialog(false);
    };

    React.useEffect(() => {
        
        setSchema(store.getState().jsonReducer.jsonSchemaData)
    }, [store.getState().jsonReducer.jsonSchemaStatus]);

    return(<>
            {schema.length > 0 ? <pre>{schema}</pre> : 
            <>
                    <Typography variant="h6" align="center">
                        JSON Schema is not Available
                    </Typography>
            </>
            }
            </>
        )
} 

export default DisplayJsonSchema;