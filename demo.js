'use strict';
requirejs.config({
    baseUrl: 'js',
    paths:{
        colors:'pfv/colors',
        viewer:'pfv/viewer',
        draw:'pfv/draw',
        params:'pfv/params',
        jquery:'vendor/jquery-2.0.2.min',
        jqueryui:'vendor/jquery-ui-1.11.1.min',
        jquerysvg:'vendor/svg/jquery.svg.min'
    },
    shim:{
        'jqueryui': {
            exports:"$",
            deps:['jquery']
        },
        'jquerysvg': {
            exports:"$",
            deps:['jqueryui']
        }
    }
});

var proteinFeatureView ;

require(['viewer','jquerysvg'], function(PFV){

    proteinFeatureView = PFV;

    var entityView = new Object();

    $( document ).ready(function() {

        var uniprotID="P06213";

    
        $(function() {

            // if has not been initialized, initialize...


            entityView = new proteinFeatureView.PFV();


            entityView.setParentDiv('#pfv-parent');
            entityView.setDialogDiv('#dialog');
            entityView.setScrollBarDiv('#svgScrollBar');

            entityView.setRcsbServer("http://pepper.rcsb.org:8080");

            entityView.setShowSeqres(true);
            
            
            //entityView.setTracks([]);


            entityView.loadUniprot(uniprotID);

            $('#up-field').val(uniprotID);
            $('#up-field').change(function(){

                var val =   $('#up-field').val();
                console.log("loading new uniprot " + val );
                entityView.loadUniprot(val);

            });

            $("#zoomOut").click(function(){

                var val = entityView.getScrollBarValue();
                val -= 25;
                entityView.setScrollValue(val);

            });
            $("#zoomIn").click(function(){
                var val = entityView.getScrollBarValue();

                val += 25;

                entityView.setScrollValue(val);
            });
           

            $('#fullScreen').click(function(){
                entityView.requestFullscreen(); 
                return false;
            });

             $('#export').click(
            function() {
                var svg = entityView.getSVGWrapper();
                var xml = svg.toSVG();
                open("data:image/svg+xml," + encodeURIComponent(xml));
               
            });

        });


    });

});


