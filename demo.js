'use strict';
requirejs.config({
  baseUrl: 'js',
  paths: {
    colors: 'pfv/colors',
    viewer: 'pfv/viewer',
    draw: 'pfv/draw',
    params: 'pfv/params',
    icons: 'pfv/icons',
    popups: 'pfv/popups',
    jquery: 'vendor/jquery-2.1.3.min',
    jquerysvg: 'vendor/svg/jquery.svg.min',
    'bootstrap/tooltip': 'vendor/bootstrap-3.3.5/js/tooltip',
    'bootstrap/modal': 'vendor/bootstrap-3.3.5/js/modal',
    'bootstrap/button': 'vendor/bootstrap-3.3.5/js/button',
    'bootstrap/dropdown': 'vendor/bootstrap-3.3.5/js/dropdown',
    bootstrapslider: 'vendor/bootstrap-slider.min'
  },
  shim: {
    'jquerysvg': {
      exports: "$",
      deps: ['jquery']
    },
    'bootstrap/affix': {
      deps: ['jquery'],
      exports: '$.fn.affix'
    },
    'bootstrap/alert': {
      deps: ['jquery'],
      exports: '$.fn.alert'
    },
    'bootstrap/button': {
      deps: ['jquery'],
      exports: '$.fn.button'
    },
    'bootstrap/carousel': {
      deps: ['jquery'],
      exports: '$.fn.carousel'
    },
    'bootstrap/collapse': {
      deps: ['jquery'],
      exports: '$.fn.collapse'
    },
    'bootstrap/dropdown': {
      deps: ['jquery'],
      exports: '$.fn.dropdown'
    },
    'bootstrap/modal': {
      deps: ['jquery'],
      exports: '$.fn.modal'
    },
    'bootstrap/popover': {
      deps: ['jquery'],
      exports: '$.fn.popover'
    },
    'bootstrap/scrollspy': {
      deps: ['jquery'],
      exports: '$.fn.scrollspy'
    },
    'bootstrap/tab': {
      deps: ['jquery'],
      exports: '$.fn.tab'
    },
    'bootstrap/tooltip': {
      deps: ['jquery'],
      exports: '$.fn.tooltip'
    },
    'bootstrap/transition': {
      deps: ['jquery'],
      exports: '$.fn.transition'
    },

    'bootstrapslider': {
      deps: ['bootstrap/tooltip']
    }

  }
});



<!-- NGL code part I -->

if ( typeof NGL !== 'undefined') {
NGL.useWorker = false;

var stage = new NGL.Stage("nglContainer", {
  'theme': 'light',
  'overwritePreferences': 'true',
  'backgroundColor':'white',
});
}
var licorice;



var proteinFeatureView;
var featureView = new Object();

require(['viewer', 'jquerysvg', 'bootstrap/tooltip', 'bootstrap/modal', 'bootstrap/dropdown', 'bootstrapslider'], function(PFV) {

  proteinFeatureView = PFV;

  $(document).ready(function() {
    console.log('document ready - pfv');

    //P05067
    //P43379
    var uniprotID = "P68871";

    // if has not been initialized, initialize...

    featureView = new proteinFeatureView.PFV();

    featureView.addListener('viewerReady', function() {
      console.log("viewer ready")
      var data = featureView.getData();
      console.log(data.uniprotID + " " + data.desc);
      $("#dispUniprotID").html(data.uniprotID);
      $("#dispUniprotName").html(data.desc + "");

      var tracks = data.tracks;
      if (typeof tracks !== 'undefined' && data.tracks.length > 0) {
        var firstTrack = data.tracks[0];
        if ( typeof NGL !== 'undefined') {
          showPdb3d(firstTrack.pdbID, firstTrack.chainID);
        }
        featureView.set3dViewFlag(firstTrack.pdbID, firstTrack.chainID);

      }
    });

    featureView.addListener('dataReloaded', function(event) {
      console.log("Data got reloaded .. " + event.data.uniprotID);
      var tracks = event.data.tracks;
      if (typeof tracks !== 'undefined' && tracks.length > 0) {
        var firstTrack = tracks[0];
        if ( typeof NGL !== 'undefined') {
            showPdb3d(firstTrack.pdbID, firstTrack.chainID);

          featureView.set3dViewFlag(firstTrack.pdbID, firstTrack.chainID);
        }
      }
    });


    featureView.setParentDiv('#pfv-parent');
    featureView.setDialogDiv('#dialog');
    featureView.setScrollBarDiv('#svgScrollBar');

    featureView.setRcsbServer("http://www.rcsb.org/");

    //featureView.addPDB("2lp1");

    featureView.loadUniprot(uniprotID);

    $('#up-field').val(uniprotID);

    $('#up-field').change(function() {

      var val = $('#up-field').val();

      console.log("loading new uniprot " + val);

      // update the track URLs
      featureView.setUniprotId(val);
      featureView.setDefaultTracks();
      featureView.loadUniprot(val);

    });

    $("#zoomOut").click(function() {

      var val = featureView.getScrollBarValue();
      val -= 25;
      featureView.setScrollValue(val);

    });
    $("#zoomIn").click(function() {
      var val = featureView.getScrollBarValue();

      val += 25;

      featureView.setScrollValue(val);
    });


    $('#fullScreen').click(function() {
      featureView.requestFullscreen();
      return false;
    });

    $('#export').click(
      function() {
        var svg = featureView.getSVGWrapper();
        var xml = svg.toSVG();
        open("data:image/svg+xml," + encodeURIComponent(xml));

      });




  }); // document ready


  $("#colorselect").change(
    function() {
      var str = $(this).val();
      featureView.changeColorSelect(str);
    });

  $("#sortselect").change(function() {
    var text = $(this).val();
    featureView.sortTracks(text);
    featureView.repaint();
  });


  $('#findMotifDialogSubmit').click(function() {

    // $('mySequenceMotifDialog').modal({'show':false});

    $("#findSequenceMotif").submit();
  });


  var previousMotif = "";
  var myRegExp = new RegExp("$");

  $("#findSequenceMotif").submit(function(event) {

    var motif = $('#enterMotif').val();

    // to upper case
    motif = motif.toUpperCase();

    //replaceAll("X", "[A-Z]"
    motif = motif.replace(/X/g, '[A-Z]');

    console.log('looking for motif ' + motif);

    var seq = featureView.getSequence();


    if (previousMotif != motif) {
      previousMotif = motif;
      myRegExp = new RegExp(motif, "g");
    }

    var match = myRegExp.exec(seq);

    var pos = -1;



    //if ( match[0].length > 0)
    try {
      if (match != null)
        pos = match.index;
      console.log("found at at position " + pos);

      if (pos < 0) {
        alert('Motif not found!');
        event.preventDefault();
      } else {
        //console.log(pos + " " + match[0] + " lastIndex:" + myRegExp.lastIndex);
        var seqLength = match[0].length;

        featureView.highlight(pos, pos + seqLength - 1);

        if (myRegExp.lastIndex == 0)
          $('#mySequenceMotifDialog').modal('hide');

      }
    } catch (e) {
      console.log(e);
    }
    event.preventDefault();
  }); //

  <!-- NGL code part II-->
  featureView.addListener("showPositionIn3d", function(event, data, moredate) {

    //console.log("event:" + event);
    console.log("data:" + JSON.stringify(event));

    var pdbId = event.pdbId;
    var chainId = event.chainId;
    showPdb3d(pdbId, chainId, event.pdbStart, event.pdbEnd);

    featureView.set3dViewFlag(pdbId, chainId);

  });


  featureView.addListener("selectionChanged", function(event, data, moredate) {

    //console.log("event:" + event);
    console.log("selection changed:" + JSON.stringify(data) + " " + JSON.stringify(moredate));

  });



}); // require


var currentPdbId = "";


function highlight3d(comp, chainId, pdbStart, pdbEnd) {

  comp.addRepresentation("licorice", {
    sele: 'not polymer and not water',
    color: "element",
    radius: .4
  });

  comp.addRepresentation("spacefill", {
    sele: 'not polymer and not water ',
    color: "element",
    radius: .6
  });

  comp.centerView();

  if (chainId !== undefined && pdbStart !== undefined && pdbEnd !== undefined) {

    var color = 'red';
    var style = 'licorice';

    var sele = pdbStart + "-" + pdbEnd + ":" + chainId;

    if (pdbEnd - pdbStart < 2) {
      color = 'yellow';
      style = 'spacefill';
    }

    if (pdbEnd - pdbStart < 2) {
      comp.addRepresentation(style, {
        sele: sele,
        color: "element"
      });
    }

    comp.centerView(false, sele);

    var schemeId = NGL.ColorMakerRegistry.addSelectionScheme( [
                            [ "red", sele ],
                            [ "grey", "*" ],
                        ], "my custom schema");


    comp.addRepresentation("cartoon", {
                           color: schemeId
                        });

    // draw labels
    comp.addRepresentation("label", {
                            sele: sele+".CA",
                            color: "gold",
                            scale: 2.0,
                            zOffset: 4.0
                        });

  } else if (chainId !== undefined && pdbStart !== undefined) {

    comp.addRepresentation("spacefill", {
      sele: pdbStart + ":" + chainId,
      color: "element"
    });
    comp.addRepresentation("cartoon", {
      color: "grey"
    });
  } else if (chainId !== undefined) {
    comp.addRepresentation("cartoon", {
      sele: ":" + chainId,
      color: "sstruc"
    });
    comp.addRepresentation("cartoon", {
      sele: "not :" + chainId,
      color: "grey"
    });
  } else {

    comp.addRepresentation("cartoon", {
      colorScheme: "sstruc"
    });

  }

}

function showPdb3d(pdbId, chainId, pdbStart, pdbEnd) {

  if ( typeof NGL === 'undefined') {
    return;
  }


  console.log("current PDB: " + currentPdbId + " old: " + pdbId);

  if (currentPdbId === pdbId) {
    stage.eachComponents(function(comp) {
      highlight3d(comp, chainId, pdbStart, pdbEnd);
    });

    return;
  }

  try {
    stage.removeAllComponents();
  } catch (e) {
    console.error(e);
  }

  console.log("Showing in NGL " + pdbId + "  " + chainId + " " + pdbStart + " " + pdbEnd);

  stage.loadFile("rcsb://" + pdbId + ".mmtf").then(function(comp) {

    //stage.centerView();

    highlight3d(comp, chainId, pdbStart, pdbEnd);

  });
}



function changeHighlight(sele) {
  licorice.setParameters({
    sele: sele
  });
}

if ( typeof stage !== 'undefined'){
stage.signals.clicked.add(function(info) {
  console.log(info);


  if (info.atom !== undefined) {

    $("#ngl_status").text(info.atom.chainname + " " + info.atom.resno + " " + info.atom.resname + " " + info.atom.atomname );
  }
  if (info.bond !== undefined) {

    var atom1 = info.bond.atom1.chainname + " " + info.bond.atom1.resno + " " + info.bond.atom1.resname + " " + info.bond.atom1.atomname
    var atom2 = info.bond.atom2.chainname + " " + info.bond.atom2.resno + " " + info.bond.atom2.resname + " " + info.bond.atom2.atomname

    $("#ngl_status").text(atom1 + " - " + atom2);
  }



});
}

// If jQuery is loaded, print the version- else display a warning at the top of the page
if (typeof jQuery != 'undefined') {
    console.info("Software Version: jQuery " + jQuery.fn.jquery);
    //console.info("Software Version: Bootstrap " + $.fn.modal.Constructor.VERSION);
    $(document).ready(function(){
        if (jQuery) {
            if (jQuery.ui) {
                console.warn("WARNING: jQuery UI is being deprecated!\nSoftware Version: jQuery UI " + jQuery.ui.version);
            }
        }
        if (typeof Jmol != 'undefined') {
            if (typeof Jmol.___JmolVersion != 'undefined') {
                console.info("Software Version: JSmol " + Jmol.___JmolVersion)
            }
        }
    });
} else {
    console.error("No jQuery loaded!");
    document.getElementById("UnsupportedBrowser").className = "hidden-print";
}
