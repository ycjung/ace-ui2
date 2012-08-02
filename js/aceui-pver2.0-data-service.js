/** 
 * functions communicating with REST service
 * - created by Yunchul Jung
 * - created at Jul-27, 2012
 **/

// the root URL for the RESTful services
var rootURL = "http://api.agmip.org/resources";//not correct one

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

