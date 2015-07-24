'use strict';
requirejs.config({
    baseUrl: 'js',
    paths:{
        viewer:'pfv/viewer',
        colors:'pfv/colors',
        draw:'pfv/draw',
        params:'pfv/params',
        querysuggest:'vendor/querysuggest-1.0.0',
        jquery:'vendor/jquery-2.1.3.min',        
        jquerysvg:'vendor/svg/jquery.svg.min',                 
        bootstrap:'vendor/bootstrap-3.3.4.min',
        bootstrapslider:'vendor/bootstrap-slider.min'
        
    },
    shim:{
      
        'jquerysvg': {
            exports:"$",
            deps:['jquery']
        },

        'bootstrap': {
            exports: "$.fn.popover",
            deps:['jquery']
        },        
        'bootstrapslider': {
            deps:['bootstrap']
        }
       
    },
    options:{
        include:['vendor/require.js'],
    },
    enforceDefine: true

});

define(function(require){
    "use strict";

    var pfv = require(viewer);

    return {
        PFV:viewer.PFV,
        about:'Protein Feature View, a SVG based viewer for protein sequence annotations'
    };
});



