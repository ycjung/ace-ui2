/**
 * File : AgmipUI-pver1.0-datatool.js
 * created by/at : Yunchul Jung, Jun,2012
 */
/**
 * Function name rule
 * - top level func at js file : ex) fixContentHeight()
 * - sub level func at js file : ex) _initLayerList()
 * - func binding DOM element id : ex) search_contents()
 */
 
/**
 * data in data tool which comes from searched result
 */
// dataset of data cart
var	datacartFeaturesObj;
function _getNewDatacartFeaturesObj(){
	var	newdatacartFeaturesObj = {
		"type": "FeatureCollection",
		"features": []	
	};
	return newdatacartFeaturesObj;
}
// init data cart
function resetDatacart(){
	datacartFeaturesObj = _getNewDatacartFeaturesObj();
}
// not used
function addToDatacart(feature){
	datacartFeaturesObj.features.push(feature);
}
// add items from seached feature list to data cart
function _addDataToDatacartObject(datakeyarray){
	var itemcount = 0;	
	var item;
	var sitem;
	var isExist = false;
	var srcData;
	for(var i=0;i<datakeyarray.length;i++){
		item = datakeyarray[i];
		//duplication check in target
		for(var j=0;j<datacartFeaturesObj.features.length;j++){
			sitem = datacartFeaturesObj.features[j].properties.datakey;
			if(item == sitem) {
				isExist = true;
				break;
			}
		}
		//add data
		if(!isExist){
			srcData = _getFeaturesFromSelectedObj(item);
			if(srcData != NaN){
				datacartFeaturesObj.features.push(srcData);
				itemcount++;
			}
		}
	}
	return itemcount;
} 
// remove items from data cart
function _removeDataFromDatacartObject(datakey){
	var sitem;
	for(var j=0;j<datacartFeaturesObj.features.length;j++){
		sitem = datacartFeaturesObj.features[j].properties.datakey;
		if(datakey == sitem) {
			datacartFeaturesObj.features.splice(j,1);
			break;
		}
	}
}

function downloaddata(){
    //alert('data export called');
    var exportQuery = {'datakey':[],'model':[]};
    var datakeys = [];
    $('#datacart_items_chkbox').find(':input').each(function(){
            switch(this.type){
                    case 'checkbox': 
                            if($(this).is(':checked')){
                                    var chkboxId = $(this).attr('id');//ex) itemDatakey+'_li_chkbox'
                                    var datakey = _getDatakeyFromDatacartChkboxID(chkboxId);
                                    datakeys.push(datakey);
                            }
            }	
    });

    var itemnumber = datakeys.length;
    
    // datakey check   
    if(itemnumber>0){
            //alert('found export items : ' + itemnumber);
            for(var ii=0; ii<itemnumber; ii++){
                exportQuery.datakey.push(datakeys[ii]);
            }
    }else{
        alert('Select data first at left list, and try again.');
        return;
    }
    
    // model check
    var chk_apsim = $('#export-apsim').is(':checked');
    var chk_aquacrop = $('#export-aquacrop').is(':checked');
    var chk_stics = $('#export-stics').is(':checked');
    var chk_dssat = $('#export-dssat').is(':checked');
    var chk_wofost = $('#export-wofost').is(':checked');
    
    if( chk_apsim || chk_aquacrop || chk_stics || chk_dssat || chk_wofost ){
        if(chk_apsim) exportQuery.model.push('APSIM');
        if(chk_aquacrop) exportQuery.model.push('AquaCrop');
        if(chk_stics) exportQuery.model.push('STICS');
        if(chk_dssat) exportQuery.model.push('DSSAT');
        if(chk_wofost) exportQuery.model.push('WOFOST');

    }else{
        alert('Select model formats for exporting data, and try again.');
        return;
    }
    
    // send message to server
    _exportData(exportQuery);
    
    
}
/**
 * display
 */
// display
var dcRightHeader = 'dcRightHeader';
var dcLeftHeader = 'dcLeftHeader';
function displayDatacartItems(data){

	if(data.features.length == 0){
		//left header
		$('<li>')
			.hide()
			.attr('style','height:25px')
			.append($('<h3 />', {
				text: '#'
				//style:'height:15px'
			}))
			.appendTo('#datacart_items_chkbox')
			.show();
		$('<li>')
			.hide()
			.attr('style','height:25px')
			.append($('<h3 />', {
				//style:'height:15px',
				text: 'Your cart holds 0 datasets.'
			}))
			.appendTo('#datacart_items')
			.show();
	}else{
		//left header
		$('<li>')
			.hide()
			.attr('style','height:25px')
			.attr('id', dcLeftHeader)
			.append($('<h3 />', {
				text: '#'
				//style:'height:25px'
			}))
			.appendTo('#datacart_items_chkbox')
			.show();
		//right header	
		$('<li>')
			.hide()
			.attr('style','height:25px')
			.attr('id', dcRightHeader)
			.append($('<h2 />', {
				//style:'height:25px',
				text: 'Your cart holds '+data.features.length+' datasets.'
			}))
			.appendTo('#datacart_items')
			.show();	
		// for each row of item	
		$.each(data.features, function(i) {			
			var place = this;

			var lonlatsrc = new OpenLayers.LonLat(place.geometry.coordinates[0],
					place.geometry.coordinates[1]);
			var lonlattrans = lonlatsrc.transform(toProjection,fromProjection);//(place.lng, place.lat);

			var itemdatakey = place.properties.datakey;
			var dcleftLidId = _getDatacartLeftLidID(itemdatakey);//ex) itemDatakey+'_li_dcart'
			var dcchkboxId = _getDatacartLeftLidChkboxID(itemdatakey);//ex) itemDatakey+'_li_dcart_chkbox'
			var dcrightLidId = _getDatacartRightLidID(itemdatakey);//ex) itemDatakey+'_li_dcart_content'
	
			//left checkboxs
			$('<li>')
				.hide()
				.attr('style','height:115px')
				.attr('id', dcleftLidId)					
				.append($('<input />', {
					type: 'checkbox',
					id: dcchkboxId
				}))
				.appendTo('#datacart_items_chkbox')
				.show();
			//right items	
			$('<li>')
				.hide()
				.attr('id', dcrightLidId)
				.attr('style','height:115px')
				.append($('<h2 />', {
					text: '['+(i+1)+'] '+place.properties.datakey
				}))
				.append($('<p />', {
					html: '<b>' + '- Country :' + '</b> ' + place.properties.Country
				}))
				.append($('<p />', {
					html: '<b>' + '- City :' + '</b> ' + place.properties.City
				}))
				.append($('<p />', {
					html: '<b>' + '- Lon / Lat :' + '</b> ' + new Number(lonlattrans.lon).toFixed(2)
							+'&nbsp;&nbsp;/&nbsp;&nbsp;'+ new Number(lonlattrans.lat).toFixed(2)									
				}))
				.append($('<p />', {
					html: '<b>' + '- Crop :' + '</b> ' + place.properties.Crop
				}))	
				.append($('<p />', {
					html: '<b>' + '- Planting/Harvesting Year :' + '</b> ' + place.properties.PlantingYear +' / '+ place.properties.HarvestYear
				}))						
				.appendTo('#datacart_items')
				.click(function() {
					displayDataContent(itemdatakey);
				/*
					$.mobile.changePage('#mappage');
					var lonlatsrc1 = new OpenLayers.LonLat(lonlattrans.lon,lonlattrans.lat);
					map.setCenter(lonlatsrc1.transform(fromProjection,toProjection), 10);
					*/
				})
				.show();
		});
	}
	//alert('1-3-1');	
	$("#datacart_items_chkbox").listview("refresh", true);
	//alert('1-3-2');	
	$("#datacart_items").listview("refresh", true);
	//alert('1-4');	
	//$.mobile.pageLoading(true);
	//alert('1-5');	
} 
// top row of data cart
function displayDataCartTopRow(){
	$('<li>')
		.hide()
		.attr('style','height:25px')
		.attr('id', dcLeftHeader)
		.append($('<h3 />', {
			text: '#'
		}))
		.appendTo('#datacart_items_chkbox')
		.show();	
	$('<li>')
		.hide()
		.attr('style','height:25px;margin:10px 10px 10px 10px;')
		.append($('<h4 />', {
			text: 'Your cart holds 0 datasets.'
			//style:'margin:10px 10px 10px 10px;height:30px;' 
		}))
		.appendTo('#datacart_items')
		.show();		
}  
// clear contents in forms
function clearQueueList(){
	$('#datacart_items_chkbox').empty();
	$('#datacart_items').empty();
	$('#datacart_contentview').empty();
}
// show data detail when item is clicked
function displayDataContent(datakey){
	$('#datacart_contentview').empty();
	$('<li>')
		.hide()
		.attr('style','height:380px;')
		.append($('<h4 />', {
			text: '  - Data description : ['+datakey+']'
		}))
		.appendTo('#datacart_contentview')
		.show();		
}  
// update data cart list by add queue func at search page
function updateDatacartList(){
	clearQueueList();
	displayDatacartItems(datacartFeaturesObj);
}
// update map
function updateDataCartItem(){
	_updateDataCartPlot(datacartFeaturesObj);
	
	updateDataCartListHeader();
}
function updateDataCartListHeader(){
	$('#'+dcLeftHeader)
		.html('<h3 valign=middle>#</h3>')

	$('#'+dcRightHeader)
		.html('<h3 valign=middle>Your cart holds '+datacartFeaturesObj.features.length+' datasets.</h3>')

}
/**
 * data item control functions
 */
function select_all_items_in_queue(){
	$('#datacart_items_chkbox').find(':input').each(function(){
		switch(this.type){
			case 'checkbox': 
				$(this).attr('checked', true);
		}	
	});
}
function reset_queue_item_selection(){
	$('#datacart_items_chkbox').find(':input').each(function(){
		switch(this.type){
			case 'checkbox': 
				$(this).attr('checked', false);
		}	
	});
}
function remove_selected_items(){
	$('#datacart_items_chkbox').find(':input').each(function(){
		switch(this.type){
			case 'checkbox': 
				if($(this).is(':checked')){	
					var chkboxId = $(this).attr('id');//ex) itemDatakey+'_li_dcart_chkbox'
					var datakey = _getDatakeyFromDatacartChkboxID(chkboxId);
					var leftLidId = _getDatacartLeftLidID(datakey);	
					var rightLidId = _getDatacartRightLidID(datakey);
					//remove row
					$('#'+leftLidId).remove();//remove li of checkbox
					$('#'+rightLidId).remove();//remove li of item		
					//remove data
					_removeDataFromDatacartObject(datakey);
				}
		}	
	});	
	$('#datacart_contentview').empty();
	updateDataCartListHeader();
}
function remove_all_items(){
	$('#datacart_items_chkbox').find(':input').each(function(){
		switch(this.type){
			case 'checkbox': 
				{	
					var chkboxId = $(this).attr('id');//ex) itemDatakey+'_li_dcart_chkbox'
					var datakey = _getDatakeyFromDatacartChkboxID(chkboxId);
					var leftLidId = _getDatacartLeftLidID(datakey);	
					var rightLidId = _getDatacartRightLidID(datakey);
					//remove row
					$('#'+leftLidId).remove();//remove li of checkbox
					$('#'+rightLidId).remove();//remove li of item	
					//remove data
					_removeDataFromDatacartObject(datakey);
				}
		}	
	});
	$('#datacart_contentview').empty();
	updateDataCartListHeader();
}



