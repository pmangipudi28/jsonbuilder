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

    const [jsonGreatGrandParent, setGreatGrandParent] = useState({});
    const [jsonGrandParent, setGrandParent] = useState({});
    const [jsonParent, setParent] = useState({});    
    const [jsonChild, setChild] = useState({});
    const [jsonGrandChild, setGrandChild] = useState({});
    
    const currentState = useSelector(state => state.jsonReducer.present);    

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    useEffect(() => {

        setGreatGrandParent({});
        setGrandParent({});
        setParent({});
        setChild({});
        setGrandChild({});
                
        if (currentState.selectedNodeData && currentState.selectedNodeData.$PID !== "ROOT")
        {
            let getCurrentNodeResult = "";
            
            let getGreatGrandParentResult = "";
            let getGrandParentResult = "";
            let getParentResult = "";
            let getChildResult = "";
            let getGrandChildResult = "";

            if (Object.keys(currentState.selectedNodeData).length > 0)
            {
                getCurrentNodeResult = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === currentState.selectedNodeData.$ID; });

                if (Object.keys(getCurrentNodeResult).length > 0)
                {
                    switch (getCurrentNodeResult[0].path.toString().split(".").length) {
                        case 3:
    
                            // Setting for only GreatGrandparent
                            getGreatGrandParentResult = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === getCurrentNodeResult[0].value["$ID"]; });
                            setGreatGrandParent(getGreatGrandParentResult[0].value);
                            setGrandParent({});
                            setParent({});
                            setChild({});
                            setGrandChild({});
                            break;
                        case 5:

                            // Setting for Grand Parent
                            getGrandParentResult = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === getCurrentNodeResult[0].value["$ID"]; });
                            setGrandParent(getGrandParentResult[0].value);
    
                            if (Object.keys(getGrandParentResult).length > 0)
                            {
                                // Setting for Great Grand Parent
                                getGreatGrandParentResult = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === getGrandParentResult[0].value["$PID"]; });
                                setGreatGrandParent(getGreatGrandParentResult[0].value);
                            }
    
                            setParent({});
                            setChild({});
                            setGrandChild({});
    
                            break;
                        case 7:
    
                            // Setting for Parent
                            getParentResult = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === getCurrentNodeResult[0].value["$ID"]; });
                            setParent(getParentResult[0].value);
    
                            if (Object.keys(getParentResult).length > 0)
                            {
                                // Setting for Grand Parent
                                getGrandParentResult = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === getParentResult[0].value["$PID"]; });
                                setGrandParent(getGrandParentResult[0].value);
                                
                                if (Object.keys(getGrandParentResult).length > 0)
                                {
                                    // Setting for Great Grand Parent
                                    getGreatGrandParentResult = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === getGrandParentResult[0].value["$PID"]; });
                                    setGreatGrandParent(getGreatGrandParentResult[0].value);
                                }
                            }
                            
                            setChild({});
                            setGrandChild({});
                            break;
                        case 9:
    
                            // Setting for Child
                            getChildResult = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === getCurrentNodeResult[0].value["$ID"]; });
                            setChild(getChildResult[0].value);
    
                            if (Object.keys(getChildResult).length > 0)
                            {
                                // Setting for Parent
                                getParentResult = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === getCurrentNodeResult[0].value["$PID"]; });
                                setParent(getParentResult[0].value);
    
                                if (Object.keys(getParentResult).length > 0)
                                {
                                    // Setting for Grand Parent
                                    getGrandParentResult = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === getParentResult[0].value["$PID"]; });
                                    setGrandParent(getGrandParentResult[0].value);
                                    
                                    if (Object.keys(getGrandParentResult).length > 0)
                                    {
                                        // Setting for Great Grand Parent
                                        getGreatGrandParentResult = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === getGrandParentResult[0].value["$PID"]; });
                                        setGreatGrandParent(getGreatGrandParentResult[0].value);
                                    }
                                }
                            }
                            
                            setGrandChild({});
                            break;
                        case 11:
                            
                            // Setting for Grand Child
                            getGrandChildResult = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === getCurrentNodeResult[0].value["$ID"]; });
                            setGrandChild(getGrandChildResult[0].value);
    
                            if (Object.keys(getGrandChildResult).length > 0)
                            {
                                // Setting for Child
                                getChildResult = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === getCurrentNodeResult[0].value["$PID"]; });
                                setChild(getChildResult[0].value);
    
                                if (Object.keys(getChildResult).length > 0)
                                {
                                    // Setting for Parent
                                    getParentResult = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === getChildResult[0].value["$PID"]; });
                                    setParent(getParentResult[0].value);
    
                                    if (Object.keys(getParentResult).length > 0)
                                    {
                                        // Setting for Grand Parent
                                        getGrandParentResult = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === getParentResult[0].value["$PID"]; });
                                        setGrandParent(getGrandParentResult[0].value);
                                        
                                        if (Object.keys(getGrandParentResult).length > 0)
                                        {
                                            // Setting for Great Grand Parent
                                            getGreatGrandParentResult = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === getGrandParentResult[0].value["$PID"]; });
                                            setGreatGrandParent(getGreatGrandParentResult[0].value);
                                        }
                                    }
                                }
                            }
                            break;
                        default:
    
                            // Setting for Grand Child
                            getGrandChildResult = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === getCurrentNodeResult[0].value["$ID"]; });
                            setGrandChild(getGrandChildResult[0].value);
    
                            if (Object.keys(getGrandChildResult).length > 0)
                            {
                                // Setting for Child
                                getChildResult = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === getCurrentNodeResult[0].value["$PID"]; });
                                setChild(getChildResult[0].value);
    
                                if (Object.keys(getChildResult).length > 0)
                                {
                                    // Setting for Parent
                                    getParentResult = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === getChildResult[0].value["$PID"]; });
                                    setParent(getParentResult[0].value);
    
                                    if (Object.keys(getParentResult).length > 0)
                                    {
                                        // Setting for Grand Parent
                                        getGrandParentResult = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === getParentResult[0].value["$PID"]; });
                                        setGrandParent(getGrandParentResult[0].value);
                                        
                                        if (Object.keys(getGrandParentResult).length > 0)
                                        {
                                            // Setting for Great Grand Parent
                                            getGreatGrandParentResult = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === getGrandParentResult[0].value["$PID"]; });
                                            setGreatGrandParent(getGreatGrandParentResult[0].value);
                                        }
                                    }
                                }
                            }
                            break;
                    }
                }
               
                
            }
        }       
    }, [currentState.selectedNodeData]);

    return (
        <div className={classes.root}>
            <>
             {currentState.selectedNodeData && currentState.selectedNodeData.$ID != null ? 
                <>
                    <Typography color="textSecondary" align="left">View & Update Properties</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}></Grid>
                        {Object.keys(jsonGreatGrandParent).length > 0 ?
                            <Grid item xs={12}>
                                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} 
                                        className={classes.accordionSection}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1bh-content"
                                                id="panel1bh-header"
                                                className={classes.accordionDetailsSection}>
                                                <Typography>{Object.keys(jsonGreatGrandParent).length > 0 ? jsonGreatGrandParent.name : "Field"} Properties</Typography>                
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {Object.keys(jsonGreatGrandParent).length > 0 ? <PropertyTree selectedJSON={jsonGreatGrandParent} /> : null}
                                            </AccordionDetails>
                                    </Accordion>
                            </Grid>
                        : null}

                        {Object.keys(jsonGrandParent).length > 0 ?
                            <Grid item xs={12}>
                                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} 
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
                        : null}

                        {Object.keys(jsonParent).length > 0 ?
                            <Grid item xs={12}>
                                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} 
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
                        : null}

                        {Object.keys(jsonChild).length > 0 ?
                            <Grid item xs={12}>
                                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} 
                                            className={classes.accordionSection}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                            className={classes.accordionDetailsSection}>
                                            <Typography>{Object.keys(jsonChild).length > 0 ? jsonChild.name : "Field"} Properties</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {Object.keys(jsonChild).length > 0 ? <PropertyTree selectedJSON={jsonChild} /> : null}
                                        </AccordionDetails>
                                    </Accordion>
                            </Grid>
                        : null}

                        {Object.keys(jsonGrandChild).length > 0 ?
                            <Grid item xs={12}>
                                    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')} 
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
                        : null}
                      </Grid>
                    </>
                  : ""}
            </>
    </div>
    )
}

export default PropertyUpdate