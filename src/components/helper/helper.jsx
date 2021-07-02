export const validateJson = (jsonData) => {
    let message = ""
    try {
        JSON.parse(jsonData)
        return [true, message];
    } catch (error) {
        message = error.message;
        return [false, message];
    }
}

export const convertToJson = function(obj) {

    // Generate a random value structured as a GUID
    var guid = function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }  
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };
  
    // Check if a value is an object
    var isObject = function(value) {
        return (typeof value === 'object');
    }
    
    // Check if an object is an array
    var isArray = function(obj) {
        return (Object.prototype.toString.call(obj) === '[object Array]');
    }
    
    var setParent = function(o, key, parentid){
        o["$ID"] = guid();
        if(!parentid)
        {
              parentid = o["$ID"]
        }
        o["$PID"] = parentid;
        parentid = o["$ID"];
        
          for(var n in o){
              
              if (isObject(o[n]) && (! isArray(o))) {
                setParent(o[n],key,parentid);
              }
              if(isObject(o[n]) && (isArray(o[n])))
              {
                var objchild = o[n];
                  for(var i = 0; i < objchild.length; i++) {
                    var obj = objchild[i];
                    setParent(obj,key,parentid);
                  }
              }
          }
      return o;
    }
  
    return setParent(obj, "$ID", "ROOT");    
  }
  
  // Check if a value is an object
  export const RemoveParentId = function(o,id,pid) {
      
    // Check if a value is an object
    var isObject = function(value) {
      return (typeof value === 'object');
    }
      
    // Check if an object is an array
    var isArray = function(obj) {
      return (Object.prototype.toString.call(obj) === '[object Array]');
    }
    
    delete o[id];
    delete o[pid];
    
    for(var n in o){
        if (isObject(o[n]) && (! isArray(o))) {
            RemoveParentId(o[n],id,pid)
        }
  
        if(isObject(o[n]) && (isArray(o[n])))
        {
            var objchild = o[n];
                for(var i = 0; i < objchild.length; i++) {
                var obj = objchild[i];
                    RemoveParentId(obj,id,pid)
            }
        }
    } 
    
    return o;
  }

  export const searchObject = function (object, matchCallback, currentPath, result, searched) {
    currentPath = currentPath || '';
    result = result || [];
    searched = searched || [];
    if (searched.indexOf(object) !== -1 && object === Object(object)) {
        return;
    }
    searched.push(object);
    if (matchCallback(object)) {
        result.push({path: currentPath, value: object});
    }
    try {
        if (object === Object(object)) {
            for (var property in object) {
                if (property.indexOf("$") !== 0) {
                   searchObject(object[property], matchCallback, currentPath + "." + property, result, searched);
                }
            }
        }
    }
    catch (e) {
        throw e;
    }
    return result;
}

export const uuidv4 = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
}

export const handleSaveToPC = jsonData => {
    let newDate = new Date();
    jsonData.version = '1.0.0';
    const fileData = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = "json- " + newDate.toLocaleString() + ".json";
    link.href = url;
    link.click();
}