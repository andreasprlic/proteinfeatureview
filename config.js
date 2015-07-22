'use strict';
requirejs.config({
    baseUrl: 'js',
    paths:{
        viewer:'pfv/viewer',
        colors:'pfv/colors',
        draw:'pfv/draw',
        params:'pfv/params',
        querysuggest:'vendor/querysuggest-1.0.0',
        jquery:'vendor/jquery-2.0.2.min',
        jqueryui:'vendor/jquery-ui-1.11.1.min',
        jquerysvg:'vendor/svg/jquery.svg.min',
        jquerycookie:'vendor/jquery-cookie.min',
        jquerycarousel:'vendor/jquery-carousel',
        jquerycolorbox:'vendor/jquery-colorbox-min',
        bootstrap:'vendor/bootstrap-3.3.4.min'
        
    },
    shim:{
        'jqueryui': {
            exports:"$",
            deps:['jquery']
        },
        'jquerysvg': {
            exports:"$",
            deps:['jqueryui']
        },
        'querysuggest': {
            exports:"$",
            deps:['jqueryui']
        },
         'jquerycookie': {
            exports:"$",
            deps:['jquery']
        },
        'jquerycarousel': {
            exports:"$",
            deps:['jquery']
        },
        'jquerycolorbox': {
            exports:"$",
            deps:['jquery']
        }
    },
    options:{
        include:['vendor/require.js'],
    }

});

define(function(require){
    "use strict";

    var pfv = require(viewer);

    return {
        PFV:viewer.PFV,
        about:'Protein Feature View, a SVG based viewer for protein sequence annotations'
    };
});



