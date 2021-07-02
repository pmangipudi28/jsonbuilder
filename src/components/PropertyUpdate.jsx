import React from 'react'
import {useState, useEffect} from "react";
import {useSelector} from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

import PropertyTree from './PropertyTree';

import { convertToJson, RemoveParentId, searchObject, validateJson } from '../components/helper/helper';

import {theme} from '../themes/theme';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,    
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    elevation: 1,
  },
  accordionDetailsSection: {
    // display: 'block'
  },
  accordionSection: {
    background: theme.palette.accordionSectionPropertyUpdate.main
  }
}));

function PropertyUpdate() {

    const classes = useStyles();

    const [selectedNode, setSelectedNode] = useState({});
    const [expanded, setExpanded] = useState(false);    
    const [jsonGrandParent, setGrandParent] = useState({});
    const [jsonParent, setParent] = useState({});    
    const [jsonGrandChild, setGrandChild] = useState({});
    
    const currentState = useSelector(state => state.jsonReducer.present);    

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        setSelectedNode(eval(currentState.selectedNodeData));
    }, [currentState.selectedNodeData]);

    useEffect(() => {
        
        setGrandChild({});
        setParent({});
        setGrandParent({});
                
        if (selectedNode && selectedNode.$PID !== "ROOT")
        {
            const getParentResult = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === selectedNode.$PID; });

            if (Object.keys(getParentResult).length > 0)
            {
                if (getParentResult[0].path === "")
                {
                    // Setting for only Grandparent
                    const getGrandParentResult = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === selectedNode.$ID; });

                    setGrandParent(getGrandParentResult[0].value);
                    setGrandChild({});
                    setParent({});
                }
                else if (getParentResult[0].path.toString().split(".").length >= 5 )
                {
                    const getGrandParentResult = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === getParentResult[0].value["$PID"]; });
                    
                    // Setting for Grandchild, Parent, Grandparent
                    setParent(getParentResult[0].value);
                    setGrandChild(eval(selectedNode));
                    setGrandParent(getGrandParentResult[0].value);
                }
                else
                {
                    // Setting for Parent, Grandparent
                    const getParentResult = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === selectedNode.$ID; });                    
                    const getGrandParentResult = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === selectedNode.$PID; });
                
                    setGrandChild({});

                    setGrandParent(getGrandParentResult[0].value);
                    setParent(selectedNode);
                }
            }
        }       
    }, [selectedNode]);

    return (
        <div className={classes.root}>
            <>
             {currentState.selectedNodeData && currentState.selectedNodeData.$ID != null ? 
                <>
                    <Typography color="textSecondary" align="left">View & Update Properties</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={12}>
                                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} 
                                       className={classes.accordionSection}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                            className={classes.accordionDetailsSection}>
                                            <Typography>{Object.keys(jsonGrandParent).length > 0 ? jsonGrandParent.name : "Field"} Properties</Typography>                
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {Object.keys(jsonGrandParent).length > 0 ? <PropertyTree selectedJSON={jsonGrandParent} /> : null}
                                        </AccordionDetails>
                                </Accordion>
                        </Grid>
                        <Grid item xs={12}>
                                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} 
                                        className={classes.accordionSection}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                        className={classes.accordionDetailsSection}>
                                        <Typography>{Object.keys(jsonParent).length > 0 ? jsonParent.name : "Field"} Properties</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {Object.keys(jsonParent).length > 0 ? <PropertyTree selectedJSON={jsonParent} /> : null}
                                    </AccordionDetails>
                                </Accordion>
                        </Grid>
                        <Grid item xs={12}>
                                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} 
                                        className={classes.accordionSection}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                        className={classes.accordionDetailsSection}>
                                        <Typography>{Object.keys(jsonGrandChild).length > 0 ? jsonGrandChild.name : "Field"} Properties</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {Object.keys(jsonGrandChild).length > 0 ? <PropertyTree selectedJSON={jsonGrandChild} /> : null}
                                    </AccordionDetails>
                                </Accordion>
                        </Grid>
                      </Grid>
                    </>
                 : ""} 
            </>
    </div>
    )
}

export default PropertyUpdate