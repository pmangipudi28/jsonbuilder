import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormatAlignLeftOutlinedIcon from '@material-ui/icons/FormatAlignLeftOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';

import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import CloseIcon from '@material-ui/icons/Close';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { FileErrorComponent, handleFileValidation } from './helper/InputFileValidationHelper';

import { makeStyles } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import { ErrorMessage } from './helper/Message';
import { validateJson } from './helper/helper';

import { save_json_schema, save_json_schema_status, save_json_schema_readonly } from '../actions'
//JSON validation code
import { ValidateJsonSchema, StoreJsonSchemaReadonlyInRedux, getReadOnlyStatus } from '../utility/index'
//import Snackbar from '@material-ui/core/Snackbar';
//import Button from '@material-ui/core/Button';
//import CloseIcon from '@material-ui/icons/Close';
//--------------------------//

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    pageContent: {
        margin: theme.spacing(0),
        padding: theme.spacing(0),
        backgroundColor: 'transparent',
        borderRadius: '0px',
        height: 'calc(100vh - 0px)',
        minHeight: '80px',
        overflow: 'clip',
        '& .MuiBackdrop-root': {
            backgroundColor: 'transparent'
        }
    },
    paper: {
        padding: theme.spacing(0),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        overflow: 'hidden',
        height: 'calc(100vh - 155px)',
        minHeight: '64px',
        elevation: 1,
        backgroundColor: theme.palette.editorPaper.main,
        borderRadius: '0px',
    },
    paper2: {
        overflowY: 'clip',
    },
    dialog: {
        overflow: 'clip'
    },

    paperHeight: {
        height: '100vh'
    },
    resizeTextArea: {
        width: '100%',
        border: 'none',
        height: 'calc(100vh - 180px)',
        minHeight: '27px',
        overflow: 'unset'
    },
    toolbar: {
        textAlign: 'left',
        padding: '4px 8px',
        background: '#545454',
        color: '#fff',
        marginBottom: '0px'
    },
    tooltip: {
        marginRight: theme.spacing(1),
        cursor: 'pointer'
    },
    customizedButton: {
        position: 'absolute',
        left: '96%',
        top: '2%',
        backgroundColor: 'lightgray',
        color: 'gray',
    },
    button: {
        margin: theme.spacing(1),
    },
}))

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 40 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

export const SchemaView = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const uploadInputRef = useRef(null);
    const [notification, setNotification] = React.useState("");
    //JSON validation code
    const store = useStore();
    const [state, setState] = React.useState({
        Snachopen: false,
        vertical: 'top',
        horizontal: 'center',
    });
    //const { vertical, horizontal, Snachopen } = state;
    //const [notification, setNotification] = React.useState("");
    const [isInValid, setIsInValid] = useState(false);
    const currentStateJsonData = useSelector(state => state.jsonReducer.present.jsonSchemaData);
    //-----------------------------------------//

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNoSchema = () => {
        dispatch(save_json_schema([]), 0);
    }

    const handleCapture = e => {
        const isValid = handleFileValidation(e);

        if (!isValid) {
            const message = "Please upload a proper JSON Schema file";
        } else {
            const fileReader = new FileReader();
            fileReader.readAsText(e.target.files[0], "UTF-8");

            fileReader.onload = e => {
                //JSON validation code
               // store.subscribe(showAlert);
                //-----------------------//
                try {
                    dispatch(save_json_schema(JSON.parse(e.target.result)), 1);
                    let readOnlyJsonSchemaArray = StoreJsonSchemaReadonlyInRedux(store);
                    dispatch(save_json_schema_readonly(readOnlyJsonSchemaArray), 1);
                }
                catch
                {

                }
            };
        }
    }
    /*const handleClose = () => {
        setIsInValid(false);
    }*/

    const showAlert = () => {
        //setState({ ...state, Snachopen: false });
        let getJSONSchemaData = ValidateJsonSchema(store);
        if(getJSONSchemaData['hasMessage']){
            if(typeof getJSONSchemaData['message'] === "object") { 
                dispatch(save_json_schema_status(1), 1) 
            }
            // dispatch(save_json_schema_status(1), 1);
           // setState({ Snachopen: true, vertical: 'top', horizontal: 'center' });
            //setNotification(getJSONSchemaData['message']);
            //isInValidJson(getJSONSchemaData['message'])
        }
    }

    useEffect(() => {
        showAlert();
     }, [currentStateJsonData])

    const currentState = useSelector(state => state.jsonReducer.present);
    const schemaData = currentState.jsonSchemaData;

    return (
        <>
            <MenuItem onClick={handleClickOpen}>
                <ListItemIcon>
                    <AssignmentTurnedInOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <Typography component='span' variant="inherit">Configure Schema</Typography>
            </MenuItem>

            <Dialog
                open={open}
                fullWidth={true}
                disableBackdropClick={true}
                maxWidth="lg"
                className={classes.pageContent}
            >
                <DialogContent className={classes.dialog}>
                    {/* {schemaData && Object.keys(schemaData).length > 0 ? 
                        (<Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className={classes.button}
                            startIcon={<SaveIcon />}
                        >
                            Save Schema
                        </Button>)
                    : 
                        null
                    } */}
                    <input
                        ref={uploadInputRef}
                        type="file"
                        accept="application/json"
                        style={{ display: "none" }}
                        onChange={handleCapture}
                        type="file"
                    />
                    <Button
                        onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
                        variant="contained"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload Schema
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={handleNoSchema}
                        startIcon={<DeleteIcon />}
                    >
                        Set No Schema
                    </Button>
                    <DialogContentText>
                        <Grid container>
                            <Grid item xs={12}>
                                <Paper variant="elevation" className={classes.paper}>
                                    {schemaData && Object.keys(schemaData).length > 0 ?
                                        <CodeView schemaData={schemaData} />
                                        : null}
                                </Paper>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <IconButton onClick={handleClose} color="primary" className={classes.customizedButton}>
                        {/* <CloseIcon /> */}
                        <CancelRoundedIcon />
                    </IconButton>
                </DialogActions>
            </Dialog >
        </>
    )
}

export const CodeView = ({ schemaData, replacer = null, space = 2 }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [codeView, setCodeView] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const currentStateJsonData = useSelector(state => state.jsonReducer.present.jsonSchemaData);
    const store = useStore();
    const prettyJson = (e) => {

        var status, message;
        [status, message] = validateJson(e.target.value);

        setCodeView(e.target.value)

        if (status) {
            isValidJson(e.target.value)
        } else {
            isInValidJson(message)
        }
    }

    const isValidJson = (jsonData) => {
        setIsValid(true);
    }

    const isInValidJson = (message) => {
        setErrorMessage(message)
        setIsValid(false);
    }
    const setIndent = () => {
        JSON.stringify(codeView, replacer, space)
    }

    const getJsonData = () => {
        return setCodeView((JSON.stringify(JSON.parse(codeView), replacer, space)));
    }


    const saveJSON = () => {
        Promise.resolve(dispatch(save_json_schema(JSON.parse(codeView)))).then(
            () => {
                dispatch(save_json_schema_status(1))
                let readOnlyJsonSchemaArray = StoreJsonSchemaReadonlyInRedux(store);
                dispatch(save_json_schema_readonly(readOnlyJsonSchemaArray), 1);
            
            })
    }

    const showAlert = () => {
        //setState({ ...state, Snachopen: false });
        
        let getJSONSchemaData = ValidateJsonSchema(store);
        if(getJSONSchemaData['hasMessage']){
            if(typeof getJSONSchemaData['message'] === "object") { 
                dispatch(save_json_schema_status(1), 1) 
            }
            // dispatch(save_json_schema_status(1), 1);
            //setState({ Snachopen: true, vertical: 'top', horizontal: 'center' });
            //setNotification(getJSONSchemaData['message']);
            isInValidJson(getJSONSchemaData['message'])
        }
    }

    useEffect(() => {
        let codeView = "", data;
        var [status, message] = validateJson(schemaData)
        codeView = JSON.stringify(schemaData, null, space);
        setCodeView(codeView);
    }, [schemaData])

    const handleClose = () => {
        setIsValid(false);
        }

    useEffect(() => {
        
        showAlert();
    }, [currentStateJsonData])

    return (
        <>
            <div className={classes.toolbar}>
                <Tooltip className={classes.tooltip} title="Save JSON">
                    <SaveOutlinedIcon fontSize="small" onClick={() => { saveJSON(); getJsonData(); }} />
                </Tooltip>
                <Tooltip className={classes.tooltip} title="Format JSON">
                    <FormatAlignLeftOutlinedIcon fontSize="small" onClick={getJsonData} />
                </Tooltip>
            </div>
            {codeView != "" && <textarea value={codeView} onChange={prettyJson} className={classes.resizeTextArea} placeholder="Schema File" />}
            {
                //errorMessage && !isValid && <div className={classes.alertBox} style={{ position: "sticky", bottom: 0 }}><ErrorMessage errorMessage={errorMessage} /></div>
                errorMessage && isValid && <FileErrorComponent handleClose={handleClose} isValid={isValid} errorMessage={errorMessage} />
            }
        </>
    )
}