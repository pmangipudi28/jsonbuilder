import React from 'react'
import {useState} from "react";

import { AppBar, Toolbar, Grid, Badge, IconButton, Tooltip, Paper } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core'
import { MuiThemeProvider } from "@material-ui/core/styles";
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import SortRoundedIcon from '@material-ui/icons/SortRounded';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import NodeUpdate from './NodeUpdate';

import { jsonBuilderTheme } from '../themes/JsonBuilderTheme';

const useStyles = makeStyles({
    root: {
        width: '100%',
        backgroundColor: jsonBuilderTheme.palette.propertyTreeRoot.main,
        minHeight:"50px"
    },
    paper: {
        marginRight: jsonBuilderTheme.spacing(0),
        width: 'auto',
        minHeight: "200px",
        backgroundColor: jsonBuilderTheme.palette.editorPaper.main
    },
    textbox: {
        backgroundColor: jsonBuilderTheme.palette.textboxPropertyTree.main,
        disableRipple: true        
    },
    file: {
        display: 'none'
    },
    searchInput: {
        opacity: '0.6',
        padding: '0px 8px',
        fontSize: '0.8rem',
        '&:hover': {
            backgroundColor: jsonBuilderTheme.palette.searchInputPropertyTree.main
        },
        '& .MuiSvgIcon-root' : {
            marginLeft: '5px'
        }
    },
    disableSave : {
        cursor: 'not-allowed',
        pointerEvents: 'none'
    },
    search: {
        position: 'relative',
        borderRadius: jsonBuilderTheme.shape.borderRadius,
        backgroundColor: fade(jsonBuilderTheme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(jsonBuilderTheme.palette.common.white, 0.25),
        },
        marginRight: jsonBuilderTheme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [jsonBuilderTheme.breakpoints.up('sm')]: {
          marginLeft: jsonBuilderTheme.spacing(3),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: jsonBuilderTheme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: jsonBuilderTheme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${jsonBuilderTheme.spacing(4)}px)`,
        transition: jsonBuilderTheme.transitions.create('width'),
        width: '100%',
        [jsonBuilderTheme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
      customWidth: {
        width: '100%',
      }
})

function PropertyTree({selectedJSON}) {

    const classes = useStyles();    
    const [expand, setExpand] = useState(true);
    const [searchTerm, setSearchTerm] = useState();

    //for Sort 
    
    const [sortJSON, setSortJSON] = useState(true);
    const [sortDirection, setSortDirection] = useState("");

    const handleExpand = () => {
        if (expand === false){
            setExpand(!expand);
        }else if (expand === true){
            setExpand(false);
        }
    }
    const sortBykey = direction => {
        
        
        if (sortJSON === true)
        {            
            setSortDirection("Ascending");
            setSortJSON(false);
        } 
        else if (sortJSON === false) 
        {
            setSortJSON(true);
            setSortDirection("Descending");
        }        
    };

    const searchData = e => {  
        setSearchTerm(e.target.value);
    }
    
    return (
        <MuiThemeProvider theme={jsonBuilderTheme}>
        <div className={classes.customWidth}>
            <Paper variant="elevation" className={classes.paper}>
                <AppBar position="static" fontSize="small" className = {classes.root}>
                    <Toolbar>                            
                        <Grid container alignItems="center">
                            
                            <Grid item>                                
                            <IconButton className={classes.editorButton} onClick={handleExpand}>
                                {expand ? 
                                    <Badge>
                                        <Tooltip title="Expand All fields">
                                        <ExpandLessRoundedIcon style={{ color: "white" }} fontSize="small" />
                                        </Tooltip>
                                    </Badge>
                                    :
                                    <Badge>
                                            <Tooltip title="Collapse All fields">
                                                <ExpandMoreRoundedIcon style={{ color: "white" }} fontSize="small" />
                                                
                                            </Tooltip>
                                    </Badge>
                                }
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <Tooltip title={sortDirection} >
                                    <IconButton onClick={() => sortBykey({sortJSON})}>
                                        {sortJSON ?
                                            <Badge>
                                                <SortRoundedIcon style={{ color: "white" }} fontSize="small" />
                                            </Badge>
                                        :
                                            <Badge>
                                                <SortRoundedIcon className={classes.unsortedIcon} style={{ color: "white" }} fontSize="small" />
                                            </Badge>
                                        }
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            {/* <Grid item>
                                <Tooltip title="Filter Contents">
                                    <IconButton>
                                        <Badge>
                                            <FilterListRoundedIcon style={{ color: "white" }} fontSize="small" />
                                        </Badge>
                                    </IconButton>
                                </Tooltip>
                            </Grid> */}
                            {/* <Grid item>
                                <Tooltip title="Reset Sort Contents" >
                                    <IconButton onClick= {() => sortBykey(undefined)}>
                                            <Badge>
                                                <RefreshIcon style={{ color: "white" }} fontSize="small" />
                                            </Badge>
                                    </IconButton>
                                </Tooltip>
                            </Grid> */}
                                                        
                            
                            <Grid item sm></Grid>
                            <Grid item sm>
                                <div className={classes.search}>
                                    <Tooltip title="Search fields and values">
                                        <>
                                            <div className={classes.searchIcon}>
                                                <SearchIcon />
                                            </div>
                                            <InputBase
                                                placeholder="Search fields and values"
                                                classes={{
                                                    root: classes.inputRoot,
                                                    input: classes.inputInput,
                                                }}
                                                inputProps={{ 'aria-label': 'search' }}
                                                onChange={searchData}
                                            />
                                        </>
                                    </Tooltip>
                                </div>                                    
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Grid container alignItems="center">
                    <Grid item xs={12}>
                        <>
                            <NodeUpdate data={selectedJSON} length={Object.keys(selectedJSON).length} expand={expand} searchTerm={searchTerm} sortDirection={sortDirection}></NodeUpdate>
                        </>
                    </Grid>
                </Grid>
            </Paper>
        </div>
        </MuiThemeProvider>
    )
    
}

export default PropertyTree
