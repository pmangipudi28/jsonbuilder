import React from 'react'
import { makeStyles, CssBaseline } from '@material-ui/core';
import { Provider } from "react-redux";
import { createStore } from "redux";
import { ThemeProvider } from "@material-ui/styles";
import { jsonBuilderTheme } from "./themes/JsonBuilderTheme";
import Home from './components/Home';
import allReducers from "./reducers";

const store = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const useStyles = makeStyles({
    appMain: {
        paddingLeft: '0px',
        width: '100%',
    }
})
function ReactJsonBuilder() {

    const classes = useStyles();
    return (
        <>
            <Provider store={store}>
                <ThemeProvider theme={jsonBuilderTheme}>
                    <div className={classes.appMain}>
                        <Home />
                    </div>
                    <CssBaseline />
                </ThemeProvider>
            </Provider>
        </>
    )
}
export default ReactJsonBuilder