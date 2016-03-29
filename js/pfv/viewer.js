/* -*- mode: javascript; c-basic-offset: 4; indent-tabs-mode: nil -*- */
/*global $:false */
/*global pageTracker:false*/
/*jslint maxlen: 120 */
/**
 *  Protein Feature View v. {{ VERSION }} build {{ BUILD }}
 *
 *  Draws a graphical summary of PDB and UniProtKB relationships for a single UniProtKB sequence.
 *
 *  @author Andreas Prlic
 */


define(['colors', 'draw', 'params','icons'],
  function(colors, draw, params,icons) {
    /**
     * A No args constructor. Needs to call setParent and loadUniprot from the user side
     */
    function Viewer() {
      this.initClass();
      var that = this;
      $(window).resize(function() {
        $(that.parent).css('overflow', 'hidden');
        $(that.parent).css('width', 'auto');
        //$(parent).removeAttr('css');
        var shouldRepaint = that.updateScale();
        if (shouldRepaint) {
          that.repaint();
        }
      });

      var drawer = new draw.Draw(this);
      this.drawer = drawer;
      this.params = params;
      this.icons = icons;
    }

    /** Initialize the internals
     *
     */
    Viewer.prototype.initClass = function() {


      $.ajaxSetup({
        timeout: 20000
      });

      this.data = {};

      this.version = "v. {{ VERSION }} build {{ BUILD }}";

      this._initialized = false;

      this.showCondensed = true;

      this.colorBy = "Alignment Length";

      this.defaultSort = "Alignment Length";

      this.showSeqres = true;
      this.singlePDBmode = false;
      this.displayPDB = "";
      this.addedPDB = [];

      this.contentDiv = "#content";
      this.dialogDiv = "#dialog";
      this.scrollBarDiv = "#svgScrollBar";

      this.selectionStart = -1;
      this.selectionEnd = -1;


      this.masterURL = "/pdb/protein/";
      this.rcsbServer = "";

      this.listenerMap = {};

      this.oldScale = -1;

      // for flagging which track is shown in 3D
      this.pdbIn3d = "";
      this.chainIn3d = "";

      try {
        $(this.scrollBarDiv).slider({
          handle: 'round',
          enabled: 'true',
          natural_arrow_keys: 'true',
          formatter: function(value) {
            return 'zoom: ' + value + '%';
          }

        });
      } catch (err) {
        console.error(err);
      }

      this.startedAt = new Date().getTime();

      //$(this.scrollBarDiv).bind('slidechange', $.proxy( this, 'srcollValueChanged' ));

      console.log("*** Protein Feature View V." + this.version + " ***");

    };

    Viewer.prototype.getVersion = function() {
      return this.version;
    };


    Viewer.prototype.setUniprotId = function(uniprotId) {
      this.uniprotID = uniprotId;
    };

    Viewer.prototype.loadUniprot = function(uniprotId) {
      this.uniprotID = uniprotId;
      if (typeof uniprotId === 'undefined') {
        return;
      }
      this.data = {};
      var url = this.rcsbServer + this.masterURL + this.uniprotID + "?type=json";
      if (this.singlePDBmode) {
        url += "&display=" + this.displayPDB;
      }
      if ( this.addedPDB.length > 0 ) {
        url += "&addPDB=";

        for ( var a = 0 ; a < this.addedPDB.length; a++){
          url += this.addedPDB[a];
          if ( a >0 && a < this.addedPDB.length -1) {
            url += ",";
          }
        }

      }
      var that = this;
      $.getJSON(url, function(json) {
        // console.log("got json response from " + url);
        that.setData(json);
        $(that.parent).svg();
        var svg = $(that.parent).svg('get');
        that.drawInitial(svg);
        that.updateScale();
        that.repaint();

      });
      this.registerEvents();
    };



    Viewer.prototype.registerEvents = function() {


      var that = this;
      $(this.parent).bind('click',
        function(path) {

          var g = path.target.parentNode;
          var id = g.id;

          // console.log("user clicked " + id);

          if (id.indexOf('pfam') > -1) {

            var pfampos = id.substring(4, id.length);
            if (pfampos !== 'track') {
              that.showPfamDialog(that.data.pfam.tracks[pfampos]);
            }
          } else if (id.indexOf('seq') > -1) {

            that.showSequenceDialog();

          } else if (id.indexOf('exon') > -1) {

            var exonpos = id.substring(4, id.length);

            // console.log("clicked on exon " + id + " " + exonpos);

            if (exonpos !== 'track') {
              that.showExonDialog(that.data.exon.tracks[exonpos]);
            }
          } else if (id >= 0) {
            var track = that.data.tracks[id];

            that.showDialog(track);

            // notify listeners that user clicked on PDB ID track name
            that._dispatchEvent({
                'name': 'pdbTrackNameClicked'
              },
              'pdbTrackNameClicked', track);

          }

        });


      $(this.scrollBarDiv).on('slide', $.proxy(this, 'scrollValueChanged'));
      $(this.scrollBarDiv).on('slideStop', $.proxy(this, 'scrollReleased'));


    };


    Viewer.prototype.scrollValueChanged = function() {

      // this._dispatchEvent({'name':'sliderMovedEvent'},
      //     'sliderMoved', {'percent':viewPercent});
    };

    Viewer.prototype.scrollReleased = function(event) {

      this.setScrollValue(event.value);

      this._dispatchEvent({
          'name': 'sliderReleased'
        },
        'sliderReleased', {
          'percent': event.value
        });
    };


    Viewer.prototype.setScrollValue = function(val) {
      if (val < 0) {
        val = 0;
      } else if (val > 100) {
        val = 100;
      }

      // console.log("setting scroll value to " + val);

      var minScale = this.getMinScale();
      //
      var maxScale = this.params.maxTextSize;
      //
      var tmpMax = maxScale - minScale;

      // the user wants X percent to be visible

      //var hundredPerc = maxTextSize * sequence.length  ;

      var newScale = minScale + tmpMax * (val / 100.0);

      $(this.scrollBarDiv).slider().slider("setValue", val);

      this.setScale(newScale);

      this.repaint();


    };



    /** set the URL to load the main data from. Can be used to specify a remote server.
     *
     * @param url
     */
    Viewer.prototype.setMasterURL = function(url) {
      this.masterURL = url;
    };

    /** Configure which tracks to display. The passed parameter should be a JSON
     object of this style (that's just an example):
     *
     * var tracks = [ { 'name':'pdbsites',
    'url':'/pdb/protein/'+uniprotID+'?type=json&track=pdbsites&display=' + displayPDB
                      },
     {  'name':'SCOP',
        'url':'/pdb/protein/'+uniprotID+'?type=json&track=scop&display=' + displayPDB
                          }] ;
     *
     * Note: if you get this configuration wrong, This won't work correctly...
     *
     * See also setDefaultTracks();
     * @param tracks
     */
    Viewer.prototype.setTracks = function(tracks) {
      this.asyncTracks = tracks;
    };

    /** Sets the tracks to be displayed to the default, that is used at the RCSB PDB site
     *
     */
    Viewer.prototype.setDefaultTracks = function() {

      // single PDB mode does not show externl annotations
      if (this.singlePDBmode) {
        this.asyncTracks = [{
          'name': 'pdbsites',
          'url': this.rcsbServer + '/pdb/protein/' + this.uniprotID +
            '?type=json&track=pdbsites&display=' + this.displayPDB
        }, {
          'name': 'SCOP',
          'url': this.rcsbServer + '/pdb/protein/' + this.uniprotID +
            '?type=json&track=scop&display=' + this.displayPDB
        }, {
          'name': 'Validation',
          'url': this.rcsbServer + '/pdb/protein/' + this.uniprotID +
            '?type=json&track=validation&display=' + this.displayPDB
        }];
      } else {
        this.asyncTracks = [{
            'name': 'Exons',
            'url': this.rcsbServer + '/pdb/protein/' + this.uniprotID +
              '?type=json&track=exons'
          }, {
            'name': 'pfam',
            'url': this.rcsbServer + '/pdb/protein/' + this.uniprotID +
              '?type=json&track=pfam'
          }, {
            'name': 'pmp',
            'url': this.rcsbServer + '/pdb/protein/' + this.uniprotID +
              '?type=json&track=pmp'
          }, {
            'name': 'hydropathy',
            'url': this.rcsbServer + '/pdb/protein/' + this.uniprotID +
              '?type=json&track=hydropathy'
          }, {
            'name': 'Disorder',
            'url': this.rcsbServer + '/pdb/protein/' + this.uniprotID +
              '?type=json&track=jronn'
          }, {
            'name': 'SCOP',
            'url': this.rcsbServer + '/pdb/protein/' + this.uniprotID +
              '?type=json&track=scop'
          }, {
            'name': 'pdbsites',
            'url': this.rcsbServer + '/pdb/protein/' + this.uniprotID +
              '?type=json&track=pdbsites'
          }, {
            'name': 'phosporylation',
            'url': this.rcsbServer + '/pdb/protein/' + this.uniprotID +
              '?type=json&track=phosphorylation'
          }, {
          'name': 'variation',
          'url': this.rcsbServer + '/pdb/protein/' + this.uniprotID +
          '?type=json&track=variation'
        }



        ];
      }

      if ( ! this.singlePDBmode && this.addedPDB.length > 0){
        for ( var a =0 ; a< this.addedPDB.length ; a++){
          this.asyncTracks.push({
            'name': 'pdbsites',
            'url': this.rcsbServer + '/pdb/protein/' + this.uniprotID +
              '?type=json&track=pdbsites&display=' + this.addedPDB[a]
          });
          this.asyncTracks.push({
            'name': 'Validation',
            'url': this.rcsbServer + '/pdb/protein/' + this.uniprotID +
              '?type=json&track=validation&display=' + this.addedPDB[a]
          });


      }

      }

    };


    Viewer.prototype.getData = function() {
      return this.data;
    };

    Viewer.prototype.setData = function(json) {

      this.data = json;


      // trigger async loads...
      if (typeof this.asyncTracks === 'undefined') {
        // we always updated the tracks based on the uniProt IDs
        this.setDefaultTracks();
      }

      if (!this._initialized) {
        this._initialized = true;
        this._dispatchEvent({
            'name': 'viewerReadyEvent'
          },
          'viewerReady', this);
      } else {
        this._dispatchEvent({
            'name': 'dataReloadedEvent'
          },
          'dataReloaded', this);
      }

      var successMethod = function(json) {
        that.parseJsonResponse(json);
      };
      var errorMethod = function(jqXHR, textStatus, exception) {

        console.log("ajax error: status code: " + jqXHR.status);

        if (jqXHR.status === 0) {
          console.log('Not connected. \n Verify Network.');
        } else if (jqXHR.status === 404) {
          console.log('Requested page not found. [404]');
        } else if (jqXHR.status === 500) {
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


        console.log('error during ajax request: ' + exception);
        console.log('textstatus: ' + textStatus);
        console.log(jqXHR.responseText);
      };

      for (var i = 0; i < this.asyncTracks.length; i++) {
        var track = this.asyncTracks[i];

        var url = track.url;

        //this.loadURLAsync(url);
        var that = this;

        console.log("requesting " + url);
        $.ajax({
          url: url,
          dataType: "json",
          type: "GET",
          cache: true,
          context: that,
          success: successMethod,
          error: errorMethod,
          async: true
        });

      }


    };

    Viewer.prototype.loadURLAsync = function(url) {
      var that = this;
      console.log("requesting " + url);


      if (window.Worker) {

        var myWorker = new Worker('js/pfv/JsonWorker.js');

        myWorker.onerror = function(e) {
          console.log("error when loading data from URL: " + url);
          console.log('Error: Line ' + e.lineno + ' in ' + e.filename + ': ' + e.message);

          myWorker.postMessage({
            'cmd': 'stop'
          });

        };

        myWorker.onmessage = function(event) {

          var json = JSON.parse(event.data);

          that.parseJsonResponse(json.json);

          myWorker.postMessage({
            'cmd': 'stop'
          });

        };

        myWorker.postMessage({
          'cmd': 'load',
          'msg': decodeURI(url)
        });

      } else {

        // older browsers...


        $.ajax({
          url: url,
          dataType: "json",
          type: "GET",
          cache: true,
          context: that,
          async: true,
          success: function(json) {
            that.parseJsonResponse(json);
          },
          error: function(jqXHR, textStatus, exception) {

            console.log("ajax error: status code: " + jqXHR.status);

            if (jqXHR.status === 0) {
              console.log('Not connected. \n Verify Network.');
            } else if (jqXHR.status === 404) {
              console.log('Requested page not found. [404]');
            } else if (jqXHR.status === 500) {
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


            console.log('error during ajax request: ' + exception);
            console.log('textstatus: ' + textStatus);
            console.log(jqXHR.responseText);
          }
        });
      }

    };

    Viewer.prototype.parseJsonResponse = function(json) {
      //console.log("got json response..." + JSON.stringify(json));
      if (typeof json.pfam !== 'undefined') {
        this.data.pfam = json.pfam;
        console.log("got pfam response");
      } else if (typeof json.pmp !== 'undefined') {
        this.data.pmp = json.pmp;
        console.log("got PMP response");
      } else if (typeof json.pdbsites !== 'undefined') {
        this.data.pdbsites = json.pdbsites;
        // console.log("got PDB sites response for " + json.pdbID);
      } else if (typeof json.phosphorylation !== 'undefined') {
        this.data.phospho = json.phosphorylation;
        console.log("got phosphosite response");
      } else if (typeof json.hydropathy !== 'undefined') {
        console.log("got hydropathy response");
        this.data.hydropathy_max = json.hydropathy.hydropathy_max;
        this.data.hydropathy_min = json.hydropathy.hydropathy_min;
        this.data.hydropathy = json.hydropathy;
      } else if (typeof json.jronn !== 'undefined') {
        this.data.jronn_max = json.jronn.jronn_max;
        this.data.jronn_min = json.jronn.jronn_min;
        this.data.jronn = json.jronn;
        console.log("got jronn response");
      } else if ((typeof json.scop !== 'undefined') || (typeof json.scope !== 'undefined')) {
        if (typeof json.scop !== 'undefined') {
          this.data.scop = json.scop;
          console.log("got scop response");
        }
        if (typeof json.scope !== 'undefined') {
          this.data.scope = json.scope;
          console.log("got scope response");
        }
      } else if (typeof json.exon !== 'undefined') {
        this.data.exon = json.exon;
        console.log("got EXON response: ");
      } else if (typeof json.validation !== 'undefined') {
        this.data.validation = json.validation;
        console.log("got validation response");
      } else if (typeof json.variation !== 'undefined') {
        this.data.variation = json.variation;
        console.log("got variation response");
      }
      this.repaint();
    };

    Viewer.prototype.getUniprotID = function() {
      return this.data.uniprotID;
    };

    /** Sets a flag which PDB and chain Id are shown in the associated 3D viewer.
    * PFV then draws an icon at the left side of the track,
    * indicating that it is highlighted in 3D.
    */
    Viewer.prototype.set3dViewFlag = function (pdbId, chainId){

      this.pdbIn3d = pdbId.toUpperCase();

      // chain IDs are case sensitive
      this.chainIn3d = chainId;

      this.repaint();
    };

    /** Switch to the display of a single PDB ID
     *
     * @param pdbId
     */
    Viewer.prototype.showPDB = function(pdbId) {

      if (typeof pdbId !== 'undefined') {

        if (pdbId.length > 3) {

          this.singlePDBmode = true;

          this.displayPDB = pdbId.toUpperCase();

          this.showCondensed = false;
        } else if (pdbId.length === 0) {
          // pdbId is set to ''
          this.singlePDBmode = false;
          this.displayPDB = '';

          this.showCondensed = true;
        }

        //  this.setDefaultTracks();
      }

    };

    /** Add a single PDB ID to the 'full'- display. Does not switch the viewr to singlePDBmode
     *
     * @param pdbId
     */
    Viewer.prototype.addPDB = function(pdbId) {

      if (typeof pdbId !== 'undefined') {

        if (pdbId.length > 3) {

          //this.singlePDBmode = true;

          //this.displayPDB = pdbId;

          this.addedPDB.push(pdbId);
          this.showCondensed = true;
        }

      }

    };


    /** Add a single PDB ID to the 'full'- display. Does not switch the viewr to singlePDBmode
     *
     * @param pdbId
     */
    Viewer.prototype.trackShouldBeDisplayed = function(track) {

      if ( ! this.showCondensed ) {
        return true;
      }


      if (typeof track.bestInCluster !== 'undefined' && track.bestInCluster) {
        return true;
      }

      var pdbID = track.pdbID.toUpperCase();

      if ( pdbID === this.displayPDB) {
        return true;
      }

      return this.isAddedPDB(pdbID);


    };


    /** check if a PDB ID is contained in the list of "added" PDB IDs.
    */
    Viewer.prototype.isAddedPDB = function(pdbID){

      for ( var a=0 ; a < this.addedPDB.length ; a++ ){

        if ( this.addedPDB[a].toUpperCase() === pdbID){
          return true;
        }
      }

      return false;
    };


    /** Toggle the display of all PDB ids or the restriction to only one
     *
     * @param flag
     */
    Viewer.prototype.showAll = function(flag) {

      this.singlePDBmode = flag;


    };


    Viewer.prototype.setDialogDiv = function(dialogD) {

      this.dialogDiv = dialogD;

    };
    Viewer.prototype.setScrollBarDiv = function(scrollBarD) {

      this.scrollBarDiv = scrollBarD;

      $(this.scrollBarDiv).on('slide', $.proxy(this, 'scrollValueChanged'));
      $(this.scrollBarDiv).on('mouseup', $.proxy(this, 'scrollReleased'));



    };

    Viewer.prototype.getScrollBarValue = function() {

      return $(this.scrollBarDiv).slider().slider('getValue');

    };

    Viewer.prototype.setParentDiv = function(parentDiv) {

      console.log("new Parent DIV: " + parentDiv);

      this.outerParent = parentDiv;

      this.contentDiv = parentDiv;

      var myInnerDiv = $("<div>");
      $(this.outerParent).append(myInnerDiv);

      this.parent = myInnerDiv;




    };


    Viewer.prototype.getParent = function() {
      return this.parent;
    };

    Viewer.prototype.getSVGWrapper = function() {

      //return parent.svg('get');
      return $(this.parent).svg('get');

    };
    Viewer.prototype.reloadData = function() {

      var pal = "";

      if (typeof this.data.paletteName !== 'undefined') {
        pal = "&palette=" + this.data.paletteName;
      }

      var url = "/pdb/protein/" + this.uniprotID + "?type=json" + pal;

      $.getJSON(url, function(json) {
        this.data = json;
        this.repaint();
      });


    };

    Viewer.prototype.reset = function() {

      $("#uniprotsubheader").html("");

      this.svg = $(this.parent).svg('get');

      if (typeof svg === 'undefined') {
        return;
      }

      this.svg.clear();
      this.data = {};
      this.hideColorLegend();

    };

    Viewer.prototype.repaint = function() {


      // var now = new Date().getTime();

      //    console.log("repainting. time since start: " + (now - this.startedAt ));

      if (typeof this.parent === 'undefined') {
        console.error("can't repaint, no parent");
        return;
      }


      $("#uniprotsubheader").html("");

      var svg = $(this.parent).svg('get');

      if (typeof svg === 'undefined') {
        console.error("can't repaint, no svg");
        return;
      }

      try {

        svg.clear();

        this.drawInitial(svg);

        this.drawer.maxY = this.y + this.params.bottomBorder;


        // prevent hanging tooltips on resize
        $('.tooltip').tooltip('hide');

      } catch (err) {
        console.error(err);
      }
    };

    Viewer.prototype.showDialog = function(track) {


      if (typeof track === 'undefined') {
        return;
      }


      var pdbID = track.pdbID.trim();
      var desc = track.desc;
      //var chainID = track.chainID.trim();

      if (typeof pageTracker !== 'undefined') {
        pageTracker._trackEvent('ProteinFeatureView', 'showPDBDialog', desc);
      }


      var html = "<span><img width='240' src='" + this.rcsbServer + "/pdb/images/" +
        pdbID.toLowerCase() + "_bio_r_250.jpg?getBest=true' /></span>";

      html += '<ul>';

      var showIn3dId =  'pdbIdDialog'+pdbID+'.'+track.chainID;

      // var svg = '<svg><g transform="matrix(1,0,0,-1,0,10) scale(0.005)" title="" '+
      // 'rel="tooltip" data-toggle="tooltip" data-container="body" style="cursor: pointer;" '+
      // 'data-original-title="Shown in 3D viewer"><path d="' +
      // this.icons.eye +
      // '"></path></g></svg>';


      html += '<li><a href="#" id="'+showIn3dId+'" data-dismiss="modal"> Show in 3D</a> (on Protein Feature View)</li>';
      html +='<li><a href="' + this.rcsbServer + '/pdb/explore/explore.do?structureId=' +
        pdbID + '">Structure Summary Page for ' + pdbID + '</a></li>';

      html+="</ul>";

      var execjs = 'that._dispatchEvent({"name": "pdbTrackNameClicked"},"pdbTrackNameClicked", track);';

      html += '<script>$("#'+showIn3dId+'").click(function(){'+execjs+'})</script>';

      var heading = 'View ' + pdbID + ' - ' + desc;

      //var strSubmitFunc = that.load3DChain(pdbID, chainID);
      var strSubmitFunc = "";
      var btnText = "";

      this.doModal(this.dialogDiv, heading, html, strSubmitFunc, btnText);

    };



    Viewer.prototype.doModal = function(placementId, heading, formContent, strSubmitFunc, btnText) {
      var html = '<div id="modalWindow" class="modal fade " tabindex="-1" role="dialog" ' +
        ' aria-hidden="true">';
      html += '<div class="modal-dialog">';
      html += '<div class="modal-content">';
      html += '<div class="modal-header">';
      html += '<a class="close" data-dismiss="modal">&times;</a>';
      html += '<h4>' + heading + '</h4>';
      html += '</div>';
      html += '<div class="modal-body">';
      html += '<p>';
      html += formContent;
      html += '</div>';
      html += '<div class="modal-footer">';
      if (btnText !== '') {
        html += '<button class="btn btn-success"  data-dismiss="modal"';
        html += ' onClick="' + strSubmitFunc + '; event.preventDefault();">' + btnText;
        html += '</button>';
      }
      html += '<button class="btn" data-dismiss="modal">Close';
      html += '</button>'; // close button
      html += '</div>'; // footer
      html += '</div></div>'; //content, dialog
      html += '</div>'; // modalWindow
      $(placementId).html(html);
      $('#modalWindow').modal();
      $('#modalWindow').show();
    };

    Viewer.prototype.hideModal = function() {
      // Using a very general selector - this is because $('#modalDiv').hide
      // will remove the modal window but not the mask
      $('.modal.in').modal('hide');
    };


    Viewer.prototype.load3DChain = function(pdbID, chainID) {

      console.log("loading " + pdbID + " chain ID: " + chainID);
      window.location = this.rcsbServer + "/pdb/explore/explore.do?structureId=" + pdbID;
      return;



    };



    Viewer.prototype.showSequenceDialog = function() {


      var data = this.data;


      //$(this.dialogDiv).attr('title', data.uniprotID );
      if (typeof pageTracker !== 'undefined') {
        pageTracker._trackEvent('ProteinFeatureView', 'showSequenceDialog', data.uniprotID);
      }
      var html = "";
      if (this.singlePDBmode) {
        html = "<h3>" + data.uniprotID + "-" + data.name + "</h3>";
        html += "Show All <a href='" + this.rcsbServer + "/pdb/protein/" + data.uniprotID +
          "'>PDB-UniProtKB mappings</a> that are available for " + data.uniprotID;

      } else {

        html = "<ul><li><a href='" + this.rcsbServer +
          "/pdb/search/smartSubquery.do?smartSearchSubtype=" +
          "UpAccessionIdQuery&accessionIdList=" +
          data.uniprotID + "'>Show All PDB chains</a> that are linked to UniProtKB ID <b>" +
          data.uniprotID + "</b> - " + data.name + " ?</li>" +
          " <li>View UniProtKB record for <a href=\"http://www.uniprot.org/uniprot/" +
          data.uniprotID + "\" " +
          " target=\"_new\">" + data.uniprotID +
          "<span class='iconSet-main icon-external'> &nbsp;</span></a></li>";
        html += "</ul>";

      }


      var heading = data.uniprotID + " - " + data.name;
      var strSubmitFunc = "";
      var btnText = "";

      this.doModal(this.dialogDiv, heading, html, strSubmitFunc, btnText);

    };

    Viewer.prototype.showPfamDialog = function(pfam) {

      var pfamId = pfam.acc;
      var desc = pfam.desc;
      //$(this.dialogDiv).attr('title', pfamId + ' - '  + pfam.name);
      if (typeof pageTracker !== 'undefined') {
        pageTracker._trackEvent('ProteinFeatureView', 'showPfamDialog', pfamId);
      }

      var html = "<h3> " + desc + "</h3>" +
        "<ul><li>Go to Pfam site for <a href=\"http://pfam.sanger.ac.uk/family/" +
        pfamId + "\"" +
        " target=\"_new\">" + pfamId +
        "<span class='iconSet-main icon-external'> &nbsp;</span> </a></li>";

      html += "<li>Find <a href='" + this.rcsbServer +
        "/pdb/search/smartSubquery.do?smartSearchSubtype=PfamIdQuery&amp;pfamID=" +
        pfamId + "'>other PDB entries with the same Pfam domain</a></li>";
      html += "</ul>";



      var heading = pfamId + " - " + pfam.name;
      var strSubmitFunc = "";
      var btnText = "";

      this.doModal(this.dialogDiv, heading, html, strSubmitFunc, btnText);

    };

    Viewer.prototype.showExonDialog = function(exon) {

      var geneId = exon.acc;
      var desc = exon.desc;
      //$(this.dialogDiv).attr('title', pfamId + ' - '  + pfam.name);
      if (typeof pageTracker !== 'undefined') {
        pageTracker._trackEvent('ProteinFeatureView', 'showExonDialog', geneId);
      }

      var html = "<h3> Exon " + desc + "</h3>" +
        "<ul><li>Go to RCSB Gene View for <a href=\"/pdb/gene/" + geneId + "\"" +
        " target=\"_new\">" + geneId + " </a></li>";

      html += "</ul>";


      var heading = geneId + " - " + exon.name;
      var strSubmitFunc = "";
      var btnText = "";

      this.doModal(this.dialogDiv, heading, html, strSubmitFunc, btnText);

    };

    /** Set the zoom level. Can be either "View whole" or "Maximum zoom"
     *
     * @param zoom
     */
    Viewer.prototype.setZoomLevel = function(zoom) {


      //console.log($('#sequencezoom').val() + " ?? " + zoom);

      if (zoom.indexOf("whole") !== -1) {

        this.updateScale();

      } else {
        $(this.scrollBarDiv).slider().slider('setValue', 100);

        this.setScale(this.params.maxTextSize);
      }

      this.repaint();

    };


    Viewer.prototype.getPreferredWidth = function() {

      var availWidth = $(this.contentDiv).width() - this.params.leftBorder - this.params.rightBorder;

      var visibleWidth = $(window).width() -
        this.params.leftBorder - this.params.rightBorder;

      if (availWidth > visibleWidth) {
        availWidth = visibleWidth;
      }


      if (availWidth < 1) {
        console.log('something is wrong with the page setup. the contentDiv ' +
          this.contentDiv + ' has size ' + $(this.contentDiv).width());

      }


      return availWidth;

    };

    Viewer.prototype.getMinScale = function() {

      var availWidth = this.getPreferredWidth();

      //$(window).width() - $('#leftMenu').width() - leftBorder -  rightBorder;
      return availWidth / (this.sequence.length);

    };

    /** Update the scale to the default scale - currently to
     * show the whole sequence in the available space

     * returns true if the display should be updated.
     *
     */
    Viewer.prototype.updateScale = function() {

      var newScale = 1;

      if (typeof this.sequence !== "undefined") {
        var availWidth = this.getPreferredWidth();

        newScale = (availWidth) / (this.sequence.length);

        if (typeof $(this.scrollBarDiv).slider() !== 'undefined') {

          $(this.scrollBarDiv).slider().slider('setValue', 0);
        }
        $(this.parent).css('overflow', 'auto');
        $(this.parent).css('width', $(this.outerParent).width());


      } else {
        console.error("sequence is not defined!");

        this.sequence = {};
        this.sequence.length = this.data.length;
        this.sequence.name = this.data.uniprotID;

      }
      console.log("update scale  " + newScale);

      if (this.oldScale < 0) {
        this.drawer.setScale(newScale);

        return true;
      }

      if (this.oldScale === newScale) {
        return false;
      }

      this.drawer.setScale(newScale);

      return true;




    };

    /** Set the scale of the current display. The value is the amount of
     * space given for rendering one amino acid.
     *
     * @param aaWidth - width of one amino acid
     */
    Viewer.prototype.setScale = function(aaWidth) {

      if (aaWidth > this.params.maxTextSize) {
        aaWidth = this.params.maxTextSize;
      }

      this.drawer.setScale(aaWidth);

      this.oldScale = aaWidth;

    };


    /** Reset the size of the SVG object
     *
     * @param svg
     * @param width
     * @param height
     */
    Viewer.prototype.resetSize = function(svg, width, height) {

      svg.configure({
        width: width || $(svg._container).width(),
        height: height || $(svg._container).height()
      });


    };


    /** Do the actual drawing
     *
     */
    Viewer.prototype.drawInitial = function(svg) {

      if (typeof this.data.uniprotID === 'undefined') {
        alert('Did not find a UniProt ID! ' + JSON.stringify(this.data));
        return;
      }

      //var now = new Date().getTime();

      var data = this.data;

      var y = this.y;

      this.sequence = {};
      this.sequence.length = data.length;
      this.sequence.name = data.uniprotID;

      var desc = data.desc;

      var header = "<h1>Protein Feature View - " + data.uniprotID;

      if (typeof(data.name !== 'undefined')) {
        header += ' (' + data.name + ')';
      }

      if (typeof desc !== 'undefined') {
        header += " - " + desc;
      }

      header += "</h1>";

      //$('#uniprotheader').html(header);


      this.filterTracks();

      var html = data.uniprotID + " <span class='iconSet-main icon-external' " +
        " title='Link to UniProtKB entry. Up-to-date UniProt Ids are provided by the " +
        " SIFTS project (http://www.ebi.ac.uk/pdbe/docs/sifts)'> &nbsp;</span>";


      $('#linktouniprot').attr("href", "http://www.uniprot.org/uniprot/" + data.uniprotID)
        .attr("title", "link to uniprot web site " + data.uniprotID).html(html);

      var href = this.rcsbServer +
        "/pdb/search/smart.do?smartComparator=and&smartSearchSubtype_0=" +
        "UpAccessionIdQuery&target=Current&accessionIdList_0=" + data.uniprotID;

      $('#searchinpdb').attr("href", href)
        .attr("title", "Find all matching PDB IDs for" + data.uniprotID)
        .html("Search PDB");


      $('#uniprotLength > span').html(data.length);
      $('#chainSummaryImage').hide();
      $('#uniprotSpecies > span').html(data.species);


      // now done in constructor
      //var drawer = new draw.Draw(this);
      //this.drawer = drawer;
      var drawer = this.drawer;

      if (typeof this.drawer !== 'undefined') {
        drawer.scale = this.drawer.scale;
      }

      this.params = drawer.getParams();


      if (drawer.scale < 0) {
        this.updateScale();
      }

      drawer.drawSelection(svg);


      y = drawer.height;


      if (!this.singlePDBmode) {
        y = drawer.drawRuler(svg, this.sequence, y);
      }

      var uniprotTopY = y;

      y = drawer.drawSequence(svg, this.sequence, y);

      y = drawer.drawUniprotFeatures(svg, y);

      y = drawer.drawUPSites(svg, y);

      y = drawer.drawVariation(svg,y);

      var uniprotBottomY = y;

      if (!this.singlePDBmode) {

        // 70 is the minimum space to render "uniprotkb"

        if (uniprotBottomY - uniprotTopY < 70) {
          y = (y - uniprotTopY) + 70;
          uniprotBottomY = y;

        }
      }

      drawer.drawSourceIndication(svg, 'UniProtKB', uniprotTopY, uniprotBottomY);


      if (!this.singlePDBmode) {

        var pfamTopY = y;

        y = drawer.drawPfam(svg, y);

        var pfamY = y;

        drawer.drawSourceIndication(svg, 'Pfam', pfamTopY, pfamY);
      }


      var phosphoTop = y;

      y = drawer.drawPhosphoSites(svg, y);

      drawer.drawSourceIndication(svg, "Phospho", phosphoTop, y);

      var domainTop = y;

      y = drawer.drawSCOP(svg, this.sequence, y);

      drawer.drawSourceIndication(svg, 'Domains', domainTop, y);


      var algoTop = y;


      y = drawer.drawJronn(svg, this.sequence, y);

      y = drawer.drawHydropathy(svg, this.sequence, y);

      y = drawer.drawSignalP(svg, this.sequence, y);

      drawer.drawSourceIndication(svg, 'Calculated', algoTop, y);


      var exoTop = y;

      y = drawer.drawExons(svg, this.sequence, y);

      drawer.drawSourceIndication(svg, 'Exon', exoTop, y);

      var pdbTopY = y;

      y = drawer.drawPDBSites(svg, y);

      y = drawer.drawPDBSecstruc(svg, y);

      y = drawer.drawPDBValidation(svg, this.sequence, y);

      if ((!this.showCondensed) && (!this.singlePDBmode)) {
        // add a spacer ;
        y += this.params.trackHeight;
        drawer.drawSourceIndication(svg, 'PDB', pdbTopY, y);
        y = drawer.drawCollapseCondensedSymbol(svg, y);
        pdbTopY = y;
      }


      this.sortTracks(this.defaultSort);

      var counter = 0;
      var colorPos = -1;

      var checkedTracks = [];
      for (var j = 0; j < data.tracks.length; j++) {
        var track1 = data.tracks[j];
        if (track1 === null) {
          continue;
        }
        checkedTracks.push(track1);
      }

      data.tracks = checkedTracks;

      //console.log("single pdb mode : " + this.singlePDBmode + ' ' + this.displayPDB);

      for (var i = 0; i < data.tracks.length; i++) {
        var track = data.tracks[i];

        var pdbIdUpper = track.pdbID.toUpperCase();
        if ( this.isAddedPDB( pdbIdUpper) ){
            drawer.highlightTrack(svg, track, y, i);
        }

        if ( this.pdbIn3d === pdbIdUpper ){
          drawer.draw3dFlagForTrack(svg,track,y,i);
        }


        if (this.singlePDBmode) {

          if (track.pdbID !== this.displayPDB) {
            continue;
          }
          if (counter > this.params.maxTracksSingleMode) {
            continue;
          }
        } else if (this.showCondensed) {

          var shouldBeDisplayed = this.trackShouldBeDisplayed(track);

          if (!shouldBeDisplayed ) {
            continue;
          }
        }
        counter++;

        colorPos++;


        if (colorPos >= this.params.customColors.length) {
          colorPos = 0;
        }

        var colorData = drawer.getTrackColor(this.params.customColors, colorPos, track);

        track.color = colorData.color;
        track.lightercolor = colorData.lightercolor;

        y = drawer.drawTrack(svg, track, y, i);
      }

      var pdbBottomY = y;

      drawer.drawSourceIndication(svg, 'PDB', pdbTopY, pdbBottomY);

      var title = "Showing a representative subset of PDB matches. Click for more ";

      var that = this;
      var callback = function() {
        if (typeof pageTracker !== 'undefined') {
          pageTracker._trackEvent('ProteinFeatureView', 'showCondensedView', 'true');
        }
        that.setShowCondensed(false);
        $('#showCondensed').text("Show Condensed View");
      };

      var totalTracks = this.getTotalNrPDBTracks();

      if (this.showCondensed && !(this.singlePDBmode) && (totalTracks > 1)) {
        y = drawer.drawExpandCondensedSymbol(svg, pdbBottomY, title, callback);
      }



      if (!this.singlePDBmode) {

        //if ( data.externalTracks.names.length > 0)
        //  y = drawSeparator(svg,y);


        var pmpTopY = y;

        if (typeof data.pmp !== 'undefined') {

          // add a spacer..
          y += this.params.trackHeight;

          var trackName = data.pmp.label;

          trackName = trackName.replace(' ', '_');

          colorPos++;

          if (colorPos >= colors.length) {
            colorPos = 0;
          }
          var trackdata = data.pmp;


          //var trackrows = breakTrackInRows(trackdata.tracks);
          var trackrows = drawer.breakTrackInRows(data.pmp.tracks);

          var url = "http://www.proteinmodelportal.org/query/up/" + data.uniprotID;

          var callbackexternal = function() {};

          if (trackdata.label === "Homology Models from Protein Model Portal") {
            callbackexternal = function() {
              if (typeof pageTracker !== 'undefined') {
                pageTracker._trackEvent('ProteinFeatureView',
                  'showPMPDialog', data.uniprotID);
              }

              var html = "<h3>" + this.desc + "</h3>";

              html += "<li>View all <a href='" + url +
                "' target='_new'>Homology Models at the Protein Model Portal</a></li>";
              html += "</ul>";

              var heading = "Protein Model Portal";

              var strSubmitFunc = "";
              var btnText = "";

              that.doModal(that.dialogDiv, heading, html, strSubmitFunc, btnText);
            };
          }


          if (trackrows.length > 0) {

            if (trackdata.label === "Homology Models from Protein Model Portal") {

              y = drawer.drawRangedTrack(svg, trackrows, y,
                "Homology Models", "Homology_Models",
                this.params.homColors, undefined, callbackexternal, trackdata.label);
            } else {
              y = drawer.drawGenericTrack(svg, trackrows, y, trackName, trackrows[0].desc,
                this.params.homColors, url, undefined, trackdata.label);
            }
          }
        }


        // spacer
        y += this.params.trackHeight;

        var pmpBottomY = y;
        if (pmpBottomY - pmpTopY < 40) {
          y = pmpTopY + 40;
          pmpBottomY = y;
        }
        drawer.drawSourceIndication(svg, 'Structural Biology Knowledge Base', pmpTopY, pmpBottomY);

      } else {
        var title1 = "Click here to view more details about " + data.uniprotID;


        var callback1 = function() {
          var location =  that.rcsbServer + "/pdb/protein/" + data.uniprotID;

          if ( that.displayPDB !=='') {
            location += "?addPDB=" + that.displayPDB;
          }
          window.location = location;
        };
        y = drawer.drawExpandCondensedSymbol(svg, pdbBottomY, title1, callback1);
      }


      var w = (data.length) * drawer.scale + this.params.leftBorder + this.params.rightBorder;

      // if ( w > $(svg._container).width() ) {
      //     w = $(svg._container).width();
      // }

      this.resetSize(svg, w, y + this.params.bottomBorder);


      // this.resetSize(svg, (data.length) * drawer.scale + this.params.leftBorder +
      //     this.params.rightBorder, y + this.params.bottomBorder);

      var fullTrackCount = this.getTotalNrPDBTracks();

      if (counter > 0) {
        if (counter < fullTrackCount) {

          $("#clusterStats").html("Showing " + counter + " representative out of " +
            fullTrackCount + " PDB chains");
        } else {
          $("#clusterStats").html("Showing all " + counter + " PDB chains");
        }
      } else {

        $("#clusterStats").html("Showing all PDB entries");
      }

      this.y = y;

      //var timet = new Date().getTime();

      $('[data-toggle="tooltip"]').tooltip();


      //console.log('init - tooltip ' + (timet-now));

      //var end = new Date().getTime();


      //console.log("time to repaint SVG graphics: " + (end-now));

    };


    /** Returns the total number of PDB entries that match to this UniProt.
     *
     */
    Viewer.prototype.getTotalNrPDBTracks = function() {


      var fullTrackCount = this.data.tracks.length;
      if (typeof this.data.backupTracks !== 'undefined') {

        fullTrackCount = this.data.backupTracks.length;
      }
      return fullTrackCount;

    };




    Viewer.prototype.hideColorLegend = function() {
      $("#colorLegend").html("");
    };

    Viewer.prototype.changeColorSelect = function(str) {

      this.colorBy = str;

      if (str === "Resolution") {
        this.hideColorLegend();
        //this.paired_colors = data.colors;

        this.drawer.updateTrackColors(this.params.redblue_colors);
        this.repaint();
        this.showColorLegend();

      } else {

        this.hideColorLegend();

        this.drawer.updateTrackColors(this.params.paired_colors);
        this.repaint();

      }

    };

    Viewer.prototype.setShowCondensed = function(flag) {


      var totalTracks = this.getTotalNrPDBTracks();
      if (totalTracks < 2) {
        return;
      }

      this.showCondensed = flag;

      this.filterTracks();

      this.repaint();

    };

    /** condense the tracks for sequences that have a large number of mappings like thrombin
     *
     */
    Viewer.prototype.filterTracks = function() {


      var data = this.data;
      if (this.showCondensed) {

        if (typeof data.backupTracks === 'undefined') {
          data.backupTracks = data.tracks;
        }

        if (data.tracks.length < data.backupTracks.length) {
          return;
          // already did filtering before...
        }

        var newTracks = [];

        for (var i = 0; i < data.backupTracks.length; i++) {
          var track = data.backupTracks[i];
          if (typeof track === 'undefined' || track === null) {
            continue;
          }
          if (this.trackShouldBeDisplayed(track)) {
            newTracks.push(track);
          }
        }

        data.tracks = newTracks;

      } else {
        if (typeof data.backupTracks !== 'undefined') {
          data.tracks = data.backupTracks;

        }
      }

      //checkUpdateSites4FirstTrack();


    };


    Viewer.prototype.getShowCondensed = function() {

      return this.showCondensed;

    };
    Viewer.prototype.showColorLegend = function() {

      var data = this.data;

      if (typeof data.colors === 'undefined') {
        return;
      }

      for (var i = 0; i < data.colors.length - 1; i++) {

        var color1 = data.colors[i];

        var colorBox1 = $("<div>").html("&nbsp;");
        $(colorBox1).attr("class", "leftBox headerExt alignmentBox11");
        $(colorBox1).css("background-color", color1.color);


        var colorMain1 = $("<div>").html(" Resolution < " + (i + 1) + " &Aring;");
        $(colorMain1).append(colorBox1);

        $("#colorLegend").append(colorMain1);
        $("#colorLegend").append("<br/>");

      }

      // the last color
      var color = data.colors[data.colors.length - 1];
      var colorBox = $("<div>").html("&nbsp;");
      $(colorBox).attr("class", "leftBox headerExt alignmentBox11");
      $(colorBox).css("background-color", color.color);


      var colorMain = $("<div>").html(" Resolution >= " + i + " &Aring;");
      $(colorMain).append(colorBox);
      $("#colorLegend").append(colorMain);
      $("#colorLegend").append("<br/>");

      // and the undefined...

      var colorBox2 = $("<div>").html("&nbsp;");
      $(colorBox2).attr("class", "leftBox headerExt alignmentBox11");
      $(colorBox2).css("background-color", this.bw_colors[6].color);


      var colorMain2 = $("<div>").html(" no Resolution ");
      $(colorMain2).append(colorBox2);

      $("#colorLegend").append(colorMain2);
      $("#colorLegend").append("<br/>");

    };









    Viewer.prototype.getSequence = function() {
      return this.data.sequence;
    };

    Viewer.prototype.sequenceMotifPopup = function(motif, txt) {
      var html = "<h3>" + txt + "</h3>";
      html += "<ul>";
      if (typeof pageTracker !== 'undefined') {
        pageTracker._trackEvent('ProteinFeatureView', 'showSeqMotifDialog', txt);
      }


      var url = this.rcsbServer + "/pdb/search/smart.do?&smartSearchSubtype_0=" +
        "MotifQuery&target=Current&motif_0=";

      html += "<li>Perform a <a href='" + url + motif + "'>Sequence Motif Search</a>.</li>";


      html += "</ul>";
      return html;

    };

    Viewer.prototype.blastPopup = function(seq, url, hits, desc, txt) {
      var html = "<h3>" + txt + "</h3>";
      html += "<ul>";
      if (typeof pageTracker !== 'undefined') {
        pageTracker._trackEvent('ProteinFeatureView', 'showUniProtDialog', txt);
      }


      var murl = this.rcsbServer + "/pdb/search/smart.do?" +
        "chainId_0=&eCutOff_0=0.001&" +
        "maskLowComplexity_0=yes&searchTool_0=blast&smartComparator=" +
        "and&smartSearchSubtype_0=" +
        "SequenceQuery&structureId_0=&target=Current&sequence_0=";

      html += "<li>Perform a <a href='" + murl + seq +
        "'>Blast sequence search against PDB</a> using this sequence region.</li>";

      if (typeof url !== "undefined") {
        // there is a URL, show it

        var urllabel = desc;
        if (typeof hits !== "undefined") {

          urllabel = "Show " + hits + " PDB entries that contain " + desc +
            " from " + this.data.uniprotID;
        }

        html += '<li><a href="' + url + '">' + urllabel + '</a></li>';
      }

      html += "</ul>";

      return html;
    };





    Viewer.prototype.sortTracks = function(text) {


      if (typeof this.data.tracks === 'undefined') {
        return;
      }


      if (text === 'Resolution') {
        try {
          this.data.tracks = $(this.data.tracks).sort(sortResolution);
        } catch (err) {
          console.log("ERROR DURING SORTING " + err);

        }

      } else if (text === 'Release Date') {
        this.data.tracks = $(this.data.tracks).sort(sortReleaseDate);
      } else if (text === 'Length') {
        this.data.tracks = $(this.data.tracks).sort(this.sortLength);
      } else if (text === 'Alignment Length') {
        this.data.tracks = $(this.data.tracks).sort(this.sortAlignLength);
      } else {
        this.data.tracks = $(this.data.tracks).sort(sortAlphabet);
      }

      this.defaultSort = text;

    };



    $.fn.extend({
      sort: function() {
        return this.pushStack([].sort.apply(this, arguments), []);
      }
    });


    function sortAlphabet(a, b) {
      if (a.pdbID === b.pdbID) {
        if (a.chainID === b.chainID) {
          return 0;
        } else {
          return a.chainID > b.chainID ? 1 : -1;
        }
      }
      return a.pdbID > b.pdbID ? 1 : -1;
    }

    function sortResolution(a, b) {
      if (a === 0 || b === null) {
        return 0;
      }

      if ((typeof a === 'undefined') ||
        (typeof b === 'undefined')
      ) {
        return 0;
      }
      if (
        (typeof a.resolution === 'undefined') &&
        (typeof b.resolution === 'undefined')
      ) {
        return 0;
      }
      if ((typeof a.resolution === 'undefined') &&
        (typeof b.resolution !== 'undefined')
      ) {
        return 1;
      }
      if ((typeof a.resolution !== 'undefined') &&
        (typeof b.resolution === 'undefined')
      ) {
        return -1;
      }

      if (a.resolution === b.resolution) {
        return 0;
      }

      return a.resolution > b.resolution ? 1 : -1;
    }

    function sortReleaseDate(a, b) {
      if (a.releaseDate === b.releaseDate) {
        return 0;
      }
      return a.releaseDate > b.releaseDate ? 1 : -1;

    }

    Viewer.prototype.sortLength = function(a, b) {
      if (a.length === b.length) {
        return 0;
      }
      return a.length > b.length ? -1 : 1;

    };
    Viewer.prototype.sortAlignLength = function(a, b) {
      if (a === null || b === null) {
        return 0;
      }

      if (typeof a.alignLength === 'undefined' ||
        typeof b.alignLength === 'undefined') {
        return 0;
      }

      if (a.alignLength === null || b.alignLength === null) {
        return 0;
      }


      if (a.alignLength === b.alignLength) {
        return 0;
      }
      return a.alignLength > b.alignLength ? -1 : 1;

    };


    Viewer.prototype.setPaletteName = function(name) {

      this.data.paletteName = name;
      this.reloadData();

    };

    Viewer.prototype.updatePalette = function() {

      $.each(this.data.palettes, function(key, value) {
        $('#paletteselect')
          .append($("<option></option>")
            .attr("value", value)
            .text(value)
          );
      });


    };

    Viewer.prototype.setShowSeqres = function(showS) {

      this.showSeqres = showS;

      if (this._initialized) {
        this.repaint();
      }

    };
    Viewer.prototype.getShowSeqres = function() {

      return this.showSeqres;


    };


    /** seqposEnd is optional */
    Viewer.prototype.highlight = function(seqposStart, seqposEnd) {

      if (typeof seqposEnd === 'undefined') {
        seqposEnd = seqposStart;
      }

      //console.log('highlighting seq pos' + seqposStart + "-" +seqposEnd);

      this.selectionStart = seqposStart;
      this.selectionEnd = seqposEnd;

      this.repaint();

    };

    Viewer.prototype.updateURL = function(currUrl, param, paramVal) {
      var url = currUrl;
      var newAdditionalURL = "";
      var tempArray = url.split("?");
      var baseURL = tempArray[0];
      var aditionalURL = tempArray[1];
      var temp = "";
      if (aditionalURL) {
        var splitArray = aditionalURL.split("&");
        for (var i = 0; i < splitArray.length; i++) {
          if (splitArray[i].split('=')[0] !== param) {
            newAdditionalURL += temp + splitArray[i];
            temp = "&";
          }
        }
      }
      var rows_txt = temp + "" + param + "=" + paramVal;
      var finalURL = baseURL + "?" + newAdditionalURL + rows_txt;
      return finalURL;
    };




    Viewer.prototype._dispatchEvent = function(event, newEventName, arg) {

      var callbacks = this.listenerMap[newEventName];
      if (callbacks) {
        callbacks.forEach(function(callback) {
          callback(arg, event);
        });
      }
    };

    Viewer.prototype.addListener = function(eventName, callback) {
      var callbacks = this.listenerMap[eventName];
      if (typeof callbacks === 'undefined') {
        callbacks = [];
        this.listenerMap[eventName] = callbacks;
      }

      callbacks.push(callback);


      if (this._initialized && eventName === 'viewerReady') {
        // don't use dispatch here, we only want this callback to be
        // invoked.
        callback(this, null);
      }
    };









    /** allows to talk to a different server location than default. Default is
     * localhost ( this.rcsbServer  = "");
     */

    Viewer.prototype.setRcsbServer = function(server) {
      this.rcsbServer = server;
    };



    Viewer.prototype.requestFullscreen = function() {

      var cont = $(this.contentDiv).attr('id');
      console.log(cont);

      var elem = document.getElementById(cont);

      console.log("element:" + elem);

      $(elem).css({
        'width': '100%',
        'height': '100%',
        'padding': '5%',
        'background': 'white'
      });

      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else {
        console.error("full screen does not seem to be supported on this system.");
      }

      this.updateScale();

      this.repaint();
    };


    return {
      PFV: function(elem, options) {

        return new Viewer(elem, options);
      }



    };
  });
