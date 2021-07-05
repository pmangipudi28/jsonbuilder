import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormatAlignLeftOutlinedIcon from '@material-ui/icons/FormatAlignLeftOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';

import { makeStyles } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import { FileErrorComponent } from '../helper/InputFileValidationHelper';
import { SuccessMessage } from "../helper/Message"
import { validateJson, RemoveParentId } from '../helper/helper';
import { not_proper_json, set_temp_json, save_temp_json, save_code_json } from '../../actions'

import { jsonBuilderTheme } from '../../themes/JsonBuilderTheme';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    pageContent: {
        margin: jsonBuilderTheme.spacing(1),
        padding: jsonBuilderTheme.spacing(1),
        backgroundColor: jsonBuilderTheme.palette.pageContent.main,
        borderRadius: '0px',
        height: 'calc(100vh - 100px)',
        minHeight: '80px',
    },
    paper: {
        padding: jsonBuilderTheme.spacing(0),
        textAlign: 'center',
        color: jsonBuilderTheme.palette.text.secondary,
        overflow: 'hidden',
        height: 'calc(100vh - 116px)',
        minHeight: '64px',
        elevation: 1,
        backgroundColor: jsonBuilderTheme.palette.editorPaper.main,
        borderRadius: '0px',
    },
    paperHeight: {
        height: '100vh'
    },
    resizeTextArea: {
        width: '100%',
        border: 'none',
        height: 'calc(100vh - 152px)',
        minHeight: '27px'
    },
    toolbar: {
        textAlign: 'left',
        padding: '4px 8px',
        background: '#545454',
        color: '#fff',
        marginBottom: '0px'
    },
    tooltip: {
        marginRight: jsonBuilderTheme.spacing(1),
        cursor: 'pointer'
    }
})

export const JsonView = ({ JsonData }) => {
    const classes = useStyles();

    return (
        <>
            <Paper className={classes.pageContent}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Paper variant="elevation" className={classes.paper}>
                            <CodeView treeData={JsonData} />
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export const CodeView = ({ treeData, replacer = null, space = 2 }) => {
    const classes = useStyles();
    const currentState = useSelector(state => state.jsonReducer.present);
    const dispatch = useDispatch();

    const [codeView, setCodeView] = useState({});
    const [isInValid, setIsInValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [state, setState] = React.useState({
        openSnackbar: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal, openSnackbar } = state;
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
    const handleClose = () => {
        setIsInValid(false);
    }
    const handleCloseSuccess = () => {
        setState({ openSnackbar: false, vertical: 'top', horizontal: 'center' })
    }
    const isValidJson = (jsonData) => {
        setIsInValid(false);
    }

    const isInValidJson = (message) => {
        setErrorMessage(message)
        setIsInValid(true);
    }
    const getJsonData = () => {
        return setCodeView((JSON.stringify(JSON.parse(codeView), replacer, space)));
    }

    const saveJSON = () => {
        let jsonData = "";

        try {
            try {
                jsonData = eval(JSON.parse(JSON.stringify(codeView), replacer, space));
            }
            catch
            {
                jsonData = JSON.parse(eval(JSON.stringify(unescape(codeView), replacer, space)));
            }

            Promise.resolve(dispatch(save_code_json(jsonData))).then(
                () => dispatch(set_temp_json()))

            //dispatch(fetch_json_success(jsonData));
            setState({ openSnackbar: true, vertical: 'top', horizontal: 'center' });
            setSuccessMessage("JSON is saved");
        }
        catch {
            Promise.resolve(dispatch(save_temp_json(codeView))).then(
                () => dispatch(not_proper_json(false)))
            // dispatch(not_proper_json(false));
        }
    }

    useEffect(() => {
        let codeView = "", data;
        var [message] = validateJson(treeData)
        if (currentState.properJSON === true) {
            data = RemoveParentId(treeData);
            codeView = JSON.stringify(treeData, null, space);
            setCodeView(codeView);
        } else {
            isInValidJson(message);
            setCodeView(treeData);
        }
    }, [treeData])

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
            { codeView != "" && <textarea value={codeView} onChange={prettyJson} className={classes.resizeTextArea} placeholder="Upload The File" />}
            { errorMessage && isInValid && <FileErrorComponent isValid={isInValid} handleClose={handleClose} errorMessage={errorMessage} />}
            { successMessage && <SuccessMessage successMessage={successMessage} openAlertbar={openSnackbar} vertical={vertical} horizontal={horizontal} handleCloseSuccess={handleCloseSuccess} />}
        </>
    )
}