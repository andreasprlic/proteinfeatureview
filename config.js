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
        'bootstrap/tooltip':'vendor/bootstrap-3.3.5/js/tooltip',
        'bootstrap/modal':'vendor/bootstrap-3.3.5/js/modal',
        'bootstrap/button':'vendor/bootstrap-3.3.5/js/button',
        // 'bootstrap/dropdown':'vendor/bootstrap-3.3.5/js/dropdown',
        'bootstrap/carousel':'vendor/bootstrap-3.3.5/js/carousel',
        bootstrapslider:'vendor/bootstrap-slider.min'
        
    },
    shim:{
      
        'jquerysvg': {
            exports:"$",
            deps:['jquery']
        },

        'bootstrap/affix':      { deps: ['jquery'], exports: '$.fn.affix' }, 
        'bootstrap/alert':      { deps: ['jquery'], exports: '$.fn.alert' },
        'bootstrap/button':     { deps: ['jquery'], exports: '$.fn.button' },
        'bootstrap/carousel':   { deps: ['jquery'], exports: '$.fn.carousel' },
        'bootstrap/collapse':   { deps: ['jquery'], exports: '$.fn.collapse' },
        'bootstrap/dropdown':   { deps: ['jquery'], exports: '$.fn.dropdown' },
        'bootstrap/modal':      { deps: ['jquery'], exports: '$.fn.modal' },
        'bootstrap/popover':    { deps: ['jquery'], exports: '$.fn.popover' },
        'bootstrap/scrollspy':  { deps: ['jquery'], exports: '$.fn.scrollspy' },
        'bootstrap/tab':        { deps: ['jquery'], exports: '$.fn.tab'        },
        'bootstrap/tooltip':    { deps: ['jquery'], exports: '$.fn.tooltip' },
        'bootstrap/transition': { deps: ['jquery'], exports: '$.fn.transition' },
              
        'bootstrapslider': {
            deps:['bootstrap/tooltip']
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



