/** 
 * functions communicating with REST service
 * - created by Yunchul Jung
 * - created at Jul-27, 2012
 **/

// the root URL for the RESTful services
//var rootURL = "http://api.agmip.org/resources";//not correct one
var rootURL = "http://localhost:8080/AgMIPWebService/webresources/ACE";//testing server
var isConnectedToWebServer = false;

function isConnected(){
    $.ajax({
        type: 'GET',
        url: rootURL,
        dataType: "html",
        success: function(data){
            //alert('System runs on Online Mode');
            isConnectedToWebServer = true;
        },
        error: function(jqXHR, textStatus, errorThrown){
            //alert('System runs on Local mode');
            isConnectedToWebServer = false;
        }
    });
}

// cache data from server for initializing UI contents
var cacheData;

/**
 * design for retrieving data from server
 * 1. when opening UI, 
 * - getCache() : get cache of meta data from server : what size will it be?
 * - cacheToMemory() : transform (or copy) cache data to 
 *                      var features (defined at ..-raw-data.js at ln:22)
 * - getCountryList() : get from memory
 * - getCropList() : get from memory
 * 
 * 2. activity : search
 * - get searching data from memory
 * - copy them to var selectedFeaturesObj (same structure with memory)
 * - list and map shows the searched data
 * 
 * 3. activity : download
 * - need to specify
 *  
 */

// get cache data from server
function getCache(){
    
    /** need to complete
    $.ajax({
        type: 'GET',
        url: rrotURL,
        dataType: "json",
        success: cacheToMap
    });
    */
}

// gereate 'features' json string (memory variable) from cache
function cacheToMemory(){
    // need to implement
}

function _exportData(query){
    /*
    var query = {"datakey":[], "model":[]};
    query.datakey.push('Sahelian_Center_Niger');
    query.datakey.push('TILLABERY_');
    query.model.push('APSIM');
    query.model.push('AquaCrop');
    query.model.push('DSSAT');
    query.model.push('STICS');
    query.model.push('WOFOST');
    */
    
    var squery = JSON.stringify(query);
    //var squery = JSON.parse(query);
    //var squery = eval('(' + query + ')');
    //alert(squery);
    $.ajax({
        type: 'GET',
        //url: rootURL,
        url: encodeURI(rootURL+'/data/download/'+squery),
        contentType: 'application/json',
        dataType: "json",
        //success: createCountryCombo,
        success: function(data){            
            var list = data == null ? [] : (data instanceof Array ? data : [data]);
            alert('success test : '+list[0]);
        },
        error: function(jqXHR, textStatus, errorThrown){
            alalert('error : '+textStatus+'/'+jqXHR+'/'+errorThrown);
        }
    });
}

function _sendSearch(query){
    //var query = {"country":"Niger", "lon":"", "lat":"", "crop":"", "plantyear":"", "harvestyear":""};
    var squery = JSON.stringify(query);
    //alert(squery);
    $.ajax({
        type: 'GET',
        //url: rootURL,
        url: encodeURI(rootURL+'/search/data/'+squery),
        contentType: 'application/json',
        dataType: "json",
        //success: createCountryCombo,
        success: function(data){
            //alert('success test : ');
            var list = data == null ? [] : (data instanceof Array ? data : [data]);
            //alert('result :'+data);
            //selectedFeaturesObj = data[0];
            $.each(list, function(index, feature){                
                selectedFeaturesObj.features.push(eval('('+feature+')'));
            });
            _initFeatureLonLatData(selectedFeaturesObj);
            _updatePlot(selectedFeaturesObj);
            _clearSearchResults();
            displaySearchItems(selectedFeaturesObj);
            //alert(selectedFeaturesObj.features);
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert('error : '+textStatus+'/'+jqXHR+'/'+errorThrown);
        }
    });    
}

function createCountryCombo(){        
    $.ajax({
        type: 'GET',
        url: rootURL+'/search/'+'country',
        dataType: "json",
        success: function(data){
            //alert('create coutnry combobox');
            var list = data == null ? [] : (data instanceof Array ? data : [data]);
            countryItemList = list;
            //for(var ii=0; ii<list.length; ii++){
            //    countryItemList.push(list[ii]);
            //}
            for(var i=0;i<countryItemList.length;i++){
                //alert('item : '+countryItemList[i].toString());
		$('<option>'+countryItemList[i].toString()+'</option>').appendTo('#country');
            }
            //alert('country :'+data[0]+'/'+data[1]+'/'+data[2]);
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert('error : '+textStatus+'/'+jqXHR+'/'+errorThrown);
        }
    });    
}

function createCropCombo(){        
    $.ajax({
        type: 'GET',
        url: rootURL+'/search/'+'crop',
        dataType: "json",
        success: function(data){
            //alert('create crop combobox');
            var list = data == null ? [] : (data instanceof Array ? data : [data]);
            cropItemList = list;
            for(var i=0;i<cropItemList.length;i++){
		var key = cropItemList[i].toString();
		$('<option value=\''+key+'\'>'+getCropName(key)+'</option>').appendTo('#crop');
            }
            //alert('crop : '+data[0]+'/'+data[1]);
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert('error : '+textStatus+'/'+jqXHR+'/'+errorThrown);
        }
    });    
}