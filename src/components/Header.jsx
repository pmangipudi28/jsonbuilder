import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch, useStore } from 'react-redux';
import { AppBar, Toolbar, Grid, Badge, IconButton, Typography } from '@material-ui/core';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { makeStyles } from '@material-ui/core'
import { ThemeProvider } from "@material-ui/core/styles";
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import SaveTwoToneIcon from '@material-ui/icons/SaveTwoTone';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';

// Sub-components for each menu items
import OpenFromDisk from '../components/OpenFromDisk'
import OpenFromCloud from '../components/OpenFromCloud'

import Undo from '../components/Undo'
import Redo from '../components/Redo'
import PowerOff from '../components/PowerOff'
import SaveToDisk from '../components/SaveToDisk'
import SaveToURL from '../components/SaveToURL'

import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

import { SchemaView } from '../components/SchemaView'

// Helper
import { FileErrorComponent, handleFileValidation } from './helper/InputFileValidationHelper';
import { fetch_json_success, save_temp_json, save_json_schema_status } from '../actions'

// JSON validation code
import { ValidateJsonSchema } from '../utility/index'
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

import { jsonBuilderTheme } from '../themes/JsonBuilderTheme';

const useStyles = makeStyles({
    root: {
        transform: 'translateZ(0)',
        background: jsonBuilderTheme.palette.header.main,
        color: jsonBuilderTheme.palette.header.contrastText   // 454749    // 325C05
    },
    toolbar: {
        minHeight: '40px',
    },
    paper: {
        marginRight: jsonBuilderTheme.spacing(2),
    },
    file: {
        display: 'none'
    },
    iconButtonHeader: {
        padding: '5px 12px',
        borderRadius: 0
    },
    fontSizeHeader: { fontSize: '18px', },
    searchInput: {
        opacity: '0.6',
        padding: '0px 8px',
        fontSize: '0.8rem',
        '&:hover': {
            backgroundColor: 'lightgrey'
        },
        '& .MuiSvgIcon-root': {
            marginLeft: '5px'
        }
    },
    disableSave: {
        cursor: 'not-allowed',
        pointerEvents: 'none'
    },
    SnackbarDiv: {
        maxWidth: "600px"
    }
})

export default function Header() {

    const classes = useStyles();
    const dispatch = useDispatch();

    const currentState = useSelector(state => state.jsonReducer.present);
    const currentStateJsonData = useSelector(state => state.jsonReducer.present.jsonData);

    const fileInput = useRef(null);
    const [open, setOpen] = useState(false);

    // Error State
    const [isValid, setIsValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const anchorRefOfOpen = useRef(null);

    //JSON validation code
    const store = useStore();
    const [state, setState] = React.useState({
        snachOpen: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal, snachOpen } = state;
    const [notification, setNotification] = React.useState("");
    
    const handleToggleOfOpen = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleCloseOfOpen = ({ target }) => {
        if (anchorRefOfOpen.current && anchorRefOfOpen.current.contains(target)) {
            return;
        }
        setOpen(false);
    };


    // Handle Error 
    const handleError = (status, errorMsg) => {
        setIsValid(status);
        setErrorMessage(errorMsg);
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsValid(false);
    };
    const handleChange = e => {
        const isValid = handleFileValidation(e);

        if (!isValid) {
            const message = "Please upload a proper JSON file";
            handleError(true, message);
        } else {
            const fileReader = new FileReader();
            fileReader.readAsText(e.target.files[0], "UTF-8");

            fileReader.onload = e => {

                let jsonData = "";
                //JSON validation code
                try {
                    try {
                        jsonData = eval(JSON.parse(JSON.stringify(e.target.result)));
                    }
                    catch
                    {
                        jsonData = JSON.parse(eval(JSON.stringify(unescape(e.target.result))));
                    }

                    dispatch(fetch_json_success(jsonData));
                }
                catch
                {

                    // Save to Code View
                    dispatch(save_temp_json(e.target.result))
                }
            };
        }
    };

    // Handle Error

    function handleListKeyDownOfOpen(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {

            anchorRefOfOpen.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    //////////////////////////////////////////////////////////////////////
    const [save, setSave] = useState(false);
    const anchorRefOfSave = useRef(null);

    const handleToggleOfSave = () => {
        setSave((prevSave) => !prevSave);
    };

    const handleCloseOfSave = (event) => {
        if (anchorRefOfSave.current && anchorRefOfSave.current.contains(event.target)) {
            return;
        }

        setSave(false);
    };

    function handleListKeyDownOfSave(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setSave(false);
        }
    }

    // return focus to the button when we transitioned from !save -> save
    const prevSave = useRef(save);
    useEffect(() => {
        if (prevSave.current === true && save === false) {
            anchorRefOfSave.current.focus();
        }

        prevSave.current = save;
    }, [save]);

    /// Setting icon and functionality///////////////////////////////////////

    const [setting, setSetting] = useState(false);
    const anchorRefOfSetting = useRef(null);

    const handleToggleOfSetting = () => {
        setSetting((prevSetting) => !prevSetting);
    };

    const handleCloseOfSetting = (event) => {
        if (anchorRefOfSetting.current && anchorRefOfSetting.current.contains(event.target)) {
            return;
        }

        setSetting(false);
    };

    function handleListKeyDownOfSetting(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setSetting(false);
        }
    }
    // JSON VAlidation code
    const showAlert = () => {
        setState({ ...state, snachOpen: false });
        let getJSONSchemaData = ValidateJsonSchema(store);
        if(getJSONSchemaData['hasMessage']){
            if(typeof getJSONSchemaData['message'] === "object") { 
                
                dispatch(save_json_schema_status(1), 1) 
                handleError(true, getJSONSchemaData['message']);
            }
           
        }
        
    }
    useEffect(() => {
        showAlert();
     }, [currentStateJsonData])

    const snackbarHandleClose = () => {

        setState({ ...state, snachOpen: false });
    };
    

    return (

        <AppBar position="static" className={classes.root}>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={snachOpen}
                onClose={snackbarHandleClose}
                color="primary"
                message={notification}
                key={vertical + horizontal}
                bodyStyle={{ width: '600px' }}
                action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={snackbarHandleClose}>
                            UNDO
                        </Button>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={snackbarHandleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
            <Toolbar className={classes.toolbar}>
                <Grid container alignItems="center">
                    <Grid item>
                        <Typography className={classes.fontSizeHeader} variant="h4" component="h2">
                            JSON Builder
                        </Typography>
                    </Grid>
                    <Grid item sm></Grid>
                    <ThemeProvider theme={jsonBuilderTheme}>
                        <Grid item>
                            <IconButton ref={anchorRefOfOpen}
                                aria-controls={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggleOfOpen} className={classes.iconButtonHeader}>
                                <Badge>
                                    <FolderOpenOutlinedIcon style={{ color: "white" }} fontSize="medium" />
                                </Badge>
                            </IconButton>
                            <Popper open={open} anchorEl={anchorRefOfOpen.current} role={undefined} transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleCloseOfOpen}>
                                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDownOfOpen}>
                                                    <input
                                                        accept="application/json"
                                                        className={classes.file}
                                                        id="json-file"
                                                        ref={fileInput}
                                                        onChange={handleChange}
                                                        type="file"
                                                    />
                                                    <OpenFromDisk />
                                                    <OpenFromCloud />
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </Grid>
                    </ThemeProvider>
                    <ThemeProvider theme={jsonBuilderTheme}>
                        <Grid item>
                            <IconButton ref={anchorRefOfSave}
                                aria-controls={save ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggleOfSave}
                                className={currentState.updated ? null : classes.disableSave}>
                                <Badge>
                                    {currentState.updated ? <SaveOutlinedIcon style={{ color: "white" }} fontSize="medium" /> : <SaveTwoToneIcon fontSize="medium" />}
                                </Badge>
                            </IconButton>
                            <Popper open={save} anchorEl={anchorRefOfSave.current} role={undefined} transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleCloseOfSave}>
                                                <MenuList autoFocusItem={save} id="menu-list-grow" onKeyDown={handleListKeyDownOfSave}>
                                                    <SaveToDisk />
                                                    <SaveToURL />
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </Grid>
                    </ThemeProvider>
                    {/* <Settings /> */}
                    <ThemeProvider theme={jsonBuilderTheme}>
                        <Grid item>
                            <IconButton ref={anchorRefOfSetting}
                                aria-controls={setting ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggleOfSetting} >

                                <Badge>
                                    <SettingsOutlinedIcon style={{ color: "white" }} fontSize="medium" />
                                </Badge>
                            </IconButton>
                            <Popper open={setting} anchorEl={anchorRefOfSetting.current} role={undefined} transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleCloseOfSetting}>
                                                <MenuList autoFocusItem={setting} id="menu-list-grow" onKeyDown={handleListKeyDownOfSetting}>
                                                    <SchemaView />
                                                    
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </Grid>
                    </ThemeProvider>
                    {/* <Refresh /> */}

                    <Undo />
                    <Redo />
                    <PowerOff />
                </Grid>
                {errorMessage && <FileErrorComponent isValid={isValid} handleClose={handleClose} errorMessage={errorMessage} />}
            </Toolbar>
        </AppBar>

    )
}