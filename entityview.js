/**
 *  EntityView - draws a graphical summary of PDB and UniProtKB relationships for a single UniProtKB sequence. 
 * 
 *  @author Andreas Prlic
 *  @date 2012 July
 */
//the main storage of the information on the page

/** A No args constructor. Needs to call setParent and loadUniprot from the user side
 * 
 */
function EntityView() { with(this)
	{

	initClass();
	$(window).resize(function() {
		$(parent).css('overflow','hidden');
		$(parent).css('width','auto');
		//$(parent).removeAttr('css');
		updateScale();
		repaint();
	});
	}
}


	/** construct new EntityView which is hooked up with a div for display 
	 * 
	 */
	function EntityView(parentDiv, uniprotId) { with(this)
		{
		this.initClass();
		setParentDiv(parentDiv);
		loadUniprot(uniprotId);

		$(window).resize(function() {
			$(parent).css('overflow','hidden');
			$(parent).css('width','auto');
			updateScale();
			repaint();
		});

		}
	}


	/** Initialize the internals
	 * 
	 */
	EntityView.prototype.initClass = function() { with(this){

		$.ajaxSetup({timeout: 20000 });
		
		this.colorDict = {};
		
		this.data = {};
		this.pdbsitestore = {};
		this.version = "2012-11-21";
		
		// THESE ARE THE PARAMETERS OF THE VIEW
		
		this.textLeft     = 20;
		this.leftBorder   = 130;
		this.bottomBorder = 15;
		this.height = 15;
		this.trackHeight = 10 ;
		this.trackHeightCharts = 20 ;
		this.rightBorder = 50;

		this.maxTracksSingleMode = 10;
		this.maxTextSize = 10;
		this.scale = -1;

		this.y = 0;

		this.showCondensed = true;

		this.colorBy     = "Alignment Length";

		this.defaultSort = "Alignment Length";

		this.showSeqres = true;
		this.singlePDBmode = false;
		this.displayPDB = "";

		this.contentDiv = "#content";
		this.dialogDiv  = "#dialog";
		this.scrollBarDiv = "#svgScrollBar";

		this.jmolPresent = false;
		this.jmol  = new Object();
		this.currentJmolPDB = "";
		
		this.bw_colors    = [{"color":"#f0f0f0","darkercolor":"#c0c0c0","lightercolor":"#ffffff","textcolor":"black"},
		                  {"color":"#d9d9d9","darkercolor":"#aeaeae","lightercolor":"#ffffff","textcolor":"black"},
		                  {"color":"#bdbdbd","darkercolor":"#979797","lightercolor":"#ffffff","textcolor":"black"},
		                  {"color":"#969696","darkercolor":"#787878","lightercolor":"#ffffff","textcolor":"black"},
		                  {"color":"#737373","darkercolor":"#5c5c5c","lightercolor":"#c4c4c4","textcolor":"white"},
		                  {"color":"#525252","darkercolor":"#424242","lightercolor":"#8b8b8b","textcolor":"white"},
		                  {"color":"#252525","darkercolor":"#1e1e1e","lightercolor":"#3f3f3f","textcolor":"white"}];
		
		this.paired_colors  = [{"color":"#a6cee3","darkercolor":"#85a5b6","lightercolor":"#ffffff","textcolor":"black"},
		                  {"color":"#1f78b4","darkercolor":"#196090","lightercolor":"#35ccff","textcolor":"white"},
		                  {"color":"#b2df8a","darkercolor":"#8eb26e","lightercolor":"#ffffeb","textcolor":"black"},
		                  {"color":"#33a02c","darkercolor":"#298023","lightercolor":"#57ff4b","textcolor":"black"},
		                  {"color":"#fb9a99","darkercolor":"#c97b7a","lightercolor":"#ffffff","textcolor":"black"},
		                  {"color":"#e31a1c","darkercolor":"#b61516","lightercolor":"#ff2c30","textcolor":"black"},
		                  {"color":"#fdbf6f","darkercolor":"#ca9959","lightercolor":"#ffffbd","textcolor":"black"},
		                  {"color":"#ff7f00","darkercolor":"#cc6600","lightercolor":"#ffd800","textcolor":"black"},
		                  {"color":"#cab2d6","darkercolor":"#a28eab","lightercolor":"#ffffff","textcolor":"black"},
		                  {"color":"#6a3d9a","darkercolor":"#55317b","lightercolor":"#b468ff","textcolor":"white"}];
				
		this.redblue_colors = [{"color": "#d73027","darkercolor": "#ac261f","lightercolor": "#ff5242","textcolor": "white"},
		                  {"color": "#f46d43","darkercolor": "#c35736","lightercolor": "#ffb972", "textcolor": "black"},
		                  {"color": "#abd9e9","darkercolor": "#89aeba","lightercolor": "#ffffff", "textcolor": "black"},
		                  {"color": "#74add1","darkercolor": "#5d8aa7","lightercolor": "#c5ffff", "textcolor": "black"}];
		
		this.domain_colors = [ {"color":"#ff7f00","darkercolor":"#cc6600","lightercolor":"#ffd800","textcolor":"black"}
		                  ];
		
		this.redblue_colors = this.redblue_colors.reverse();
		this.loadedCallback = function(){};
		this.updatingPDBSites = false;
		this.masterURL = "/pdb/protein/";
		console.log("*** Protein Feature View V." + this.version + " ***");
	}};


	EntityView.prototype.loadUniprot = function(uniprotId){with(this){
		this.uniprotID = uniprotId;

		if ( typeof uniprotId == 'undefined' ){
			return;
		}
 
		var url = masterURL+uniprotID+"?type=json";

		if (singlePDBmode ) {
			url +=  "&display=" + displayPDB; 
		}
		//console.log(singlePDBmode + " " + url);
		
		$.getJSON(url , function(json) {
			setData(json);

			$( parent ).svg();
			var svg = $( parent ).svg('get');
			drawInitial(svg);
			registerEvents();
			
			// notify that a uniprot ID got loaded...
			if(typeof loadedCallback == 'function'){
				loadedCallback.call(this,uniprotId, json);
			}
		});
		
		

	}};
	
	EntityView.prototype.setLoadedCallback = function(callback){
		if(typeof callback == 'function'){
			this.loadedCallback = callback;
		}
	};

	EntityView.prototype.registerEvents = function(){with(this) {

		$( parent ).bind('click',
				function (path) {

			var g = path.target.parentNode;
			var id = g.id;

			if ( id.indexOf('pfam') > -1){

				var pfampos = id.substring(4,id.length);
				if ( pfampos != 'track')
					
					showPfamDialog(data.pfam.tracks[pfampos]);

			} else if ( id.indexOf('seq') > -1){

				showSequenceDialog();

			} else if ( id >= 0) {
				var track = data.tracks[id];

				showDialog(track);

			}

		});

		//var mini =  getMinScale() ;

		//alert(mini);
		$(scrollBarDiv).slider({			
			orientation: "horizontal",
			range: "min",
			min:0,
			max:100,
			value:0,
			animate: true
		});

		$(scrollBarDiv).bind('slidechange', jQuery.proxy( this, 'scollValueChanged' ));
		//$(scrollBarDiv).bind('slide', jQuery.proxy( this, 'scollValueChanged' ));


	}};



	EntityView.prototype.scollValueChanged = function(event, ui){with(this) {
		var viewPercent = ui.value;
		//alert(viewPercent);


		var minScale =  getMinScale() ;

		var maxScale = maxTextSize;

		var tmpMax = maxScale - minScale;

		// the user wants X percent to be visible

		//var hundredPerc = maxTextSize * sequence.length  ;

		var newScale = minScale +  tmpMax *(viewPercent/100.0) ;

		setScale(newScale);
		repaint();
	}};
	
	
	/** set the URL to load the main data from. Can be used to specify a remote server.
	 * 
	 * @param url
	 */
	EntityView.prototype.setMasterURL = function(url){
		this.masterURL = url;
	};
	
	/** Configure which tracks to display. The passed parameter should be a JSON object of this style (that's just an example):
	 * 
	 * var tracks = [ {	'name':'pdbsites',
			                    	'url':'/pdb/protein/'+uniprotID+'?type=json&track=pdbsites&display=' + displayPDB  
			          },
					  {	'name':'SCOP',
					                'url':'/pdb/protein/'+uniprotID+'?type=json&track=scop&display=' + displayPDB 
					  }] ;
	 *  
	 * Note: if you get this configuration wrong, This won't work correctly...  
	 * 
	 * See also setDefaultTracks();
	 * @param tracks
	 */
	EntityView.prototype.setTracks= function (tracks) {
		this.asyncTracks = tracks;
	};

	/** Sets the tracks to be displayed to the default, that is used at the RCSB PDB site
	 * 
	 */
	EntityView.prototype.setDefaultTracks = function(){with(this){
		// single PDB mode does not show externl annotations
		if ( singlePDBmode) {
			this.asyncTracks = [{	'name':'pdbsites',
			                    	'url':'/pdb/protein/'+uniprotID+'?type=json&track=pdbsites&display=' + displayPDB  
			                    },
			                    {	'name':'SCOP',
					                'url':'/pdb/protein/'+uniprotID+'?type=json&track=scop&display=' + displayPDB 
					            }
			                    	];
		} else {
			this.asyncTracks = [ {	'name':'pfam',
			                    	'url':'/pdb/protein/'+uniprotID+'?type=json&track=pfam' },{	
			                    	'name':'pmp',
			                    	'url':'/pdb/protein/'+uniprotID+'?type=json&track=pmp' },{
			                    	'name':'hydropathy',
			                    	'url':'/pdb/protein/'+uniprotID+'?type=json&track=hydropathy'},  {
			                    	'name':'Disorder',
			                    	'url':'/pdb/protein/'+uniprotID+'?type=json&track=jronn' }, {
			                    	'name':'SCOP',
				                    'url':'/pdb/protein/'+uniprotID+'?type=json&track=scop' } 	
			                    ];
		}
	}};
	
	EntityView.prototype.setData = function(json){with(this){
		this.data = json;
		this.data.colors = this.paired_colors;


		// trigger async loads...
		if ( typeof this.asyncTracks == 'undefined') {
			this.setDefaultTracks();
		}


		for ( var i =0 ; i < asyncTracks.length ; i++){
			var track = asyncTracks[i];

			var url = track.url;
			//alert(url);
			loadURLAsync(url);
		}

	}};
	
	EntityView.prototype.loadURLAsync = function(url){
		var that = this;
		console.log("requesting " + url);
		jQuery.ajax({ 
			url: url, 
			dataType: "json", 
			type: "GET", 
			cache: true, 	
			context: that,
			success: function(json){
										
				if ( typeof json.pfam != 'undefined') {				
					this.data.pfam = json.pfam;
					console.log("got pfam response");
				} else if (typeof json.externalTracks != 'undefined') {
					this.data.externalTracks = json.externalTracks;
					console.log("got PMP response");
				} else if (typeof json.pdbsites != 'undefined') {
					//alert(JSON.stringify(json));
					this.data.pdbsites = json.pdbsites;
					this.updatingPDBSites = false;
					console.log("got PDB sites response for " + json.pdbID);
					this.pdbsitestore[json.pdbID] = json.pdbsites;
				}else if (typeof json.hydropathy != 'undefined') {
					//alert(JSON.stringify(json));
					this.data.hydropathy_max = json.hydropathy.hydropathy_max;
					this.data.hydropathy_min = json.hydropathy.hydropathy_min;
					this.data.hydropathy = json.hydropathy;
					console.log("got hydropathy response");
				} else if (typeof json.jronn != 'undefined') {
					//alert(JSON.stringify(json));
					this.data.jronn_max = json.jronn.jronn_max;
					this.data.jronn_min = json.jronn.jronn_min;
					this.data.jronn = json.jronn;
					console.log("got jronn response");
				} else if ( typeof json.scop != 'undefined') {
					this.data.scop = json.scop;
					console.log("got scop response");
				}
			
				this.repaint();
			},
			error: function(jqXHR, textStatus, errorThrown){
				
				console.log("ajax error: status code: " + jqXHR.status);
				
				 if (jqXHR.status === 0) {
					 	console.log('Not connected. \n Verify Network.');
		            } else if (jqXHR.status == 404) {
		            	console.log('Requested page not found. [404]');
		            } else if (jqXHR.status == 500) {
		            	console.log('Internal Server Error [500].');
		            } else if (exception === 'parsererror') {
		            	console.log('Requested JSON parse failed.');
		            } else if (exception === 'timeout') {
		            	console.log('Time out error.');
		            } else if (exception === 'abort') {
		            	console.log('Ajax request aborted.');
		            } else {
		            	console.log('Uncaught Error.\n' + jqXHR.responseText);
		            }
				
				
				console.log('error during ajax request: ' + errorThrown);
				console.log('textstatus: ' + textStatus);
				console.log(jqXHR.responseText);
			}
		});
		
	};
		
	
	
	EntityView.prototype.getUniprotID = function(){
		return data.uniprotID;
	};

	/** Switch to the display of a single PDB ID
	 * 
	 * @param pdbId
	 */
	EntityView.prototype.showPDB = function(pdbId){with(this){
		if ( typeof pdbId != 'undefined'){
			this.singlePDBmode = true;
			this.displayPDB = pdbId;
			this.showCondensed = false;
		}
	}};

	/** Toggle the display of all PDB ids or the restriction to only one
	 * 
	 * @param flag
	 */
	EntityView.prototype.showAll = function(flag){with(this){
		singlePDBmode = flag;
	}};

	EntityView.prototype.setSizeDiv = function(sizeDivName){with(this){
		contentDiv = sizeDivName;
	}};

	EntityView.prototype.setDialogDiv = function(dialogD){with(this){
		dialogDiv = dialogD;
	}};
	EntityView.prototype.setScrollBarDiv = function(scrollBarD){with(this){
		scrollBarDiv = scrollBarD;
	}};

	EntityView.prototype.setParentDiv = function(parentDiv){with(this){
		this.outerParent = parentDiv;

		var myInnerDiv = $("<div>");
		$(outerParent).append(myInnerDiv);

		this.parent = myInnerDiv;


	}};
	EntityView.prototype.getSVGWrapper = function(){with(this){
		return parent.svg('get');
	}};
	EntityView.prototype.reloadData=function(){with(this){
		var pal = "";

		if(typeof data.paletteName != 'undefined') {
			pal = "&palette=" + data.paletteName;
		}

		var url = "/pdb/protein/"+this.uniprotID+"?type=json" + pal ;

		$.getJSON(url, function(json) {
			data = json;
			repaint();
		});

	}};

	EntityView.prototype.reset = function(){with(this){
		$("#uniprotsubheader").html("");

		var svg = $(parent ).svg('get');

		if(typeof svg == 'undefined')
			return;

		svg.clear();
		data = new Object();
		hideColorLegend();
	}};

	EntityView.prototype.repaint = function(){with(this){

		//alert($(parent).width());

		if ( typeof parent == 'undefined')
			return;
		
		$("#uniprotsubheader").html("");

		var svg = $(parent ).svg('get');

		if(typeof svg == 'undefined')
			return;

		svg.clear();		

		drawInitial(svg);

		resetSize(svg,(data.length) * scale + leftBorder  + rightBorder ,y + bottomBorder);

		//hideColorLegend();

	}};

	EntityView.prototype.showDialog=function(track){with(this){

		if ( typeof track == 'undefined'){
			return;
		}

		
		var pdbID   = track.pdbID;
		var desc    = track.desc;
		var chainID = track.chainID;
		
		if ( typeof pageTracker != 'undefined')
			pageTracker._trackEvent('ProteinFeatureView', 'showPDBDialog', desc );		
		var html = "" ;
		
		if ( jmolPresent ) 
			html += "<br/><a href=\" javascript:window.location = '/pdb/explore/explore.do?structureId='"+pdbID+"\">Show " + pdbID + " Structure Summary Page</a>";
			
		html += "<span><img width='240' src='/pdb/images/"+pdbID.toLowerCase()+"_bio_r_250.jpg?getBest=true' /></span>";
		
		$(dialogDiv).html(html);
			
		$(dialogDiv).dialog({
			title: 'Load in Jsmol ' + pdbID + ' - ' + desc,
			height:420, 
			width: 280,
			modal: true,
			buttons: { 
				"OK": function() { $(this).dialog("close"); entityView.load3DChain(pdbID, chainID); },
				"Cancel": function() { $(this).dialog("close"); } 
			}
		});
	}};


	EntityView.prototype.showSequenceDialog = function(){ with(this){

		//$(dialogDiv).attr('title', data.uniprotID );
		if ( typeof pageTracker != 'undefined')
			pageTracker._trackEvent('ProteinFeatureView', 'showSequenceDialog', data.uniprotID );
		var html = "";
		if ( singlePDBmode ){
			html ="<h3>" + data.uniprotID +"-" + data.name+"</h3>" ;
			html +="Show All <a href='/pdb/protein/" + data.uniprotID+"'>PDB-UniProtKB mappings</a> that are available for " + data.uniprotID ; 

		} else {

			html = "<ul><li><a href='/pdb/search/smartSubquery.do?smartSearchSubtype=UpAccessionIdQuery&accessionIdList=" + 
			data.uniprotID+"'>Show All PDB chains</a> that are linked to UniProtKB ID <b>" + data.uniprotID +"</b> - " + data.name +  " ?</li>" +
			" <li>View UniProtKB record for <a href=\"http://www.uniprot.org/uniprot/"+data.uniprotID+"\" "+
			" target=\"_new\">"+data.uniprotID+
			"<span class='iconSet-main icon-external'> &nbsp;</span></a></li>" ;
			html+="</ul>";

		}

		$(dialogDiv).html(html);

		$(dialogDiv).dialog({
			title: data.uniprotID + " - " + data.name,
			height:300, 
			width: 300,
			modal: true,
			buttons: { 
				//"OK": function() { $(this).dialog("close"); window.location = url ;},
				"Cancel": function() { $(this).dialog("close"); } 
			}
		});
	}};

	EntityView.prototype.showPfamDialog = function(pfam){with(this){
		var pfamId = pfam.acc;
		var desc = pfam.desc;
		//$(dialogDiv).attr('title', pfamId + ' - '  + pfam.name);
		if ( typeof pageTracker != 'undefined')
			pageTracker._trackEvent('ProteinFeatureView', 'showPfamDialog', pfamId );
		
		
		var html = "<h3> " + desc +  "</h3>"+
		"<ul><li>Go to Pfam site for <a href=\"http://pfam.sanger.ac.uk/family/"+pfamId+"\""+
		" target=\"_new\">" + pfamId+
		"<span class='iconSet-main icon-external'> &nbsp;</span> </a></li>" ;

		html += "<li>Find <a href='/pdb/search/smartSubquery.do?smartSearchSubtype=PfamIdQuery&amp;pfamID="+pfamId+"'>other PDB entries with the same Pfam domain</a></li>";
		html += "</ul>";

		$(dialogDiv).html(html);
		$(dialogDiv).dialog({
			title: pfamId + " - " + pfam.name,
			height:300, 
			width: 300,
			modal: true,
			buttons: { 
				//"OK": function() { $(this).dialog("close"); window.location = '/pdb/search/smartSubquery.do?smartSearchSubtype=PfamIdQuery&pfamID='+pfam.acc ;},
				"Cancel": function() { $(this).dialog("close"); } 
			}
		});
	}};

	/** Set the zoom level. Can be either "View whole" or "Maximum zoom"
	 * 
	 * @param zoom
	 */
	EntityView.prototype.setZoomLevel = function(zoom){with(this){

		//console.log($('#sequencezoom').val() + " ?? " + zoom);

		if ( zoom.indexOf("whole") != -1) {

			updateScale();			

		} else {
			$(scrollBarDiv).slider( "value" , 100);

			setScale(maxTextSize);				
		}

		repaint();
	}};


	EntityView.prototype.getPreferredWidth = function(){with(this){
		var availWidth =  $(contentDiv).width() - leftBorder - rightBorder ;

		var visibleWidth = $(window).width() - $('#leftMenu').width() - leftBorder -  rightBorder;

		if ( availWidth > visibleWidth) {	
			availWidth =  visibleWidth;
		}
		return availWidth;
	}};

	EntityView.prototype.getMinScale = function(){with(this){
		var availWidth = getPreferredWidth();

		//$(window).width() - $('#leftMenu').width() - leftBorder -  rightBorder;
		return availWidth / ( sequence.length );
	}};

	/** Update the scale to the default scale - currently to show the whole sequence in the available space
	 * 
	 */
	EntityView.prototype.updateScale = function(){with(this){
		if(typeof sequence !== "undefined") {
		var availWidth = getPreferredWidth();

		var newScale = (availWidth ) / (sequence.length );

		$(scrollBarDiv).slider( "value" , 0);
		$(parent).css('overflow','auto');
		$(parent).css('width',$(outerParent).width());

		setScale(newScale);
		}
	}};

	/** Set the scale of the current display. The value is the amount of space given for rendering one amino acid.
	 * 
	 * @param aaWidth - width of one amino acid
	 */
	EntityView.prototype.setScale = function(aaWidth){with(this){

		if ( aaWidth > maxTextSize)
			aaWidth = maxTextSize;

		scale = aaWidth;

		var svg = $(parent).svg('get');

	}};


	/** Reset the size of the SVG object
	 * 
	 * @param svg
	 * @param width
	 * @param height
	 */
	EntityView.prototype.resetSize = function(svg, width, height) {

		svg.configure({width: width || $(svg._container).width(),
			height: height || $(svg._container).height()});

		
	};


	/** Do the actual drawing
	 * 
	 */
	EntityView.prototype.drawInitial = function(svg) {with(this){

		if ( typeof data.uniprotID == 'undefined') {
			alert('Did not find a UniProt ID! ' + JSON.stringify(data));
			return;
		}

		
		console.log("drawInitial " + data.uniprotID);
		//alert("drawInitial " + data.uniprotID);

		sequence = new Object();	
		sequence.length = data.length;
		sequence.name=data.uniprotID;

		var desc = data.desc;

		
		

		var header = "<h1>Protein Feature View - " + data.uniprotID;
		
		if ( typeof (data.name != 'undefined')) {
			header += ' (' + data.name + ')';
		}
		
		if (typeof desc != 'undefined') {
			header += " - " + desc ;
		}
				
		header += "</h1>";
		
		//$('#uniprotheader').html(header);

		
		filterTracks();

		$('#linktouniprot').attr("href","http://www.uniprot.org/uniprot/" + data.uniprotID)
		.attr("title","link to uniprot web site " + data.uniprotID)
		.html(data.uniprotID + " <span class='iconSet-main icon-external' title='Link to UniProtKB entry. Up-to-date UniProt Ids are provided by the SIFTS project (http://www.ebi.ac.uk/pdbe/docs/sifts)'> &nbsp;</span>");

		$('#searchinpdb').attr("href","/pdb/search/smart.do?smartComparator=and&smartSearchSubtype_0=UpAccessionIdQuery&target=Current&accessionIdList_0=" + data.uniprotID)
		.attr("title","Find all matching PDB IDs for" + data.uniprotID)
		.html("Search PDB");



		$('#uniprotLength > span').html(data.length);
		$('#uniprotSpecies > span').html(data.species);

		//colors = data.colors;
		var tmpColors = new Array();
		tmpColors.push(paired_colors[0]);
		tmpColors.push(paired_colors[1]);
		tmpColors.push(paired_colors[8]);
		tmpColors.push(paired_colors[9]);
		var colors = tmpColors;
		if ( scale < 0)
			updateScale();


		y = height;

		if ( ! singlePDBmode) {
			y = drawRuler(svg,sequence,y);
		}

		var uniprotTopY = y;
		
		y = drawSequence(svg,sequence,y);
				
		y = drawUniprotFeatures(svg,y);
			
		y = drawUPSites(svg,y);
		
		var uniprotBottomY = y;

		if ( ! singlePDBmode){
			
			// 70 is the minimum space to render "uniprotkb"
		
			if  ( uniprotBottomY - uniprotTopY < 70) {
				y =  ( y - uniprotTopY) + 70 ;
				uniprotBottomY = y;
					
			}
		}
		
	
		
		drawSourceIndication(svg,'UniProtKB',uniprotTopY, uniprotBottomY);

		
		if ( ! singlePDBmode ) {
			
			var pfamTopY = y;
			y = drawPfam(svg,y);
			
			var pfamY = y;
			
			if ( pfamY - pfamTopY < 40) {
				pfamY = (pfamTopY + 40);
				y = pfamY;
			}
			
			
			drawSourceIndication(svg,'Pfam',pfamTopY, pfamY);
		}
		
		
		var domainTop = y;
		
		y = drawSCOP(svg,sequence,y);
		
		drawSourceIndication(svg,'Domains',domainTop, y);
		
		
		
		var algoTop = y;
		
		y = drawJronn(svg,sequence,y);

		y = drawHydropathy(svg,sequence,y);
		
		y = drawSignalP(svg,sequence,y);
		
		drawSourceIndication(svg,'Calculated',algoTop, y);
		
		var pdbTopY = y;

		y = drawPDBSites(svg,y);

		y = drawPDBSecstruc(svg,y);

		if ( (! showCondensed) &&  ( ! singlePDBmode )) {
			// add a spacer ;
			y+= trackHeight;
			drawSourceIndication(svg,'PDB',pdbTopY, y);
			y = drawCollapseCondensedSymbol(svg,y);
			pdbTopY = y;
		}



		sortTracks(defaultSort);

		var counter = 0;
		var colorPos = -1;

		var checkedTracks = new Array();
		for ( var i = 0 ; i< data.tracks.length ; i++){
			var track = data.tracks[i];
			if ( track == null)
				continue;
			checkedTracks.push(track);
		}

		data.tracks = checkedTracks;

		for ( var i = 0 ; i< data.tracks.length ; i++){
			var track = data.tracks[i];

			if ( singlePDBmode) {
				//alert(track.pdbID + " " + displayPDB);
				if ( track.pdbID !=  displayPDB )
					continue;
				if ( counter > maxTracksSingleMode)
					continue;
			} else  if ( showCondensed) {

				if ( ! track.bestInCluster)
					continue;
			}
			counter++;

			colorPos++;

			if ( colorPos >= colors.length){
				colorPos = 0;
			}


			var colorData = getTrackColor(colors, colorPos, track); 

			track.color= colorData.color;
			track.lightercolor = colorData.lightercolor;

			y= drawTrack(svg, track,y,i);
		}
		
		var pdbBottomY = y;

		drawSourceIndication(svg,'PDB',pdbTopY, pdbBottomY);

		var title = "Showing a representative subset of PDB matches. Click for more ";
		
		var callback = function(){
			if ( typeof pageTracker != 'undefined')
				pageTracker._trackEvent('ProteinFeatureView', 'showCondensedView', 'true' );
			setShowCondensed(false); $('#showCondensed').text("Show Condensed View"); } ;
				
		var totalTracks = getTotalNrPDBTracks();
		
		if ( showCondensed && ! ( singlePDBmode ) && ( totalTracks > 1)) {
			y = drawExpandCondensedSymbol(svg,pdbBottomY, title, callback);
		} ;

		//alert(JSON.stringify(data.externalTracks.names));
		if ( ! singlePDBmode){

			//if ( data.externalTracks.names.length > 0) 
			//	y = drawSeparator(svg,y);
			
			
			var externalTopY = y;


			
			if (typeof data.externalTracks != 'undefined' && ( typeof data.externalTracks.names != 'undefined')) {

				// add a spacer..
				y += trackHeight;

				for ( var i = 0 ; i < data.externalTracks.names.length ; i++){

					var trackName = data.externalTracks.names[i];

					var origTrackName = trackName;
					
					trackName = trackName.replace(' ', '_');
					
					var tmpColors = new Array();
					tmpColors.push(paired_colors[5]);
					tmpColors.push(paired_colors[4]);


					colorPos++;

					if ( colorPos >= colors.length){
						colorPos = 0;
					}
					var trackdata = data.externalTracks[origTrackName];
					

					var trackrows = breakTrackInRows(trackdata.tracks);
				
					var url = '#' ;
					if ( trackdata.tracks.length > 0)
						url = trackdata.tracks[0].url;

					var callbackexternal = function(event){
					};
					
					 if (trackdata.label == "Homology Models from Protein Model Portal") {
							callbackexternal = function(event){
							if ( typeof pageTracker != 'undefined')
								pageTracker._trackEvent('ProteinFeatureView', 'showPMPDialog', data.uniprotID );	
								
							var html = "<h3>" + this.desc +"</h3>";
							
							html+="<li>View all <a href='" + url + "' target='_new'>Homology Models at the Protein Model Portal</a></li>";
							html +="</ul>";
							
							
							$(dialogDiv).html(html);
							$(dialogDiv).dialog({
								title: 'Protein Model Portal',
								height:300, 
								width: 300,
								modal: true,
								buttons: { 
									"OK": function() { $(this).dialog("close"); window.location = url ;},
									"Cancel": function() { $(this).dialog("close"); } 
								}
							});
						};
					 }
					
					//alert(trackdata.label);
					if ( trackrows.length > 0) {
					
						if (trackdata.label == "Homology Models from Protein Model Portal") {
							
							y = drawRangedTrack(svg, trackrows, y, origTrackName, trackName, tmpColors,undefined,callbackexternal, trackdata.label);
						} else {
							y = drawGenericTrack(svg, trackrows, y, trackName, trackrows[0].desc, tmpColors, url, undefined, trackdata.label);
						}
					}
				}

				
				// spacer
				y+= trackHeight;
				
				var externalBottomY = y;
				if ( externalBottomY - externalTopY < 40){
					y = externalTopY + 40;
					externalBottomY = y;
				}
				drawSourceIndication(svg,'Structural Biology Knowledge Base',externalTopY, externalBottomY);
			}
		} else {
			var title = "Click here to view more details about " + data.uniprotID;
			var callback = function(){ window.location =  "/pdb/protein/"+data.uniprotID;} ;
			y = drawExpandCondensedSymbol(svg,pdbBottomY, title, callback);
		}

		drawToolTipContainer(svg);

		resetSize(svg,(data.length) * scale + leftBorder  + rightBorder ,y + bottomBorder);

		var fullTrackCount = getTotalNrPDBTracks();

		if ( counter > 0) {
			if ( counter < fullTrackCount) {
	
				$("#clusterStats").html("Showing " + counter + " representative out of " + fullTrackCount + " PDB chains");
			} else { 
				$("#clusterStats").html("Showing all " + counter + " PDB chains");
			}
		} else {
			
			$("#clusterStats").html("Showing all PDB entries");
		}

	
	}};
	
	
	/** Returns the total number of PDB entries that match to this UniProt.
	 * 
	 */
	EntityView.prototype.getTotalNrPDBTracks = function(){ with(this){
		
		var fullTrackCount = data.tracks.length;
		if ( typeof data.backupTracks != 'undefined') {
			//alert(data.tracks.length +" " + data.backupTracks.length);
			fullTrackCount = data.backupTracks.length;
		}
		return fullTrackCount;
	}};
		
	/** draw a plus icon on the left side, that allows to expand the condensed view
	 * 
	 * @param svg
	 * @param y
	 */
	EntityView.prototype.drawExpandCondensedSymbol = function(svg,y, title, callback) { with(this){

		var color = this.paired_colors[1].darkercolor;

		var defs = svg.defs();

		var g = svg.group( {
			id:'expandCondensed'+data.uniprotID,
			fontWeight: 'bold', 
			fontSize: '10', 
			fill: 'black'});


		// a small spacer..

		for ( var i =0 ; i < 3 ; i ++) {
			svg.rect(g, (textLeft-5)  , y+1,  2 , 2,{fill: 'black'});

			y+= trackHeight/2;
		}

		// the box around the +

		var rect = svg.rect(g, textLeft-9, y ,  10  , trackHeight,
				{fill: 'white',
			//fill: color,
			stroke: color,
			strokeWidth: 2
				}); 

		//var text = svg.text(g, 0, y+trackHeight-1 , "+");  
		// hprizontal bar of +
		var rect2 = svg.rect(g, textLeft-7, y+(trackHeight/2)-1 ,  6  , 2,			
				{fill: 'black'
				}
		); 

		// vertical bar of +
		var rect3 = svg.rect(g, textLeft -5  , y+2,  2 , trackHeight-4,				
				{ fill: 'black'}
		);


		

		var mylist = new Array();

		mylist.push(rect);
		mylist.push(rect2);
		mylist.push(rect3);

		
		for ( var i = 0 ; i < mylist.length ; i++){

			var me = mylist[i];
			$(me).attr('title',title);			
			registerTooltip(me);
			$(me).bind('click',$.proxy(callback));	
		};

		return y + trackHeight *2;
	}};


	/** draw a plus icon on the left side, that allows to expand the condensed view
	 * 
	 * @param svg
	 * @param y
	 */
	EntityView.prototype.drawCollapseCondensedSymbol = function(svg,posy) { with(this){

		var color = this.paired_colors[1].darkercolor;

		var defs = svg.defs();

		var g = svg.group( {
			id:'expandCondensed'+data.uniprotID,
			fontWeight: 'bold', 
			fontSize: '10', 
			fill: 'black'}
		);


		// a small spacer..
//		y+= trackHeight;

//		svg.rect(g, (textLeft-2)/2  , y+1,  2 , 2,				
//		{fill: 'black',}
//		);

		y+= trackHeight/2;


		// the box around the -

		var rect = svg.rect(g, textLeft-9, y ,  10  , trackHeight,
				{
			fill: 'white',
			//fill: color,
			stroke: color,
			strokeWidth: 2
				}
		); 

		//var text = svg.text(g, 0, y+trackHeight-1 , "+");  
		// hprizontal bar of -
		var rect2 = svg.rect(g, textLeft-7, y+(trackHeight/2)-1 , 6, 2,			
				{fill: 'black'}
		); 

		// again spacer
		y+= trackHeight +  trackHeight/2;

//		svg.rect(g, (textLeft-2)/2  , y+1,  2 , 2,				
//		{fill: 'black',}
//		);

//		y +=  trackHeight/2;



		//var text = svg.text(g, 1, posy+trackHeight -1 , "-");  


		var title = "Currently showing all PDB matches. Click here to show only representatives.";

		var mylist = new Array();

		mylist.push(rect);
		mylist.push(rect2);
		for ( var i = 0 ; i < mylist.length ; i++){

			var me = mylist[i];

			$(me).attr('title',title);
			registerTooltip(me);
			$(me).bind('click',function(){ setShowCondensed(true); $('#showCondensed').text("Show All"); });	

		}


		return y ;
	}};

	EntityView.prototype.drawSourceIndication = function(svg, name,uniprotTopY, uniprotBottomY){ with(this){

		if (uniprotBottomY -uniprotTopY < 2 )
			return;
		
		var color = this.paired_colors[5].color;

		var shortname = name;
		if ( name.indexOf("Structural") > -1) 
			shortname = "SBKB";
		
		if ( name == 'UniProtKB') {
			color = paired_colors[2].darkercolor;
		} else if ( name == "PDB"){
			color = paired_colors[1].darkercolor;
		} else if ( name == "Pfam"){
			color = paired_colors[6].color;
		}  else if ( name == "Calculated"){
			shortname = "Calc";
			name = "Electronic annotation";
			color = 'grey';
		} else if ( name == "Domains"){
			shortname = " ";
			color = paired_colors[7].color;
		}
		
	
		
		var defs = svg.defs();

		var g = svg.group( {
			id:name+data.uniprotID,
			fontWeight: 'bold', 
			fontSize: '10', fill: 'black'}
		);


		var rect = svg.rect(g, 10, uniprotTopY ,  10  , uniprotBottomY-uniprotTopY,
				{
			//fill: 'white',
			fill: color,
			stroke: color,
			strokeWidth: 1
				}
		); 

		var title = "Data from: " + name;
		$(rect).attr('title',title);
		$(rect).bind('mouseover', function(event,ui) { popupTooltip(event,ui,$(this));});				
		$(rect).mouseout(function(event){hideTooltip();});
		
		var rotStr = "rotate(-90,"+10+","+ (uniprotBottomY-trackHeight)+")";
		var txt = svg.text(g, 0, uniprotBottomY-trackHeight, shortname,{transform: rotStr,fill:color});
		$(txt).attr('title',title);
		$(txt).bind('mouseover', function(event,ui) { popupTooltip(event,ui,$(this));});				
		$(txt).mouseout(function(event){hideTooltip();});
		

	}};

	EntityView.prototype.drawSeparator = function(svg,y){with(this){

		var g = svg.group({id:'separator',fontWeight: 'bold', fontSize: '10', fill: 'black'});
		svg.rect(g, textLeft, y + (trackHeight/4) ,  Math.round(sequence.length * scale) + leftBorder  + rightBorder  , 1,
				{
			//fill: 'white',
			fill: 'black',
			stroke: 'black',
			strokeWidth: 1
				}
		); 

		return y + trackHeight;
	}};


	EntityView.prototype.updateTrackColors = function(){with(this){
		var counter  = 0;
		var colorPos = -1;

		var colors  = data.colors;

		if ( typeof data.tracks == 'undefined')
			return;

		for ( var i = 0 ; i< data.tracks.length ; i++){

			var track = data.tracks[i];

			if ( track == null)
				continue;

			counter++;

			colorPos++;

			if ( colorPos >= colors.length){
				colorPos = 0;
			}


			var colorData = getTrackColor(colors, colorPos, track); 

			track.color= colorData.color;
			track.lightercolor = colorData.lightercolor;
		}
	}};

	EntityView.prototype.getTrackColor = function(colors, colorPos, track){with(this){

	
		//var colorMap = data.colors[colorPos];
		var colorMap = colors[colorPos];
		if ( colorBy == "Resolution") {

			//alert(colorBy + " " + track.resolution);		
			if(typeof track.resolution == 'undefined') 
				return bw_colors[6];

			var resolution = track.resolution;
			
			for ( var i = 0 ; i< (redblue_colors.length - 1) ; i++){
			
				if ( resolution < (i+1)*1000) {
					//alert("i " + i + " " + resolution);
					return redblue_colors[i];
				}
			}
			
			// last one is the max resolution...
			return redblue_colors[redblue_colors.length -1];
					
		}  else if ( colorBy == "Alignment Length") {
			// default is all in one color
			return colors[1];
		}
		// other
		return colorMap;

	}};

	EntityView.prototype.hideColorLegend = function(){
		$("#colorLegend").html("");
	};

	EntityView.prototype.changeColorSelect = function(str){ with(this){

		colorBy = str;

		if ( str == "Resolution") {
			this.hideColorLegend();
			//this.paired_colors = data.colors;
			data.colors = this.redblue_colors;  
			updateTrackColors();
			this.repaint();
			showColorLegend();

		} else {    	

			this.hideColorLegend();
			data.colors = this.paired_colors;
			this.updateTrackColors();
			this.repaint();

		}
	}};

	EntityView.prototype.setShowCondensed= function(flag){with(this){
		
		var totalTracks = getTotalNrPDBTracks();
		if ( totalTracks < 2)
			return;
		
		showCondensed = flag;

		filterTracks();

		repaint();
	}};

	/** condense the tracks for sequences that have a large number of mappings like thrombin
	 * 
	 */
	EntityView.prototype.filterTracks = function(){ with(this){
		if ( showCondensed ) {

			if ( typeof data.backupTracks == 'undefined') {
				data.backupTracks = data.tracks;
			}

			if ( data.tracks.length < data.backupTracks.length) {
				return;
				// already did filtering before...
			}

			var newTracks = new Array();

			for ( var i = 0 ; i< data.backupTracks.length ; i++){
				var track = data.backupTracks[i];
				if ( track.bestInCluster){
					newTracks.push(track);
				}
			}
			
			data.tracks = newTracks;
			//alert("new nr of tracks: " + data.tracks.length + " old size: " + data.backupTracks.length);

		} else {
			if ( typeof data.backupTracks != 'undefined') {
				data.tracks = data.backupTracks;

			}
		}
		
		checkUpdateSites4FirstTrack();
		
	}};

	EntityView.prototype.checkUpdateSites4FirstTrack = function(){
	
		if ( typeof this.data.tracks == 'undefined') 
			return;
		
		
		if ( this.data.tracks.length < 1 )
			return;
		
		var firstPDB = this.data.tracks[0].pdbID;
		
		this.updatePDBSiteTracks(firstPDB);
	};
	
	
	EntityView.prototype.updatePDBSiteTracks = function(apdbID){
		var shouldUpdatePDBSites = this.shouldUpdatePDBSites(apdbID);
	
		// check should update PDB sites?		
		if (! shouldUpdatePDBSites)
			return;
	
		if ( typeof this.pdbsitestore[apdbID] != 'undefined') {
			// we already have the loaded the requested PDB ID, so we can just re-use it...
			this.data.pdbsites = this.pdbsitestore[apdbID];
		} else {
			this.loadPDBSiteTracks(apdbID);
		}
			
	};
	
	/** Trigger a reload of PDB site tracks for a particular PDB ID...
	 * 
	 * @param pdbID
	 */
	EntityView.prototype.loadPDBSiteTracks = function(pdbID){
		console.log("loading PDB site track for  " + pdbID +  " " + this.updatingPDBSites );
		this.updatingPDBSites  = true;
		var url = masterURL + this.data.uniprotID+'?type=json&track=pdbsites&display=' + pdbID;		
		this.loadURLAsync(url);
	};
	
	/** Checks if the SITE record track for a particular PDB ID should be updated
	 * 
	 *  @param pdbID
	 */	
	EntityView.prototype.shouldUpdatePDBSites = function(pdbID){ 
		if ( this.updatingPDBSites == true)
			return false;
		
		
		if ( typeof this.data.pdbsites == 'undefined')
			return true;
		
		// get PDB ID for the tracks...
		if ( this.data.pdbsites.tracks.length < 1)
			return true;
				
		var sitePDB = this.data.pdbsites.tracks[0].pdbID;
				
		if ( pdbID == sitePDB)
			return false;
		
		return true;
	};
	
	EntityView.prototype.getShowCondensed= function(){with(this){
		return showCondensed;
	}};
	EntityView.prototype.showColorLegend = function() { with(this){
		if ( typeof data.colors == 'undefined')
			return;
		
		for (var i =0 ; i < data.colors.length -1 ; i++ ) {
			
			var color = data.colors[i];

			var colorBox = $("<div>").html("&nbsp;");
			$(colorBox).attr("class","leftBox headerExt alignmentBox11");
			$(colorBox).css("background-color",color.color);


			var colorMain = $("<div>").html( " Resolution < " + (i+1) + " &Aring;");
			$(colorMain).append(colorBox);

			$("#colorLegend").append(colorMain);
			$("#colorLegend").append("<br/>");

		}
		
		// the last color
		var color = data.colors[data.colors.length -1];
		var colorBox = $("<div>").html("&nbsp;");
		$(colorBox).attr("class","leftBox headerExt alignmentBox11");
		$(colorBox).css("background-color",color.color);


		var colorMain = $("<div>").html( " Resolution >= " + i + " &Aring;");
		$(colorMain).append(colorBox);
		$("#colorLegend").append(colorMain);
		$("#colorLegend").append("<br/>");
						
		// and the undefined...

		var colorBox = $("<div>").html("&nbsp;");
		$(colorBox).attr("class","leftBox headerExt alignmentBox11");
		$(colorBox).css("background-color", bw_colors[6].color);


		var colorMain = $("<div>").html( " no Resolution ");
		$(colorMain).append(colorBox);

		$("#colorLegend").append(colorMain);
		$("#colorLegend").append("<br/>");
	}};

	EntityView.prototype.drawPfam = function(svg,y){with(this){

		if ( typeof data.pfam == 'undefined')
			return y;
		
		if ( data.pfam.tracks.length < 1)
			return y;
		
		y += 5;

		var pfamTrackHeight = trackHeight ;

		var g = svg.group({id:'pfamTrack',fontWeight: 'bold', fontSize: '10', fill: 'black'}); 
		
		drawName(svg,g,y,"Pfam", undefined, data.pfam.label);

		for (var i = 0 ; i < data.pfam.tracks.length; i++){

			var domainOrig = data.pfam.tracks[i];

			var domain = new Object();
			domain.start = domainOrig.start -1;
			domain.end = domainOrig.end - 1;
			domain.name = domainOrig.name;
			domain.desc = domainOrig.desc;
			
			var x1 = seq2Screen(domain.start);
			var length = domain.end - domain.start +1;

//			var colorPos = i ;
//			if ( i > bw_colors.length -1 )
//			colorPos = i% bw_colors.length;


			//var color = bw_colors[colorPos];
			var color = paired_colors[6];

			var defs = svg.defs();

			var g2 = svg.group({id:'pfam'+i,fontWeight: 'bold', fontSize: '10', fill: color.textcolor});

			svg.linearGradient(defs,'pfam'+i, [['0%', color.lightercolor], ['100%', color.darkercolor]],
					0,y,0, y+ pfamTrackHeight, 
					{
				gradientUnits: 'userSpaceOnUse'

					}				
			);

			var rect = svg.rect(g2,x1, y,  length * scale, pfamTrackHeight,
					3,3,
					{
				//fill: 'white',
				fill: 'url(#pfam'+i+')',
				stroke: color.darkercolor,
				strokeWidth: 1
					}
			); 

			//$(rect).css('class','tooltip');


			var title = "Pfam Domain " + domain.name + " - " + domain.desc;

			$(rect).attr("title",title);

			//var length = tooltip.getComputedTextLength();

			var txt = svg.text(g2, x1 + scale, y+ trackHeight -1, domain.name + " - " + domain.desc);

			checkTxtLength(txt,domain.start,domain.end,domain.name);

			registerTooltip(rect);


			$(txt).attr("title","Pfam Domain " + domain.name + " - " + domain.desc);
			registerTooltip(txt);

		}

		return y +  height;
	}};


	EntityView.prototype.checkTxtLength= function(txt,start,end,fullText){ with(this){
		var tlength = txt.getComputedTextLength();

		var width = end - start +1;

		var availspace = width * scale;

		if ( tlength > availspace) {
			// resize the text!

			// width in view divided by 10 px font size
			var max = Math.floor(availspace / 8.0)  ;
			//console.log('avail space: ' + availspace +' px ' + " new max: " + max + " " + txt.getBoundingClientRect().width + " " + tlength);
			//alert("text " + domain.name + " too long! " + max );

			txt.firstChild.data = fullText.substring(0,max);

			//txt.getBoundingClientRect().width = availspace;

			//txt.setBoundingClientRect()
			//tlength = txt.getComputedTextLength();
		}
	}};

	EntityView.prototype.drawTrack = function(svg,track,y,trackID){with(this){
		if ( track == null)
			return y;

		var g = svg.group({id:trackID,fontWeight: 'bold', fontSize: '10', fill: 'black'}); 
		drawName(svg,g,y, track.pdbID + "." + track.chainID, undefined, "Track for PDB ID " + track.pdbID + " chain ID " + track.chainID);

		var color    = track.color;
		var bw_color = bw_colors[6];
		var mismatch_color = paired_colors[4];


		for ( var i = 0 ; i < track.ranges.length ; i++){
			var rangeOrig = track.ranges[i];
			
			var range = new Object();
			range.start = rangeOrig.start -1;
			range.end = rangeOrig.end - 1;
			range.observed = rangeOrig.observed;
			range.mismatch = rangeOrig.mismatch;
			

			var width = (range.end - range.start) +1 ;

			var defs = svg.defs();

			svg.linearGradient(defs,'MyGradient'+trackID +data.uniprotID, [['0%', 'white'], ['100%', color]],
					0,y,0, y+ trackHeight, 
					{ gradientUnits: 'userSpaceOnUse'}				
			);

			svg.linearGradient(defs,'BWGradient'+trackID +data.uniprotID, [['0%', 'white'], ['100%', bw_color.color]],
					0,y,0, y+ trackHeight, 
					{
				gradientUnits: 'userSpaceOnUse'

					}				
			);
			svg.linearGradient(defs,'MISMGradient'+trackID +data.uniprotID, [['0%', 'white'], ['100%', mismatch_color.color]],
					0,y,0, y+ trackHeight, 
					{
				gradientUnits: 'userSpaceOnUse'

					}				
			);

			var r1 = trackHeight / 2 -1;
			var r2 = trackHeight / 2 -1;

			if ( range.observed ) {

				if ( range.mismatch ) {

					var rect = svg.rect(g,seq2Screen( range.start), y+1,  Math.round(width * scale), trackHeight-1,						
							{
						fill: 'url(#MISMGradient'+trackID+data.uniprotID+')',
						stroke: mismatch_color.darkercolor,
						strokeWidth:1
							});

					//$(rect).css('class','.tooltip');

					var txt = " (" + rangeOrig.start;
					if ( rangeOrig.start != rangeOrig.end) {
						txt += " - " + rangeOrig.end;
					}
					txt += ")";
					
					$(rect).attr("title","Mismatch between PDB and UniProt residue" + txt);

					registerTooltip(rect);

				} else {



					var rect = svg.rect(g,seq2Screen( range.start), y,  Math.round(width * scale) , trackHeight, 
							r1,r2,
							{
						fill: 'url(#MyGradient'+trackID+data.uniprotID+')',
						stroke: color, 
						strokeWidth: 1
							});

					//$(rect).css('class','.tooltip');

					var resolution = "";
					if(typeof track.resolution != 'undefined') {
						resolution =  " - " + (track.resolution / 1000) + " " + '\u00C5';
					}		
					var d = new Date(track.releaseDate);
					$(rect).attr("title","PDB ID " + track.pdbID + " chain " + track.chainID + " - " + track.desc +  " (" + rangeOrig.start+"-"+rangeOrig.end +") "+ resolution + " - " + d.toDateString() );
					//" - " + track.clusterNr + " - " + track.clusterRank);

					registerTooltip(rect);

				}
			} else {

				// shows SEQRES that are not in ATOM records. Since this is confusing, we don;t show that..

				if (showSeqres) {
					//var rect = svg.rect(g,seq2Screen( range.start), y,  width * scale , trackHeight, 
					//		{fill: "white", stroke: 'blue', strokeWidth: 1});

					var line = svg.rect(g, seq2Screen( range.start), y + (trackHeight/4) ,  Math.round(width * scale) , (trackHeight/4) *2,  

							{ 	
						fill: 'url(#BWGradient'+trackID+data.uniprotID+')',
						stroke: bw_color.color,
						strokeWidth: 1}); 
					//$(line).css('class','.tooltip');

					$(line).attr("title","No coordinates have been determined for this region, but the sequence is recorded in the SEQRES records. ");

					registerTooltip(line);
				}
			}
		}


		return y + height;
	}};


	/** Draws Site residues.
	 * 
	 * @param svg
	 * @param track
	 * @param y
	 * @param trackID
	 * @param mycolors
	 * @param orientation - should the site-arrows point upwards or downwards? either 'up' or 'down'
	 */
	EntityView.prototype.drawSiteResidues = function (svg,feature,y,trackID, mycolors, orientation,siteTrackHeight){with(this){

		if ( typeof feature.tracks == 'undefined')
			return ;
		
		if ( feature.tracks.length < 1)
			return;

		var baseLineHeight = 3;

		var colorPos = 0;
		var g = svg.group({id:trackID,fontWeight: 'bold', fontSize: '10', fill: 'black'});
		
		// draw features base line...
		var defs = svg.defs();
		
		// color gradient of base line. Default .. UP color
		var gcolor = paired_colors[2];
		if ( feature.label == 'PDB SITES residues') {
			// PDB color...
			gcolor = paired_colors[1];
		}

		var rect1 = new Object();
		if ( orientation == 'up') {
			svg.linearGradient(defs,'sequenceSite' + trackID +data.uniprotID, [['0%', gcolor.color], ['100%', gcolor.darkercolor]],
					0,y+siteTrackHeight-baseLineHeight,0, y+ siteTrackHeight, 			
					{
				gradientUnits: 'userSpaceOnUse'

					}				
			);
			 rect1 = svg.rect(g,seq2Screen(0), y+siteTrackHeight-baseLineHeight,  sequence.length * scale, baseLineHeight,	
					4,4,
					{
				fill: 'url(#sequenceSite'+ trackID +data.uniprotID+')',
				stroke: gcolor.darkercolor,
				strokeWidth:1
					});
		} else {
			svg.linearGradient(defs,'sequenceSite' + trackID +data.uniprotID, [['0%', gcolor.color], ['100%', gcolor.darkercolor]],
					0,y, 0 , y+ baseLineHeight, 			
					{
				gradientUnits: 'userSpaceOnUse'

					}				
			);
			
			 rect1 = svg.rect(g,seq2Screen(0), y,  sequence.length * scale, baseLineHeight,	
					4,4,
					{
				fill: 'url(#sequenceSite'+trackID+data.uniprotID+')',
				stroke: gcolor.darkercolor,
				strokeWidth:1
					});
		}
		$(rect1).attr("title",feature.label + ' track for ' + feature.tracks[0].pdbID + "." + feature.tracks[0].chainID);
		$(rect1).bind('mouseover', function(event,ui) { popupTooltip(event,ui,$(this));});				
		$(rect1).mouseout(function(event){hideTooltip();});
		

		
		for ( var i =0 ; i < feature.tracks.length ; i++){
			var site = feature.tracks[i];
			if ( typeof site == 'undefined')
				continue;

			var color = colorDict[site.name];
			//alert(site.name + " " + colorMap[site.name]);
			
			if ( typeof color == 'undefined'){
				colorPos ++;
				if ( colorPos > mycolors.length -1 )
					colorPos =0;
				color = mycolors[colorPos];
				colorDict[site.name] = color;				
			} 
			

			var defs = svg.defs();

			if ( orientation == 'up') {
				svg.radialGradient(g,'siteWGradient'+i+data.uniprotID, [['0%', color.lightercolor], ['100%', color.color]],
						//0,y,0, y+ trackHeight,
						seq2Screen( site.start)-scale/2, y+baseLineHeight - 4, 4,seq2Screen( site.start)-scale/2,y+baseLineHeight -3,
						{
					gradientUnits: 'userSpaceOnUse'

						}				
				);
			} else {
				svg.radialGradient(g,'siteWGradient'+i+data.uniprotID, [['0%', color.lightercolor], ['100%', color.color]],
						//0,y,0, y+ trackHeight,
						seq2Screen( site.start)-scale/2, y+siteTrackHeight-4, 4,seq2Screen( site.start)-scale/2,y+siteTrackHeight-3,
						{
					gradientUnits: 'userSpaceOnUse'

						}				
				);
			}

			//

			var rect  = new Object();
			var circle = new Object();

			if ( orientation == 'up') {
				rect = svg.rect(g,seq2Screen( site.start)-scale/2, y+baseLineHeight,  2 , siteTrackHeight-baseLineHeight, 
						{fill: 'black'
						});
				circle = svg.circle(g,seq2Screen( site.start)-scale/2, y, 4,
						{fill: 'url(#siteWGradient'+i+data.uniprotID+')',
					stroke: color.darkerColor,
					strokeWidth:1
						});
			} else {
				rect = svg.rect(g,seq2Screen( site.start)-scale/2, y,  2 , siteTrackHeight, 
						{fill: 'black'
						});

				circle = svg.circle(g,seq2Screen( site.start)-scale/2, y+ siteTrackHeight-4, 4,
						{fill: 'url(#siteWGradient'+i+data.uniprotID+')',
					stroke: color.darkerColor,
					strokeWidth:1
						});
			}

			var title = feature.tracks[0].pdbID + "." + feature.tracks[0].chainID + ": " + site.desc + " - " + site.name + " (" + site.start+")";

			$(rect).attr("title",title);
			$(rect).bind('mouseover', function(event,ui) { popupTooltip(event,ui,$(this));});				
			$(rect).mouseout(function(event){hideTooltip();});

			$(circle).attr("title",title);
			$(circle).bind('mouseover', function(event,ui) { popupTooltip(event,ui,$(this));});				
			$(circle).mouseout(function(event){hideTooltip();});

			if ( jmolPresent){
				var str = "select " + site.pdbresnum + ":" + site.chainID + "; set display selected; color cpk; spacefill 0.5; wireframe 0.3 ; zoomto 0.2 ("+site.pdbresnum+":"+site.chainID+") 100;";

				$(circle).prop('jmol',str);

				registerTooltip(circle);

				$(circle).bind('click', function(event){
					var g = event.target;
					//var id = g.id;
					//alert(JSON.stringify(event.target));
					console.log(g.jmol);
					Jmol.script(jmol,g.jmol);
				});
			}

		}
	}};


	/** Draw the ruler, which indicated sequence positions
	 * 
	 * @param svg
	 * @param sequence
	 * @param y
	 * @returns
	 */
	EntityView.prototype.drawRuler = function (svg,sequence,y){with(this){
		var majorTickHeight = 5;
		var minorTickHeight = 2;

		svg.group(
				{fontWeight: 'bold', fontSize: '10', fill: 'black'}
		);

		//drawName(svg,g,y,"Ruler");

		svg.rect(seq2Screen(0), y,  sequence.length * scale, 1, 
				{fill: 'black'});

		var prevTick = 0;
		for ( var i = 0 ; i < sequence.length ; i ++ ){

			
				
			if ( ((i+1) % 50) == 0 && ( i - prevTick ) * scale > ((Math.log(i) / Math.log(10) + 1)*10)) {
				drawTick(svg,i,y,majorTickHeight);
				prevTick = i;
			} else if ( scale > 2) {
				if ( ((i+1) % 10) == 0) {
					drawTick(svg,i,y,minorTickHeight);
				} else if ( scale > 4) {
					if ( ((i+1) % 5) == 0) 
						svg.rect(seq2Screen(i), y,  1* scale, 4, 
								{fill: 'black'});
				} 

				if ( scale > 8) {
					svg.rect(seq2Screen(i), y,  1, 2, 
							{fill: 'black'});
				}
			} 
		}

		return y + trackHeight + 10 ;

	}};

	EntityView.prototype.drawTick = function (svg,seqpos,y,height){with(this){
		var g = svg.group(
				{fontWeight: 'normal',fontSize: 10, fill: 'black'}
		); 
		svg.text(g, seq2Screen( seqpos), y - 2 - 1, (seqpos +1)  +"");
		svg.rect(seq2Screen(seqpos), y,  1* scale, height, 
				{fill: 'black'});
	}};

//	draw DB id at beginning of line
	EntityView.prototype.drawName = function (svg,g, y, text, callbackFunction, label){with(this){

		var txt = svg.text(g, textLeft +2  , y+ trackHeight -1, text);         

		if ( typeof callbackFunction != 'undefined'){

			$(txt).css('cursor','pointer');

			$(txt).bind('click',   function(event){callbackFunction(event,text);});

		}
		
		if ( typeof label != 'undefined'){
			
			$(txt).attr("title", label);
			// label is a tooltip
			$(txt).bind('mouseover', function(event,ui) { popupTooltip(event,ui,$(this));});				
			$(txt).mouseout(function(event){hideTooltip();});
		} else {
			console.log("no label for track " + text);
		}
	}};

	EntityView.prototype.seq2Screen = function ( seqpos) {with(this){
	
		return leftBorder + Math.round(seqpos * scale) ;  
	}

	};

	/** break a track array that might contain overlapping tracks into multiple non-overlapping rows
	 * 
	 */
	EntityView.prototype.breakTrackInRows = function(tracks) {
		var rows = new Array();

		if ( tracks.length <1)
			return rows;

		// we'll have at least one row...
		var rowArr = new Array();
		rows.push(rowArr);

		var featureCount = 0;
		for ( var i = 0 ; i < tracks.length ; i++){
			var range = tracks[i];
			var lowestRow = 0;	

			for ( var j = 0 ; j < rows.length ; j++ ){
				var row = rows[j] ;
				var foundOverlap = false;	
				//alert("row " + j + " length: " + row.length);
				for ( var k = 0 ; k < row.length ; k++ ){

					featureCount++;
					var r = row[k];
					var overlap = this.getOverlap(range.start,range.end, r.start, r.end);
					//alert("overlap? " + featureCount + " " + range.desc + " " + r.desc + " : " +overlap + " | " + range.start + "-" + range.end + " | " + r.start+ "-" +r.end);
					if ( overlap > 0) {

						foundOverlap = true;
						lowestRow ++;
						break;
					}
				}

				// we went through a whole row and no overlap... let's add it here..
				if ( ! foundOverlap)					
					break;

			}
			//if (range.start == 1029 || range.start == 1023 || range.start == 980)
		//	alert("adding row " + range.desc + "  to row " + lowestRow + " " + range.start + "-" + range.end + " row length: " + rows[lowestRow].length);
			if ( rows.length < lowestRow +1) {
				var rowArr = new Array();
				rows.push(rowArr);
			}	

			// add this range to the first row where it does not overlap anything.
			rows[lowestRow].push(range);
		}

		return rows;
	};

	EntityView.prototype.drawUniprotFeatures = function(svg,y){with(this){

		if ( typeof data.chains == 'undefined')
			return y;

		var chains = data.chains;

		var rows = breakTrackInRows(chains.tracks);

		if ( rows < 1)
			return y;
		
		var up_colors = new Array();
		up_colors.push(paired_colors[2]);
		up_colors.push(paired_colors[3]);

		
		
		var callback = function(event){
			// show draw dialog..

			var txt = this.name;
			
			if ( this.name != this.desc ) {
				txt += " - " + this.desc;
			}
			
			var html = "<h3>"+txt+"</h3>"; 
			html += "<ul>";
			if ( typeof pageTracker != 'undefined')
				pageTracker._trackEvent('ProteinFeatureView', 'showUniProtDialog', txt );
			
			var seq = data.sequence.substr(this.start,(this.end-this.start+1));
			//alert(seq.length + " " + this.start+ " " + this.end+ " | " + seq);
			var url = "/pdb/search/smart.do?chainId_0=&eCutOff_0=0.001&maskLowComplexity_0=yes&searchTool_0=blast&smartComparator=and&smartSearchSubtype_0=SequenceQuery&structureId_0=&target=Current&sequence_0=";


			html += "<li>Find <a href='"+url+seq+"'>other PDB entries with this sequence motif</a></li>";
			
			if (typeof this.url != "undefined"){
				// there is a URL, show it
				
				var urllabel = this.desc;
				if ( typeof this.hits != "undefined"){
										
					urllabel = "Show " + this.hits + " PDB entries that contain " + this.desc + " from " + data.uniprotID ;
				}
				
				html+= '<li><a href="'+this.url+'">' + urllabel +'</a></li>';
			}
			
			html += "</ul>";
			$(dialogDiv).html(html);
			$(dialogDiv).dialog({
				title: txt,
				height:300, 
				width: 300,
				modal: true,
				buttons: { 
					//"OK": function() { $(this).dialog("close"); window.location = '/pdb/explore/explore.do?structureId='+pdbID ;},
					"Cancel": function() { $(this).dialog("close"); } 
				}
			});
		};

		
		y = drawGenericTrack(svg,rows,y,'Molec. Processing','chainTrack',up_colors,undefined, callback, data.chains.label);
		
		var motifs = data.motifs.tracks;

		var motifrows = breakTrackInRows(motifs);
		//alert(" motif has " + motifrows.length + " rows" + JSON.stringify(motifrows));

		y = drawGenericTrack(svg, motifrows, y, 'Motif', 'motifTrack', up_colors,undefined,callback, data.motifs.label);

		if ( typeof data.enzymeClassification != 'undefined'){

			var ecs = data.enzymeClassification.tracks;

			var ecrows = breakTrackInRows(ecs);

			var brendaurl = "http://www.brenda-enzymes.org/php/result_flat.php4?ecno=";

			var pdburl = "/pdb/search/smartSubquery.do?smartSearchSubtype=EnzymeClassificationQuery&Enzyme_Classification=";

			var callbackec = function(event){
				
				var html = "<h3>" + this.name + " - " + this.desc +"</h3>";
				html+="<ul><li>View in <a href='"+brendaurl+this.name+"' target='_new'>BRENDA</a></li>";
				html+="<li>View <a href='" + pdburl + this.name + "'>other PDB entries with the same E.C. number</a></li>";
				html +="</ul>";
				
				if ( typeof pageTracker != 'undefined')
					pageTracker._trackEvent('ProteinFeatureView', 'showECDialog', this.name );
				
				$(dialogDiv).html(html);
				$(dialogDiv).dialog({
					title: this.name + ' - ' + this.desc,
					height:300, 
					width: 300,
					modal: true,
					buttons: { 
						//"OK": function() { $(this).dialog("close"); window.location = '/pdb/explore/explore.do?structureId='+pdbID ;},
						"Cancel": function() { $(this).dialog("close"); } 
					}
				});
			};

			y = drawRangedTrack(svg, ecrows, y, 'E.C.', 'enzymeClassificationTrack', up_colors,undefined,callbackec, data.enzymeClassification.label);

		}


		return y + trackHeight;
	}};



	EntityView.prototype.drawPDBSecstruc = function(svg,y){with(this){

		var secstruc = data.secstruc;

		if ( typeof secstruc =='undefined' )
			return y;

		y = drawSecstrucTrack(svg,secstruc,y);

		return y + trackHeight;
	}};

	EntityView.prototype.drawSecstrucTrack = function(svg,trackdata,y){with(this){

		if ( typeof trackdata =='undefined' )
			return y;

		if ( typeof trackdata.tracks =='undefined' )
			return y;

		var trackName = 'Secstruc';
		var label = trackdata.label;

		var g0 = svg.group( {
			id:label+data.uniprotID,
			fontWeight: 'bold', 
			fontSize: '10', fill: 'black'}
		);

		//alert(trackdata.label);
		drawName(svg, g0, y, trackName, undefined, label);


		// draw black line in background
		var bw_color = bw_colors[0];
		svg.linearGradient(defs,'secstrucBWGradient'+data.uniprotID, [['0%', 'white'], ['100%', bw_color]],
				0,y,0, y+ trackHeight, 
				{
			gradientUnits: 'userSpaceOnUse'}				
		);

		for ( var j = 0 ; j< data.tracks.length ;j++){
			var track = data.tracks[j];
			if (  track == null)
				continue;
			for ( var i = 0 ; i < track.ranges.length ; i++){
				var rangeOrig = track.ranges[i];

				if ( ! rangeOrig.observed   ) 
					continue;
				
				var range = new Object();
				range.start = rangeOrig.start -1;
				range.end = rangeOrig.end - 1;
				
				var width = (range.end - range.start) +1 ;

				var line = svg.rect(g, seq2Screen( range.start), y + (trackHeight/4) ,  Math.round(width * scale) , (trackHeight/4) *2,  

						{ 	
					fill: 'url(#secstrucBWGradient'+data.uniprotID+')',
					stroke: bw_color.color,
					strokeWidth: 1}); 

				$(line).attr("title",'coil');

				$(line).bind('mouseover', function(event,ui) { popupTooltip(event,ui,$(this));});				
				$(line).mouseout(function(event){hideTooltip();});
				//$(line).css('cursor','pointer');
			}
		}

		for ( var i = 0 ; i < trackdata.tracks.length ; i++){
			var rangeOrig = trackdata.tracks[i];
			
			var range = new Object();
			range.start = rangeOrig.start -1;
			range.end = rangeOrig.end - 1;
			range.name = rangeOrig.name;
			range.desc = rangeOrig.desc;

			var width = (range.end - range.start) +1 ;	

			// something is off!
			// if too long, something is fishy.. 
			if ( width > 30)
				continue;
			
			if ( range.end > data.length){
				// probably a chimera protein, we can't deal with those currently
				continue;
			}
				
			var color =  bw_colors[3]; // grey

			if ( range.name == 'H' || range.name=='I'|| range.name== 'G') 
				color = paired_colors[5];
			else if ( range.name == 'E' || range.name=='B')
				color = paired_colors[6];
			else if ( range.name == 'T')
				color = paired_colors[0];


			//alert(JSON.stringify(color));
			var x1 = seq2Screen(range.start);

			var defs = svg.defs();
			svg.linearGradient(defs, trackName+'GR'+i+data.uniprotID , [['0%', color.lightercolor], ['100%', color.darkercolor]],
					0,y,0, y+ trackHeight, 
					{
				gradientUnits: 'userSpaceOnUse'

					}				
			);

			var g = svg.group( {
				id:trackName+data.uniprotID,
				fontWeight: 'bold', 
				fontSize: '10', 
				fill: color.textcolor}
			);
			
			var rect = Object();
			if ( range.name=='H' || range.name == 'G' || range.name=='I' || range.name=='E' ) {

				 rect = svg.rect(g,x1, y,  width * scale, trackHeight,	
					0,0,
						{		
					fill: 'url(#'+trackName+'GR'+i+data.uniprotID+')',
					stroke: color.darkercolor,
					strokeWidth:1
						});
			} else {
				// a smaller box (moved 1 pix to the left so an adjacent large box looks more dominant
				 rect = svg.rect(g,x1+1, y + (trackHeight/8),  width * scale, (trackHeight/8)*7,	
						0,0,
							{		
						fill: 'url(#'+trackName+'GR'+i+data.uniprotID+')',
						stroke: color.darkercolor,
						strokeWidth:1
							});
			}
			
			if ( range.name == 'H'){
				for ( var xl = x1; xl < ( seq2Screen(range.end)) ; xl+=4){
					svg.line(g, xl, y+trackHeight, xl+4, y , { fill: color.darkercolor, stroke:color.darkercolor});
					
				}
			}
			
			
			var t = range.desc;
			if ( typeof range.desc == 'undefined'){
				t = range.name;
			}
			var title =  t + " (" + rangeOrig.start+"-"+rangeOrig.end+")"  ;
			$(rect).attr('title',title);
			$(rect).bind('mouseover', function(event,ui) { popupTooltip(event,ui,$(this));});				
			$(rect).mouseout(function(event){hideTooltip();});
			//$(rect).css('cursor','pointer');

		}

		return y + trackHeight;
	}};


	/** Draws a 'ranged' track. I.e. it indicated start and stop positions
	 * 
	 * @param svg
	 * @param rows
	 * @param y
	 * @param label
	 * @param trackName
	 * @param mycolors
	 * @param url
	 * @param callbackFunction
	 * @returns
	 */
	EntityView.prototype.drawRangedTrack = function(svg,rows,y,label,trackName, mycolors, url, callbackFunction, info ){with(this){

		if ( rows.length == 0)
			return y;

		var colorPos = -1;
		var g0 = svg.group( {
			id:label+data.uniprotID,
			fontWeight: 'bold', 
			fontSize: '10', fill: 'black'}
		);

		drawName(svg, g0, y, label, undefined, info);

		for ( var j = 0 ; j < rows.length ; j ++) {

			var row = rows[j];

			for ( var i = 0 ; i < row.length ; i++){

				try {
					var rangeOrig = row[i];

					if ( typeof rangeOrig.desc == 'undefined')
						continue;

					var range = new Object();
				
					range.start = rangeOrig.start -1;
					range.end   = rangeOrig.end - 1;
					range.desc  = rangeOrig.desc;
					range.name  = rangeOrig.name;
					
					colorPos++;
					if ( colorPos > mycolors.length -1 )
						colorPos = 0;

					var color = mycolors[colorPos];
					//alert(JSON.stringify(colorPos) + " " + JSON.stringify(mycolors));
					var width = (range.end - range.start) +1 ;	

					var x1 = seq2Screen(range.start);

					var defs = svg.defs();
					svg.linearGradient(defs, trackName+'GR'+j+i+data.uniprotID , [['0%', 'white'], ['100%', color.darkercolor]],
							0,y,0, y+ trackHeight, 
							{
						gradientUnits: 'userSpaceOnUse'

							}				
					);

					var g = svg.group( {
						id:trackName+data.uniprotID,
						fontWeight: 'bold', 
						fontSize: '10', 
						fill: color.textcolor}
					);

					// draw vertical bars at start and stop:
					svg.rect(g,x1, y,  1 * scale, trackHeight,	
							1,1,
							{		
						fill: color.darkercolor,
						stroke: color.darkercolor,
						strokeWidth:1
							});

					svg.rect(g,seq2Screen(range.end), y,  1 * scale, trackHeight,	
							1,1,
							{		
						fill: color.darkercolor,
						stroke: color.darkercolor,
						strokeWidth:1
							});


					// draw horizontal connector
					var rect = svg.rect(g,x1, y + trackHeight/2 -2,  width * scale, 4,								
							{		
						fill: 'url(#'+trackName+'GR'+j+i+data.uniprotID+')',
						stroke: color.darkercolor,
						strokeWidth:1
							});

					var dispText = range.desc;
					
					if ( trackName == 'Homology_Models' ){
						dispText = "";
					}

					var txt = svg.text(g, x1 + scale, y+ trackHeight -1, dispText);

					checkTxtLength(txt,range.start,range.end,dispText);

					var title = range.name;

					title += " (" + rangeOrig.start+"-"+rangeOrig.end+")";

					if ( range.name != range.desc) 
						title += " - " + range.desc  ;

					if ( typeof range.status != 'undefined'){
						title += " - " + range.status;
					}

					$(rect).attr('title',title);
					$(rect).bind('mouseover', function(event,ui) { popupTooltip(event,ui,$(this));});				
					$(rect).mouseout(function(event){hideTooltip();});


					$(txt).attr('title',title);
					$(txt).bind('mouseover', function(event,ui) { popupTooltip(event,ui,$(this));});				
					$(txt).mouseout(function(event){hideTooltip();});


					if ( typeof url != 'undefined') {
						$(rect).css('cursor','pointer');
						$(txt).css('cursor','pointer');
						$(rect).bind('click',function(){ document.location.href = url ;});	
						$(txt).bind('click',function(){  document.location.href = url ;});
					}

					if ( typeof callbackFunction != 'undefined'){
						$(rect).css('cursor','pointer');
						$(txt).css('cursor','pointer');
						$(rect).bind('click', $.proxy(callbackFunction,range));
						$(txt).bind('click', $.proxy(callbackFunction,range));
					}



				} catch (e){
					console.log("Problem while drawing generic track: " + e);
				}
			}
			y+= trackHeight + 5;
		}
		return y;
	}};

	EntityView.prototype.drawCytoplasmic = function(y,svg,range,trackName ){with(this){
		var ydraw = y+trackHeight-2;
		var yheight = 2;
		drawTmLine(y,svg,range,trackName,ydraw,yheight);
	}};

	EntityView.prototype.drawPeriplasmic = function(y,svg,range,trackName ){with(this){
		var ydraw = y;
		var yheight = 2;
		drawTmLine(y,svg,range,trackName,ydraw,yheight);
	}};

	EntityView.prototype.drawTmLine = function(y,svg,range,trackName, ydraw, yheight ){with(this){
		//var red  = paired_colors[5];
		var blue = paired_colors[1];

		//cytoplasmic is a the bottom

		var g = svg.group( {
			id:trackName+data.uniprotID,
			fontWeight: 'bold', 
			fontSize: '10', 
			fill: 'black'}
		);

		var width = (range.end - range.start) +1 ;	

		var x1 = seq2Screen(range.start);

		var rect = svg.rect(g,x1, ydraw,  width * scale, yheight,				
				{		
			fill: blue.color,
			stroke: blue.darkercolor,
			strokeWidth:1
				});
		var txt = svg.text(g, x1 + scale, y+ trackHeight -1, range.desc);
		checkTxtLength(txt,range.start,range.end,range.desc);

		var title = range.desc+ "-" + range.name  ;
		if ( typeof range.status != 'undefined'){
			title += " - " + range.status;
		}

		//title += " " + range.start + "-" + range.end;
		$(rect).attr('title',title);
		$(rect).bind('mouseover', function(event,ui) { popupTooltip(event,ui,$(this));});				
		$(rect).mouseout(function(event){hideTooltip();});


		$(txt).attr('title',title);
		$(txt).bind('mouseover', function(event,ui) { popupTooltip(event,ui,$(this));});				
		$(txt).mouseout(function(event){hideTooltip();});
	}};

	EntityView.prototype.drawIntramembrane = function(y,svg,range,trackName ){with(this){
		//var red  = paired_colors[5];
		//var blue = paired_colors[1];
		var color = bw_colors[3];
		//var color = red;
		//cytoplasmic is a the bottom

		var g = svg.group( {
			id:trackName+data.uniprotID,
			fontWeight: 'bold', 
			fontSize: '10', 
			fill: 'black'}
		);

		var width = (range.end - range.start) +1 ;	

		var x1 = seq2Screen(range.start);


		// draw a horizontal line representing the membrane
		var rect = svg.rect(g,x1, y+trackHeight/2,  width * scale, 2,				
				{		
			fill: color.color,
			stroke: color.darkercolor,
			strokeWidth:1
				});

		// draw vertical bars at start and stop:
		 svg.rect(g,x1, y,  1 * scale, trackHeight,	
				1,1,
				{		
			fill: color.darkercolor,
			stroke: color.darkercolor,
			strokeWidth:1
				});

		svg.rect(g,seq2Screen(range.end), y,  1 * scale, trackHeight,	
				1,1,
				{		
			fill: color.darkercolor,
			stroke: color.darkercolor,
			strokeWidth:1
				});


		var txt = svg.text(g, x1 + scale, y+ trackHeight -1, range.desc);

		checkTxtLength(txt,range.start,range.end,range.desc);


		var title = range.desc+ "-" + range.name  ;
		if ( typeof range.status != 'undefined'){
			title += " - " + range.status;
		}

		//title += " " + range.start + "-" + range.end;
		$(rect).attr('title',title);
		$(rect).bind('mouseover', function(event,ui) { popupTooltip(event,ui,$(this));});				
		$(rect).mouseout(function(event){hideTooltip();});


		$(txt).attr('title',title);
		$(txt).bind('mouseover', function(event,ui) { popupTooltip(event,ui,$(this));});				
		$(txt).mouseout(function(event){hideTooltip();});
	}};

	EntityView.prototype.drawTransmembrane = function(y,svg,range,trackName ){with(this){
		
		var red  = paired_colors[5];
		//var blue = paired_colors[1];
		//var color = bw_colors[3];
		var color = red;
		//cytoplasmic is a the bottom

		var g = svg.group( {
			id:trackName+data.uniprotID,
			fontWeight: 'bold', 
			fontSize: '10', 
			fill: 'black'}
		);

		var width = (range.end - range.start) +1 ;	

		var x1 = seq2Screen(range.start);

		var defs = svg.defs();
				
		svg.linearGradient(defs, trackName+'TR'+data.uniprotID , [['0%', color.lightercolor], ['100%', color.darkercolor]],
				0,y,0, y+ trackHeight, 
				{
			gradientUnits: 'userSpaceOnUse'

				}				
		);
				
		// draw a horizontal line representing the membrane
		var rect = svg.rect(g,x1, y,  width * scale, trackHeight,				
				{		
			fill: 'url(#'+trackName+'TR'+data.uniprotID+')',
			stroke: color.darkercolor,
			strokeWidth:1
				});
		
		for ( var xl = x1; xl  < ( seq2Screen(range.end  )  ) ; xl += 4 ){
			svg.line(g, xl, y+trackHeight, xl+4, y , { fill: color.darkercolor, stroke:color.darkercolor});
		
		}
		
		var txt = svg.text(g, x1 + scale, y+ trackHeight -1, range.desc);

		checkTxtLength(txt,range.start,range.end,range.desc);


		var title = range.desc+ "-" + range.name  ;
		if ( typeof range.status != 'undefined'){
			title += " - " + range.status;
		}

		//title += " " + range.start + "-" + range.end;
		$(rect).attr('title',title);
		$(rect).bind('mouseover', function(event,ui) { popupTooltip(event,ui,$(this));});				
		$(rect).mouseout(function(event){hideTooltip();});


		$(txt).attr('title',title);
		$(txt).bind('mouseover', function(event,ui) { popupTooltip(event,ui,$(this));});				
		$(txt).mouseout(function(event){hideTooltip();});
	}};


	///
	EntityView.prototype.drawGenericTrack = function(svg,rows,y,label,trackName, mycolors, url, callbackFunction, info ){with(this){

		if ( rows.length == 0)
			return y;

		var colorPos = -1;
		var g0 = svg.group( {
			id:label+data.uniprotID,
			fontWeight: 'bold', 
			fontSize: '10', fill: 'black'}
		);

		drawName(svg, g0, y, label, undefined, info);

		for ( var j = 0 ; j < rows.length ; j ++) {

			var row = rows[j];

			for ( var i = 0 ; i < row.length ; i++){

				try {
					var range = row[i];

					// adjust for the fact that we start counting at 1
					range.start;
					range.end;
					
					if ( typeof range.desc == 'undefined')
						continue;

					if ( range.desc.indexOf('Cytoplasmic') > -1 ){
						drawCytoplasmic(y,svg,range,trackName);
						continue;
					} else if ( 
							( range.desc.indexOf('Periplasmic')   > -1 ) ||
							( range.desc.indexOf('Extracellular') > -1 ) ||
							( range.desc.indexOf('Lumenal')       > -1 )  
					)
					{
						drawPeriplasmic(y,svg,range,trackName);
						continue;
					} else if ( range.name.indexOf('transmembrane') > -1 ) {
						drawTransmembrane(y,svg,range,trackName);
						continue;
					} else if ( range.name.indexOf('intramembrane') > -1 ) {
						drawIntramembrane(y,svg,range,trackName);
						continue;
					}

					colorPos++;
					if ( colorPos > mycolors.length -1 )
						colorPos = 0;

					var color = mycolors[colorPos];

					var width = (range.end - range.start) +1 ;	

					var x1 = seq2Screen(range.start-1);

					var defs = svg.defs();
					svg.linearGradient(defs, trackName+'GR'+j+i+data.uniprotID , [['0%', 'white'], ['100%', color.darkercolor]],
							0,y,0, y+ trackHeight, 
							{
						gradientUnits: 'userSpaceOnUse'

							}				
					);

					var g = svg.group( {
						id:trackName+data.uniprotID,
						fontWeight: 'bold', 
						fontSize: '10', 
						fill: color.textcolor}
					);

					var rect = svg.rect(g,x1, y,  width * scale, trackHeight,	
							4,4,
							{		
						fill: 'url(#'+trackName+'GR'+j+i+data.uniprotID+')',
						stroke: color.darkercolor,
						strokeWidth:1
							});



					var txt = svg.text(g, x1 + scale, y+ trackHeight -1, range.desc);

					checkTxtLength(txt,range.start,range.end,range.desc);


					var title = range.desc ;
					if ( range.desc != range.name)
						title += "-" + range.name  ;
					if ( typeof range.status != 'undefined'){
						title += " - " + range.status;
					}

					//title += " " + range.start + "-" + range.end;
					$(rect).attr('title',title);
					$(rect).bind('mouseover', function(event,ui) { popupTooltip(event,ui,$(this));});				
					$(rect).mouseout(function(event){hideTooltip();});


					$(txt).attr('title',title);
					$(txt).bind('mouseover', function(event,ui) { popupTooltip(event,ui,$(this));});				
					$(txt).mouseout(function(event){hideTooltip();});


					if ( typeof url != 'undefined') {
						$(rect).css('cursor','pointer');
						$(txt).css('cursor','pointer');
						$(rect).bind('click',function(){ document.location.href = url ;});	
						$(txt).bind('click',function(){  document.location.href = url ;});
					}


					if ( typeof callbackFunction != 'undefined'){
						$(rect).css('cursor','pointer');
						$(txt).css('cursor','pointer');
						//$(rect).bind('click', function(event){callbackFunction(event,range);});	
						//$(txt).bind('click',   function(event){callbackFunction(event,range);});
						$(rect).bind('click', $.proxy(callbackFunction,range));
						$(txt).bind('click', $.proxy(callbackFunction,range));
					}

				} catch (e){
					alert("Problem while drawing generic track: " + e);
				}
			}
			y+= trackHeight + 5;
		}
		return y;
	}};
	
	EntityView.prototype.drawUPSites = function(svg,y){with(this){
	
		if ( typeof data.upsites == 'undefined')
			return y;

		if (data.upsites.tracks.length < 1 )
			return y;

		// mini space to keep distance to above.
		y+=2;
		
		var g = svg.group( {
			id:'upsitesTrackG'+data.uniprotID,
			fontWeight: 'bold', 
			fontSize: '10', fill: 'black'}
		);

		drawName(svg, g, y, 'UP Sites', undefined, data.upsites.label);
		
		var siteTrackHeight = trackHeight + 5;
		
		drawSiteResidues(svg,data.upsites,y,'upsitesTrack'  +data.uniprotID, paired_colors,'up', siteTrackHeight);
		
		return y + siteTrackHeight ;
	}};


	EntityView.prototype.drawPDBSites = function(svg,y){with(this){
		if ( typeof data.pdbsites == 'undefined')
			return y;

		if (data.pdbsites.tracks.length < 1 )
			return y;

		var g = svg.group( {
			id:'sitesTrackG'+data.uniprotID,
			fontWeight: 'bold', 
			fontSize: '10', fill: 'black'}
		);
		
		drawName(svg, g, y, 'PDB Sites', function(event, name) {
			if ( ! jmolPresent)
				return;
			//var tmp = "select " + site.pdbresnum + ":" + site.chainID + "; set display selected; color cpk; spacefill 0.5; wireframe 0.3 ;" ;

			var sel = "";			
			for ( var i = 0 ; i < data.pdbsites.tracks.length ; i++){
				var site = data.pdbsites.tracks[i];
				if ( typeof site == 'undefined')
					continue;

				sel += site.pdbresnum + ":" + site.chainID ;
				if ( i < data.pdbsites.tracks.length -1)
					sel += ", ";
			}
			
			var cmd = "select " + sel + ";set display selected; color cpk; spacefill 0.5; wireframe 0.3 ;";
						
			Jmol.script(jmol,cmd);


		}, data.pdbsites.label);

		var siteTrackHeight = trackHeight + 5;
		
		drawSiteResidues(svg,data.pdbsites,y,'sitesTrack'  +data.uniprotID, paired_colors,'down',siteTrackHeight);

		return y + siteTrackHeight + 2;
	}};

	EntityView.prototype.drawSCOP = function(svg,sequence,y){with(this){
		if ( typeof data.scop == 'undefined') {
			return y;
		}
		
		var trackrows = breakTrackInRows(data.scop.tracks);
		y = drawGenericTrack(svg,trackrows,y,'SCOP domains','scopDomains', domain_colors,undefined, undefined, data.scop.label);
		
		return y;
	}};

	EntityView.prototype.drawJronn = function(svg,sequence,y){with(this){


		if ( typeof data.jronn == 'undefined'){
			return y;
		}

		var g = svg.group(
				{fontWeight: 'bold',fontSize: 10, fill: 'black'}
		); 
		//alert(JSON.stringify(data.jronn));

		drawName(svg, g, y, 'Disorder',undefined,data.jronn.label);

		//var min = parseFloat(data.jronn_min);
		//var max = parseFloat(data.jronn_max);
		// JRONN is always between 0 and 1, can ignore the provided min and max...
		var min = 0 ;
		var max = 1;
		//var min = 0;
		//var max = 0.8;
		//alert (min + " " + max);
		var adjustedSize = parseFloat(max + Math.abs(min));

		var heightScale = (trackHeightCharts-2)  / adjustedSize;

		var red  = paired_colors[5];
		var blue = paired_colors[1];

		//alert(heightScale + " " + adjustedSize);
		for ( var s = 0 ; s < sequence.length; s++){

			var jronpos = data.jronn.tracks[s];
			if ( typeof jronpos == 'undefined') {
				//alert("jronpos undef " + s);
				continue;
			}

			var val   = Math.abs(parseFloat(jronpos.desc));			
			var score = val;

			if ( val >= 0 )
				score += Math.abs(min);

			var posHeight = Math.abs(score) * heightScale;
			// max = y;
			// 0 == trackHeight/2;
			// min = y+trackHeight;
			var col = blue.color;
			if ( val > 0.5){
				col = red.darkercolor;
			}
			
				
			var tmph =  posHeight;
			if ( tmph < 0)
				console.log(s + " score: " + score + " orig: " + jronpos.desc+ " tmph:"+ tmph + " posH: " + posHeight + " totalH:" + trackHeightCharts);
			
						
			svg.rect(seq2Screen(s), y-posHeight+trackHeightCharts-2,  1* scale+1, tmph, 
					{fill: col});

		}

		//	svg.rect(g,seq2Screen(0), y -( 0.5+min) * heightScale + trackHeightCharts,sequence.length * scale, 1,{fill: 'black'});

		return y+ trackHeightCharts;

	}};

	/** Draw the hydropathy of the sequence
	 * 
	 * @param svg
	 * @param sequence
	 * @param y
	 */
	EntityView.prototype.drawHydropathy = function(svg,sequence,y){with(this){
		if ( typeof data.hydropathy == 'undefined'){
			return y;
		}

		var red  = paired_colors[5];
		var blue = paired_colors[1];
		var g = svg.group(
				{fontWeight: 'bold',fontSize: 10, fill: 'black'}
		); 

		drawName(svg, g, y, 'Hydropathy', undefined, data.hydropathy.label);

		// this line represents a score of 0;
		svg.rect(g,seq2Screen(0),y + trackHeightCharts/2,sequence.length * scale, 1,{fill: 'black'});

		var min = parseFloat(data.hydropathy_min);
		var max = parseFloat(data.hydropathy_max);
		var adjustedSize = (max + Math.abs(min));

		var heightScale = trackHeightCharts / adjustedSize;
		//alert(heightScale + " " + adjustedSize);
		for ( var s = 0 ; s < sequence.length; s++){

			var hydro = data.hydropathy.tracks[s];
			if ( typeof hydro == 'undefined') 
				continue;
			var val = parseFloat(hydro.desc);

			var score = parseFloat(hydro.desc);
			if ( val > 0)
				score += Math.abs(min);

			var posHeight = Math.abs(score * heightScale);
			// max = y;
			// 0 == trackHeight/2;
			// min = y+trackHeight;
			if ( val < 0){
				svg.rect(seq2Screen(s), y+trackHeightCharts/2,  1* scale +1, posHeight, 
						{fill: blue.color});
			} else {
				var tmp = posHeight-trackHeightCharts/2;
				if ( tmp < 0) tmp = 0;
				svg.rect(seq2Screen(s), y-posHeight+trackHeightCharts,  1* scale+1, tmp, 
						{fill: red.color});
			}

		}

		return y+ trackHeightCharts + trackHeight/2;
	}};

	/** Draw the hydropathy of the sequence
	 * 
	 * @param svg
	 * @param sequence
	 * @param y
	 */
	EntityView.prototype.drawSignalP = function(svg,sequence,y){with(this){
		if ( typeof data.signalp == 'undefined'){
			return y;
		}
		
		
		y = drawGenericTrack(svg,data.signalp,y,'SignalP','signalP',up_colors,undefined, callback, data.signalp.label);
		
	}};
	
	
	EntityView.prototype.drawSequence = function(svg,sequence,y){with(this){

		var seqTrackHeight = trackHeight + 5;

		if ( singlePDBmode)
			seqTrackHeight -= 5;

		var g = svg.group( {
			id:'sequenceTrack'+data.uniprotID,
			fontWeight: 'bold', 
			fontSize: '10', fill: 'black'}
		);

		drawName(svg, g, y, sequence.name, undefined, "UniprotKB sequence " + sequence.name);

		var defs = svg.defs();

		svg.linearGradient(defs,'sequence'+data.uniprotID, [['0%', 'white'], ['100%', 'black']],
				0,y,0, y+ seqTrackHeight, 			
				{
			gradientUnits: 'userSpaceOnUse'

				}				
		);


		var rect = svg.rect(g,seq2Screen(0), y,  sequence.length * scale, seqTrackHeight,	
				4,4,
				{
			fill: 'url(#sequence'+data.uniprotID+')',
			stroke: 'grey',
			strokeWidth:1
				});


		var title = "UniProtKB sequence " + sequence.name + " - " + data.name + " Length: " + data.length;
		$(rect).attr('title',title);

		registerTooltip(rect);

		y += seqTrackHeight;

		if ( scale >= 8){
			// draw Sequence text

			var gs = svg.group( {
				id:'seqpos'+data.uniprotID,
				fontWeight: 'bold', 
				fontSize: '10', fill: 'black'}
			);

			for ( var s = 0 ; s < sequence.length; s++){
				var txt = svg.text(gs, seq2Screen(s) , y+ trackHeight -1, data.sequence.charAt(s));
				$(txt).attr('title', "Sequence position " + (s+1) + " - " + data.sequence.charAt(s));
				//$(rect).bind('mouseover', function(event,ui) { popupTooltip(event,ui,$(this));});				
				//$(rect).mouseout(function(event){hideTooltip();});
				registerTooltip(txt);
				//registerTooltip(rect);
				$(txt).bind('click', function(event) {alert('user clicked at ' + JSON.stringify(event));});


			}
			y+= trackHeight;
		}

		// extra spacer
		return y + 5;


	}};


	EntityView.prototype.sortTracks = function(text) {with(this){

		if ( typeof data.tracks == 'undefined')
			return;


		if ( text == 'Resolution') {
			try {
				data.tracks = $(data.tracks).sort(sortResolution);
			} catch (err){
				console.log("ERROR DURING SORTING " + err);
				
			}

		} else if ( text == 'Release Date') {
			data.tracks = $(data.tracks).sort(sortReleaseDate);
		} else if ( text == 'Length')
			data.tracks = $(data.tracks).sort(sortLength);
		else if ( text == 'Alignment Length')
			data.tracks = $(data.tracks).sort(sortAlignLength);
		else
			data.tracks = $(data.tracks).sort(sortAlphabet);

		defaultSort = text; 
	}};

	jQuery.fn.sort = function() {  
		return this.pushStack( [].sort.apply( this, arguments ), []);  
	};  

	function sortAlphabet(a,b){
		if ( a.pdbID == b.pdbID)
			return 0;
		return a.pdbID>b.pdbID ? 1 : -1;
	}

	function sortResolution (a,b){
		if ( a == 0 || b == null)
			return 0;

		if (	 ( typeof a == 'undefined') ||
				( typeof b == 'undefined')
		)
			return 0;

		if (
				( typeof a.resolution == 'undefined') &&
				( typeof b.resolution == 'undefined')
		)
			return 0;
		if (	 ( typeof a.resolution == 'undefined') &&
				( typeof b.resolution != 'undefined')
		)
			return 1;
		if (	 ( typeof a.resolution != 'undefined') &&
				( typeof b.resolution == 'undefined')
		)
			return -1;

		if (a.resolution == b.resolution)
			return 0;

		return a.resolution> b.resolution ? 1 : -1;  
	};  
	function sortReleaseDate  (a,b){  
		if (a.releaseDate == b.releaseDate)
			return 0;
		return a.releaseDate>b.releaseDate ? 1 : -1;

	};     
	EntityView.prototype.sortLength = function(a,b){  
		if (a.length == b.length)
			return 0;
		return a.length>b.length ? -1 : 1;

	};   
	EntityView.prototype.sortAlignLength = function (a,b){
		if ( a == null || b == null)
			return 0;

		if(typeof a.alignLength == 'undefined' || typeof b.alignLength == 'undefined')
			return 0;

		if ( a.alignLength == null || b.alignLength == null)
			return 0;


		if (a.alignLength == b.alignLength)
			return 0;
		return a.alignLength>b.alignLength ? -1 : 1;

	}; 


	EntityView.prototype.setPaletteName = function(name){with(this){
		data.paletteName = name;
		this.reloadData();
	}};

	EntityView.prototype.updatePalette = function(){with(this){
		$.each(data.palettes, function(key,value) {
			$('#paletteselect')
			.append($("<option></option>")
					.attr("value",value)
					.text(value)
			);
		});


	}};

	EntityView.prototype.setShowSeqres= function(showS){with(this){
		showSeqres = showS;

		repaint();
	}};
	EntityView.prototype.getShowSeqres= function(){with(this){
		return showSeqres;

	}};

	/** Tells the view that a jmol instance is present and it can use the "jmolScript" command to send instructions to it.
	 * 
	 * @param flag
	 */
	EntityView.prototype.registerJmol= function(jmolApplet){with(this){
		jmolPresent = true;
		jmol = jmolApplet;
		if ( typeof data.tracks != 'undefined' ){
			if ( data.tracks.length < 1)
				return;
			
			var pdbID   = data.tracks[0].pdbID;
			var chainID = data.tracks[0].chainID;
			
			load3DChain(pdbID, chainID);
			
		}

	}};

	EntityView.prototype.load3D= function(pdbID){with(this){
		
		if ( ! jmolPresent)
			return;
		
		
		updatePDBSiteTracks(pdbID);
		
		if (  currentJmolPDB != pdbID) {
			console.log('loading PDB in Jmol: ' + pdbID);
			Jmol.loadFile(jmol,'='+pdbID);
		}
		currentJmolPDB = pdbID;
		Jmol.script(jmol,"select *; spacefill off; backbone off; wireframe off; cartoon on; color cartoon structure; ");
		Jmol.script(jmol,"select ligand; wireframe 0.2; spacefill 0.5; color cpk; ");
		Jmol.script(jmol," select *.FE; spacefill 0.7; color cpk ; ");
		Jmol.script(jmol," select *.CU; spacefill 0.7; color cpk ; ");
		Jmol.script(jmol," select *.ZN; spacefill 0.7; color cpk ; ");
		Jmol.script(jmol,"set echo top right; echo " + pdbID);
		

	}};
	
	EntityView.prototype.load3DChain= function(pdbID, chainID){with(this){
		
		if ( ! jmolPresent)
			return;
		console.log('loading PDB in Jmol: ' + pdbID + " chainID: " +chainID);
		load3D(pdbID);
		Jmol.script(jmol,"select *; color grey; color cartoon grey; select *:" + chainID +";  color cartoon structure; ");
		
		

	}};
	
	EntityView.prototype.isJmolPresent= function(){with(this){
		return jmolPresent;

	}};


	EntityView.prototype.updateURL = function(currUrl, param, paramVal){
		var url = currUrl;
		var newAdditionalURL = "";
		var tempArray = url.split("?");
		var baseURL = tempArray[0];
		var aditionalURL = tempArray[1]; 
		var temp = "";
		if(aditionalURL)
		{
			var tempArray = aditionalURL.split("&");
			for ( var i=0; i<tempArray.length; i++ ){
				if( tempArray[i].split('=')[0] != param ){
					newAdditionalURL += temp+tempArray[i];
					temp = "&";
				}
			}
		}
		var rows_txt = temp+""+param+"="+paramVal;
		var finalURL = baseURL+"?"+newAdditionalURL+rows_txt;
		return finalURL;
	};



//	/ SVG TOOLTIP SECTION
	EntityView.prototype.drawToolTipContainer = function(svg){with(this){

		var rect = svg.rect(0, 0,  52, 16,
				4,4,
				{
			visibility:'hidden',
			id:'tooltip_bg' +data.uniprotID,
			'class': "svgtooltip_bg"

				});


		var g = svg.group({
			'class':"svgtooltip",
			fontWeight: 'plain', 
			fontSize: '10', 
			fill: 'black', 
			visibility: 'hidden'
		}
		);

		svg.text(g, 0, 0, 'Tooltip', {
			id: 'tooltip' +data.uniprotID
		});

	}};

	EntityView.prototype.registerTooltip = function(element){with(this){
		$(element).bind('mouseover', function(event,ui) { popupTooltip(event,ui,$(this));});				
		$(element).mouseout(function(event){hideTooltip();});
		$(element).css('cursor','pointer');
	}};

	EntityView.prototype.hideTooltip = function (){ with(this){

		var tooltip = getTooltip();

		if ( typeof tooltip == 'undefined' )
			return;
		if ( tooltip == null)
			return;
		tooltip.setAttributeNS(null,"visibility","hidden");

		var tooltipBG = getTooltipBG();
		tooltipBG.setAttributeNS(null,"visibility","hidden");
	}};

	EntityView.prototype.getTooltip = function () { with(this){
		var svg = $(parent ).svg('get');

		return svg.getElementById('tooltip'+data.uniprotID);
	}};

	EntityView.prototype.getTooltipBG = function () { with(this){
		var svg = $( parent ).svg('get');
		return svg.getElementById('tooltip_bg'+data.uniprotID);
	}};

	EntityView.prototype.popupTooltip = function (event, ui, tis ){with(this){

		var tooltip = getTooltip();

		if ( typeof tooltip == 'undefined' )
			return;
		if ( tooltip == null)
			return;

		var pos = $( parent ).position();
		var sl = pos.left;
		var st = pos.top;

		var realX = (tis.offset().left - sl);

		var realY = (tis.offset().top - st);

		// update the tooltip text
		var title =  event.target.getAttributeNS(null,'title');

		tooltip.firstChild.data = title;

			
		var length = tooltip.getComputedTextLength();

		if ( realX + length >   $(contentDiv).width()  ) {
			realX =  $(contentDiv).width()  - length - rightBorder;
			if ( realX < 0 )
				realX = 0;
		}



		tooltip.setAttributeNS(null,"x",realX +2 );

		tooltip.setAttributeNS(null,"y", realY + trackHeight *2 +2 + trackHeight / 2);

		tooltip.setAttributeNS(null,"visibility","visible");


		var tooltipBG = getTooltipBG();

		if ( typeof tooltipBG == 'undefined' )
			return;



		tooltipBG.setAttributeNS(null,"width",length+8);

		tooltipBG.setAttributeNS(null,"x",realX );

		tooltipBG.setAttributeNS(null,"y", realY + trackHeight + trackHeight / 2);

		tooltipBG.setAttributeNS(null,"visibility","visible");

	}};

	/** Count the number of positions that are overlapping the two ranges xs-ys and as-bs
	 * 
	 */
	EntityView.prototype.getOverlap = function(x,y,a,b){

		var overlap = 0;
		//1:

		if ((( x<= a)  && ( a<=y)) ||
				((x <= b) && ( b <= y)) || 
				(a<=x && y<=b)) {

			//2:

			if ( x < a) {
				if ( y < b) 
					overlap = y-a;
				else
					overlap = b-a;
			} else {
				if  ( y < b) 
					overlap = y -x;
				else 
					overlap = b - x;

			} 

		}

		return overlap;
		
	};
	
	/** Draw a Cogwheel in its own DIV */
	function Cogwheel(cogwheelDiv) { with(this){
			this.parent = cogwheelDiv;
			$( parent ).svg();
			drawCogwheel(10,10,8,8);
			
				
		}};
		
	Cogwheel.prototype.drawCogwheel = function(cx,cy,r, num_segments) {with(this){
			
						 
			var theta = 2 * 3.1415926 / num_segments; 
			var tangetial_factor = Math.tan(theta);//calculate the tangential factor 

			var radial_factor = Math.cos(theta);//calculate the radial factor 
			
			var x = r;//we start at angle = 0 

			var y = 0; 
		    
			var svg = $(parent).svg('get'); 

			var g = svg.group( {
				id:'cogwheel',
				fontWeight: 'bold', 
				fontSize: '10', 
				fill: 'black'}
			);
					
		    svg.circle(g,cx,cy,r,{fill:'black'});
		    svg.circle(g,cx,cy,3,{fill:'white'});
		    
			for(var ii = 0; ii < num_segments; ii++) 
			{ 
				//glVertex2f(x + cx, y + cy);//output vertex 
		        svg.circle(g,x+cx,y+cy,2,{fill:'white'});
				//calculate the tangential vector 
				//remember, the radial vector is (x, y) 
				//to get the tangential vector we flip those coordinates and negate one of them 

				var tx = -y; 
				var ty = x; 
		        
				//add the tangential vector 

				x += tx * tangetial_factor; 
				y += ty * tangetial_factor; 
		        
				//correct using the radial factor 

				x *= radial_factor; 
				y *= radial_factor; 
			} 

	}};		
		

				
		// end of file!
		