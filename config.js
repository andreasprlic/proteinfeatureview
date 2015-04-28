'use strict';
requirejs.config({
    baseUrl: 'js',
    paths:{
        viewer:'pfv/viewer',
        colors:'pfv/colors',
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
    },
    options:{
        include:['kt/vendor/require.js']
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



