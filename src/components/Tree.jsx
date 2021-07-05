import React from "react";
import {useState, useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
import { simplify, desimplify } from 'simplifr';

import { Tooltip, Collapse, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import { convertToJson, RemoveParentId, searchObject, validateJson, uuidv4 } from '../components/helper/helper';

import { fetch_json_success, selected_node_json, remove_object_json, add_object_json } from '../actions'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    padding: `0px ${theme.spacing(3)}px`,
  },  
  listItem: {
    padding: 0,
  },
  listItemText: {
    flex: "0 1 auto",
  },
  body1: {
    fontWeight: "bold",
  },
  listIcon: {
    minWidth: "unset",
    color: "#ff6464",
  },
  paper: {    
    borderColor: "E7EFEB !important",
    backgroundColor: 'transparent'    
  },
  paper2: {    
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  bold: {
    fontWeight: 600
  },
  selectedNode: {
    color: 'blue',
    [theme.breakpoints.down(1000)]: {
      fontSize: '11px'
    },
  },
  treeList:{
    [theme.breakpoints.down(1000)]: {
      '& span': { fontSize: '15px'}
    },
  },
  treeIcon:{
    [theme.breakpoints.down(1000)]: {
      fontSize: '20px'
    },
  },
  treeCollapse: {
    paddingLeft: "30px",
    [theme.breakpoints.down(1000)]: {
      paddingLeft: "15px",
    },
  },
  editedNode: {
    color: 'red'
  }  
}));

const ShowNodes = ({ data, parentName }) => { 
  return (   
    <Tree
      key={Math.random()}
      data={data}
      parentName={parentName}
    />
  );
};

export default function Tree({
  data,
  length,
  parentName = "Root: []",
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [json, setJson] = useState({});
  const [appear, setAppear] = useState(false);
  const [jsonData, setJsonData] = useState({});
  const [selectedID, setSelectedID] = useState("");

  const currentState = useSelector(state => state.jsonReducer.present);

  const handleClick = () => { 

    // if (parentName.includes(data.name))
    // {
    //   setOpen(true)
    //   setAppear(!appear)
    // }
    // else
    // {
    //   setOpen(false)
    //   setAppear(!appear)
    // }

    setOpen(!open);
    setAppear(!appear);
  };

  const editNode = () => {    
    setSelectedID(data.$ID);    
    dispatch(selected_node_json(eval(JSON.parse(JSON.stringify(data)))));
  }

  // Check if a value is an object
  var isObject = function(value) {
    return (typeof value === 'object');
  }

  // Check if an object is an array
  var isArray = function(obj) {
      return (Object.prototype.toString.call(obj) === '[object Array]');
  }

  const addNode = () => {
    
    let getPathResult = "";
    let objectPath = "";
    var jsonNodeToAdd = "";
    var breakMap = {};
    var foundChildObjects = false;

    for (var node in data) {
        
        if(isObject(data[node]) && (isArray(data[node])))
        {
          if (data[node][0] && Object.keys(data[node][0]).length > 0)
          {
            jsonNodeToAdd = data[node][0];

            getPathResult = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === jsonNodeToAdd.$ID; });
            
            if (getPathResult != null && getPathResult.length > 0)
            {
                objectPath = getPathResult[0].path.substr(0, getPathResult[0].path.lastIndexOf("."));
                
                getPath(objectPath, jsonNodeToAdd, "ArrayObject");
                foundChildObjects = true;
                break;
            }
          }
          else
          {            
            var jsonNodeToAdd = {"name": "New Field", "id": uuidv4().toString()};

            getPathResult = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === data.$ID; });
              
            if (getPathResult != null && getPathResult.length > 0)
            {
                objectPath = getPathResult[0].path;

                getPath(objectPath + "." + node, jsonNodeToAdd, "ArrayObject");
                throw breakMap;
            }
            break;
          } 
        }
      }

      if (foundChildObjects === false)
      {
        jsonNodeToAdd = data;
        getPathResult = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === data.$ID; });
          
        if (getPathResult != null && getPathResult.length > 0)
        {
            objectPath = getPathResult[0].path;
            
            getPath(objectPath, getPathResult[0].value, "Object");
            throw breakMap;
        }
      }  
  }

  const getPath = (jsonPath, nodeData, typeOfObject) => {
    const jsonData = simplify(currentState.jsonData);

    if (jsonPath != null && jsonPath.length > 0)
    {
        nodeData["name"] = "New Object - " + uuidv4().toString();
        // run dispatch method in jsonReducer to add the node
        addJSON(jsonData, jsonPath, nodeData, typeOfObject);
    }
  }

  const addJSON = (jsonData, path, jsonNodeToAdd, typeOfObject) => {

    let jsonUpdatedData = "";
    let getCurrentNodeResult = "";

    // Run dispatch method and get the updated JSON (of all objects)
    let jsonNode = RemoveParentId(jsonNodeToAdd, "$ID", "$PID");

    jsonUpdatedData = dispatch(add_object_json(jsonData, path, jsonNode, typeOfObject));

    let updatedJSONData = desimplify(jsonUpdatedData.payload);

    updatedJSONData = dispatch(fetch_json_success(updatedJSONData));

    if (Object.keys(updatedJSONData).length > 0) 
    {
      getCurrentNodeResult = searchObject(updatedJSONData, function (value) { return value !== null && value !== undefined && value.name === jsonNode.name; });

      if (Object.keys(getCurrentNodeResult).length > 0) 
      {
        dispatch(selected_node_json(eval(JSON.parse(JSON.stringify(getCurrentNodeResult[0].value)))));
      }
    }
  }

  const removeNode = () => {
    
    const getPathResult = searchObject(currentState.jsonData, function (value) { return value !== null && value !== undefined && value.$ID === data.$ID; });
    const jsonData = simplify(currentState.jsonData);
    
    if (getPathResult != null && getPathResult.length > 0)
    {
        removeJSON(jsonData, getPathResult[0].path);
    }
  }

  const removeJSON = (jsonData, path) => {
    dispatch(remove_object_json(jsonData, path));
  }

  useEffect(() => {
    setJson(currentState.jsonData);
    setJsonData(currentState.jsonData);
  }, [currentState.jsonData]);
  
  return (
    <>
      {data && (
        <ListItem
          button
          onClick={handleClick}
          classes={{ root: classes.listItem }}
          onMouseOver={() => setAppear(true)}
          onMouseLeave={() => setAppear(false)}
        >
          <ListItemIcon
            key={Math.random() * 10}
            classes={{ root: classes.listIcon }}>
              {open ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
          </ListItemIcon> 
          {/* appear ? classes.selectedNode : null,  */}
          <ListItemText key={Math.random() * 10} className={appear ? classes.selectedNode : null}>
            <b>
              {parentName}
            </b>
          </ListItemText>
                <>
                      {appear ?
                          <>
                              {parentName === "Root: []" ? 
                                <>
                                  <Tooltip title="Add child node">
                                      <AddCircleOutlineRoundedIcon onClick={addNode} fontSize="small" />                                   
                                  </Tooltip>
                                </>
                                  : 
                                <>
                                  <Tooltip title="Edit node">
                                        <EditTwoToneIcon onClick={editNode} fontSize="small" />
                                      </Tooltip>
                                  <Tooltip title="Add child node">
                                        <AddCircleOutlineRoundedIcon onClick={addNode} fontSize="small" />
                                        
                                  </Tooltip>
                                  <Tooltip title="Remove node">
                                        <CancelTwoToneIcon onClick={removeNode} fontSize="small" />
                                  </Tooltip>
                                </>
                              }
                              
                          </>
                        : ""
                      }
                </>
        </ListItem>
      )}
      
      <Collapse
        in={true}
        timeout="auto"
        unmountOnExit
        style={{ paddingLeft: "30px" }}
      >
        <List component="div" style={{ padding: 0 }}>
          {
            Object.keys(data).map((k, i) => {
              return data[k] != null && 
              typeof [k] === "object"  ?
                        (Array.isArray(data[k]) ? 
                            <> 
                                {Array.from(data[k]).map((item, index) => (
                                  <>
                                    {data[k][index]["id"] && 
                                        <ShowNodes data={data[k][index]} parentName={data[k][index]["id"] ? data[k][index]["name"] +  " - " + data[k][index]["id"] : " "} />
                                    }
                                  </>
                                ))}
                            </>
                          : 
                          ""
                        ) : ""
          })}
        </List>
      </Collapse>
    </>
  );
}