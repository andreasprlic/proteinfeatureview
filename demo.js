'use strict';
requirejs.config({
    baseUrl: 'js',
    paths:{
        colors:'pfv/colors',
        viewer:'pfv/viewer',
        draw:'pfv/draw',
        params:'pfv/params',
        jquery:'vendor/jquery-2.1.3.min',        
        jquerysvg:'vendor/svg/jquery.svg.min',
        bootstrap:'vendor/bootstrap-3.3.4.min',
        bootstrapslider:'vendor/bootstrap-slider.min'
    },
    shim:{
       
        'jquerysvg': {
            exports:"$",
            deps:['jquery']
        }
    }
});

var proteinFeatureView ;

require(['viewer','jquerysvg','bootstrapslider'], function(PFV){

    proteinFeatureView = PFV;

    var featureView = new Object();

    $( document ).ready(function() {

        var uniprotID="P06213";

    
        $(function() {

            // if has not been initialized, initialize...


            featureView = new proteinFeatureView.PFV();


            featureView.setParentDiv('#pfv-parent');
            featureView.setDialogDiv('#dialog');
            featureView.setScrollBarDiv('#svgScrollBar');

            featureView.setRcsbServer("http://pepper.rcsb.org:8080");

            featureView.setShowSeqres(true);
            
            
            //featureView.setTracks([]);


            featureView.loadUniprot(uniprotID);

            $('#up-field').val(uniprotID);
            $('#up-field').change(function(){

                var val =   $('#up-field').val();
                console.log("loading new uniprot " + val );
                featureView.loadUniprot(val);

            });

            $("#zoomOut").click(function(){

                var val = featureView.getScrollBarValue();
                val -= 25;
                featureView.setScrollValue(val);

            });
            $("#zoomIn").click(function(){
                var val = featureView.getScrollBarValue();

                val += 25;

                featureView.setScrollValue(val);
            });
           

            $('#fullScreen').click(function(){
                featureView.requestFullscreen(); 
                return false;
            });

             $('#export').click(
            function() {
                var svg = featureView.getSVGWrapper();
                var xml = svg.toSVG();
                open("data:image/svg+xml," + encodeURIComponent(xml));
               
            });

        });


        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        });


    });



  $('#findMotifDialogSubmit').click(function(){

                    // $('mySequenceMotifDialog').modal({'show':false});

                    $("#findSequenceMotif").submit()
                });


                var previousMotif = "";
                var myRegExp = new RegExp("$");

                $("#findSequenceMotif").submit(function(event){

                    var motif = $('#enterMotif').val();

                    // to upper case
                    motif = motif.toUpperCase();

                    //replaceAll("X", "[A-Z]"
                    motif = motif.replace(/X/g,'[A-Z]');

                    console.log('looking for motif ' + motif);

                    var seq = featureView.getSequence();


                    if ( previousMotif != motif){
                        previousMotif = motif;
                        myRegExp = new RegExp(motif,"g");
                    }

                    var match = myRegExp.exec(seq);

                    var pos = -1;

                    

                    //if ( match[0].length > 0)
                    try {
                        if ( match != null)
                            pos = match.index;
                            console.log("found at at position " + pos);

                        if (pos < 0) {
                            alert('Motif not found!');
                            event.preventDefault();
                        } else {
                            //console.log(pos + " " + match[0] + " lastIndex:" + myRegExp.lastIndex);
                            var seqLength = match[0].length;

                            featureView.highlight(pos, pos + seqLength - 1);

                            if ( myRegExp.lastIndex == 0)
                                $('#mySequenceMotifDialog').modal('hide');

                        }
                    } catch (e){
                        console.log(e);
                    }
                    event.preventDefault();
                });

});


