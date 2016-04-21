app.factory('arrayEvaluation', function () {

	return {
    	containsObject: function (obj,listObject,property) {
		    var x;
		    for (x in listObject) {
		        if (listObject.hasOwnProperty(x) && listObject[x][property] === obj[property]) 
		            return true;
		    }
		    return false;
		},
		containsObjectWithArrayParameters: function (obj,listObject,properties) {
		    var x;
		    var same_properties = true;
		    for (x in listObject) {        
		    		same_properties = true;
		        	angular.forEach(properties,function(property,iterator){
		        			same_properties = same_properties && (listObject[x][property] === obj[property]);	
		        	}); 
		        	if(same_properties)
		        		return true;
		    }
		    return false;
		},
		getIndexObject : function(obj,listObject,property){
		    var x;
		    for (x in listObject) {
		        if (listObject.hasOwnProperty(x) && listObject[x][property] === obj[property]) {
		            return x;
		        }
		    }
		    return -1;
		}
	}
});