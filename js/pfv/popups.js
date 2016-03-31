/* -*- mode: javascript; c-basic-offset: 4; indent-tabs-mode: nil -*- */
/*jslint maxlen: 120 */
/*global pageTracker:false*/
/*global $:false */
/**
 *  Protein Feature View v. {{ VERSION }} build {{ BUILD }}
 *
 *  Draws a graphical summary of PDB and UniProtKB relationships for a single UniProtKB sequence.
 *
 *  @author Andreas Prlic
 */

define(
  function() {
    function Popups() {}

    Popups.prototype.init = function(viewer, rcsbServer) {

      this.viewer = viewer;

      this.rcsbServer = rcsbServer;

    };

    Popups.prototype.showSequenceDialog = function(path) {

      var data = this.viewer.data;

      var svg = this.viewer.getSVGWrapper();

      var offset = $(svg.root()).offset();

      var x = path.pageX - offset.left;

      //var y = path.pageY - offset.top;
      var seqPos = this.viewer.drawer.screen2Seq(x) - 1;

      if (seqPos > this.viewer.data.sequence.length) {
        seqPos = -1;
      }

      var pdbPositions = this.viewer.getPdbPositions(seqPos);

      //$(this.dialogDiv).attr('title', data.uniprotID );
      if (typeof pageTracker !== 'undefined') {
        pageTracker._trackEvent('ProteinFeatureView', 'showSequenceDialog', data.uniprotID);
      }
      var html = "";

      html += this.viewer.showPdb3dLinks(pdbPositions);

      if (this.viewer.singlePDBmode) {
        html += "<h3>" + data.uniprotID + "-" + data.name + "</h3>";
        html += "Show All <a href='" + this.rcsbServer + "/pdb/protein/" + data.uniprotID +
          "'>PDB-UniProtKB mappings</a> that are available for " + data.uniprotID;

      } else {

        html += "<h3>Search RCSB PDB</h3>";

        html += "<ul><li><a href='" + this.rcsbServer +
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

      this.viewer.doModal(this.viewer.dialogDiv, heading, html, strSubmitFunc, btnText);

      this.viewer.registerPdb3dLinks(pdbPositions);

      // if (seqPos >= 0) {
      //   this.viewer.selectionStart = seqPos;
      //   this.viewer.selectionEnd = seqPos;
      //   this.viewer.repaint();
      //
      // }
    };

    Popups.prototype.blastPopup = function(seq, url, hits, desc, txt, pdbPositions) {

      var html = "";

      html += this.viewer.showPdb3dLinks(pdbPositions,"blast");

      html += "<h3>Search RCSB PDB</h3>";

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
            " from " + this.viewer.data.uniprotID;
        }

        html += '<li><a href="' + url + '">' + urllabel + '</a></li>';
      }

      html += "</ul>";

      return html;
    };


    Popups.prototype.sequenceMotifPopup = function(motif, txt, pdbPositions) {

      console.log("sequenceMotifPopup " + motif + " | " + txt);

      var html = "";

      html += this.viewer.showPdb3dLinks(pdbPositions);

      html += "<h3>" + txt + "</h3>";
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


    Popups.prototype.clickUpSiteMethod = function(site, event) {

      var parent = event.target || event.toElement;

      var title = parent.title;

      if (typeof title === 'undefined') {
        // probably the tooltip is open
        title = $(parent).attr('data-original-title');
      }

      // show Popup
      if (typeof pageTracker !== 'undefined') {
        pageTracker._trackEvent('ProteinFeatureView',
          'clickUPSite', this.viewer.data.uniprotID);
      }

      var html = title;

      var pdbPositions = this.viewer.getPdbPositions(site.start - 1, site.end - 1);

      html += this.viewer.showPdb3dLinks(pdbPositions);

      var heading = "UP Sites";

      var strSubmitFunc = "";
      var btnText = "";

      this.viewer.doModal(this.viewer.dialogDiv, heading, html, strSubmitFunc, btnText);

      this.viewer.registerPdb3dLinks(pdbPositions);

      //this.viewer.highlight(site.start - 1, site.end - 1);

    };

    Popups.prototype.clickPhosphoMethod = function(range, event) {

      var parent = event.target || event.toElement;

      var title = parent.title;

      if (typeof title === 'undefined') {
        // probably the tooltip is open
        title = $(parent).attr('data-original-title');
      }

      var html = title;

      this.viewer.highlight(range.start - 1, range.end - 1);

      var pdbPositions = this.viewer.getPdbPositions(range.start - 1, range.end - 1);

      html += this.viewer.showPdb3dLinks(pdbPositions);

      // show Popup
      if (typeof pageTracker !== 'undefined') {
        pageTracker._trackEvent('ProteinFeatureView',
          'clickPhosphoSite', this.viewer.data.uniprotID);
      }

      html += "<h3>PhosphoSitePlus</h3>";

      html += "<ul>";

      var url = "http://www.phosphosite.org/" +
        "proteinSearchSubmitAction.do?accessionIds=" +
        this.viewer.data.uniprotID;

      html += "<li>Show at <a target='_new'' href='" + url +
        "'>PhosphoSitePlus website</a></li>";

      html += "</ul>";

      var heading = "Phosphosite";

      var strSubmitFunc = "";
      var btnText = "";

      this.viewer.doModal(this.viewer.dialogDiv, heading, html, strSubmitFunc, btnText);

      this.viewer.registerPdb3dLinks(pdbPositions);
    };

    Popups.prototype.callbackec = function(range) {

      var brendaurl = "http://www.brenda-enzymes.org/php/result_flat.php4?ecno=";
      var pdbecurl = this.viewer.rcsbServer + "/pdb/search/smartSubquery.do?smartSearchSubtype=" +
        "EnzymeClassificationQuery&Enzyme_Classification=";

      var html = "<h3>" + range.name + " - " + range.desc + "</h3>";
      html += "<ul><li>View in <a href='" + brendaurl + range.name +
        "' target='_new'>BRENDA</a></li>";
      html += "<li>View <a href='" + pdbecurl + range.name + "'>other PDB entries with" +
        " the same E.C. number</a></li>";
      html += "</ul>";

      if (typeof pageTracker !== 'undefined') {
        pageTracker._trackEvent('ProteinFeatureView', 'showECDialog', range.name);
      }


      var heading = range.name + ' - ' + range.desc;

      var strSubmitFunc = "";
      var btnText = "";

      this.viewer.doModal(this.viewer.dialogDiv, heading, html, strSubmitFunc, btnText);

    };

    Popups.prototype.callbackUniProtFeature = function(event) {

      // if (event.start >= 0) {
      //   this.viewer.selectionStart = event.start - 1;
      //   this.viewer.selectionEnd = event.end - 1;
      //   this.viewer.repaint();
      // }

      // show draw dialog..

      var txt = event.name;

      if (event.name !== event.desc) {
        txt += " - " + event.desc;
      }

      var pdbPositions = this.viewer.getPdbPositions(event.start - 1, event.end - 1);

      var html = "";
      if (event.name === "short sequence motif") {

        var spl = event.desc.split(" ");
        if (spl.length === 2) {
          html = this.popup.sequenceMotifPopup(spl[0], txt, event.start, event.end);
        }
      }

      if (html === "") {
        var seq = this.viewer.getData().sequence.substr(event.start, (event.end - event.start + 1));
        html = this.popups.blastPopup(seq, event.url, event.hits, event.desc, txt, pdbPositions);
      }


      var heading = "<h1>" + txt + "</h1>";
      var strSubmitFunc = "";
      var btnText = "";

      this.viewer.doModal(this.viewer.dialogDiv, heading, html, strSubmitFunc, btnText);

      this.viewer.registerPdb3dLinks(pdbPositions,"blast");
    };

    Popups.prototype.scopcallback = function(range) {
      // show draw dialog..

      var txt = range.name;

      if (range.name !== range.desc) {
        txt += " - " + range.desc;

        if (typeof range.note !== 'undefined') {
          txt += " (" + range.note + ")";
        }
      }

      var html = "";

      var pdbPositions = this.viewer.getPdbPositions(range.start - 1, range.end - 1);

      html += this.viewer.showPdb3dLinks(pdbPositions,"scop");

      html += "<h3>" + txt + "</h3>";
      html += "<ul>";
      if (typeof pageTracker !== 'undefined') {
        pageTracker._trackEvent('ProteinFeatureView', 'showSCOPeDialog', txt);
      }

      var url = "http://scop.mrc-lmb.cam.ac.uk/scop/search.cgi?ver=1.75&key=" + range.name;

      html += "<li>Show at <a target='_new'' href='" + url + "'>SCOP website</a></li>";

      html += "</ul>";

      var heading = txt;

      var strSubmitFunc = "";
      var btnText = "";

      this.viewer.doModal(this.viewer.dialogDiv, heading, html, strSubmitFunc, btnText);
      this.viewer.registerPdb3dLinks(pdbPositions,"scop");
      //this.viewer.highlight(range.start - 1, range.end - 1);

    };

    Popups.prototype.scopecallback = function() {
      // show draw dialog..

      var txt = this.name;

      if (this.name !== this.desc) {
        txt += " - " + this.desc;
        if (typeof this.note !== 'undefined') {
          txt += " (" + this.note + ")";
        }
      }

      var html = "<h1>" + txt + "</h1>";
      html += "<ul>";
      if (typeof pageTracker !== 'undefined') {
        pageTracker._trackEvent('ProteinFeatureView', 'showSCOPeDialog', txt);
      }

      var url = "http://scop.berkeley.edu/sccs=" + this.name;

      html += "<li>Show at <a target='_new'' href='" + url + "'>SCOPe website</a></li>";


      html += "</ul>";


      var heading = txt;

      var strSubmitFunc = "";
      var btnText = "";

      this.viewer.doModal(this.viewer.dialogDiv, heading, html, strSubmitFunc, btnText);
    };


    Popups.prototype.showPfamDialog = function(pfam) {


      var pfamId = pfam.acc;
      var desc = pfam.desc;
      //$(this.dialogDiv).attr('title', pfamId + ' - '  + pfam.name);
      if (typeof pageTracker !== 'undefined') {
        pageTracker._trackEvent('ProteinFeatureView', 'showPfamDialog', pfamId);
      }

      var html = "";

      var pdbPositions = this.viewer.getPdbPositions(pfam.start - 1, pfam.end - 1);

      html += this.viewer.showPdb3dLinks(pdbPositions);

      html += "<h3> " + desc + "</h3>" +
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

      this.viewer.doModal(this.viewer.dialogDiv, heading, html, strSubmitFunc, btnText);
      this.viewer.registerPdb3dLinks(pdbPositions);

    };


    Popups.prototype.showExonDialog = function(exon) {

      var geneId = exon.acc;
      var desc = exon.desc;
      //$(this.dialogDiv).attr('title', pfamId + ' - '  + pfam.name);
      if (typeof pageTracker !== 'undefined') {
        pageTracker._trackEvent('ProteinFeatureView', 'showExonDialog', geneId);
      }

      var html = "<h1> Exon " + desc + "</h1>" ;

      var pdbPositions = this.viewer.getPdbPositions(exon.start - 1, exon.end - 1);

      html += this.viewer.showPdb3dLinks(pdbPositions);

      html += "<h3>RCSB PDB Gene View</h3>" ;

      html +=  "<ul><li>Go to RCSB Gene View for <a href=\"/pdb/gene/" + geneId + "\"" +
        " target=\"_new\">" + geneId + " </a></li>";

      html += "</ul>";


      var heading = geneId + " - " + exon.name;
      var strSubmitFunc = "";
      var btnText = "";

      this.viewer.doModal(this.viewer.dialogDiv, heading, html, strSubmitFunc, btnText);
      this.viewer.registerPdb3dLinks(pdbPositions);
      //this.viewer.highlight(exon.start - 1, exon.end - 1);
    };

    Popups.prototype.clickVariationMethod = function(range,event) {

      var parent = event.target || event.toElement;

      var title = parent.title;

      if (typeof title === 'undefined') {
        // probably the tooltip is open
        title = $(parent).attr('data-original-title');
      }

      // show Popup
      if (typeof pageTracker !== 'undefined') {
        pageTracker._trackEvent('ProteinFeatureView',
          'clickVariationSNP', this.viewer.data.uniprotID);
      }

      var html = title;

      var pdbPositions = this.viewer.getPdbPositions(range.start - 1, range.end - 1);

      html += this.viewer.showPdb3dLinks(pdbPositions);

      var extLinks = $(parent).data('extLinks');
      if (typeof extLinks !== 'undefined' && extLinks !== "" && extLinks.length > 0) {
        html += "<ul>";

        for (var ext = 0; ext < extLinks.length; ext++) {

          var extLink = extLinks[ext];
          if (typeof extLink !== 'undefined' && extLink !== "" &&
            extLink.sitename !== 'undefined' && extLink.sitename !== "" &&
            extLink.siteurl !== 'undefined' && extLink.siteurl !== "") {
            html += "<li>Show at <a target='_new'' href='" + extLink.siteurl +
              "'>" + extLink.sitename + "</a></li>";
          }

        }
        html += "</ul>";
      }

      var heading = "Variation";

      var strSubmitFunc = "";
      var btnText = "";

      this.viewer.doModal(this.viewer.dialogDiv, heading, html, strSubmitFunc, btnText);

      this.viewer.registerPdb3dLinks(pdbPositions);

      //this.viewer.highlight(range.start - 1, range.end - 1);
    };


    Popups.prototype.showDialog = function(track,event) {


      if (typeof track === 'undefined') {
        return;
      }

      var pdbID = track.pdbID.trim();
      var desc = track.desc;
      //var chainID = track.chainID.trim();

      if (typeof pageTracker !== 'undefined') {
        pageTracker._trackEvent('ProteinFeatureView', 'showPDBDialog', desc);
      }


      var html = "<span><img width='240' src='" + this.viewer.rcsbServer + "/pdb/images/" +
        pdbID.toLowerCase() + "_bio_r_250.jpg?getBest=true' /></span>";

        var svg = this.viewer.getSVGWrapper();
        var offset = $(svg.root()).offset();

        var x = event.pageX - offset.left;

        //var y = path.pageY - offset.top;
        var seqPos = this.viewer.drawer.screen2Seq(x) - 1;

        if (seqPos > this.viewer.data.sequence.length) {
          seqPos = -1;
        }

      var allPdbPositions = this.viewer.getPdbPositions(seqPos);
      //console.log(allPdbPositions);
      var pdbPositions = [];

      var pos = {};

      pos.pdbId = track.pdbID;
      pos.chainId = track.chainID;

      if ( seqPos >= 0){

        for (var p =0 ; p < allPdbPositions.length ; p++ ){

          var pdbPos = allPdbPositions[p];
          if ( pdbPos.pdbId === pos.pdbId && pdbPos.chainId === pos.chainId){
            pos = pdbPos;
            break;
          }
        }
      }


      pdbPositions.push(pos);

      html += this.viewer.showPdb3dLinks(pdbPositions,"uniprot");

      html += "<h3>Search RCSB PDB</h3>";
      html += '<ul>';



      // var svg = '<svg><g transform="matrix(1,0,0,-1,0,10) scale(0.005)" title="" '+
      // 'rel="tooltip" data-toggle="tooltip" data-container="body" style="cursor: pointer;" '+
      // 'data-original-title="Shown in 3D viewer"><path d="' +
      // this.icons.eye +
      // '"></path></g></svg>';



      html += '<li><a href="' + this.viewer.rcsbServer + '/pdb/explore/explore.do?structureId=' +
        pdbID + '">Structure Summary Page for ' + pdbID + '</a></li>';

      html += "</ul>";

      var heading = 'View ' + pdbID + ' - ' + desc;

      //var strSubmitFunc = that.load3DChain(pdbID, chainID);
      var strSubmitFunc = "";
      var btnText = "";

      this.viewer.doModal(this.viewer.dialogDiv, heading, html, strSubmitFunc, btnText);
      this.viewer.registerPdb3dLinks(pdbPositions,"uniprot");
    };





    return {
      Popups: function() {
        return new Popups();
      }
    };

  });
