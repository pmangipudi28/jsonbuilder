import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Grid, makeStyles, AppBar, Tabs, Tab, Box, Typography } from '@material-ui/core';
import Header from './Header';
import PropTypes from 'prop-types';
import Editor from './Editor';
import { JsonView } from './JsonView/';
import theme from '../themes/theme';

import { fetch_json_request, fetch_json_success } from '../actions'
import { convertToJson, RemoveParentId, searchObject, validateJson } from '../components/helper/helper';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 0,
    flex: 0,

  },
  paper: {
    borderRadius: 0,
  },
  tab: {
    backgroundColor: theme.palette.viewSectiontab.main,
    minHeight: '20px',
    color: theme.palette.contentColor.white,
    "& div.MuiTabs-scroller": {
      position: 'inherit',
    },
    "& .MuiTabs-indicator": {
      display: 'none'
    },
    "& .Mui-selected ": {
      borderBottom: '2px solid' + theme.palette.viewSectiontab.border,
      borderRadius: '1px',
      boxShadow: '1px 2px 3px ' + theme.palette.viewSectiontab.boxshadow,
    },
  },
  tabButton: {
    minHeight: '34px',
    fontSize: '12px',
    fontFamily: ['Open Sans', 'sans-serif'].join(',')
  },


}))

/***************Tab view *************** */
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


/************************************** */
function ViewSection() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let jsonData = "";

  const currentState = useSelector(state => state.jsonReducer.present);
  const tempJson = useSelector(state => state.jsonReducer.present.tempJson);
  const jsonSchemaStatus = useSelector(state => state.jsonReducer.present.jsonSchemaStatus);

  useEffect(() => {

    if (currentState.jsonData && Object.keys(currentState.jsonData).length === 0 && tempJson.length === 0)
    {
      // Land in TreeView
      setValue(0)  
    }
    else if (currentState.jsonData && Object.keys(currentState.jsonData).length > 0 && tempJson.length > 0)
    {
      // If JSON is having issues
      setValue(1);
    }
    else if (currentState.jsonData && Object.keys(currentState.jsonData).length > 0)
    {
      
      // if (value === 0)
      // {
         
      // }
      // else if (value === 1)
      // {
      //     jsonData = RemoveParentId(currentState.jsonData, "$ID", "$PID")
      // }
    }
  })
  useEffect(() => {
    setValue(1);

  }, [jsonSchemaStatus])
  

  return (
    <>
      <form>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12}>
            <AppBar position="static" className={classes.root}>
              <Tabs className={classes.tab} value={value} onChange={handleChange} >
                <Tab className={classes.tabButton} label="Tree View" {...a11yProps(0)} />
                <Tab className={classes.tabButton} label="JSON View" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <TabPanel className={classes.tabpanel} value={value} index={0}>
              <Editor />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <JsonView JsonData={currentState.properJSON === false ? tempJson : (value === 0 ? currentState.jsonData : RemoveParentId(currentState.jsonData, "$ID", "$PID"))} />  
            </TabPanel>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default ViewSection