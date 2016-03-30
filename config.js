'use strict';
requirejs.config({
  baseUrl: 'js',
  paths: {
    viewer: 'pfv/viewer',
    colors: 'pfv/colors',
    draw: 'pfv/draw',
    params: 'pfv/params',
    icons:'pfv/icons',
    popups:'pfv/popups',
  },
  options: {
    include: ['vendor/require.js'],
  },
  enforceDefine: true
});

define(function(require) {
  "use strict";
  var pfv = require(viewer);
  return {
    PFV: viewer.PFV,
    about: 'Protein Feature View, a SVG based viewer for protein sequence annotations'
  };
});
