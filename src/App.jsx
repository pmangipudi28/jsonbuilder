import React from 'react';
import { makeStyles, CssBaseline } from '@material-ui/core'
import { ThemeProvider } from "@material-ui/styles";
import { jsonBuilderTheme } from "./themes/JsonBuilderTheme";
import Home from '../src/components/Home'

const useStyles = makeStyles({
  appMain : {
    paddingLeft: '0px',
    width: '100%',    
  }
})

function App() {
  
  const classes = useStyles();
  return (    
    <ThemeProvider theme={jsonBuilderTheme}>        
        <div className={classes.appMain}>
          <Home />
        </div>
        <CssBaseline />
    </ThemeProvider>
    
  );
}

export default App;
