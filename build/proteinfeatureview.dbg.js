/*
 RequireJS 2.1.15 Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/jrburke/requirejs for details
*/
var requirejs,require,define;
(function(ba){function G(b){return"[object Function]"===K.call(b)}function H(b){return"[object Array]"===K.call(b)}function v(b,c){if(b){var d;for(d=0;d<b.length&&(!b[d]||!c(b[d],d,b));d+=1);}}function T(b,c){if(b){var d;for(d=b.length-1;-1<d&&(!b[d]||!c(b[d],d,b));d-=1);}}function t(b,c){return fa.call(b,c)}function m(b,c){return t(b,c)&&b[c]}function B(b,c){for(var d in b)if(t(b,d)&&c(b[d],d))break}function U(b,c,d,e){c&&B(c,function(c,g){if(d||!t(b,g))e&&"object"===typeof c&&c&&!H(c)&&!G(c)&&!(c instanceof
RegExp)?(b[g]||(b[g]={}),U(b[g],c,d,e)):b[g]=c});return b}function u(b,c){return function(){return c.apply(b,arguments)}}function ca(b){throw b;}function da(b){if(!b)return b;var c=ba;v(b.split("."),function(b){c=c[b]});return c}function C(b,c,d,e){c=Error(c+"\nhttp://requirejs.org/docs/errors.html#"+b);c.requireType=b;c.requireModules=e;d&&(c.originalError=d);return c}function ga(b){function c(a,k,b){var f,l,c,d,e,g,i,p,k=k&&k.split("/"),h=j.map,n=h&&h["*"];if(a){a=a.split("/");l=a.length-1;j.nodeIdCompat&&
Q.test(a[l])&&(a[l]=a[l].replace(Q,""));"."===a[0].charAt(0)&&k&&(l=k.slice(0,k.length-1),a=l.concat(a));l=a;for(c=0;c<l.length;c++)if(d=l[c],"."===d)l.splice(c,1),c-=1;else if(".."===d&&!(0===c||1==c&&".."===l[2]||".."===l[c-1])&&0<c)l.splice(c-1,2),c-=2;a=a.join("/")}if(b&&h&&(k||n)){l=a.split("/");c=l.length;a:for(;0<c;c-=1){e=l.slice(0,c).join("/");if(k)for(d=k.length;0<d;d-=1)if(b=m(h,k.slice(0,d).join("/")))if(b=m(b,e)){f=b;g=c;break a}!i&&(n&&m(n,e))&&(i=m(n,e),p=c)}!f&&i&&(f=i,g=p);f&&(l.splice(0,
g,f),a=l.join("/"))}return(f=m(j.pkgs,a))?f:a}function d(a){z&&v(document.getElementsByTagName("script"),function(k){if(k.getAttribute("data-requiremodule")===a&&k.getAttribute("data-requirecontext")===i.contextName)return k.parentNode.removeChild(k),!0})}function e(a){var k=m(j.paths,a);if(k&&H(k)&&1<k.length)return k.shift(),i.require.undef(a),i.makeRequire(null,{skipMap:!0})([a]),!0}function n(a){var k,c=a?a.indexOf("!"):-1;-1<c&&(k=a.substring(0,c),a=a.substring(c+1,a.length));return[k,a]}function p(a,
k,b,f){var l,d,e=null,g=k?k.name:null,j=a,p=!0,h="";a||(p=!1,a="_@r"+(K+=1));a=n(a);e=a[0];a=a[1];e&&(e=c(e,g,f),d=m(r,e));a&&(e?h=d&&d.normalize?d.normalize(a,function(a){return c(a,g,f)}):-1===a.indexOf("!")?c(a,g,f):a:(h=c(a,g,f),a=n(h),e=a[0],h=a[1],b=!0,l=i.nameToUrl(h)));b=e&&!d&&!b?"_unnormalized"+(O+=1):"";return{prefix:e,name:h,parentMap:k,unnormalized:!!b,url:l,originalName:j,isDefine:p,id:(e?e+"!"+h:h)+b}}function s(a){var k=a.id,b=m(h,k);b||(b=h[k]=new i.Module(a));return b}function q(a,
k,b){var f=a.id,c=m(h,f);if(t(r,f)&&(!c||c.defineEmitComplete))"defined"===k&&b(r[f]);else if(c=s(a),c.error&&"error"===k)b(c.error);else c.on(k,b)}function w(a,b){var c=a.requireModules,f=!1;if(b)b(a);else if(v(c,function(b){if(b=m(h,b))b.error=a,b.events.error&&(f=!0,b.emit("error",a))}),!f)g.onError(a)}function x(){R.length&&(ha.apply(A,[A.length,0].concat(R)),R=[])}function y(a){delete h[a];delete V[a]}function F(a,b,c){var f=a.map.id;a.error?a.emit("error",a.error):(b[f]=!0,v(a.depMaps,function(f,
d){var e=f.id,g=m(h,e);g&&(!a.depMatched[d]&&!c[e])&&(m(b,e)?(a.defineDep(d,r[e]),a.check()):F(g,b,c))}),c[f]=!0)}function D(){var a,b,c=(a=1E3*j.waitSeconds)&&i.startTime+a<(new Date).getTime(),f=[],l=[],g=!1,h=!0;if(!W){W=!0;B(V,function(a){var i=a.map,j=i.id;if(a.enabled&&(i.isDefine||l.push(a),!a.error))if(!a.inited&&c)e(j)?g=b=!0:(f.push(j),d(j));else if(!a.inited&&(a.fetched&&i.isDefine)&&(g=!0,!i.prefix))return h=!1});if(c&&f.length)return a=C("timeout","Load timeout for modules: "+f,null,
f),a.contextName=i.contextName,w(a);h&&v(l,function(a){F(a,{},{})});if((!c||b)&&g)if((z||ea)&&!X)X=setTimeout(function(){X=0;D()},50);W=!1}}function E(a){t(r,a[0])||s(p(a[0],null,!0)).init(a[1],a[2])}function I(a){var a=a.currentTarget||a.srcElement,b=i.onScriptLoad;a.detachEvent&&!Y?a.detachEvent("onreadystatechange",b):a.removeEventListener("load",b,!1);b=i.onScriptError;(!a.detachEvent||Y)&&a.removeEventListener("error",b,!1);return{node:a,id:a&&a.getAttribute("data-requiremodule")}}function J(){var a;
for(x();A.length;){a=A.shift();if(null===a[0])return w(C("mismatch","Mismatched anonymous define() module: "+a[a.length-1]));E(a)}}var W,Z,i,L,X,j={waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},h={},V={},$={},A=[],r={},S={},aa={},K=1,O=1;L={require:function(a){return a.require?a.require:a.require=i.makeRequire(a.map)},exports:function(a){a.usingExports=!0;if(a.map.isDefine)return a.exports?r[a.map.id]=a.exports:a.exports=r[a.map.id]={}},module:function(a){return a.module?
a.module:a.module={id:a.map.id,uri:a.map.url,config:function(){return m(j.config,a.map.id)||{}},exports:a.exports||(a.exports={})}}};Z=function(a){this.events=m($,a.id)||{};this.map=a;this.shim=m(j.shim,a.id);this.depExports=[];this.depMaps=[];this.depMatched=[];this.pluginMaps={};this.depCount=0};Z.prototype={init:function(a,b,c,f){f=f||{};if(!this.inited){this.factory=b;if(c)this.on("error",c);else this.events.error&&(c=u(this,function(a){this.emit("error",a)}));this.depMaps=a&&a.slice(0);this.errback=
c;this.inited=!0;this.ignore=f.ignore;f.enabled||this.enabled?this.enable():this.check()}},defineDep:function(a,b){this.depMatched[a]||(this.depMatched[a]=!0,this.depCount-=1,this.depExports[a]=b)},fetch:function(){if(!this.fetched){this.fetched=!0;i.startTime=(new Date).getTime();var a=this.map;if(this.shim)i.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],u(this,function(){return a.prefix?this.callPlugin():this.load()}));else return a.prefix?this.callPlugin():this.load()}},load:function(){var a=
this.map.url;S[a]||(S[a]=!0,i.load(this.map.id,a))},check:function(){if(this.enabled&&!this.enabling){var a,b,c=this.map.id;b=this.depExports;var f=this.exports,l=this.factory;if(this.inited)if(this.error)this.emit("error",this.error);else{if(!this.defining){this.defining=!0;if(1>this.depCount&&!this.defined){if(G(l)){if(this.events.error&&this.map.isDefine||g.onError!==ca)try{f=i.execCb(c,l,b,f)}catch(d){a=d}else f=i.execCb(c,l,b,f);this.map.isDefine&&void 0===f&&((b=this.module)?f=b.exports:this.usingExports&&
(f=this.exports));if(a)return a.requireMap=this.map,a.requireModules=this.map.isDefine?[this.map.id]:null,a.requireType=this.map.isDefine?"define":"require",w(this.error=a)}else f=l;this.exports=f;if(this.map.isDefine&&!this.ignore&&(r[c]=f,g.onResourceLoad))g.onResourceLoad(i,this.map,this.depMaps);y(c);this.defined=!0}this.defining=!1;this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else this.fetch()}},callPlugin:function(){var a=
this.map,b=a.id,d=p(a.prefix);this.depMaps.push(d);q(d,"defined",u(this,function(f){var l,d;d=m(aa,this.map.id);var e=this.map.name,P=this.map.parentMap?this.map.parentMap.name:null,n=i.makeRequire(a.parentMap,{enableBuildCallback:!0});if(this.map.unnormalized){if(f.normalize&&(e=f.normalize(e,function(a){return c(a,P,!0)})||""),f=p(a.prefix+"!"+e,this.map.parentMap),q(f,"defined",u(this,function(a){this.init([],function(){return a},null,{enabled:!0,ignore:!0})})),d=m(h,f.id)){this.depMaps.push(f);
if(this.events.error)d.on("error",u(this,function(a){this.emit("error",a)}));d.enable()}}else d?(this.map.url=i.nameToUrl(d),this.load()):(l=u(this,function(a){this.init([],function(){return a},null,{enabled:!0})}),l.error=u(this,function(a){this.inited=!0;this.error=a;a.requireModules=[b];B(h,function(a){0===a.map.id.indexOf(b+"_unnormalized")&&y(a.map.id)});w(a)}),l.fromText=u(this,function(f,c){var d=a.name,e=p(d),P=M;c&&(f=c);P&&(M=!1);s(e);t(j.config,b)&&(j.config[d]=j.config[b]);try{g.exec(f)}catch(h){return w(C("fromtexteval",
"fromText eval for "+b+" failed: "+h,h,[b]))}P&&(M=!0);this.depMaps.push(e);i.completeLoad(d);n([d],l)}),f.load(a.name,n,l,j))}));i.enable(d,this);this.pluginMaps[d.id]=d},enable:function(){V[this.map.id]=this;this.enabling=this.enabled=!0;v(this.depMaps,u(this,function(a,b){var c,f;if("string"===typeof a){a=p(a,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap);this.depMaps[b]=a;if(c=m(L,a.id)){this.depExports[b]=c(this);return}this.depCount+=1;q(a,"defined",u(this,function(a){this.defineDep(b,
a);this.check()}));this.errback&&q(a,"error",u(this,this.errback))}c=a.id;f=h[c];!t(L,c)&&(f&&!f.enabled)&&i.enable(a,this)}));B(this.pluginMaps,u(this,function(a){var b=m(h,a.id);b&&!b.enabled&&i.enable(a,this)}));this.enabling=!1;this.check()},on:function(a,b){var c=this.events[a];c||(c=this.events[a]=[]);c.push(b)},emit:function(a,b){v(this.events[a],function(a){a(b)});"error"===a&&delete this.events[a]}};i={config:j,contextName:b,registry:h,defined:r,urlFetched:S,defQueue:A,Module:Z,makeModuleMap:p,
nextTick:g.nextTick,onError:w,configure:function(a){a.baseUrl&&"/"!==a.baseUrl.charAt(a.baseUrl.length-1)&&(a.baseUrl+="/");var b=j.shim,c={paths:!0,bundles:!0,config:!0,map:!0};B(a,function(a,b){c[b]?(j[b]||(j[b]={}),U(j[b],a,!0,!0)):j[b]=a});a.bundles&&B(a.bundles,function(a,b){v(a,function(a){a!==b&&(aa[a]=b)})});a.shim&&(B(a.shim,function(a,c){H(a)&&(a={deps:a});if((a.exports||a.init)&&!a.exportsFn)a.exportsFn=i.makeShimExports(a);b[c]=a}),j.shim=b);a.packages&&v(a.packages,function(a){var b,
a="string"===typeof a?{name:a}:a;b=a.name;a.location&&(j.paths[b]=a.location);j.pkgs[b]=a.name+"/"+(a.main||"main").replace(ia,"").replace(Q,"")});B(h,function(a,b){!a.inited&&!a.map.unnormalized&&(a.map=p(b))});if(a.deps||a.callback)i.require(a.deps||[],a.callback)},makeShimExports:function(a){return function(){var b;a.init&&(b=a.init.apply(ba,arguments));return b||a.exports&&da(a.exports)}},makeRequire:function(a,e){function j(c,d,m){var n,q;e.enableBuildCallback&&(d&&G(d))&&(d.__requireJsBuild=
!0);if("string"===typeof c){if(G(d))return w(C("requireargs","Invalid require call"),m);if(a&&t(L,c))return L[c](h[a.id]);if(g.get)return g.get(i,c,a,j);n=p(c,a,!1,!0);n=n.id;return!t(r,n)?w(C("notloaded",'Module name "'+n+'" has not been loaded yet for context: '+b+(a?"":". Use require([])"))):r[n]}J();i.nextTick(function(){J();q=s(p(null,a));q.skipMap=e.skipMap;q.init(c,d,m,{enabled:!0});D()});return j}e=e||{};U(j,{isBrowser:z,toUrl:function(b){var d,e=b.lastIndexOf("."),k=b.split("/")[0];if(-1!==
e&&(!("."===k||".."===k)||1<e))d=b.substring(e,b.length),b=b.substring(0,e);return i.nameToUrl(c(b,a&&a.id,!0),d,!0)},defined:function(b){return t(r,p(b,a,!1,!0).id)},specified:function(b){b=p(b,a,!1,!0).id;return t(r,b)||t(h,b)}});a||(j.undef=function(b){x();var c=p(b,a,!0),e=m(h,b);d(b);delete r[b];delete S[c.url];delete $[b];T(A,function(a,c){a[0]===b&&A.splice(c,1)});e&&(e.events.defined&&($[b]=e.events),y(b))});return j},enable:function(a){m(h,a.id)&&s(a).enable()},completeLoad:function(a){var b,
c,d=m(j.shim,a)||{},g=d.exports;for(x();A.length;){c=A.shift();if(null===c[0]){c[0]=a;if(b)break;b=!0}else c[0]===a&&(b=!0);E(c)}c=m(h,a);if(!b&&!t(r,a)&&c&&!c.inited){if(j.enforceDefine&&(!g||!da(g)))return e(a)?void 0:w(C("nodefine","No define call for "+a,null,[a]));E([a,d.deps||[],d.exportsFn])}D()},nameToUrl:function(a,b,c){var d,e,h;(d=m(j.pkgs,a))&&(a=d);if(d=m(aa,a))return i.nameToUrl(d,b,c);if(g.jsExtRegExp.test(a))d=a+(b||"");else{d=j.paths;a=a.split("/");for(e=a.length;0<e;e-=1)if(h=a.slice(0,
e).join("/"),h=m(d,h)){H(h)&&(h=h[0]);a.splice(0,e,h);break}d=a.join("/");d+=b||(/^data\:|\?/.test(d)||c?"":".js");d=("/"===d.charAt(0)||d.match(/^[\w\+\.\-]+:/)?"":j.baseUrl)+d}return j.urlArgs?d+((-1===d.indexOf("?")?"?":"&")+j.urlArgs):d},load:function(a,b){g.load(i,a,b)},execCb:function(a,b,c,d){return b.apply(d,c)},onScriptLoad:function(a){if("load"===a.type||ja.test((a.currentTarget||a.srcElement).readyState))N=null,a=I(a),i.completeLoad(a.id)},onScriptError:function(a){var b=I(a);if(!e(b.id))return w(C("scripterror",
"Script error for: "+b.id,a,[b.id]))}};i.require=i.makeRequire();return i}var g,x,y,D,I,E,N,J,s,O,ka=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,la=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,Q=/\.js$/,ia=/^\.\//;x=Object.prototype;var K=x.toString,fa=x.hasOwnProperty,ha=Array.prototype.splice,z=!!("undefined"!==typeof window&&"undefined"!==typeof navigator&&window.document),ea=!z&&"undefined"!==typeof importScripts,ja=z&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,
Y="undefined"!==typeof opera&&"[object Opera]"===opera.toString(),F={},q={},R=[],M=!1;if("undefined"===typeof define){if("undefined"!==typeof requirejs){if(G(requirejs))return;q=requirejs;requirejs=void 0}"undefined"!==typeof require&&!G(require)&&(q=require,require=void 0);g=requirejs=function(b,c,d,e){var n,p="_";!H(b)&&"string"!==typeof b&&(n=b,H(c)?(b=c,c=d,d=e):b=[]);n&&n.context&&(p=n.context);(e=m(F,p))||(e=F[p]=g.s.newContext(p));n&&e.configure(n);return e.require(b,c,d)};g.config=function(b){return g(b)};
g.nextTick="undefined"!==typeof setTimeout?function(b){setTimeout(b,4)}:function(b){b()};require||(require=g);g.version="2.1.15";g.jsExtRegExp=/^\/|:|\?|\.js$/;g.isBrowser=z;x=g.s={contexts:F,newContext:ga};g({});v(["toUrl","undef","defined","specified"],function(b){g[b]=function(){var c=F._;return c.require[b].apply(c,arguments)}});if(z&&(y=x.head=document.getElementsByTagName("head")[0],D=document.getElementsByTagName("base")[0]))y=x.head=D.parentNode;g.onError=ca;g.createNode=function(b){var c=
b.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");c.type=b.scriptType||"text/javascript";c.charset="utf-8";c.async=!0;return c};g.load=function(b,c,d){var e=b&&b.config||{};if(z)return e=g.createNode(e,c,d),e.setAttribute("data-requirecontext",b.contextName),e.setAttribute("data-requiremodule",c),e.attachEvent&&!(e.attachEvent.toString&&0>e.attachEvent.toString().indexOf("[native code"))&&!Y?(M=!0,e.attachEvent("onreadystatechange",b.onScriptLoad)):
(e.addEventListener("load",b.onScriptLoad,!1),e.addEventListener("error",b.onScriptError,!1)),e.src=d,J=e,D?y.insertBefore(e,D):y.appendChild(e),J=null,e;if(ea)try{importScripts(d),b.completeLoad(c)}catch(m){b.onError(C("importscripts","importScripts failed for "+c+" at "+d,m,[c]))}};z&&!q.skipDataMain&&T(document.getElementsByTagName("script"),function(b){y||(y=b.parentNode);if(I=b.getAttribute("data-main"))return s=I,q.baseUrl||(E=s.split("/"),s=E.pop(),O=E.length?E.join("/")+"/":"./",q.baseUrl=
O),s=s.replace(Q,""),g.jsExtRegExp.test(s)&&(s=I),q.deps=q.deps?q.deps.concat(s):[s],!0});define=function(b,c,d){var e,g;"string"!==typeof b&&(d=c,c=b,b=null);H(c)||(d=c,c=null);!c&&G(d)&&(c=[],d.length&&(d.toString().replace(ka,"").replace(la,function(b,d){c.push(d)}),c=(1===d.length?["require"]:["require","exports","module"]).concat(c)));if(M){if(!(e=J))N&&"interactive"===N.readyState||T(document.getElementsByTagName("script"),function(b){if("interactive"===b.readyState)return N=b}),e=N;e&&(b||
(b=e.getAttribute("data-requiremodule")),g=F[e.getAttribute("data-requirecontext")])}(g?g.defQueue:R).push([b,c,d])};define.amd={jQuery:!0};g.exec=function(b){return eval(b)};g(q)}})(this);

define("vendor/require.js", function(){});

/* Derived in parts from PV viewer.
*
* (C) Marco Piasini
*
* */
define('colors',[],function()
{

    "use strict";

    var exports = {};

    exports.rgb = {};

    var rgb = exports.rgb;

    exports.rgb.fromValues = function(x, y, z, w) {
        var out = new Array(4);
        out[0] = x;
        out[1] = y;
        out[2] = z;
        out[3] = w;
        return out;
    };

    exports.rgb.mix = function(out, colorOne, colorTwo, t) {
        var oneMinusT = 1.0 - t;
        out[0] = colorOne[0]*t+colorTwo[0]*oneMinusT;
        out[1] = colorOne[1]*t+colorTwo[1]*oneMinusT;
        out[2] = colorOne[2]*t+colorTwo[2]*oneMinusT;
        out[3] = colorOne[3]*t+colorTwo[3]*oneMinusT;
        return out;
    };

    exports.rgb.hex2rgb = function(color){
        var r, g, b, a;
        if (color.length === 4 || color.length === 5 ) {
            r = parseInt(color[1], 16);
            g = parseInt(color[2], 16);
            b = parseInt(color[3], 16);
            a = 15;
            if(color.length===5) {
                a = parseInt(color[4], 16);
            }
            var oneOver15 = 1/15.0;
            return rgb.fromValues(oneOver15 * r, oneOver15 * g,
                oneOver15 * b, oneOver15 * a);
        }
        if (color.length === 7 || color.length === 9) {
            r = parseInt(color.substr(1, 2), 16);
            g = parseInt(color.substr(3, 2), 16);
            b = parseInt(color.substr(5, 2), 16);
            a = 255;
            if(color.length===9) {
                a = parseInt(color.substr(7, 2), 16);
            }
            var oneOver255 = 1/255.0;
            return rgb.fromValues(oneOver255 * r, oneOver255 * g,
                oneOver255 * b, oneOver255 * a);
        }
    };

    var COLORS = {
        white :        rgb.fromValues(1.0,1.0 ,1.0,1.0),
        black :        rgb.fromValues(0.0,0.0 ,0.0,1.0),
        grey :         rgb.fromValues(0.5,0.5 ,0.5,1.0),
        lightgrey :    rgb.fromValues(0.8,0.8 ,0.8,1.0),
        darkgrey :     rgb.fromValues(0.3,0.3 ,0.3,1.0),
        red :          rgb.hex2rgb("#AA00A2"),
        darkred :      rgb.hex2rgb("#7F207B"),
        lightred :     rgb.fromValues(1.0,0.5 ,0.5,1.0),
        green :        rgb.hex2rgb("#C9F600"),
        darkgreen :    rgb.hex2rgb("#9FB82E"),
        lightgreen :   rgb.hex2rgb("#E1FA71"), // or D8FA3F
        blue :         rgb.hex2rgb("#6A93D4"), // or 6A93D4
        darkblue :     rgb.hex2rgb("#284A7E"), // or 104BA9
        lightblue :    rgb.fromValues(0.5,0.5 ,1.0,1.0),
        yellow :       rgb.hex2rgb("#FFCC73"),
        darkyellow :   rgb.fromValues(0.5,0.5 ,0.0,1.0),
        lightyellow :  rgb.fromValues(1.0,1.0 ,0.5,1.0),
        cyan :         rgb.fromValues(0.0,1.0 ,1.0,1.0),
        darkcyan :     rgb.fromValues(0.0,0.5 ,0.5,1.0),
        lightcyan :    rgb.fromValues(0.5,1.0 ,1.0,1.0),
        magenta :      rgb.fromValues(1.0,0.0 ,1.0,1.0),
        darkmagenta :  rgb.fromValues(0.5,0.0 ,0.5,1.0),
        lightmagenta : rgb.fromValues(1.0,0.5 ,1.0,1.0),
        orange :       rgb.hex2rgb("#FFA200"), // or FFBA40
        darkorange :   rgb.fromValues(0.5,0.25,0.0,1.0),
        lightorange :  rgb.fromValues(1.0,0.75,0.5,1.0),
        brown :        rgb.hex2rgb("#A66A00"),
        purple :       rgb.hex2rgb("#D435CD")
    };

    var bw_colors = [
            {"color": "#f0f0f0", "darkercolor": "#c0c0c0", 
            "lightercolor": "#ffffff", "textcolor": "black"},
            {"color": "#d9d9d9", "darkercolor": "#aeaeae", 
            "lightercolor": "#ffffff", "textcolor": "black"},
            {"color": "#bdbdbd", "darkercolor": "#979797", 
            "lightercolor": "#ffffff", "textcolor": "black"},
            {"color": "#969696", "darkercolor": "#787878", 
            "lightercolor": "#ffffff", "textcolor": "black"},
            {"color": "#737373", "darkercolor": "#5c5c5c", 
            "lightercolor": "#c4c4c4", "textcolor": "white"},
            {"color": "#525252", "darkercolor": "#424242", 
            "lightercolor": "#8b8b8b", "textcolor": "white"},
            {"color": "#252525", "darkercolor": "#1e1e1e", 
            "lightercolor": "#3f3f3f", "textcolor": "white"}
        ];

    var paired_colors = [
            {"color": "#a6cee3", "darkercolor": "#85a5b6", 
            "lightercolor": "#ffffff", "textcolor": "black"},
            {"color": "#1f78b4", "darkercolor": "#196090", 
            "lightercolor": "#35ccff", "textcolor": "white"},
            {"color": "#b2df8a", "darkercolor": "#8eb26e",
             "lightercolor": "#ffffeb", "textcolor": "black"},
            {"color": "#33a02c", "darkercolor": "#298023", 
            "lightercolor": "#57ff4b", "textcolor": "black"},
            {"color": "#fb9a99", "darkercolor": "#c97b7a",
             "lightercolor": "#ffffff", "textcolor": "black"},
            {"color": "#e31a1c", "darkercolor": "#b61516",
             "lightercolor": "#ff2c30", "textcolor": "black"},
            {"color": "#fdbf6f", "darkercolor": "#ca9959", 
            "lightercolor": "#ffffbd", "textcolor": "black"},
            {"color": "#ff7f00", "darkercolor": "#cc6600", 
            "lightercolor": "#ffd800", "textcolor": "black"},
            {"color": "#cab2d6", "darkercolor": "#a28eab", 
            "lightercolor": "#ffffff", "textcolor": "black"},
            {"color": "#6a3d9a", "darkercolor": "#55317b", 
            "lightercolor": "#b468ff", "textcolor": "white"}
        ];

     var redblue_colors = [
            {"color": "#d73027", "darkercolor": "#ac261f", 
            "lightercolor": "#ff5242", "textcolor": "white"},
            {"color": "#f46d43", "darkercolor": "#c35736", 
            "lightercolor": "#ffb972", "textcolor": "black"},
            {"color": "#abd9e9", "darkercolor": "#89aeba", 
            "lightercolor": "#ffffff", "textcolor": "black"},
            {"color": "#74add1", "darkercolor": "#5d8aa7", 
            "lightercolor": "#c5ffff", "textcolor": "black"}
        ];

     var domain_colors = [
            {"color": "#ff7f00", "darkercolor": "#cc6600", 
            "lightercolor": "#ffd800", "textcolor": "black"}
        ];


    exports.rgb.getBWPalette = function() {
        return bw_colors;
    };

    exports.rgb.getPairedColorPalette = function() {
        return paired_colors;
    };

    exports.rgb.getRedBluePalette = function(){
        return redblue_colors;
    };

    exports.rgb.getDomainColors = function(){
        return domain_colors;
    };

    exports.rgb.componentToHex = function(c) {

        var hex = c.toString(16);

        return hex.length === 1 ? "0" + hex : hex;
    };

    exports.rgb.rgb2hex = function(color)
    {
        if ( color.length === 3){
            var r = color[0];
            var g = color[1];
            var b = color[2];
            return "#" +
                exports.rgb.componentToHex(r) +
                exports.rgb.componentToHex(g) +
                exports.rgb.componentToHex(b);

        } else if ( color.length ===4 || color.length === 5){

          var r1 = color[0];
          var g1 = color[1];
          var b1 = color[2];
          var a1 = 15;
          if(color.length===4) {
              a1 = color[3];
          }

            return "#" +
                exports.rgb.componentToHex(r1*255) +
                exports.rgb.componentToHex(g1*255) +
                exports.rgb.componentToHex(b1*255);
        }
        return "#000000";
    };



// provide an override of the default color setting.
    exports.setColorPalette = function(customColors){
        console.log("setting colors");
        COLORS = customColors;
        exports.initGradients();
    };

// internal function to force various types into an RGBA quadruplet 
    exports.forceRGB = function(color) {
        if (typeof color === 'string') {
            var lookup = COLORS[color];
            if (lookup !== undefined) {
                return lookup;
            } else if (color.length > 0 && color[0] === '#') {
                return exports.hex2rgb(color);
            } else {
                console.error("unknown color " + color);
            }
        }
        // in case no alpha component is provided, default alpha to 1.0
        if (color.length === 3) {
            return [color[0], color[1], color[2], 1.0];
        }
        return color;
    };

    exports.forceHex = function(color){
        var lookup = COLORS[color];
        if ( lookup !== undefined){

            return exports.rgb.rgb2hex(lookup);
        }
    };


    return exports;
});


 define('params',['colors'],
    function(colors) {

    	function Params(){

		 	this.textLeft = 20;
            this.leftBorder = 130;
            this.bottomBorder = 15;            
            this.trackHeight = 10;
            this.trackHeightCharts = 20;
            this.rightBorder = 10;

            this.maxTracksSingleMode = 10;

            // maximum font size for displayed text (e.g. amino acids, when zoomed into sequence)
            this.maxTextSize = 10; 
            this.scale = -1;

            this.y = 0;
            this.maxY = 0;

            this.bw_colors = colors.rgb.getBWPalette();

            this.paired_colors = colors.rgb.getPairedColorPalette();

            this.domain_colors = colors.rgb.getDomainColors();

            this.redblue_colors = colors.rgb.getRedBluePalette().reverse();


            this.customColors  = [];
            this.customColors.push(this.paired_colors[0]);
            this.customColors.push(this.paired_colors[1]);
            this.customColors.push(this.paired_colors[8]);
            this.customColors.push(this.paired_colors[9]);


            // homology models...
             this.homColors = [];
                    this.homColors.push(this.paired_colors[5]);
                    this.homColors.push(this.paired_colors[4]);
            

            this.up_colors = [];
            this.up_colors.push(this.paired_colors[2]);
            this.up_colors.push(this.paired_colors[3]);


    	}


         return {
            Params: function () {
                return new Params();
            }
        };

});

/* -*- mode: javascript; c-basic-offset: 4; indent-tabs-mode: nil -*- */
/*jslint maxlen: 120 */
/*global $:false */
/*global pageTracker:false*/

/**
 * Provides the "view" of the data
*/

define('draw',['params'],
    function(params) {


    	var colorDict = {};

    	function Draw(viewer){

    		this.viewer = viewer;

    		this.param = new params.Params();

    		this.scale = 1 ;

    		this.height = 15;

    		this.maxY = 0;


    		var svg = viewer.getSVGWrapper();

    		this.defaultGroup = svg.group({
                    id: 'defaultGroup',
                    fontWeight: 'bold',
                    fontSize: '10', fill: 'black'
                }
            );

    	}

    	Draw.prototype.getParams = function(){
    		return this.param;
    	};

    	Draw.prototype.getGroup = function(id){

    		var svg = this.viewer.getSVGWrapper();

    		 var g = svg.group({
                    id: id,
                    fontWeight: 'bold',
                    fontSize: '10', fill: 'black'
                 }
            );
    		 return g;
    	};

  		Draw.prototype.seq2Screen = function (seqpos) {


            return this.param.leftBorder + Math.round(seqpos * this.scale);


        };

        Draw.prototype.screen2Seq = function (screenX) {


            return Math.round((screenX - this.param.leftBorder) / this.scale);


        };



    	/** Draw the ruler, which indicated sequence positions
         *
         * @param svg
         * @param sequence
         * @param y
         * @returns
         */
        Draw.prototype.drawRuler = function (svg, sequence, y) {

            var majorTickHeight = 5;
            var minorTickHeight = 2;

           
            svg.rect(this.seq2Screen(0), y, sequence.length * this.scale, 1,
                {fill: 'black'});

            var prevTick = 0;
            for (var i = 0; i < sequence.length; i++) {


                if (((i + 1) % 50) === 0 && ( i - prevTick ) * this.scale >
                    ((Math.log(i) / Math.log(10) + 1) * 10)) {
                    this.drawTick(svg, i, y, majorTickHeight);
                    prevTick = i;
                } else if (this.scale > 2) {
                    if (((i + 1) % 10) === 0) {
                        this.drawTick(svg, i, y, minorTickHeight);
                    } else if (this.scale > 4) {
                        if (((i + 1) % 5) === 0) {
                            svg.rect(this.seq2Screen(i), y, 1 * this.scale, 4,
                                {fill: 'black'});
                        }
                    }

                    if (this.scale > 8) {
                        svg.rect(this.seq2Screen(i), y, 1, 2,
                            {fill: 'black'});
                    }
                }
            }

            return y + this.param.trackHeight + 10;


        };


         //  draw DB id at beginning of line
        Draw.prototype.drawName = function (svg, g, ty, text, callbackFunction, label) {


            var txt = svg.text(g, this.param.textLeft + 2, ty + this.param.trackHeight - 1, text);

            if (typeof callbackFunction !== 'undefined') {

                $(txt).css('cursor', 'pointer');

                $(txt).bind('click', function (event) {
                    callbackFunction(event, text);
                });

            }

            if (typeof label !== 'undefined') {

                $(txt).attr("title", label);
                this.registerTooltip(txt);
            } else {
                console.log("no label for track " + text);
            }

        };

         Draw.prototype.drawSequence = function (svg, sequence, y) {

            var seqTrackHeight = this.param.trackHeight + 5;

            if (this.param.singlePDBmode) {
                seqTrackHeight -= 5;
            }

            var g = this.getGroup('sequenceTrack' + this.viewer.getData().uniprotID);

            this.drawName(svg, g, y, sequence.name, undefined, "UniProtKB sequence " + sequence.name);

            var defs = svg.defs();

            svg.linearGradient(defs, 'sequence' + this.viewer.getData().uniprotID, [
                    ['0%', 'white'],
                    ['100%', 'black']
                ],
                0, y, 0, y + seqTrackHeight,
                {
                    gradientUnits: 'userSpaceOnUse'

                }
            );


            var rect = svg.rect(g, this.seq2Screen(0), y, sequence.length * this.scale, seqTrackHeight,
                4, 4,
                {
                    fill: 'url(#sequence' + this.viewer.getData().uniprotID + ')',
                    stroke: 'grey',
                    strokeWidth: 1
                });


            var title = "UniProtKB sequence " + sequence.name + " - " +
                this.viewer.getData().name + " Length: " + this.viewer.getData().length;

            $(rect).attr('title', title);

            this.registerTooltip(rect);

            y += seqTrackHeight;

            if (this.scale >= 8) {
                // draw Sequence text

                var blg = svg.group({fill: 'lightgrey'});
                var bg = svg.group({fill: '#dcdcdc'});

                var gs = svg.group({
                        id: 'seqpos' + this.viewer.getData().uniprotID,
                        fontWeight: 'bold',
                        fontSize: '10', fill: 'black'
                    }
                );

                for (var s = 0; s < sequence.length; s++) {

                    if ((s + 1) % 10 === 0) {
                        svg.rect(bg, this.seq2Screen(s), y, 1 * this.scale, 10);
                    } else if ((s + 1) % 5 === 0) {
                        svg.rect(blg, this.seq2Screen(s), y, 1 * this.scale, 10);
                    }

                    var txt = svg.text(gs, this.seq2Screen(s) + 1, y +
                    this.param.trackHeight - 1, this.viewer.getData().sequence.charAt(s));

                    $(txt).attr('title', "Sequence position " +
                    (s + 1) + " - " + this.viewer.getData().sequence.charAt(s));
                    //$(rect).bind('mouseover', function(event,ui) {
                    //popupTooltip(event,ui,$(this));});
                    //$(rect).mouseout(function(event){hideTooltip();});
                    this.registerTooltip(txt);
                    //registerTooltip(rect);
                    //$(txt).bind('click', function(event) {alert('sequence position: ' +(s+1) );});


                }
                y += this.param.trackHeight;
            }

            // extra spacer
            return y + 5;


        };


        /** draw a plus icon on the left side, that allows to expand the condensed view
         *
         * @param svg
         * @param y
         */
        Draw.prototype.drawExpandCondensedSymbol = function (svg, y, title, callback) {

            var g = svg.group({
                id: 'expandCondensed' + this.viewer.getData().uniprotID,
                fontWeight: 'bold',
                fontSize: '10',
                fill: 'black'
            });


            var arrowBody = svg.rect(g, (this.param.textLeft - 5), y + 1, 2, this.param.trackHeight - 2, 
                {fill: 'black'});
            y += this.param.trackHeight;

            var arrow = svg.createPath();
            svg.path(g, arrow.move(this.param.textLeft - 4, y).line([[this.param.textLeft - 6, y - 4],
                    [this.param.textLeft - 2, y - 4]]).close(),
                {fill: 'black', stroke: 'black'});

            y += 1;

            var circle = svg.circle(g, this.param.textLeft - 4, y + this.param.trackHeight, 8, {
                fill: 'black', opacity: '0.2'
            });

            var text = svg.text(g, this.param.textLeft - 8, y + this.param.trackHeight * 1.5 - 1, "+", {
                fontSize: '14',
                fill: 'black', fontWeight: 'bold' 
            });

            var mylist = [];

            mylist.push(circle);
            mylist.push(text);
            //mylist.push(arrow);
            mylist.push(arrowBody);


            for (var i = 0; i < mylist.length; i++) {

                var me = mylist[i];

                
                this.registerTooltip(me,title);

                $(me).bind('click', $.proxy(callback));
            }


            return y + this.param.trackHeight * 2 + 1;

        };

        /** draw a plus icon on the left side, that allows to expand the condensed view
         *
         * @param svg
         * @param y
         */
        Draw.prototype.drawCollapseCondensedSymbol = function (svg,y) {

            var g = svg.group({
                    id: 'expandCondensed' + this.viewer.getData().uniprotID,
                    fontWeight: 'bold',
                    fontSize: '10',
                    fill: 'black'
                }
            );


            y += 1;

            var circle = svg.circle(g, this.param.textLeft - 4, y + this.param.trackHeight, 8, {
                fill: 'black', opacity: '0.2'
            });

            var text = svg.text(g, this.param.textLeft - 7, y + this.param.trackHeight * 1.5 - 1, "-", {
                fontSize: '14', fill: 'black', fontWeight: 'bold'
            });

            y += this.param.trackHeight * 2.5;

            var arrow = svg.createPath();
            svg.path(g, arrow.move(this.param.textLeft - 4, y - 4).line([[this.param.textLeft - 6, y],
                    [this.param.textLeft - 2, y]]).close(),
                {fill: 'black', stroke: 'black'});

            var arrowBody = svg.rect(g, (this.param.textLeft - 5), y, 2, this.param.trackHeight / 2, {fill: 'black'});


            var title = "Currently showing all PDB matches. Click here to show only representatives.";

            var mylist = [];

            mylist.push(circle);
            mylist.push(text);
            mylist.push(arrow);
            mylist.push(arrowBody);

            var that = this;
            var showCondensed = function () {
                that.viewer.setShowCondensed(true);
                $('#showCondensed').text("Show All");
            };

            for (var i = 0; i < mylist.length; i++) {

                var me = mylist[i];

                $(me).attr('title', title);
                this.registerTooltip(me);
                $(me).bind('click', showCondensed);

            }

            return y + this.param.trackHeight / 2 + 1;

        };

        Draw.prototype.drawSourceIndication = function (svg, name, topY, bottomY) {


            if (bottomY - topY < 2) {                
                return;
            }

            var paired_colors = this.param.paired_colors;

            var color = this.param.paired_colors[5].color;

            var shortname = name;
            if (name.indexOf("Structural") > -1) {
                shortname = "SBKB";
            }

            if (name === 'UniProtKB') {
                color = paired_colors[2].darkercolor;
            } else if (name === "PDB" || name === "validation") {
                color = paired_colors[1].darkercolor;
            } else if (name === "Pfam") {
                color = paired_colors[6].color;
            } else if (name === "Calculated") {
                shortname = "Calc";
                name = "Electronic annotation";
                color = 'grey';
            } else if (name === "Domains") {
                shortname = " ";
                color = paired_colors[7].color;
            } else if (name === 'Exon') {
                color = paired_colors[8].color;
            } else if (name === 'Phospho') {
                color = paired_colors[9].color;
            }


			var g = this.getGroup(name +this.viewer.getData().uniprotID);

            var rect = svg.rect(g, 11, topY, 10, bottomY - topY,
                {
                    //fill: 'white',
                    fill: color,
                    stroke: color,
                    strokeWidth: 1
                }
            );

            var title = "Data from: " + name;
            $(rect).attr('title', title);
            this.registerTooltip(rect);

            var rotStr = "rotate(-90," + 10 + "," + (bottomY - this.param.trackHeight) + ")";
            var txt = svg.text(g, 0, bottomY - this.param.trackHeight, shortname, {
                transform: rotStr, fill: color
            });
            $(txt).attr('title', title);
            this.registerTooltip(txt);

        };

        Draw.prototype.drawSeparator = function (svg, y) {


            var g = svg.group({id: 'separator', fontWeight: 'bold', fontSize: '10', fill: 'black'});
            svg.rect(g, this.param.textLeft, y + (this.param.trackHeight / 4),
                Math.round(this.viewer.getSequence().length * this.scale) + this.leftBorder + this.rightBorder,
                1,
                {
                    //fill: 'white',
                    fill: 'black',
                    stroke: 'black',
                    strokeWidth: 1
                }
            );

            return y + this.param.trackHeight;

        };


 ///
        Draw.prototype.drawGenericTrack = function (svg, rows, y, label, trackName,
                                                      mycolors, url, callbackFunction, info) {


			
            if (rows.length === 0) {
                return y;
            }

            var colorPos = -1;
            var g0 = svg.group({
                    id: label + this.viewer.getData().uniprotID,
                    fontWeight: 'bold',
                    fontSize: '10', fill: 'black'
                }
            );

            this.drawName(svg, g0, y, label, undefined, info);

            nextRow:
            for (var j = 0; j < rows.length; j++) {

                var row = rows[j];

                nextInLine:
                for (var i = 0; i < row.length; i++) {

                    try {
                        var range = row[i];
                        
                        //                  // adjust for the fact that we start counting at 1
                        //                  range.start;
                        //                  range.end;

                        if (typeof range.desc === 'undefined') {
                            continue nextInLine;
                        }

                        if (range.desc.indexOf('Cytoplasmic') > -1) {
                            this.drawCytoplasmic(y, svg, range, trackName);
                            continue nextInLine;
                        } else if (
                            ( range.desc.indexOf('Periplasmic') > -1 ) ||
                            ( range.desc.indexOf('Extracellular') > -1 ) ||
                            ( range.desc.indexOf('Lumenal') > -1 )
                        ) {
                            this.drawPeriplasmic(y, svg, range, trackName);
                            continue nextInLine;
                        } else if (range.name.indexOf('transmembrane') > -1) {
                            this.drawTransmembrane(y, svg, range, trackName);
                            continue nextInLine;
                        } else if (range.name.indexOf('intramembrane') > -1) {
                            this.drawIntramembrane(y, svg, range, trackName);
                            continue nextInLine;
                        }

                        colorPos++;
                        if (colorPos > mycolors.length - 1) {
                            colorPos = 0;
                        }

                        var color = mycolors[colorPos];

                        var width = (range.end - range.start) + 1;

                        var x1 = this.seq2Screen(range.start - 1);

                        var defs = svg.defs();
                        svg.linearGradient(defs, trackName + 'GR' + j + i + this.viewer.getData().uniprotID, [
                                ['0%', 'white'],
                                ['100%', color.darkercolor]
                            ],
                            0, y, 0, y + this.param.trackHeight,
                            {
                                gradientUnits: 'userSpaceOnUse'

                            }
                        );

                        var g = svg.group({
                                id: trackName + this.viewer.getData().uniprotID,
                                fontWeight: 'bold',
                                fontSize: '10',
                                fill: color.textcolor
                            }
                        );

                        var rect = svg.rect(g, x1, y, width * this.scale, this.param.trackHeight,
                            4, 4,
                            {
                                fill: 'url(#' + trackName + 'GR' + j + i + this.viewer.getData().uniprotID + ')',
                                stroke: color.darkercolor,
                                strokeWidth: 1
                            });


                        var txt = svg.text(g, x1 + this.scale, y + this.param.trackHeight - 1, range.desc);

                        this.checkTxtLength(txt, range.start, range.end, range.desc);


                        var title = range.desc;
                        if (range.desc !== range.name) {
                            title += "-" + range.name;
                        }
                        if (typeof range.status !== 'undefined') {
                            title += " - " + range.status;
                        }

                        //title += " " + range.start + "-" + range.end;
                        $(rect).attr('title', title);
                       this.registerTooltip(rect);

                        $(txt).attr('title', title);
                        this.registerTooltip(txt);


                        if (typeof url !== 'undefined') {
                            $(rect).css('cursor', 'pointer');
                            $(txt).css('cursor', 'pointer');
                            $(rect).bind('click', this.newLocationMethod);
                            $(txt).bind('click', this.newLocationMethod);
                        }


                        if (typeof callbackFunction !== 'undefined') {
                            $(rect).css('cursor', 'pointer');
                            $(txt).css('cursor', 'pointer');
                            //$(rect).bind('click',
                            //function(event){callbackFunction(event,range);});
                            //$(txt).bind('click',
                            //function(event){callbackFunction(event,range);});
                            $(rect).bind('click', $.proxy(callbackFunction, range));
                            $(txt).bind('click', $.proxy(callbackFunction, range));
                        }

                    } catch (e) {
                        alert("Problem while drawing generic track: " + label + " " + e);
                    }
                }
                y += this.param.trackHeight + 5;
            }
            return y;

        };

        Draw.prototype.drawUPSites = function (svg, y) {


            if (typeof this.viewer.getData().upsites === 'undefined') {
                return y;
            }

            if (this.viewer.getData().upsites.tracks.length < 1) {
                return y;
            }

            // mini space to keep distance to above.
            y += 2;

            var g = svg.group({
                    id: 'upsitesTrackG' + this.viewer.getData().uniprotID,
                    fontWeight: 'bold',
                    fontSize: '10', fill: 'black'
                }
            );

            this.drawName(svg, g, y, 'UP Sites', undefined, this.viewer.getData().upsites.label);

            var siteTrackHeight = this.param.trackHeight + 5;

            this.drawSiteResidues(svg, this.viewer.getData().upsites, y, 'upsitesTrack' +
            this.viewer.getData().uniprotID, this.param.paired_colors, 'up', siteTrackHeight);

            return y + siteTrackHeight;

        };

        Draw.prototype.drawPhosphoSites = function (svg, y) {


            if (typeof this.viewer.getData().phospho === 'undefined') {

                return y;
            }

            if (this.viewer.getData().phospho.tracks.length < 1) {

                return y;
            }

            y = y + 5;

			var g = this.getGroup( 'phosphositesTrackG' + this.viewer.getData().uniprotID);

            this.drawName(svg, g, (y + this.param.trackHeight), 'Phosphosite', undefined, 
            	this.viewer.getData().phospho.label);

            var siteTrackHeight = this.param.trackHeight + 5;

            this.drawSiteResidues(svg, this.viewer.getData().phospho, y, 'phosphositesTrack' +
            this.viewer.getData().uniprotID, this.param.paired_colors, 'up', siteTrackHeight);

            return y + siteTrackHeight + 22;


        };

        Draw.prototype.drawPDBSites = function (svg, y) {


            if (typeof this.viewer.getData().pdbsites === 'undefined') {
                return y;
            }

            if (this.viewer.getData().pdbsites.tracks.length < 1) {
                return y;
            }

            var g = svg.group({
                    id: 'sitesTrackG' + this.viewer.getData().uniprotID,
                    fontWeight: 'bold',
                    fontSize: '10', fill: 'black'
                }
            );


            this.drawName(svg, g, y, 'PDB Sites', undefined, this.viewer.getData().pdbsites.label);

            var siteTrackHeight = this.param.trackHeight + 5;

            this.drawSiteResidues(svg, this.viewer.getData().pdbsites, y, 'sitesTrack' +
            this.viewer.getData().uniprotID, this.param.paired_colors, 'down', siteTrackHeight);

            return y + siteTrackHeight + 2;

        };


        Draw.prototype.drawPDBValidation = function (svg, y) {


            if (typeof this.viewer.getData().validation === 'undefined') {
                return y;
            }

            if (this.viewer.getData().validation.tracks.length < 1) {
                return y;
            }

            var g = svg.group({
                    id: 'validationTrackG' + this.viewer.getData().uniprotID,
                    fontWeight: 'bold',
                    fontSize: '10', fill: 'black'
                }
            );


            this.drawName(svg, g, y, 'PDB Validation', undefined, this.viewer.getData().validation.label);

            var validationTrackHeight = this.param.trackHeight + 5;

            this.drawSiteResidues(svg, this.viewer.getData().validation, y, 'validationTrack' +
            this.viewer.getData().uniprotID, this.param.paired_colors, 'up', validationTrackHeight);

            return y + validationTrackHeight + 2;

        };

        Draw.prototype.drawSCOP = function (svg, sequence, y) {

            if (typeof this.viewer.getData().scop === 'undefined') {
                return y;
            }

            var scopcallback = function () {
                // show draw dialog..

                var txt = this.name;

                if (this.name !== this.desc) {
                    txt += " - " + this.desc;

                    if (typeof this.note !== 'undefined') {
                        txt += " (" + this.note + ")";
                    }
                }

                var html = "<h3>" + txt + "</h3>";
                html += "<ul>";
                if (typeof pageTracker !== 'undefined') {
                    pageTracker._trackEvent('ProteinFeatureView', 'showSCOPeDialog', txt);
                }

                var url = "http://scop.mrc-lmb.cam.ac.uk/scop/search.cgi?ver=1.75&key=" + this.name;

                html += "<li>Show at <a target='_new'' href='" + url + "'>SCOP website</a></li>";


                html += "</ul>";
                $(this.dialogDiv).html(html);
                $(this.dialogDiv).dialog({
                    title: txt,
                    height: 300,
                    width: 300,
                    modal: true,
                    buttons: {
                        //"OK": function() { $(this).dialog("close"); window.location =
                        //'/pdb/explore/explore.do?structureId='+pdbID ;},
                        "Cancel": function () {
                            $(this).dialog("close");
                        }
                    }
                });
            };

            var trackrows = this.breakTrackInRows(this.viewer.getData().scop.tracks);
            y = this.drawGenericTrack(svg, trackrows, y, 'SCOP domains',
                'scopDomains', this.domain_colors, undefined, scopcallback, this.viewer.getData().scop.label);

            if (typeof this.viewer.getData().scope === 'undefined') {
                return y;
            }

            var scopecallback = function () {
                // show draw dialog..

                var txt = this.name;

                if (this.name !== this.desc) {
                    txt += " - " + this.desc;
                    if (typeof this.note !== 'undefined') {
                        txt += " (" + this.note + ")";
                    }
                }

                var html = "<h3>" + txt + "</h3>";
                html += "<ul>";
                if (typeof pageTracker !== 'undefined') {
                    pageTracker._trackEvent('ProteinFeatureView', 'showSCOPeDialog', txt);
                }

                var url = "http://scop.berkeley.edu/sccs=" + this.name;

                html += "<li>Show at <a target='_new'' href='" + url + "'>SCOPe website</a></li>";


                html += "</ul>";
                $(this.dialogDiv).html(html);
                $(this.dialogDiv).dialog({
                    title: txt,
                    height: 300,
                    width: 300,
                    modal: true,
                    buttons: {
                        //"OK": function() { $(this).dialog("close");
                        //window.location = '/pdb/explore/explore.do?structureId='+pdbID ;},
                        "Cancel": function () {
                            $(this).dialog("close");
                        }
                    }
                });
            };

            var trackrowsE = this.breakTrackInRows(this.viewer.getData().scope.tracks);
            //console.log("Draw scope: " + JSON.stringify(trackrowsE));
            y = this.drawGenericTrack(svg, trackrowsE, y, 'SCOPe domains',
                'scopeDomains', this.domain_colors, undefined, scopecallback, this.viewer.getData().scope.label);


            return y;

        };


        Draw.prototype.drawExons = function (svg, sequence, y) {

            if (typeof this.viewer.getData().exon === 'undefined') {
                return y;
            }

            if (this.viewer.getData().exon.tracks.length < 1) {
                return y;
            }


            y += 5;

            var exonTrackHeight = this.param.trackHeight;

            var g = svg.group({
                id: 'exonTrack', fontWeight: 'bold',
                fontSize: '10', fill: 'black'
            });

            this.drawName(svg, g, y, "Exon Structure", undefined, this.viewer.getData().exon.label);

            for (var i = 0; i < this.viewer.getData().exon.tracks.length; i++) {


                var domainOrig = this.viewer.getData().exon.tracks[i];


                // var domainOrig =this.viewer.getData().exon.tracks[i];

                var domain = {};
                domain.start = domainOrig.start;
                domain.end = domainOrig.end;
                domain.name = domainOrig.name;
                domain.desc = domainOrig.desc;

                var x1 = this.seq2Screen(domain.start - 1);
                var length = domain.end - domain.start + 1;


                var color = this.param.paired_colors[8];

                var defs = svg.defs();

                var g2 = svg.group({
                    id: 'exon' + i, fontWeight: 'bold',
                    fontSize: '10', fill: 'black'
                });


                if (i % 2 === 0) {
                    svg.linearGradient(defs, 'exon' + i, [
                            ['0%', 'white'],
                            ['100%', color.color]
                        ],
                        0, y, 0, y + exonTrackHeight,
                        {
                            gradientUnits: 'userSpaceOnUse'

                        }
                    );

                } else {
                    svg.linearGradient(defs, 'exon' + i, [
                            ['0%', color.color],
                            ['100%', 'white']
                        ],
                        0, y, 0, y + exonTrackHeight,
                        {
                            gradientUnits: 'userSpaceOnUse'
                        }
                    );
                }

                var rect = svg.rect(g2, x1, y, length * this.scale, exonTrackHeight,
                    0, 0,
                    {
                        //fill: 'white',
                        fill: 'url(#exon' + i + ')',
                        stroke: color.darkercolor,
                        strokeWidth: 1
                    }
                );

                //$(rect).css('class','tooltip');


                var title = "Exon Structure " + domain.name + " - " + domain.desc;

                $(rect).attr("title", title);

                //var length = tooltip.getComputedTextLength();

                var txt = svg.text(g2, x1 + this.scale, y + this.param.trackHeight - 1,
                    domain.name + " - " + domain.desc);

                this.checkTxtLength(txt, domain.start, domain.end, domain.name);

                this.registerTooltip(rect);


                $(txt).attr("title", "Exon Structure " + domain.name + " - " + domain.desc);
                this.registerTooltip(txt);
            }


            return y + 2 * this.height;


        };

        Draw.prototype.drawJronn = function (svg, sequence, y) {


            if (typeof this.viewer.getData().jronn === 'undefined') {
                return y;
            }

            var g = svg.group(
                {fontWeight: 'bold', fontSize: 10, fill: 'black'}
            );
            //alert(JSON.stringify(data.jronn));

            this.drawName(svg, g, y + this.param.trackHeight, 'Disorder', undefined, this.viewer.getData().jronn.label);

            //var min = parseFloat(data.jronn_min);
            //var max = parseFloat(data.jronn_max);
            // JRONN is always between 0 and 1, can ignore the provided min and max...
            var min = 0;
            var max = 1;
            //var min = 0;
            //var max = 0.8;
            //alert (min + " " + max);
            var adjustedSize = parseFloat(max + Math.abs(min));

            var heightScale = (this.param.trackHeightCharts - 2) / adjustedSize;

            var red = this.param.paired_colors[5];
            var blue = this.param.paired_colors[1];

            //alert(heightScale + " " + adjustedSize);
            for (var s = 0; s < sequence.length; s++) {

                var jronpos = this.viewer.getData().jronn.tracks[s];
                if (typeof jronpos === 'undefined') {
                    //alert("jronpos undef " + s);
                    continue;
                }

                var val = Math.abs(parseFloat(jronpos.desc));
                var score = val;

                if (val >= 0) {
                    score += Math.abs(min);
                }

                var posHeight = Math.abs(score) * heightScale;
                // max = y;
                // 0 == trackHeight/2;
                // min = y+trackHeight;
                var col = blue.color;
                if (val > 0.5) {
                    col = red.darkercolor;
                }


                var tmph = posHeight;
                if (tmph < 0) {
                    console.log(s + " score: " + score + " orig: " + jronpos.desc + " tmph:" +
                    tmph + " posH: " + posHeight + " totalH:" + this.param.trackHeightCharts);
                }


                svg.rect(this.seq2Screen(s), y - posHeight + this.param.trackHeightCharts - 2, 1 * this.scale + 1, tmph,
                    {fill: col});

            }

            //  svg.rect(g,seq2Screen(0), y -( 0.5+min) * heightScale +
            //trackHeightCharts,sequence.length * scale, 1,{fill: 'black'});

            return y + this.param.trackHeightCharts;

        };

        /** Draw the hydropathy of the sequence
         *
         * @param svg
         * @param sequence
         * @param y
         */
        Draw.prototype.drawHydropathy = function (svg, sequence, y) {

            if (typeof this.viewer.getData().hydropathy === 'undefined') {
                return y;
            }

            var red = this.param.paired_colors[5];
            var blue = this.param.paired_colors[1];
            var g = svg.group(
                {fontWeight: 'bold', fontSize: 10, fill: 'black'}
            );

            this.drawName(svg, g, y + this.param.trackHeight, 'Hydropathy', 
            	undefined, this.viewer.getData().hydropathy.label);

            // this line represents a score of 0;
            svg.rect(g, this.seq2Screen(0), y + this.param.trackHeightCharts / 2,
                sequence.length * this.scale, 1, {fill: 'black'});

            var min = parseFloat(this.viewer.getData().hydropathy_min);
            var max = parseFloat(this.viewer.getData().hydropathy_max);
            var adjustedSize = (max + Math.abs(min));

            var heightScale = this.param.trackHeightCharts / adjustedSize;
            //alert(heightScale + " " + adjustedSize);
            for (var s = 0; s < sequence.length; s++) {

                var hydro = this.viewer.getData().hydropathy.tracks[s];
                if (typeof hydro === 'undefined') {
                    continue;
                }
                var val = parseFloat(hydro.desc);

                var score = parseFloat(hydro.desc);

                if (val > 0) {
                    score += Math.abs(min);
                }

                var posHeight = Math.abs(score * heightScale);
                // max = y;
                // 0 == trackHeight/2;
                // min = y+trackHeight;
                if (val < 0) {
                    svg.rect(this.seq2Screen(s), y + this.param.trackHeightCharts / 2, 1 * this.scale + 1, posHeight,
                        {fill: blue.color});
                } else {
                    var tmp = posHeight - this.param.trackHeightCharts / 2;
                    if (tmp < 0) {
                        tmp = 0;
                    }
                    svg.rect(this.seq2Screen(s), y - posHeight + this.param.trackHeightCharts, 1 * this.scale + 1, tmp,
                        {fill: red.color});
                }

            }

            return y + this.param.trackHeightCharts + this.param.trackHeight / 2;

        };

        /** Draw the hydropathy of the sequence
         *
         * @param svg
         * @param sequence
         * @param y
         */
        Draw.prototype.drawSignalP = function (svg, sequence, y) {

            if (typeof this.viewer.getData().signalp === 'undefined') {
                return y;
            }


            y = this.drawGenericTrack(svg, this.viewer.getData().signalp, y, 'SignalP',
                'signalP', this.param.up_colors, undefined, this.callback, this.viewer.getData().signalp.label);

        };

         Draw.prototype.drawSelection = function (svg) {


            if (this.viewer.selectionStart < 0) {
                return;
            }

            var topY = 0;

            var g = svg.group({
                    id: 'selection' + this.viewer.getData().uniprotID,
                    fontWeight: 'bold',
                    fontSize: '10', border: this.param.paired_colors[6].color, fill: 'white'
                }
            );


            var length = (this.selectionEnd - this.viewer.selectionStart + 1);

            console.log("selection:" + this.viewer.selectionStart + " - " + this.selectionEnd);
            var rect = svg.rect(g, this.seq2Screen(this.viewer.selectionStart), topY, length * this.scale, this.maxY,
                0, 0,
                {
                    //                fill: 'url(#selection' +this.viewer.getData().uniprotID + ')',
                    stroke: this.param.paired_colors[5].lightercolor,
                    strokeWidth: 1,
                    style: '/* rule 1 */ use { fill-opacity: .5 } '
                });

            //TODO: in principle this shows a tooltip, but the positioning if off...
            $(rect).attr("data-toggle", "tooltip");
            $(rect).attr("data-placement", "top");
            $(rect).attr("title", "selection: " + this.viewer.selectionStart + "-" + this.selectionEnd);
            $(rect).text("selection: " + this.viewer.selectionStart + "-" + this.selectionEnd);
            $(rect).tooltip({'container': 'body'});
            //$(rect).css({'-webkit-transition': 'opacity 15s linear',
            //'-o-transition':'15s linear','transition':'opacity 15s linear'});


            // // this prevents too many tooltips from being rendered, when zooming in...
            // $(rect).on('show.bs.tooltip', function () {

            //     setTimeout(function () {
            //         $(rect).tooltip('hide');
            //     }, 2000);
            // });
            // $(rect).on('hidden.bs.tooltip', function () {

            //     $(rect).tooltip('destroy');
            // });

            // $(rect).tooltip('show');

        };

		Draw.prototype.drawPfam = function (svg, y) {


            if (typeof this.viewer.getData().pfam === 'undefined') {
                return y;
            }

            if (this.viewer.getData().pfam.tracks.length < 1) {
                return y;
            }

            y += 5;
           
            var pfamTrackHeight = this.param.trackHeight;

            var g = svg.group({
                id: 'pfamTrack', fontWeight: 'bold',
                fontSize: '10', fill: 'black'
            });

            this.drawName(svg, g, y, "Pfam", undefined,this.viewer.getData().pfam.label);

            for (var i = 0; i <this.viewer.getData().pfam.tracks.length; i++) {

                var domainOrig =this.viewer.getData().pfam.tracks[i];

                var domain = {};
                domain.start = domainOrig.start - 1;
                domain.end = domainOrig.end - 1;
                domain.name = domainOrig.name;
                domain.desc = domainOrig.desc;

                var x1 = this.seq2Screen(domain.start);
                var length = domain.end - domain.start + 1;

                //          var colorPos = i ;
                //          if ( i > bw_colors.length -1 )
                //          colorPos = i% bw_colors.length;


                //var color = bw_colors[colorPos];
                var color = this.param.paired_colors[6];

                var defs = svg.defs();

                var g2 = svg.group({
                    id: 'pfam' + i, fontWeight: 'bold',
                    fontSize: '10', fill: color.textcolor
                });

                svg.linearGradient(defs, 'pfam' + i, [
                        ['0%', color.lightercolor],
                        ['100%', color.darkercolor]
                    ],
                    0, y, 0, y + pfamTrackHeight,
                    {
                        gradientUnits: 'userSpaceOnUse'

                    }
                );

                var rect = svg.rect(g2, x1, y, length * this.scale, pfamTrackHeight,
                    3, 3,
                    {
                        //fill: 'white',
                        fill: 'url(#pfam' + i + ')',
                        stroke: color.darkercolor,
                        strokeWidth: 1
                    }
                );

                //$(rect).css('class','tooltip');


                var title = "Pfam Domain " + domain.name + " - " + domain.desc;

                $(rect).attr("title", title);

                //var length = tooltip.getComputedTextLength();

                var txt = svg.text(g2, x1 + this.scale, y + this.param.trackHeight - 1,
                    domain.name + " - " + domain.desc);

                this.checkTxtLength(txt, domain.start, domain.end, domain.name);

                this.registerTooltip(rect);


                $(txt).attr("title", "Pfam Domain " + domain.name + " - " + domain.desc);
                this.registerTooltip(txt);

            }

            return y + this.height + 5;

        };
       
       Draw.prototype.drawTrack = function (svg, track, y, trackID) {

            if (track === null) {
                return y;
            }

            
            var g = svg.group({id: trackID, fontWeight: 'bold', fontSize: '10', fill: 'black'});
            this.drawName(svg, g, y, track.pdbID + "." + track.chainID,
                undefined, "Track for PDB ID " + track.pdbID +
                " chain ID " + track.chainID);

            var color = track.color;
            var bw_color = this.param.bw_colors[6];
            var mismatch_color = this.param.paired_colors[4];


            for (var i = 0; i < track.ranges.length; i++) {
                var rangeOrig = track.ranges[i];

                var range = {};
                range.start = rangeOrig.start - 1;
                range.end = rangeOrig.end - 1;
                range.observed = rangeOrig.observed;
                range.mismatch = rangeOrig.mismatch;


                var width = (range.end - range.start) + 1;

                var defs = svg.defs();

                svg.linearGradient(defs, 'MyGradient' + trackID +this.viewer.getData().uniprotID, [
                        ['0%', 'white'],
                        ['100%', color]
                    ],
                    0, y, 0, y + this.param.trackHeight,
                    {gradientUnits: 'userSpaceOnUse'}
                );

                svg.linearGradient(defs, 'BWGradient' + trackID +this.viewer.getData().uniprotID, [
                        ['0%', 'white'],
                        ['100%', bw_color.color]
                    ],
                    0, y, 0, y + this.param.trackHeight,
                    {
                        gradientUnits: 'userSpaceOnUse'

                    }
                );
                svg.linearGradient(defs, 'MISMGradient' + trackID +this.viewer.getData().uniprotID, [
                        ['0%', 'white'],
                        ['100%', mismatch_color.color]
                    ],
                    0, y, 0, y + this.param.trackHeight,
                    {
                        gradientUnits: 'userSpaceOnUse'

                    }
                );

                var r1 = this.param.trackHeight / 2 - 1;
                var r2 = this.param.trackHeight / 2 - 1;

                if (range.observed) {

                    if (range.mismatch) {

                        var rect1 = svg.rect(g, this.seq2Screen(range.start), y + 1,
                            Math.round(width * this.scale), this.param.trackHeight - 1,
                            {
                                fill: 'url(#MISMGradient' + trackID +this.viewer.getData().uniprotID + ')',
                                stroke: mismatch_color.darkercolor,
                                strokeWidth: 1
                            });

                        //$(rect).css('class','.tooltip');

                        var txt = " (" + rangeOrig.start;
                        if (rangeOrig.start !== rangeOrig.end) {
                            txt += " - " + rangeOrig.end;
                        }
                        txt += ")";

                        $(rect1).attr("title", "Mismatch between PDB and UniProt residue" + txt);

                        this.registerTooltip(rect1);

                    } else {


                        var rect = svg.rect(g, this.seq2Screen(range.start), y,
                            Math.round(width * this.scale), this.param.trackHeight,
                            r1, r2,
                            {
                                fill: 'url(#MyGradient' + trackID +this.viewer.getData().uniprotID + ')',
                                stroke: color,
                                strokeWidth: 1
                            });

                        //$(rect).css('class','.tooltip');

                        var resolution = "";
                        if (typeof track.resolution !== 'undefined') {
                            resolution = " - " + (track.resolution / 1000) + " " + '\u00C5';
                        }
                        var d = new Date(track.releaseDate);
                        $(rect).attr("title", "PDB ID " + track.pdbID + " chain " +
                        track.chainID + " - " +
                        track.desc + " (" + rangeOrig.start + "-" + rangeOrig.end + ") " +
                        resolution + " - " + d.toDateString());
                        //" - " + track.clusterNr + " - " + track.clusterRank);

                        this.registerTooltip(rect);

                    }
                } else {

                    // shows SEQRES that are not in ATOM records. Since 
                    // this is confusing, we don;t show that..

                    if (this.showSeqres) {

                        var line = svg.rect(g, this.seq2Screen(range.start), y + (this.param.trackHeight / 4),
                            Math.round(width * this.scale), (this.param.trackHeight / 4) * 2,

                            {
                                fill: 'url(#BWGradient' + trackID +this.viewer.getData().uniprotID + ')',
                                stroke: bw_color.color,
                                strokeWidth: 1
                            });
                        //$(line).css('class','.tooltip');

                        $(line).attr("title", "No coordinates have been " +
                        "determined for this region, " +
                        "but the sequence is recorded in the SEQRES records. ");

                        this.registerTooltip(line);
                    }
                }
            }


            return y + this.height;

        };


        /** Draws Site residues.
         *
         * @param svg
         * @param track
         * @param y
         * @param trackID
         * @param mycolors
         * @param orientation - should the site-arrows point upwards or downwards? either 'up' or 'down'
         */
        Draw.prototype.drawSiteResidues = function (svg, feature, y, trackID,
                                                      mycolors, orientation, siteTrackHeight) {


            if (typeof feature.tracks === 'undefined') {
                return;
            }

            if (feature.tracks.length < 1) {
                return;
            }
            var baseLineHeight = 3;

            var colorPos = 0;
            var g = svg.group({id: trackID, fontWeight: 'bold', fontSize: '10', fill: 'black'});

            // draw features base line...
            var defs1 = svg.defs();


            var isPhospho = false;
            // color gradient of base line. Default .. UP color
            var gcolor = this.param.paired_colors[2];
            if (feature.label === 'PDB SITES residues') {
                // PDB color...
                gcolor = this.param.paired_colors[1];
            } else if (feature.label.indexOf('Phosphosite') !== -1) {
                gcolor = this.param.paired_colors[9];
                isPhospho = true;
            }

            var rect1 = {};

            if (orientation === 'up') {

                svg.linearGradient(defs1, 'sequenceSite' + trackID + this.viewer.getData().uniprotID, [
                        ['0%', gcolor.color],
                        ['100%', gcolor.darkercolor]
                    ],
                    0, y + siteTrackHeight - baseLineHeight, 0, y + siteTrackHeight,
                    {
                        gradientUnits: 'userSpaceOnUse'

                    }
                );
                rect1 = svg.rect(g, this.seq2Screen(0), y + siteTrackHeight - baseLineHeight,
                    this.viewer.getSequence().length * this.scale, baseLineHeight,
                    4, 4,
                    {
                        fill: 'url(#sequenceSite' + trackID + this.viewer.getData().uniprotID + ')',
                        stroke: gcolor.darkercolor,
                        strokeWidth: 1
                    });
            } else {
                svg.linearGradient(defs1, 'sequenceSite' + trackID + this.viewer.getData().uniprotID, [
                        ['0%', gcolor.color],
                        ['100%', gcolor.darkercolor]
                    ],
                    0, y, 0, y + baseLineHeight,
                    {
                        gradientUnits: 'userSpaceOnUse'

                    }
                );

                rect1 = svg.rect(g, this.seq2Screen(0), y,
                	 this.viewer.getSequence().length * this.scale, baseLineHeight,
                    4, 4,
                    {
                        fill: 'url(#sequenceSite' + trackID + this.viewer.getData().uniprotID + ')',
                        stroke: gcolor.darkercolor,
                        strokeWidth: 1
                    });
            }


            $(rect1).attr("title", feature.label + ' track for ' +
            feature.tracks[0].pdbID + "." + feature.tracks[0].chainID);
            this.registerTooltip(rect1);

            var that = this;

            var clickPhosphoMethod = function (event) {
                var g = event.target;

                console.log(g.id + " " + g.name);

                // show Popup
                if (typeof pageTracker !== 'undefined') {
                    pageTracker._trackEvent('ProteinFeatureView',
                        'clickPhosphoSite', that.data.uniprotID);
                }

                var html = "<h3>" + that.title + "</h3>";
                html += "<ul>";

                var url = "http://www.phosphosite.org/" +
                    "proteinSearchSubmitAction.do?accessionIds=" +
                    that.data.uniprotID;

                html += "<li>Show at <a target='_new'' href='" + url +
                    "'>PhosphoSitePlus website</a></li>";


                html += "</ul>";

                $(that.dialogDiv).html(html);
                $(that.dialogDiv).dialog({
                        title: that.title,
                        height: 300,
                        width: 300,
                        modal: true,
                        buttons: {
                            "Cancel": function () {
                                $(this).dialog("close");
                            }
                        }
                    }
                );
            };

            for (var i = 0; i < feature.tracks.length; i++) {
                var site = feature.tracks[i];
                if (typeof site === 'undefined') {
                    continue;
                }

                var color = colorDict[site.name];


                if (feature.label === "wwPDB validation report data") {
                    // PDB validation records.
                    // the color code is int the desc field

                    var defcolor = site.desc;

                    color = defcolor;
                }


                if (typeof color === 'undefined') {
                    colorPos++;
                    if (colorPos > mycolors.length - 1) {
                        colorPos = 0;
                    }
                    color = mycolors[colorPos];
                    colorDict[site.name] = color;
                    console.log("setting new color for " + site.name + " " + color.color);
                }


                if (orientation === 'up') {
                    svg.radialGradient(g, 'siteWGradient' + i + this.viewer.getData().uniprotID, [
                            ['0%', color.lightercolor],
                            ['100%', color.color]
                        ],
                        //0,y,0, y+ trackHeight,
                        this.seq2Screen(site.start) - this.scale / 2, y + baseLineHeight - 4, 4,
                        this.seq2Screen(site.start) - this.scale / 2, y + baseLineHeight - 3,
                        {
                            gradientUnits: 'userSpaceOnUse'

                        }
                    );
                } else {
                    svg.radialGradient(g, 'siteWGradient' + i + this.viewer.getData().uniprotID, [
                            ['0%', color.lightercolor],
                            ['100%', color.color]
                        ],
                        //0,y,0, y+ trackHeight,
                        this.seq2Screen(site.start) - this.scale / 2, y + siteTrackHeight - 4, 4,
                        this.seq2Screen(site.start) - this.scale / 2, y + siteTrackHeight - 3,
                        {
                            gradientUnits: 'userSpaceOnUse'

                        }
                    );
                }

                //

                var rect = {};
                var circle = {};

                if (orientation === 'up') {
                    rect = svg.rect(g, this.seq2Screen(site.start) - this.scale / 2, y + baseLineHeight,
                        2, siteTrackHeight - baseLineHeight,
                        {
                            fill: 'black'
                        });
                    circle = svg.circle(g, this.seq2Screen(site.start) - this.scale / 2, y, 4,
                        {
                            fill: 'url(#siteWGradient' + i + this.viewer.getData().uniprotID + ')',
                            stroke: color.darkerColor,
                            strokeWidth: 1
                        });
                } else {
                    rect = svg.rect(g, this.seq2Screen(site.start) - this.scale / 2, y, 2, siteTrackHeight,
                        {
                            fill: 'black'
                        });

                    circle = svg.circle(g, this.seq2Screen(site.start) - this.scale / 2,
                        y + siteTrackHeight - 4, 4,
                        {
                            fill: 'url(#siteWGradient' + i + this.viewer.getData().uniprotID + ')',
                            stroke: color.darkerColor,
                            strokeWidth: 1
                        });
                }

                var pdbInfo = "";

                if ((typeof feature.tracks[0].pdbID) === 'string') {

                    pdbInfo = feature.tracks[0].pdbID + "." + feature.tracks[0].chainID + ": ";

                } else {
                    //console.log( " did not find PDB ID for track " +
                    //JSON.stringify(feature.tracks[0]) + " " +
                    //(typeof feature.tracks[0].pdbID  ));

                }


                var title1 = pdbInfo;

                if (typeof site.desc !== 'undefined') {
                    title1 += site.desc;
                }

                if (typeof site.name !== 'undefined') {
                    title1 += " - " + site.name;
                }

                title1 += " (" + site.start + ")";

                $(rect).attr("title", title1);
                this.registerTooltip(rect);

                $(circle).attr("title", title1);
                this.registerTooltip(circle);

                if (isPhospho) {
                    $(circle).attr("id", site.acc);
                    $(circle).attr("name", this.title);
                    $(circle).css('cursor', 'pointer');

                    $(circle).bind('click', clickPhosphoMethod);


                }


            }
        };

 Draw.prototype.drawUniprotChainData = function (svg, y, callback) {

            var chains = this.viewer.getData().chains;

            var rows =this.breakTrackInRows(chains.tracks);

            if (rows < 1) {
                return y;
            }

          

            y = this.drawGenericTrack(svg, rows, y, 'Molec. Processing', 'chainTrack',
                this.param.up_colors, undefined, callback, this.viewer.getData().chains.label);

            return y;

        };

        

        Draw.prototype.drawTick = function (svg, seqpos, y, height) {

            var g = svg.group(
                {fontWeight: 'normal', fontSize: 10, fill: 'black'}
            );
            svg.text(g, this.seq2Screen(seqpos), y - 2 - 1, (seqpos + 1) + "");
            svg.rect(this.seq2Screen(seqpos), y, 1 * this.scale, height,
                {fill: 'black'});

        };


         Draw.prototype.drawUniprotFeatures = function (svg, y) {


            var that = this;
            var callback = function () {
                // show draw dialog..

                var txt = this.name;

                if (this.name !== this.desc) {
                    txt += " - " + this.desc;
                }


                var html = "";
                if (this.name === "short sequence motif") {
                    console.log(this.name);
                    var spl = this.desc.split(" ");
                    if (spl.length === 2) {
                        html = that.sequenceMotifPopup(spl[0], txt);
                    }
                }

                if (html === "") {
                    var seq = this.viewer.getData().sequence.substr(this.start, (this.end - this.start + 1));
                    html = that.blastPopup(seq, this.url, this.hits, this.desc, txt);
                }

                $(this.dialogDiv).html(html);
                $(this.dialogDiv).dialog({
                    title: txt,
                    height: 300,
                    width: 300,
                    modal: true,
                    buttons: {
                        "Cancel": function () {
                            $(this).dialog("close");
                        }
                    }
                });
            };


            if (typeof this.viewer.getData().chains !== 'undefined') {

               y= this.drawUniprotChainData(svg, y, callback);

            }

           

            if (
                (typeof this.viewer.getData().motifs !== 'undefined' ) &&
                ( typeof this.viewer.getData().motifs.tracks !== 'undefined')
            ) {


                var motifs = this.viewer.getData().motifs.tracks;

                var motifrows = this.breakTrackInRows(motifs);

                //alert(" motif has " + motifrows.length + " rows" + JSON.stringify(motifrows));

                y = this.drawGenericTrack(svg, motifrows, y, 'Motif', 'motifTrack',
                    this.param.up_colors, undefined, callback, this.viewer.getData().motifs.label);

            }
            if (typeof this.viewer.getData().enzymeClassification !== 'undefined') {

                var ecs = this.viewer.getData().enzymeClassification.tracks;

                var ecrows = this.breakTrackInRows(ecs);

                var brendaurl = "http://www.brenda-enzymes.org/php/result_flat.php4?ecno=";

                var pdburl = this.rcsbServer  + "/pdb/search/smartSubquery.do?smartSearchSubtype=" +
                    "EnzymeClassificationQuery&Enzyme_Classification=";

                var callbackec = function () {

                    var html = "<h3>" + this.name + " - " + this.desc + "</h3>";
                    html += "<ul><li>View in <a href='" + brendaurl + this.name +
                        "' target='_new'>BRENDA</a></li>";
                    html += "<li>View <a href='" + pdburl + this.name +
                        "'>other PDB entries with the same E.C. number</a></li>";
                    html += "</ul>";

                    if (typeof pageTracker !== 'undefined') {
                        pageTracker._trackEvent('ProteinFeatureView', 'showECDialog', this.name);
                    }

                    $(this.dialogDiv).html(html);
                    $(this.dialogDiv).dialog({
                        title: this.name + ' - ' + this.desc,
                        height: 300,
                        width: 300,
                        modal: true,
                        buttons: {
                            "Cancel": function () {
                                $(this).dialog("close");
                            }
                        }
                    });
                };

                y = this.drawRangedTrack(svg, ecrows, y, 'E.C.', 'enzymeClassificationTrack',
                    this.param.up_colors, undefined, callbackec, this.viewer.getData().enzymeClassification.label);

            }


            return y + this.param.trackHeight;

        };


        Draw.prototype.drawPDBSecstruc = function (svg, y) {


            var secstruc = this.viewer.getData().secstruc;

            if (typeof secstruc === 'undefined') {
                return y;
            }

            y = this.drawSecstrucTrack(svg, secstruc, y);

            return y + this.param.trackHeight;

        };

        Draw.prototype.drawSecstrucTrack = function (svg, trackdata, y) {


            if (typeof trackdata === 'undefined') {
                return y;
            }

            if (typeof trackdata.tracks === 'undefined') {
                return y;
            }

      
            var trackName = 'Secstruc';
            var label = trackdata.label;

            var g0 = svg.group({
                    id: label + this.viewer.getData().uniprotID,
                    fontWeight: 'bold',
                    fontSize: '10', fill: 'black'
                }
            );


            if (this.viewer.getData().tracks.length > 0) {
                this.drawName(svg, g0, y, trackName, undefined, label);
            }

            // draw black line in background
            var bw_color = this.param.bw_colors[0];
            svg.linearGradient(svg.defs(), 'secstrucBWGradient' + this.viewer.getData().uniprotID, [
                    ['0%', 'white'],
                    ['100%', bw_color]
                ],
                0, y, 0, y + this.param.trackHeight,
                {
                    gradientUnits: 'userSpaceOnUse'
                }
            );

            for (var j = 0; j < this.viewer.getData().tracks.length; j++) {
                var track = this.viewer.getData().tracks[j];
                if (track === null) {
                    continue;
                }
                for (var i = 0; i < track.ranges.length; i++) {
                    var rangeOrig = track.ranges[i];

                    if (!rangeOrig.observed) {
                        continue;
                    }

                    var range = {};
                    range.start = rangeOrig.start - 1;
                    range.end = rangeOrig.end - 1;

                    var width = (range.end - range.start) + 1;

                    var line = svg.rect(g0, this.seq2Screen(range.start), y +
                        (this.param.trackHeight / 4), Math.round(width * this.scale), (this.param.trackHeight / 4) * 2,

                        {
                            fill: 'url(#secstrucBWGradient' +this.viewer.getData().uniprotID + ')',
                            stroke: bw_color.color,
                            strokeWidth: 1
                        });

                    $(line).attr("title", 'coil');

                    //$(line).bind('mouseover', this.popuptooltipMethod);
                    //$(line).mouseout(this.mouseoutMethod);
                    //$(line).css('cursor','pointer');
                    this.registerTooltip(line);
                }
            }

            for (var i1 = 0; i1 < trackdata.tracks.length; i1++) {
                var rangeOrig1 = trackdata.tracks[i1];

                var range1 = {};
                range1.start = rangeOrig1.start - 1;
                range1.end = rangeOrig1.end - 1;
                range1.name = rangeOrig1.name;
                range1.desc = rangeOrig1.desc;
                range1.note = rangeOrig1.note;

                var width1 = (range1.end - range1.start) + 1;

                // something is off!
                // if too long, something is fishy..
                if (width1 > 30) {
                    continue;
                }

                if (range1.end > this.viewer.getData().length) {
                    // probably a chimera protein, we can't deal with those currently
                    continue;
                }

                var color = this.param.bw_colors[3]; // grey

                if (range1.name === 'H' || range1.name === 'I' || range1.name === 'G') {
                    color = this.param.paired_colors[5];
                }
                else if (range1.name === 'E' || range1.name === 'B') {
                    color = this.param.paired_colors[6];
                }
                else if (range1.name === 'T') {
                    color = this.param.paired_colors[0];
                }


                //alert(JSON.stringify(color));
                var x1 = this.seq2Screen(range1.start);

                var defs2 = svg.defs();
                svg.linearGradient(defs2, trackName + 'GR' + i1 +this.viewer.getData().uniprotID, [
                        ['0%', color.lightercolor],
                        ['100%', color.darkercolor]
                    ],
                    0, y, 0, y + this.param.trackHeight,
                    {
                        gradientUnits: 'userSpaceOnUse'

                    }
                );

                var g2 = svg.group({
                        id: trackName +this.viewer.getData().uniprotID,
                        fontWeight: 'bold',
                        fontSize: '10',
                        fill: color.textcolor
                    }
                );

                var rect = {};
                if (range1.name === 'H' || range1.name === 'G' ||
                    range1.name === 'I' || range1.name === 'E') {

                    rect = svg.rect(g2, x1, y, width1 * this.scale, this.param.trackHeight,
                        0, 0,
                        {
                            fill: 'url(#' + trackName + 'GR' + i1 +this.viewer.getData().uniprotID + ')',
                            stroke: color.darkercolor,
                            strokeWidth: 1
                        });
                } else {
                    // a smaller box (moved 1 pix to the left so an adjacent
                    //large box looks more dominant
                    rect = svg.rect(g0, x1 + 1, y + (this.param.trackHeight / 8),
                        width1 * this.scale, (this.param.trackHeight / 8) * 7,
                        0, 0,
                        {
                            fill: 'url(#' + trackName + 'GR' + i1 +this.viewer.getData().uniprotID + ')',
                            stroke: color.darkercolor,
                            strokeWidth: 1
                        });
                }

                if (range1.name === 'H') {
                    for (var xl = x1; xl < ( this.seq2Screen(range1.end)); xl += 4) {
                        svg.line(g0, xl, y + this.param.trackHeight, xl + 4, y, {
                            fill: color.darkercolor, stroke: color.darkercolor
                        });

                    }
                }


                var t = range1.desc;
                if (typeof range1.desc === 'undefined') {
                    t = range1.name;
                }
                if (typeof range1.note !== 'undefined') {
                    t += " (from " + range1.note + ")";
                }
                var title = t + " (" + rangeOrig1.start + "-" + rangeOrig1.end + ")";
                $(rect).attr('title', title);
                //$(rect).bind('mouseover', this.popuptooltipMethod);
                //$(rect).mouseout(this.mouseoutMethod);
                //$(rect).css('cursor','pointer');
                //console.log(rect);
                this.registerTooltip(rect);

            }

            return y + this.param.trackHeight;

        };


        /** Draws a 'ranged' track. I.e. it indicated start and stop positions
         *
         * @param svg
         * @param rows
         * @param y
         * @param label
         * @param trackName
         * @param mycolors
         * @param url
         * @param callbackFunction
         * @returns
         */
        Draw.prototype.drawRangedTrack = function (svg, rows, y, label,
                                                     trackName, mycolors, url, callbackFunction, info) {


            if (rows.length === 0) {
                return y;
            }

            var newLocationMethod = function () {
                document.location.href = url;
            };


            var colorPos = -1;
            var g0 = svg.group({
                    id: label + this.viewer.getData().uniprotID,
                    fontWeight: 'bold',
                    fontSize: '10', fill: 'black'
                }
            );

            this.drawName(svg, g0, y, label, undefined, info);

            for (var j = 0; j < rows.length; j++) {

                var row = rows[j];

                for (var i = 0; i < row.length; i++) {

                    try {
                        var rangeOrig = row[i];

                        if (typeof rangeOrig === 'undefined') {
                            continue;
                        }

                        if (typeof rangeOrig.desc === 'undefined') {
                            continue;
                        }

                        var range = {};

                        range.start = rangeOrig.start - 1;
                        range.end = rangeOrig.end - 1;
                        range.desc = rangeOrig.desc;
                        range.name = rangeOrig.name;

                        colorPos++;
                        if (colorPos > mycolors.length - 1) {
                            colorPos = 0;
                        }

                        var color = mycolors[colorPos];
                        //alert(JSON.stringify(colorPos) + " " + JSON.stringify(mycolors));
                        var width = (range.end - range.start) + 1;

                        var x1 = this.seq2Screen(range.start);

                        var defs = svg.defs();
                        svg.linearGradient(defs, trackName + 'GR' + j + i + this.viewer.getData().uniprotID, [
                                ['0%', 'white'],
                                ['100%', color.darkercolor]
                            ],
                            0, y, 0, y + this.param.trackHeight,
                            {
                                gradientUnits: 'userSpaceOnUse'

                            }
                        );

                        var g = svg.group({
                                id: trackName + this.viewer.getData().uniprotID,
                                fontWeight: 'bold',
                                fontSize: '10',
                                fill: color.textcolor
                            }
                        );

                        // draw vertical bars at start and stop:
                        svg.rect(g, x1, y, 1 * this.scale, this.param.trackHeight,
                            1, 1,
                            {
                                fill: color.darkercolor,
                                stroke: color.darkercolor,
                                strokeWidth: 1
                            });

                        svg.rect(g, this.seq2Screen(range.end), y, 1 * this.scale, this.param.trackHeight,
                            1, 1,
                            {
                                fill: color.darkercolor,
                                stroke: color.darkercolor,
                                strokeWidth: 1
                            });


                        // draw horizontal connector
                        var rect = svg.rect(g, x1, y + this.param.trackHeight / 2 - 2, width * this.scale, 4,
                            {
                                fill: 'url(#' + trackName + 'GR' + j + i + this.viewer.getData().uniprotID + ')',
                                stroke: color.darkercolor,
                                strokeWidth: 1
                            });

                        var dispText = range.desc;

                        if (trackName === 'Homology_Models') {
                            dispText = "";
                        }

                        var txt = svg.text(g, x1 + this.scale, y + this.param.trackHeight - 1, dispText);

                        this.checkTxtLength(txt, range.start, range.end, dispText);

                        var title = range.name;

                        title += " (" + rangeOrig.start + "-" + rangeOrig.end + ")";

                        if (range.name !== range.desc) {
                            title += " - " + range.desc;
                        }

                        if (typeof range.status !== 'undefined') {
                            title += " - " + range.status;
                        }

                        $(rect).attr('title', title);
                        //$(rect).bind('mouseover', this.popuptooltipMethod);
                        //$(rect).mouseout(this.mouseoutMethod);
                        this.registerTooltip(rect);


                        $(txt).attr('title', title);
                         this.registerTooltip(txt);


                        if (typeof url !== 'undefined') {
                            $(rect).css('cursor', 'pointer');
                            $(txt).css('cursor', 'pointer');
                            $(rect).bind('click', newLocationMethod);
                            $(txt).bind('click', newLocationMethod);
                        }

                        if (typeof callbackFunction !== 'undefined') {
                            $(rect).css('cursor', 'pointer');
                            $(txt).css('cursor', 'pointer');
                            $(rect).bind('click', $.proxy(callbackFunction, range));
                            $(txt).bind('click', $.proxy(callbackFunction, range));
                        }


                    } catch (e) {
                        console.log("Problem while drawing ranged track: " + label + " " + e);
                    }
                }
                y += this.param.trackHeight + 5;
            }
            return y;

        };

        Draw.prototype.drawCytoplasmic = function (y, svg, range, trackName) {

            var ydraw = y + this.param.trackHeight - 2;
            var yheight = 2;
            this.drawTmLine(y, svg, range, trackName, ydraw, yheight);

        };

        Draw.prototype.drawPeriplasmic = function (y, svg, range, trackName) {

            var ydraw = y;
            var yheight = 2;
            this.drawTmLine(y, svg, range, trackName, ydraw, yheight);

        };

        Draw.prototype.drawTmLine = function (y, svg, range, trackName, ydraw, yheight) {

            //var red  = paired_colors[5];
            var blue = this.param.paired_colors[1];

            //cytoplasmic is a the bottom

            var g = svg.group({
                    id: trackName + this.viewer.getData().uniprotID,
                    fontWeight: 'bold',
                    fontSize: '10',
                    fill: 'black'
                }
            );

            var width = (range.end - range.start) + 1;

            var x1 =this.seq2Screen(range.start - 1);

            var rect = svg.rect(g, x1, ydraw, width * this.scale, yheight,
                {
                    fill: blue.color,
                    stroke: blue.darkercolor,
                    strokeWidth: 1
                });
            var txt = svg.text(g, x1 + this.scale, y + this.param.trackHeight - 1, range.desc);
            this.checkTxtLength(txt, range.start, range.end, range.desc);

            var title = range.desc + "-" + range.name;
            if (typeof range.status !== 'undefined') {
                title += " - " + range.status;
            }

            $(rect).attr('title', title);
            this.registerTooltip(rect);

            $(txt).attr('title', title);
            this.registerTooltip(txt);
           

        };

        Draw.prototype.drawIntramembrane = function (y, svg, range, trackName) {

            //var red  = paired_colors[5];
            //var blue = paired_colors[1];
            var color = this.param.bw_colors[3];
            //var color = red;
            //cytoplasmic is a the bottom

            var g = svg.group({
                    id: trackName + this.viewer.getData().uniprotID,
                    fontWeight: 'bold',
                    fontSize: '10',
                    fill: 'black'
                }
            );

            var width = (range.end - range.start) + 1;

            var x1 = this.seq2Screen(range.start - 1);


            // draw a horizontal line representing the membrane
            var rect = svg.rect(g, x1, y + this.param.trackHeight / 2, width * this.scale, 2,
                {
                    fill: color.color,
                    stroke: color.darkercolor,
                    strokeWidth: 1
                });

            // draw vertical bars at start and stop:
            svg.rect(g, x1, y, 1 * this.scale, this.param.trackHeight,
                1, 1,
                {
                    fill: color.darkercolor,
                    stroke: color.darkercolor,
                    strokeWidth: 1
                });

            svg.rect(g, this.seq2Screen(range.end - 1), y, 1 * this.scale, this.param.trackHeight,
                1, 1,
                {
                    fill: color.darkercolor,
                    stroke: color.darkercolor,
                    strokeWidth: 1
                });


            var txt = svg.text(g, x1 + this.scale, y + this.param.trackHeight - 1, range.desc);

            this.checkTxtLength(txt, range.start, range.end, range.desc);


            var title = range.desc + "-" + range.name;
            if (typeof range.status !== 'undefined') {
                title += " - " + range.status;
            }

            //title += " " + range.start + "-" + range.end;
            $(rect).attr('title', title);
            this.registerTooltip(rect);


            $(txt).attr('title', title);
            this.registerTooltip(txt);

        };

        Draw.prototype.drawTransmembrane = function (y, svg, range, trackName) {


            var red = this.param.paired_colors[5];
            //var blue = paired_colors[1];
            //var color = bw_colors[3];
            var color = red;
            //cytoplasmic is a the bottom

            var g = svg.group({
                    id: trackName + this.viewer.getData().uniprotID,
                    fontWeight: 'bold',
                    fontSize: '10',
                    fill: 'black'
                }
            );

            var width = (range.end - range.start) + 1;

            var x1 = this.seq2Screen(range.start - 1);

            var defs = svg.defs();

            svg.linearGradient(defs, trackName + 'TR' + this.viewer.getData().uniprotID, [
                    ['0%', color.lightercolor],
                    ['100%', color.darkercolor]
                ],
                0, y, 0, y + this.param.trackHeight,
                {
                    gradientUnits: 'userSpaceOnUse'

                }
            );

            // draw a horizontal line representing the membrane
            var rect = svg.rect(g, x1, y, width * this.scale, this.param.trackHeight,
                {
                    fill: 'url(#' + trackName + 'TR' + this.viewer.getData().uniprotID + ')',
                    stroke: color.darkercolor,
                    strokeWidth: 1
                });

            for (var xl = x1; xl < ( this.seq2Screen(range.end)  ); xl += 4) {
                svg.line(g, xl, y + this.param.trackHeight, xl + 2, y, {
                    fill: color.darkercolor, stroke: color.darkercolor
                });

            }

            var txt = svg.text(g, x1 + this.scale, y + this.param.trackHeight - 1, range.desc);

            this.checkTxtLength(txt, range.start, range.end, range.desc);


            var title = range.desc + "-" + range.name;
            if (typeof range.status !== 'undefined') {
                title += " - " + range.status;
            }

            //title += " " + range.start + "-" + range.end;
            $(rect).attr('title', title);
            this.registerTooltip(rect);


            $(txt).attr('title', title);
            this.registerTooltip(txt);

        };


        /** break a track array that might contain overlapping tracks into multiple non-overlapping rows
         *
         */
        Draw.prototype.breakTrackInRows = function (tracks) {
            var rows = [];

            if (tracks.length < 1) {
                return rows;
            }

            // we'll have at least one row...
            var rowArr = [];
            rows.push(rowArr);

            var featureCount = 0;

            nextTrack:
            for (var i = 0; i < tracks.length; i++) {
                var range = tracks[i];

                // weird bug, should not happen..
                if (typeof range === 'undefined') {
                    continue nextTrack;
                }

                var lowestRow = 0;

                nextRow:
                for (var j = 0; j < rows.length; j++) {
                    var row = rows[j];
                    var foundOverlap = false;

                    for (var k = 0; k < row.length; k++) {

                        featureCount++;
                        var f = row[k];
                        var overlap = this.getOverlap(range.start, range.end, f.start, f.end);


                        if (overlap > 0) {

                            foundOverlap = true;
                            lowestRow++;
                            break nextRow;
                        }
                    }

                    // we went through a whole row and no overlap... let's add it here..
                    if (!foundOverlap) {
                        break nextRow;
                    }

                }
                //if (range.start == 1029 || range.start == 1023 || range.start == 980)
                 

                if (rows.length < lowestRow + 1) {
                    var rowArr1 = [];
                    rows.push(rowArr1);
                }


                // add this range to the first row where it does not overlap anything.
                rows[lowestRow].push(range);
            }

            
            return rows;
        };

        Draw.prototype.updateTrackColors = function (coloring) {

            var counter = 0;
            var colorPos = -1;

            
            var colors = coloring;

            if (typeof this.viewer.getData().tracks === 'undefined') {
                return;
            }
            for (var i = 0; i <this.viewer.getData().tracks.length; i++) {

                var track =this.viewer.getData().tracks[i];

                if (track === null) {
                    continue;
                }

                counter++;

                colorPos++;

                if (colorPos >= colors.length) {
                    colorPos = 0;
                }


                var colorData = this.getTrackColor(colors, colorPos, track);

                track.color = colorData.color;
                track.lightercolor = colorData.lightercolor;
            }
        };

        Draw.prototype.getTrackColor = function (colors, colorPos, track) {


        
            //var colorMap =this.viewer.getData().colors[colorPos];
            var colorMap = colors[colorPos];
            if (this.viewer.colorBy === "Resolution") {

                //alert(colorBy + " " + track.resolution);      
                if (typeof track.resolution === 'undefined') {
                    return this.param.bw_colors[6];
                }

                var resolution = track.resolution;

                for (var i = 0; i < (this.redblue_colors.length - 1); i++) {

                    if (resolution < (i + 1) * 1000) {
                        //alert("i " + i + " " + resolution);
                        return this.redblue_colors[i];
                    }
                }

                // last one is the max resolution...
                return this.redblue_colors[this.redblue_colors.length - 1];

            } else if (this.viewer.colorBy === "Alignment Length") {
                // default is all in one color
                return colors[1];
            }
            // other
            return colorMap;


        };



 	Draw.prototype.checkTxtLength = function (txt, start, end, fullText) {

            var tlength = txt.getComputedTextLength();

            var width = end - start + 1;

            var availspace = width * this.scale;

            if (tlength > availspace) {
                // resize the text!

                // width in view divided by 10 px font size
                var max = Math.floor(availspace / 8.0);
                //console.log('avail space: ' + availspace +' px ' + 
                //" new max: " + max + " " + txt.getBoundingClientRect().width + " " + tlength);
                //alert("text " + domain.name + " too long! " + max );

                txt.firstChild.data = fullText.substring(0, max);

                //txt.getBoundingClientRect().width = availspace;

                //txt.setBoundingClientRect()
                //tlength = txt.getComputedTextLength();
            }

        };


		/** Count the number of positions that are overlapping the two ranges xs-ys and as-bs
         *
         */
        Draw.prototype.getOverlap = function (x, y, a, b) {

            var overlap = 0;
            //1: do we overlap?

            if (
                (
                    // 2nd starts in range of 1st
                 ( x <= a) && ( a <= y)
                ) ||
                (
                    // 2nd ends in range of 1st
                 (x <= b) && ( b <= y)
                ) ||
                    // 1st is contained in 2nd
                (a <= x && y <= b)
                ) {

                //2: how much is it?

                if (x < a) {
                    if (y < b) {
                        overlap = y - a;
                    } else {
                        overlap = b - a;
                    }
                } else {
                    if (y < b) {
                        overlap = y - x;
                    } else {
                        overlap = b - x;
                    }

                }

            }

            return overlap;
        };
        
		/** Set the scale of the current display. The value is the amount of
         * space given for rendering one amino acid.
         *
         * @param aaWidth - width of one amino acid
         */
        Draw.prototype.setScale = function (aaWidth) {

        	//console.log("draw: set scale  " + aaWidth);

            if (aaWidth > this.param.maxTextSize) {
                aaWidth = this.param.maxTextSize;
            }

            this.scale = aaWidth;
            

        };

 		Draw.prototype.registerTooltip = function (element, title) {

            try {
                if (typeof title === 'undefined') {
                     title = $(element).attr('title');
                }

                if ( typeof element === 'undefined') {
                    console.err("got undefined for element?? " + title);
                }

                 if ( typeof $(element) === 'undefined') {
                    console.err("got undefined for element?? " + element + " " + title);
                }

                 $(element).tooltip({
                                'title':title,
                                'container':'body'
                            });
                $(element).css('cursor', 'pointer');

            } catch (err){
                console.log("could not register tooltip for " + JSON.stringify(element) + " " + JSON.stringify(title));
                console.log(err);
            }
        };





        return {
            Draw: function (viewer) {
                return new Draw(viewer);
            }
        };

});

/*! jQuery v2.0.2 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license
//@ sourceMappingURL=jquery-2.0.2.min.map
*/
(function(e,undefined){var t,n,r=typeof undefined,i=e.location,o=e.document,s=o.documentElement,a=e.jQuery,u=e.$,l={},c=[],p="2.0.2",f=c.concat,h=c.push,d=c.slice,g=c.indexOf,m=l.toString,y=l.hasOwnProperty,v=p.trim,x=function(e,n){return new x.fn.init(e,n,t)},b=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,w=/\S+/g,T=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/^-ms-/,N=/-([\da-z])/gi,E=function(e,t){return t.toUpperCase()},S=function(){o.removeEventListener("DOMContentLoaded",S,!1),e.removeEventListener("load",S,!1),x.ready()};x.fn=x.prototype={jquery:p,constructor:x,init:function(e,t,n){var r,i;if(!e)return this;if("string"==typeof e){if(r="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:T.exec(e),!r||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof x?t[0]:t,x.merge(this,x.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:o,!0)),C.test(r[1])&&x.isPlainObject(t))for(r in t)x.isFunction(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return i=o.getElementById(r[2]),i&&i.parentNode&&(this.length=1,this[0]=i),this.context=o,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):x.isFunction(e)?n.ready(e):(e.selector!==undefined&&(this.selector=e.selector,this.context=e.context),x.makeArray(e,this))},selector:"",length:0,toArray:function(){return d.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=x.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return x.each(this,e,t)},ready:function(e){return x.ready.promise().done(e),this},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(x.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:h,sort:[].sort,splice:[].splice},x.fn.init.prototype=x.fn,x.extend=x.fn.extend=function(){var e,t,n,r,i,o,s=arguments[0]||{},a=1,u=arguments.length,l=!1;for("boolean"==typeof s&&(l=s,s=arguments[1]||{},a=2),"object"==typeof s||x.isFunction(s)||(s={}),u===a&&(s=this,--a);u>a;a++)if(null!=(e=arguments[a]))for(t in e)n=s[t],r=e[t],s!==r&&(l&&r&&(x.isPlainObject(r)||(i=x.isArray(r)))?(i?(i=!1,o=n&&x.isArray(n)?n:[]):o=n&&x.isPlainObject(n)?n:{},s[t]=x.extend(l,o,r)):r!==undefined&&(s[t]=r));return s},x.extend({expando:"jQuery"+(p+Math.random()).replace(/\D/g,""),noConflict:function(t){return e.$===x&&(e.$=u),t&&e.jQuery===x&&(e.jQuery=a),x},isReady:!1,readyWait:1,holdReady:function(e){e?x.readyWait++:x.ready(!0)},ready:function(e){(e===!0?--x.readyWait:x.isReady)||(x.isReady=!0,e!==!0&&--x.readyWait>0||(n.resolveWith(o,[x]),x.fn.trigger&&x(o).trigger("ready").off("ready")))},isFunction:function(e){return"function"===x.type(e)},isArray:Array.isArray,isWindow:function(e){return null!=e&&e===e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[m.call(e)]||"object":typeof e},isPlainObject:function(e){if("object"!==x.type(e)||e.nodeType||x.isWindow(e))return!1;try{if(e.constructor&&!y.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(t){return!1}return!0},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||o;var r=C.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=x.buildFragment([e],t,i),i&&x(i).remove(),x.merge([],r.childNodes))},parseJSON:JSON.parse,parseXML:function(e){var t,n;if(!e||"string"!=typeof e)return null;try{n=new DOMParser,t=n.parseFromString(e,"text/xml")}catch(r){t=undefined}return(!t||t.getElementsByTagName("parsererror").length)&&x.error("Invalid XML: "+e),t},noop:function(){},globalEval:function(e){var t,n=eval;e=x.trim(e),e&&(1===e.indexOf("use strict")?(t=o.createElement("script"),t.text=e,o.head.appendChild(t).parentNode.removeChild(t)):n(e))},camelCase:function(e){return e.replace(k,"ms-").replace(N,E)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,s=j(e);if(n){if(s){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(s){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:function(e){return null==e?"":v.call(e)},makeArray:function(e,t){var n=t||[];return null!=e&&(j(Object(e))?x.merge(n,"string"==typeof e?[e]:e):h.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:g.call(t,e,n)},merge:function(e,t){var n=t.length,r=e.length,i=0;if("number"==typeof n)for(;n>i;i++)e[r++]=t[i];else while(t[i]!==undefined)e[r++]=t[i++];return e.length=r,e},grep:function(e,t,n){var r,i=[],o=0,s=e.length;for(n=!!n;s>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,s=j(e),a=[];if(s)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(a[a.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(a[a.length]=r);return f.apply([],a)},guid:1,proxy:function(e,t){var n,r,i;return"string"==typeof t&&(n=e[t],t=e,e=n),x.isFunction(e)?(r=d.call(arguments,2),i=function(){return e.apply(t||this,r.concat(d.call(arguments)))},i.guid=e.guid=e.guid||x.guid++,i):undefined},access:function(e,t,n,r,i,o,s){var a=0,u=e.length,l=null==n;if("object"===x.type(n)){i=!0;for(a in n)x.access(e,t,a,n[a],!0,o,s)}else if(r!==undefined&&(i=!0,x.isFunction(r)||(s=!0),l&&(s?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(x(e),n)})),t))for(;u>a;a++)t(e[a],n,s?r:r.call(e[a],a,t(e[a],n)));return i?e:l?t.call(e):u?t(e[0],n):o},now:Date.now,swap:function(e,t,n,r){var i,o,s={};for(o in t)s[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=s[o];return i}}),x.ready.promise=function(t){return n||(n=x.Deferred(),"complete"===o.readyState?setTimeout(x.ready):(o.addEventListener("DOMContentLoaded",S,!1),e.addEventListener("load",S,!1))),n.promise(t)},x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function j(e){var t=e.length,n=x.type(e);return x.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}t=x(o),function(e,undefined){var t,n,r,i,o,s,a,u,l,c,p,f,h,d,g,m,y,v="sizzle"+-new Date,b=e.document,w=0,T=0,C=at(),k=at(),N=at(),E=!1,S=function(){return 0},j=typeof undefined,D=1<<31,A={}.hasOwnProperty,L=[],H=L.pop,q=L.push,O=L.push,F=L.slice,P=L.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},R="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",W="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",$=W.replace("w","w#"),B="\\["+M+"*("+W+")"+M+"*(?:([*^$|!~]?=)"+M+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+$+")|)|)"+M+"*\\]",I=":("+W+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+B.replace(3,8)+")*)|.*)\\)|)",z=RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),_=RegExp("^"+M+"*,"+M+"*"),X=RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=RegExp(M+"*[+~]"),Y=RegExp("="+M+"*([^\\]'\"]*)"+M+"*\\]","g"),V=RegExp(I),G=RegExp("^"+$+"$"),J={ID:RegExp("^#("+W+")"),CLASS:RegExp("^\\.("+W+")"),TAG:RegExp("^("+W.replace("w","w*")+")"),ATTR:RegExp("^"+B),PSEUDO:RegExp("^"+I),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:RegExp("^(?:"+R+")$","i"),needsContext:RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Q=/^[^{]+\{\s*\[native \w/,K=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,Z=/^(?:input|select|textarea|button)$/i,et=/^h\d$/i,tt=/'|\\/g,nt=RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),rt=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(55296|r>>10,56320|1023&r)};try{O.apply(L=F.call(b.childNodes),b.childNodes),L[b.childNodes.length].nodeType}catch(it){O={apply:L.length?function(e,t){q.apply(e,F.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function ot(e,t,r,i){var o,s,a,u,l,f,g,m,x,w;if((t?t.ownerDocument||t:b)!==p&&c(t),t=t||p,r=r||[],!e||"string"!=typeof e)return r;if(1!==(u=t.nodeType)&&9!==u)return[];if(h&&!i){if(o=K.exec(e))if(a=o[1]){if(9===u){if(s=t.getElementById(a),!s||!s.parentNode)return r;if(s.id===a)return r.push(s),r}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(a))&&y(t,s)&&s.id===a)return r.push(s),r}else{if(o[2])return O.apply(r,t.getElementsByTagName(e)),r;if((a=o[3])&&n.getElementsByClassName&&t.getElementsByClassName)return O.apply(r,t.getElementsByClassName(a)),r}if(n.qsa&&(!d||!d.test(e))){if(m=g=v,x=t,w=9===u&&e,1===u&&"object"!==t.nodeName.toLowerCase()){f=vt(e),(g=t.getAttribute("id"))?m=g.replace(tt,"\\$&"):t.setAttribute("id",m),m="[id='"+m+"'] ",l=f.length;while(l--)f[l]=m+xt(f[l]);x=U.test(e)&&t.parentNode||t,w=f.join(",")}if(w)try{return O.apply(r,x.querySelectorAll(w)),r}catch(T){}finally{g||t.removeAttribute("id")}}}return St(e.replace(z,"$1"),t,r,i)}function st(e){return Q.test(e+"")}function at(){var e=[];function t(n,r){return e.push(n+=" ")>i.cacheLength&&delete t[e.shift()],t[n]=r}return t}function ut(e){return e[v]=!0,e}function lt(e){var t=p.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function ct(e,t,n){e=e.split("|");var r,o=e.length,s=n?null:t;while(o--)(r=i.attrHandle[e[o]])&&r!==t||(i.attrHandle[e[o]]=s)}function pt(e,t){var n=e.getAttributeNode(t);return n&&n.specified?n.value:e[t]===!0?t.toLowerCase():null}function ft(e,t){return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}function ht(e){return"input"===e.nodeName.toLowerCase()?e.defaultValue:undefined}function dt(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||D)-(~e.sourceIndex||D);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function gt(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function mt(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function yt(e){return ut(function(t){return t=+t,ut(function(n,r){var i,o=e([],n.length,t),s=o.length;while(s--)n[i=o[s]]&&(n[i]=!(r[i]=n[i]))})})}s=ot.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},n=ot.support={},c=ot.setDocument=function(e){var t=e?e.ownerDocument||e:b,r=t.parentWindow;return t!==p&&9===t.nodeType&&t.documentElement?(p=t,f=t.documentElement,h=!s(t),r&&r.frameElement&&r.attachEvent("onbeforeunload",function(){c()}),n.attributes=lt(function(e){return e.innerHTML="<a href='#'></a>",ct("type|href|height|width",ft,"#"===e.firstChild.getAttribute("href")),ct(R,pt,null==e.getAttribute("disabled")),e.className="i",!e.getAttribute("className")}),n.input=lt(function(e){return e.innerHTML="<input>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")}),ct("value",ht,n.attributes&&n.input),n.getElementsByTagName=lt(function(e){return e.appendChild(t.createComment("")),!e.getElementsByTagName("*").length}),n.getElementsByClassName=lt(function(e){return e.innerHTML="<div class='a'></div><div class='a i'></div>",e.firstChild.className="i",2===e.getElementsByClassName("i").length}),n.getById=lt(function(e){return f.appendChild(e).id=v,!t.getElementsByName||!t.getElementsByName(v).length}),n.getById?(i.find.ID=function(e,t){if(typeof t.getElementById!==j&&h){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},i.filter.ID=function(e){var t=e.replace(nt,rt);return function(e){return e.getAttribute("id")===t}}):(delete i.find.ID,i.filter.ID=function(e){var t=e.replace(nt,rt);return function(e){var n=typeof e.getAttributeNode!==j&&e.getAttributeNode("id");return n&&n.value===t}}),i.find.TAG=n.getElementsByTagName?function(e,t){return typeof t.getElementsByTagName!==j?t.getElementsByTagName(e):undefined}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},i.find.CLASS=n.getElementsByClassName&&function(e,t){return typeof t.getElementsByClassName!==j&&h?t.getElementsByClassName(e):undefined},g=[],d=[],(n.qsa=st(t.querySelectorAll))&&(lt(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||d.push("\\["+M+"*(?:value|"+R+")"),e.querySelectorAll(":checked").length||d.push(":checked")}),lt(function(e){var n=t.createElement("input");n.setAttribute("type","hidden"),e.appendChild(n).setAttribute("t",""),e.querySelectorAll("[t^='']").length&&d.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll(":enabled").length||d.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),d.push(",.*:")})),(n.matchesSelector=st(m=f.webkitMatchesSelector||f.mozMatchesSelector||f.oMatchesSelector||f.msMatchesSelector))&&lt(function(e){n.disconnectedMatch=m.call(e,"div"),m.call(e,"[s!='']:x"),g.push("!=",I)}),d=d.length&&RegExp(d.join("|")),g=g.length&&RegExp(g.join("|")),y=st(f.contains)||f.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},n.sortDetached=lt(function(e){return 1&e.compareDocumentPosition(t.createElement("div"))}),S=f.compareDocumentPosition?function(e,r){if(e===r)return E=!0,0;var i=r.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(r);return i?1&i||!n.sortDetached&&r.compareDocumentPosition(e)===i?e===t||y(b,e)?-1:r===t||y(b,r)?1:l?P.call(l,e)-P.call(l,r):0:4&i?-1:1:e.compareDocumentPosition?-1:1}:function(e,n){var r,i=0,o=e.parentNode,s=n.parentNode,a=[e],u=[n];if(e===n)return E=!0,0;if(!o||!s)return e===t?-1:n===t?1:o?-1:s?1:l?P.call(l,e)-P.call(l,n):0;if(o===s)return dt(e,n);r=e;while(r=r.parentNode)a.unshift(r);r=n;while(r=r.parentNode)u.unshift(r);while(a[i]===u[i])i++;return i?dt(a[i],u[i]):a[i]===b?-1:u[i]===b?1:0},t):p},ot.matches=function(e,t){return ot(e,null,null,t)},ot.matchesSelector=function(e,t){if((e.ownerDocument||e)!==p&&c(e),t=t.replace(Y,"='$1']"),!(!n.matchesSelector||!h||g&&g.test(t)||d&&d.test(t)))try{var r=m.call(e,t);if(r||n.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(i){}return ot(t,p,null,[e]).length>0},ot.contains=function(e,t){return(e.ownerDocument||e)!==p&&c(e),y(e,t)},ot.attr=function(e,t){(e.ownerDocument||e)!==p&&c(e);var r=i.attrHandle[t.toLowerCase()],o=r&&A.call(i.attrHandle,t.toLowerCase())?r(e,t,!h):undefined;return o===undefined?n.attributes||!h?e.getAttribute(t):(o=e.getAttributeNode(t))&&o.specified?o.value:null:o},ot.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},ot.uniqueSort=function(e){var t,r=[],i=0,o=0;if(E=!n.detectDuplicates,l=!n.sortStable&&e.slice(0),e.sort(S),E){while(t=e[o++])t===e[o]&&(i=r.push(o));while(i--)e.splice(r[i],1)}return e},o=ot.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=o(t);return n},i=ot.selectors={cacheLength:50,createPseudo:ut,match:J,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(nt,rt),e[3]=(e[4]||e[5]||"").replace(nt,rt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||ot.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&ot.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return J.CHILD.test(e[0])?null:(e[3]&&e[4]!==undefined?e[2]=e[4]:n&&V.test(n)&&(t=vt(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(nt,rt).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=C[e+" "];return t||(t=RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&C(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==j&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=ot.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),s="last"!==e.slice(-4),a="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,p,f,h,d,g=o!==s?"nextSibling":"previousSibling",m=t.parentNode,y=a&&t.nodeName.toLowerCase(),x=!u&&!a;if(m){if(o){while(g){p=t;while(p=p[g])if(a?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;d=g="only"===e&&!d&&"nextSibling"}return!0}if(d=[s?m.firstChild:m.lastChild],s&&x){c=m[v]||(m[v]={}),l=c[e]||[],h=l[0]===w&&l[1],f=l[0]===w&&l[2],p=h&&m.childNodes[h];while(p=++h&&p&&p[g]||(f=h=0)||d.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[w,h,f];break}}else if(x&&(l=(t[v]||(t[v]={}))[e])&&l[0]===w)f=l[1];else while(p=++h&&p&&p[g]||(f=h=0)||d.pop())if((a?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(x&&((p[v]||(p[v]={}))[e]=[w,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||ot.error("unsupported pseudo: "+e);return r[v]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?ut(function(e,n){var i,o=r(e,t),s=o.length;while(s--)i=P.call(e,o[s]),e[i]=!(n[i]=o[s])}):function(e){return r(e,0,n)}):r}},pseudos:{not:ut(function(e){var t=[],n=[],r=a(e.replace(z,"$1"));return r[v]?ut(function(e,t,n,i){var o,s=r(e,null,i,[]),a=e.length;while(a--)(o=s[a])&&(e[a]=!(t[a]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:ut(function(e){return function(t){return ot(e,t).length>0}}),contains:ut(function(e){return function(t){return(t.textContent||t.innerText||o(t)).indexOf(e)>-1}}),lang:ut(function(e){return G.test(e||"")||ot.error("unsupported lang: "+e),e=e.replace(nt,rt).toLowerCase(),function(t){var n;do if(n=h?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===f},focus:function(e){return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!i.pseudos.empty(e)},header:function(e){return et.test(e.nodeName)},input:function(e){return Z.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:yt(function(){return[0]}),last:yt(function(e,t){return[t-1]}),eq:yt(function(e,t,n){return[0>n?n+t:n]}),even:yt(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:yt(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:yt(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:yt(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}};for(t in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})i.pseudos[t]=gt(t);for(t in{submit:!0,reset:!0})i.pseudos[t]=mt(t);function vt(e,t){var n,r,o,s,a,u,l,c=k[e+" "];if(c)return t?0:c.slice(0);a=e,u=[],l=i.preFilter;while(a){(!n||(r=_.exec(a)))&&(r&&(a=a.slice(r[0].length)||a),u.push(o=[])),n=!1,(r=X.exec(a))&&(n=r.shift(),o.push({value:n,type:r[0].replace(z," ")}),a=a.slice(n.length));for(s in i.filter)!(r=J[s].exec(a))||l[s]&&!(r=l[s](r))||(n=r.shift(),o.push({value:n,type:s,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?ot.error(e):k(e,u).slice(0)}function xt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function bt(e,t,n){var i=t.dir,o=n&&"parentNode"===i,s=T++;return t.first?function(t,n,r){while(t=t[i])if(1===t.nodeType||o)return e(t,n,r)}:function(t,n,a){var u,l,c,p=w+" "+s;if(a){while(t=t[i])if((1===t.nodeType||o)&&e(t,n,a))return!0}else while(t=t[i])if(1===t.nodeType||o)if(c=t[v]||(t[v]={}),(l=c[i])&&l[0]===p){if((u=l[1])===!0||u===r)return u===!0}else if(l=c[i]=[p],l[1]=e(t,n,a)||r,l[1]===!0)return!0}}function wt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function Tt(e,t,n,r,i){var o,s=[],a=0,u=e.length,l=null!=t;for(;u>a;a++)(o=e[a])&&(!n||n(o,r,i))&&(s.push(o),l&&t.push(a));return s}function Ct(e,t,n,r,i,o){return r&&!r[v]&&(r=Ct(r)),i&&!i[v]&&(i=Ct(i,o)),ut(function(o,s,a,u){var l,c,p,f=[],h=[],d=s.length,g=o||Et(t||"*",a.nodeType?[a]:a,[]),m=!e||!o&&t?g:Tt(g,f,e,a,u),y=n?i||(o?e:d||r)?[]:s:m;if(n&&n(m,y,a,u),r){l=Tt(y,h),r(l,[],a,u),c=l.length;while(c--)(p=l[c])&&(y[h[c]]=!(m[h[c]]=p))}if(o){if(i||e){if(i){l=[],c=y.length;while(c--)(p=y[c])&&l.push(m[c]=p);i(null,y=[],l,u)}c=y.length;while(c--)(p=y[c])&&(l=i?P.call(o,p):f[c])>-1&&(o[l]=!(s[l]=p))}}else y=Tt(y===s?y.splice(d,y.length):y),i?i(null,s,y,u):O.apply(s,y)})}function kt(e){var t,n,r,o=e.length,s=i.relative[e[0].type],a=s||i.relative[" "],l=s?1:0,c=bt(function(e){return e===t},a,!0),p=bt(function(e){return P.call(t,e)>-1},a,!0),f=[function(e,n,r){return!s&&(r||n!==u)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;o>l;l++)if(n=i.relative[e[l].type])f=[bt(wt(f),n)];else{if(n=i.filter[e[l].type].apply(null,e[l].matches),n[v]){for(r=++l;o>r;r++)if(i.relative[e[r].type])break;return Ct(l>1&&wt(f),l>1&&xt(e.slice(0,l-1).concat({value:" "===e[l-2].type?"*":""})).replace(z,"$1"),n,r>l&&kt(e.slice(l,r)),o>r&&kt(e=e.slice(r)),o>r&&xt(e))}f.push(n)}return wt(f)}function Nt(e,t){var n=0,o=t.length>0,s=e.length>0,a=function(a,l,c,f,h){var d,g,m,y=[],v=0,x="0",b=a&&[],T=null!=h,C=u,k=a||s&&i.find.TAG("*",h&&l.parentNode||l),N=w+=null==C?1:Math.random()||.1;for(T&&(u=l!==p&&l,r=n);null!=(d=k[x]);x++){if(s&&d){g=0;while(m=e[g++])if(m(d,l,c)){f.push(d);break}T&&(w=N,r=++n)}o&&((d=!m&&d)&&v--,a&&b.push(d))}if(v+=x,o&&x!==v){g=0;while(m=t[g++])m(b,y,l,c);if(a){if(v>0)while(x--)b[x]||y[x]||(y[x]=H.call(f));y=Tt(y)}O.apply(f,y),T&&!a&&y.length>0&&v+t.length>1&&ot.uniqueSort(f)}return T&&(w=N,u=C),b};return o?ut(a):a}a=ot.compile=function(e,t){var n,r=[],i=[],o=N[e+" "];if(!o){t||(t=vt(e)),n=t.length;while(n--)o=kt(t[n]),o[v]?r.push(o):i.push(o);o=N(e,Nt(i,r))}return o};function Et(e,t,n){var r=0,i=t.length;for(;i>r;r++)ot(e,t[r],n);return n}function St(e,t,r,o){var s,u,l,c,p,f=vt(e);if(!o&&1===f.length){if(u=f[0]=f[0].slice(0),u.length>2&&"ID"===(l=u[0]).type&&n.getById&&9===t.nodeType&&h&&i.relative[u[1].type]){if(t=(i.find.ID(l.matches[0].replace(nt,rt),t)||[])[0],!t)return r;e=e.slice(u.shift().value.length)}s=J.needsContext.test(e)?0:u.length;while(s--){if(l=u[s],i.relative[c=l.type])break;if((p=i.find[c])&&(o=p(l.matches[0].replace(nt,rt),U.test(u[0].type)&&t.parentNode||t))){if(u.splice(s,1),e=o.length&&xt(u),!e)return O.apply(r,o),r;break}}}return a(e,f)(o,t,!h,r,U.test(e)),r}i.pseudos.nth=i.pseudos.eq;function jt(){}jt.prototype=i.filters=i.pseudos,i.setFilters=new jt,n.sortStable=v.split("").sort(S).join("")===v,c(),[0,0].sort(S),n.detectDuplicates=E,x.find=ot,x.expr=ot.selectors,x.expr[":"]=x.expr.pseudos,x.unique=ot.uniqueSort,x.text=ot.getText,x.isXMLDoc=ot.isXML,x.contains=ot.contains}(e);var D={};function A(e){var t=D[e]={};return x.each(e.match(w)||[],function(e,n){t[n]=!0}),t}x.Callbacks=function(e){e="string"==typeof e?D[e]||A(e):x.extend({},e);var t,n,r,i,o,s,a=[],u=!e.once&&[],l=function(p){for(t=e.memory&&p,n=!0,s=i||0,i=0,o=a.length,r=!0;a&&o>s;s++)if(a[s].apply(p[0],p[1])===!1&&e.stopOnFalse){t=!1;break}r=!1,a&&(u?u.length&&l(u.shift()):t?a=[]:c.disable())},c={add:function(){if(a){var n=a.length;(function s(t){x.each(t,function(t,n){var r=x.type(n);"function"===r?e.unique&&c.has(n)||a.push(n):n&&n.length&&"string"!==r&&s(n)})})(arguments),r?o=a.length:t&&(i=n,l(t))}return this},remove:function(){return a&&x.each(arguments,function(e,t){var n;while((n=x.inArray(t,a,n))>-1)a.splice(n,1),r&&(o>=n&&o--,s>=n&&s--)}),this},has:function(e){return e?x.inArray(e,a)>-1:!(!a||!a.length)},empty:function(){return a=[],o=0,this},disable:function(){return a=u=t=undefined,this},disabled:function(){return!a},lock:function(){return u=undefined,t||c.disable(),this},locked:function(){return!u},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],!a||n&&!u||(r?u.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!n}};return c},x.extend({Deferred:function(e){var t=[["resolve","done",x.Callbacks("once memory"),"resolved"],["reject","fail",x.Callbacks("once memory"),"rejected"],["notify","progress",x.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return x.Deferred(function(n){x.each(t,function(t,o){var s=o[0],a=x.isFunction(e[t])&&e[t];i[o[1]](function(){var e=a&&a.apply(this,arguments);e&&x.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===r?n.promise():this,a?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?x.extend(e,r):r}},i={};return r.pipe=r.then,x.each(t,function(e,o){var s=o[2],a=o[3];r[o[1]]=s.add,a&&s.add(function(){n=a},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=s.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=d.call(arguments),r=n.length,i=1!==r||e&&x.isFunction(e.promise)?r:0,o=1===i?e:x.Deferred(),s=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?d.call(arguments):r,n===a?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},a,u,l;if(r>1)for(a=Array(r),u=Array(r),l=Array(r);r>t;t++)n[t]&&x.isFunction(n[t].promise)?n[t].promise().done(s(t,l,n)).fail(o.reject).progress(s(t,u,a)):--i;return i||o.resolveWith(l,n),o.promise()}}),x.support=function(t){var n=o.createElement("input"),r=o.createDocumentFragment(),i=o.createElement("div"),s=o.createElement("select"),a=s.appendChild(o.createElement("option"));return n.type?(n.type="checkbox",t.checkOn=""!==n.value,t.optSelected=a.selected,t.reliableMarginRight=!0,t.boxSizingReliable=!0,t.pixelPosition=!1,n.checked=!0,t.noCloneChecked=n.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!a.disabled,n=o.createElement("input"),n.value="t",n.type="radio",t.radioValue="t"===n.value,n.setAttribute("checked","t"),n.setAttribute("name","t"),r.appendChild(n),t.checkClone=r.cloneNode(!0).cloneNode(!0).lastChild.checked,t.focusinBubbles="onfocusin"in e,i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===i.style.backgroundClip,x(function(){var n,r,s="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",a=o.getElementsByTagName("body")[0];a&&(n=o.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",a.appendChild(n).appendChild(i),i.innerHTML="",i.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",x.swap(a,null!=a.style.zoom?{zoom:1}:{},function(){t.boxSizing=4===i.offsetWidth}),e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(i,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(i,null)||{width:"4px"}).width,r=i.appendChild(o.createElement("div")),r.style.cssText=i.style.cssText=s,r.style.marginRight=r.style.width="0",i.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),a.removeChild(n))}),t):t}({});var L,H,q=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,O=/([A-Z])/g;function F(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=x.expando+Math.random()}F.uid=1,F.accepts=function(e){return e.nodeType?1===e.nodeType||9===e.nodeType:!0},F.prototype={key:function(e){if(!F.accepts(e))return 0;var t={},n=e[this.expando];if(!n){n=F.uid++;try{t[this.expando]={value:n},Object.defineProperties(e,t)}catch(r){t[this.expando]=n,x.extend(e,t)}}return this.cache[n]||(this.cache[n]={}),n},set:function(e,t,n){var r,i=this.key(e),o=this.cache[i];if("string"==typeof t)o[t]=n;else if(x.isEmptyObject(o))x.extend(this.cache[i],t);else for(r in t)o[r]=t[r];return o},get:function(e,t){var n=this.cache[this.key(e)];return t===undefined?n:n[t]},access:function(e,t,n){return t===undefined||t&&"string"==typeof t&&n===undefined?this.get(e,t):(this.set(e,t,n),n!==undefined?n:t)},remove:function(e,t){var n,r,i,o=this.key(e),s=this.cache[o];if(t===undefined)this.cache[o]={};else{x.isArray(t)?r=t.concat(t.map(x.camelCase)):(i=x.camelCase(t),t in s?r=[t,i]:(r=i,r=r in s?[r]:r.match(w)||[])),n=r.length;while(n--)delete s[r[n]]}},hasData:function(e){return!x.isEmptyObject(this.cache[e[this.expando]]||{})},discard:function(e){e[this.expando]&&delete this.cache[e[this.expando]]}},L=new F,H=new F,x.extend({acceptData:F.accepts,hasData:function(e){return L.hasData(e)||H.hasData(e)},data:function(e,t,n){return L.access(e,t,n)},removeData:function(e,t){L.remove(e,t)},_data:function(e,t,n){return H.access(e,t,n)},_removeData:function(e,t){H.remove(e,t)}}),x.fn.extend({data:function(e,t){var n,r,i=this[0],o=0,s=null;if(e===undefined){if(this.length&&(s=L.get(i),1===i.nodeType&&!H.get(i,"hasDataAttrs"))){for(n=i.attributes;n.length>o;o++)r=n[o].name,0===r.indexOf("data-")&&(r=x.camelCase(r.slice(5)),P(i,r,s[r]));H.set(i,"hasDataAttrs",!0)}return s}return"object"==typeof e?this.each(function(){L.set(this,e)}):x.access(this,function(t){var n,r=x.camelCase(e);if(i&&t===undefined){if(n=L.get(i,e),n!==undefined)return n;if(n=L.get(i,r),n!==undefined)return n;if(n=P(i,r,undefined),n!==undefined)return n}else this.each(function(){var n=L.get(this,r);L.set(this,r,t),-1!==e.indexOf("-")&&n!==undefined&&L.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){L.remove(this,e)})}});function P(e,t,n){var r;if(n===undefined&&1===e.nodeType)if(r="data-"+t.replace(O,"-$1").toLowerCase(),n=e.getAttribute(r),"string"==typeof n){try{n="true"===n?!0:"false"===n?!1:"null"===n?null:+n+""===n?+n:q.test(n)?JSON.parse(n):n}catch(i){}L.set(e,t,n)}else n=undefined;return n}x.extend({queue:function(e,t,n){var r;return e?(t=(t||"fx")+"queue",r=H.get(e,t),n&&(!r||x.isArray(n)?r=H.access(e,t,x.makeArray(n)):r.push(n)),r||[]):undefined},dequeue:function(e,t){t=t||"fx";var n=x.queue(e,t),r=n.length,i=n.shift(),o=x._queueHooks(e,t),s=function(){x.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,s,o)),!r&&o&&o.empty.fire()
},_queueHooks:function(e,t){var n=t+"queueHooks";return H.get(e,n)||H.access(e,n,{empty:x.Callbacks("once memory").add(function(){H.remove(e,[t+"queue",n])})})}}),x.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),n>arguments.length?x.queue(this[0],e):t===undefined?this:this.each(function(){var n=x.queue(this,e,t);x._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&x.dequeue(this,e)})},dequeue:function(e){return this.each(function(){x.dequeue(this,e)})},delay:function(e,t){return e=x.fx?x.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=x.Deferred(),o=this,s=this.length,a=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=undefined),e=e||"fx";while(s--)n=H.get(o[s],e+"queueHooks"),n&&n.empty&&(r++,n.empty.add(a));return a(),i.promise(t)}});var R,M,W=/[\t\r\n\f]/g,$=/\r/g,B=/^(?:input|select|textarea|button)$/i;x.fn.extend({attr:function(e,t){return x.access(this,x.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){x.removeAttr(this,e)})},prop:function(e,t){return x.access(this,x.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[x.propFix[e]||e]})},addClass:function(e){var t,n,r,i,o,s=0,a=this.length,u="string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];a>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(W," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=x.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,s=0,a=this.length,u=0===arguments.length||"string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];a>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(W," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?x.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e,i="boolean"==typeof t;return x.isFunction(e)?this.each(function(n){x(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var o,s=0,a=x(this),u=t,l=e.match(w)||[];while(o=l[s++])u=i?u:!a.hasClass(o),a[u?"addClass":"removeClass"](o)}else(n===r||"boolean"===n)&&(this.className&&H.set(this,"__className__",this.className),this.className=this.className||e===!1?"":H.get(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(W," ").indexOf(t)>=0)return!0;return!1},val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=x.isFunction(e),this.each(function(n){var i;1===this.nodeType&&(i=r?e.call(this,n,x(this).val()):e,null==i?i="":"number"==typeof i?i+="":x.isArray(i)&&(i=x.map(i,function(e){return null==e?"":e+""})),t=x.valHooks[this.type]||x.valHooks[this.nodeName.toLowerCase()],t&&"set"in t&&t.set(this,i,"value")!==undefined||(this.value=i))});if(i)return t=x.valHooks[i.type]||x.valHooks[i.nodeName.toLowerCase()],t&&"get"in t&&(n=t.get(i,"value"))!==undefined?n:(n=i.value,"string"==typeof n?n.replace($,""):null==n?"":n)}}}),x.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,s=o?null:[],a=o?i+1:r.length,u=0>i?a:o?i:0;for(;a>u;u++)if(n=r[u],!(!n.selected&&u!==i||(x.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&x.nodeName(n.parentNode,"optgroup"))){if(t=x(n).val(),o)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=x.makeArray(t),s=i.length;while(s--)r=i[s],(r.selected=x.inArray(x(r).val(),o)>=0)&&(n=!0);return n||(e.selectedIndex=-1),o}}},attr:function(e,t,n){var i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return typeof e.getAttribute===r?x.prop(e,t,n):(1===s&&x.isXMLDoc(e)||(t=t.toLowerCase(),i=x.attrHooks[t]||(x.expr.match.bool.test(t)?M:R)),n===undefined?i&&"get"in i&&null!==(o=i.get(e,t))?o:(o=x.find.attr(e,t),null==o?undefined:o):null!==n?i&&"set"in i&&(o=i.set(e,n,t))!==undefined?o:(e.setAttribute(t,n+""),n):(x.removeAttr(e,t),undefined))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(w);if(o&&1===e.nodeType)while(n=o[i++])r=x.propFix[n]||n,x.expr.match.bool.test(n)&&(e[r]=!1),e.removeAttribute(n)},attrHooks:{type:{set:function(e,t){if(!x.support.radioValue&&"radio"===t&&x.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{"for":"htmlFor","class":"className"},prop:function(e,t,n){var r,i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return o=1!==s||!x.isXMLDoc(e),o&&(t=x.propFix[t]||t,i=x.propHooks[t]),n!==undefined?i&&"set"in i&&(r=i.set(e,n,t))!==undefined?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){return e.hasAttribute("tabindex")||B.test(e.nodeName)||e.href?e.tabIndex:-1}}}}),M={set:function(e,t,n){return t===!1?x.removeAttr(e,n):e.setAttribute(n,n),n}},x.each(x.expr.match.bool.source.match(/\w+/g),function(e,t){var n=x.expr.attrHandle[t]||x.find.attr;x.expr.attrHandle[t]=function(e,t,r){var i=x.expr.attrHandle[t],o=r?undefined:(x.expr.attrHandle[t]=undefined)!=n(e,t,r)?t.toLowerCase():null;return x.expr.attrHandle[t]=i,o}}),x.support.optSelected||(x.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null}}),x.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){x.propFix[this.toLowerCase()]=this}),x.each(["radio","checkbox"],function(){x.valHooks[this]={set:function(e,t){return x.isArray(t)?e.checked=x.inArray(x(e).val(),t)>=0:undefined}},x.support.checkOn||(x.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var I=/^key/,z=/^(?:mouse|contextmenu)|click/,_=/^(?:focusinfocus|focusoutblur)$/,X=/^([^.]*)(?:\.(.+)|)$/;function U(){return!0}function Y(){return!1}function V(){try{return o.activeElement}catch(e){}}x.event={global:{},add:function(e,t,n,i,o){var s,a,u,l,c,p,f,h,d,g,m,y=H.get(e);if(y){n.handler&&(s=n,n=s.handler,o=s.selector),n.guid||(n.guid=x.guid++),(l=y.events)||(l=y.events={}),(a=y.handle)||(a=y.handle=function(e){return typeof x===r||e&&x.event.triggered===e.type?undefined:x.event.dispatch.apply(a.elem,arguments)},a.elem=e),t=(t||"").match(w)||[""],c=t.length;while(c--)u=X.exec(t[c])||[],d=m=u[1],g=(u[2]||"").split(".").sort(),d&&(f=x.event.special[d]||{},d=(o?f.delegateType:f.bindType)||d,f=x.event.special[d]||{},p=x.extend({type:d,origType:m,data:i,handler:n,guid:n.guid,selector:o,needsContext:o&&x.expr.match.needsContext.test(o),namespace:g.join(".")},s),(h=l[d])||(h=l[d]=[],h.delegateCount=0,f.setup&&f.setup.call(e,i,g,a)!==!1||e.addEventListener&&e.addEventListener(d,a,!1)),f.add&&(f.add.call(e,p),p.handler.guid||(p.handler.guid=n.guid)),o?h.splice(h.delegateCount++,0,p):h.push(p),x.event.global[d]=!0);e=null}},remove:function(e,t,n,r,i){var o,s,a,u,l,c,p,f,h,d,g,m=H.hasData(e)&&H.get(e);if(m&&(u=m.events)){t=(t||"").match(w)||[""],l=t.length;while(l--)if(a=X.exec(t[l])||[],h=g=a[1],d=(a[2]||"").split(".").sort(),h){p=x.event.special[h]||{},h=(r?p.delegateType:p.bindType)||h,f=u[h]||[],a=a[2]&&RegExp("(^|\\.)"+d.join("\\.(?:.*\\.|)")+"(\\.|$)"),s=o=f.length;while(o--)c=f[o],!i&&g!==c.origType||n&&n.guid!==c.guid||a&&!a.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(f.splice(o,1),c.selector&&f.delegateCount--,p.remove&&p.remove.call(e,c));s&&!f.length&&(p.teardown&&p.teardown.call(e,d,m.handle)!==!1||x.removeEvent(e,h,m.handle),delete u[h])}else for(h in u)x.event.remove(e,h+t[l],n,r,!0);x.isEmptyObject(u)&&(delete m.handle,H.remove(e,"events"))}},trigger:function(t,n,r,i){var s,a,u,l,c,p,f,h=[r||o],d=y.call(t,"type")?t.type:t,g=y.call(t,"namespace")?t.namespace.split("."):[];if(a=u=r=r||o,3!==r.nodeType&&8!==r.nodeType&&!_.test(d+x.event.triggered)&&(d.indexOf(".")>=0&&(g=d.split("."),d=g.shift(),g.sort()),c=0>d.indexOf(":")&&"on"+d,t=t[x.expando]?t:new x.Event(d,"object"==typeof t&&t),t.isTrigger=i?2:3,t.namespace=g.join("."),t.namespace_re=t.namespace?RegExp("(^|\\.)"+g.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=undefined,t.target||(t.target=r),n=null==n?[t]:x.makeArray(n,[t]),f=x.event.special[d]||{},i||!f.trigger||f.trigger.apply(r,n)!==!1)){if(!i&&!f.noBubble&&!x.isWindow(r)){for(l=f.delegateType||d,_.test(l+d)||(a=a.parentNode);a;a=a.parentNode)h.push(a),u=a;u===(r.ownerDocument||o)&&h.push(u.defaultView||u.parentWindow||e)}s=0;while((a=h[s++])&&!t.isPropagationStopped())t.type=s>1?l:f.bindType||d,p=(H.get(a,"events")||{})[t.type]&&H.get(a,"handle"),p&&p.apply(a,n),p=c&&a[c],p&&x.acceptData(a)&&p.apply&&p.apply(a,n)===!1&&t.preventDefault();return t.type=d,i||t.isDefaultPrevented()||f._default&&f._default.apply(h.pop(),n)!==!1||!x.acceptData(r)||c&&x.isFunction(r[d])&&!x.isWindow(r)&&(u=r[c],u&&(r[c]=null),x.event.triggered=d,r[d](),x.event.triggered=undefined,u&&(r[c]=u)),t.result}},dispatch:function(e){e=x.event.fix(e);var t,n,r,i,o,s=[],a=d.call(arguments),u=(H.get(this,"events")||{})[e.type]||[],l=x.event.special[e.type]||{};if(a[0]=e,e.delegateTarget=this,!l.preDispatch||l.preDispatch.call(this,e)!==!1){s=x.event.handlers.call(this,e,u),t=0;while((i=s[t++])&&!e.isPropagationStopped()){e.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(o.namespace))&&(e.handleObj=o,e.data=o.data,r=((x.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,a),r!==undefined&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return l.postDispatch&&l.postDispatch.call(this,e),e.result}},handlers:function(e,t){var n,r,i,o,s=[],a=t.delegateCount,u=e.target;if(a&&u.nodeType&&(!e.button||"click"!==e.type))for(;u!==this;u=u.parentNode||this)if(u.disabled!==!0||"click"!==e.type){for(r=[],n=0;a>n;n++)o=t[n],i=o.selector+" ",r[i]===undefined&&(r[i]=o.needsContext?x(i,this).index(u)>=0:x.find(i,this,null,[u]).length),r[i]&&r.push(o);r.length&&s.push({elem:u,handlers:r})}return t.length>a&&s.push({elem:this,handlers:t.slice(a)}),s},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,t){var n,r,i,s=t.button;return null==e.pageX&&null!=t.clientX&&(n=e.target.ownerDocument||o,r=n.documentElement,i=n.body,e.pageX=t.clientX+(r&&r.scrollLeft||i&&i.scrollLeft||0)-(r&&r.clientLeft||i&&i.clientLeft||0),e.pageY=t.clientY+(r&&r.scrollTop||i&&i.scrollTop||0)-(r&&r.clientTop||i&&i.clientTop||0)),e.which||s===undefined||(e.which=1&s?1:2&s?3:4&s?2:0),e}},fix:function(e){if(e[x.expando])return e;var t,n,r,i=e.type,s=e,a=this.fixHooks[i];a||(this.fixHooks[i]=a=z.test(i)?this.mouseHooks:I.test(i)?this.keyHooks:{}),r=a.props?this.props.concat(a.props):this.props,e=new x.Event(s),t=r.length;while(t--)n=r[t],e[n]=s[n];return e.target||(e.target=o),3===e.target.nodeType&&(e.target=e.target.parentNode),a.filter?a.filter(e,s):e},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==V()&&this.focus?(this.focus(),!1):undefined},delegateType:"focusin"},blur:{trigger:function(){return this===V()&&this.blur?(this.blur(),!1):undefined},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&x.nodeName(this,"input")?(this.click(),!1):undefined},_default:function(e){return x.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){e.result!==undefined&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=x.extend(new x.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?x.event.trigger(i,null,t):x.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},x.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)},x.Event=function(e,t){return this instanceof x.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.getPreventDefault&&e.getPreventDefault()?U:Y):this.type=e,t&&x.extend(this,t),this.timeStamp=e&&e.timeStamp||x.now(),this[x.expando]=!0,undefined):new x.Event(e,t)},x.Event.prototype={isDefaultPrevented:Y,isPropagationStopped:Y,isImmediatePropagationStopped:Y,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=U,e&&e.preventDefault&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=U,e&&e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=U,this.stopPropagation()}},x.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){x.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!x.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),x.support.focusinBubbles||x.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){x.event.simulate(t,e.target,x.event.fix(e),!0)};x.event.special[t]={setup:function(){0===n++&&o.addEventListener(e,r,!0)},teardown:function(){0===--n&&o.removeEventListener(e,r,!0)}}}),x.fn.extend({on:function(e,t,n,r,i){var o,s;if("object"==typeof e){"string"!=typeof t&&(n=n||t,t=undefined);for(s in e)this.on(s,t,n,e[s],i);return this}if(null==n&&null==r?(r=t,n=t=undefined):null==r&&("string"==typeof t?(r=n,n=undefined):(r=n,n=t,t=undefined)),r===!1)r=Y;else if(!r)return this;return 1===i&&(o=r,r=function(e){return x().off(e),o.apply(this,arguments)},r.guid=o.guid||(o.guid=x.guid++)),this.each(function(){x.event.add(this,e,r,n,t)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,x(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return(t===!1||"function"==typeof t)&&(n=t,t=undefined),n===!1&&(n=Y),this.each(function(){x.event.remove(this,e,n,t)})},trigger:function(e,t){return this.each(function(){x.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];return n?x.event.trigger(e,t,n,!0):undefined}});var G=/^.[^:#\[\.,]*$/,J=/^(?:parents|prev(?:Until|All))/,Q=x.expr.match.needsContext,K={children:!0,contents:!0,next:!0,prev:!0};x.fn.extend({find:function(e){var t,n=[],r=this,i=r.length;if("string"!=typeof e)return this.pushStack(x(e).filter(function(){for(t=0;i>t;t++)if(x.contains(r[t],this))return!0}));for(t=0;i>t;t++)x.find(e,r[t],n);return n=this.pushStack(i>1?x.unique(n):n),n.selector=this.selector?this.selector+" "+e:e,n},has:function(e){var t=x(e,this),n=t.length;return this.filter(function(){var e=0;for(;n>e;e++)if(x.contains(this,t[e]))return!0})},not:function(e){return this.pushStack(et(this,e||[],!0))},filter:function(e){return this.pushStack(et(this,e||[],!1))},is:function(e){return!!et(this,"string"==typeof e&&Q.test(e)?x(e):e||[],!1).length},closest:function(e,t){var n,r=0,i=this.length,o=[],s=Q.test(e)||"string"!=typeof e?x(e,t||this.context):0;for(;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(11>n.nodeType&&(s?s.index(n)>-1:1===n.nodeType&&x.find.matchesSelector(n,e))){n=o.push(n);break}return this.pushStack(o.length>1?x.unique(o):o)},index:function(e){return e?"string"==typeof e?g.call(x(e),this[0]):g.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?x(e,t):x.makeArray(e&&e.nodeType?[e]:e),r=x.merge(this.get(),n);return this.pushStack(x.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}});function Z(e,t){while((e=e[t])&&1!==e.nodeType);return e}x.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return x.dir(e,"parentNode")},parentsUntil:function(e,t,n){return x.dir(e,"parentNode",n)},next:function(e){return Z(e,"nextSibling")},prev:function(e){return Z(e,"previousSibling")},nextAll:function(e){return x.dir(e,"nextSibling")},prevAll:function(e){return x.dir(e,"previousSibling")},nextUntil:function(e,t,n){return x.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return x.dir(e,"previousSibling",n)},siblings:function(e){return x.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return x.sibling(e.firstChild)},contents:function(e){return e.contentDocument||x.merge([],e.childNodes)}},function(e,t){x.fn[e]=function(n,r){var i=x.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=x.filter(r,i)),this.length>1&&(K[e]||x.unique(i),J.test(e)&&i.reverse()),this.pushStack(i)}}),x.extend({filter:function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?x.find.matchesSelector(r,e)?[r]:[]:x.find.matches(e,x.grep(t,function(e){return 1===e.nodeType}))},dir:function(e,t,n){var r=[],i=n!==undefined;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&x(e).is(n))break;r.push(e)}return r},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function et(e,t,n){if(x.isFunction(t))return x.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return x.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(G.test(t))return x.filter(t,e,n);t=x.filter(t,e)}return x.grep(e,function(e){return g.call(t,e)>=0!==n})}var tt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,nt=/<([\w:]+)/,rt=/<|&#?\w+;/,it=/<(?:script|style|link)/i,ot=/^(?:checkbox|radio)$/i,st=/checked\s*(?:[^=]|=\s*.checked.)/i,at=/^$|\/(?:java|ecma)script/i,ut=/^true\/(.*)/,lt=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ct={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ct.optgroup=ct.option,ct.tbody=ct.tfoot=ct.colgroup=ct.caption=ct.thead,ct.th=ct.td,x.fn.extend({text:function(e){return x.access(this,function(e){return e===undefined?x.text(this):this.empty().append((this[0]&&this[0].ownerDocument||o).createTextNode(e))},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=pt(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=pt(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=e?x.filter(e,this):this,i=0;for(;null!=(n=r[i]);i++)t||1!==n.nodeType||x.cleanData(mt(n)),n.parentNode&&(t&&x.contains(n.ownerDocument,n)&&dt(mt(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++)1===e.nodeType&&(x.cleanData(mt(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return x.clone(this,e,t)})},html:function(e){return x.access(this,function(e){var t=this[0]||{},n=0,r=this.length;if(e===undefined&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!it.test(e)&&!ct[(nt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(tt,"<$1></$2>");try{for(;r>n;n++)t=this[n]||{},1===t.nodeType&&(x.cleanData(mt(t,!1)),t.innerHTML=e);t=0}catch(i){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=x.map(this,function(e){return[e.nextSibling,e.parentNode]}),t=0;return this.domManip(arguments,function(n){var r=e[t++],i=e[t++];i&&(r&&r.parentNode!==i&&(r=this.nextSibling),x(this).remove(),i.insertBefore(n,r))},!0),t?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t,n){e=f.apply([],e);var r,i,o,s,a,u,l=0,c=this.length,p=this,h=c-1,d=e[0],g=x.isFunction(d);if(g||!(1>=c||"string"!=typeof d||x.support.checkClone)&&st.test(d))return this.each(function(r){var i=p.eq(r);g&&(e[0]=d.call(this,r,i.html())),i.domManip(e,t,n)});if(c&&(r=x.buildFragment(e,this[0].ownerDocument,!1,!n&&this),i=r.firstChild,1===r.childNodes.length&&(r=i),i)){for(o=x.map(mt(r,"script"),ft),s=o.length;c>l;l++)a=r,l!==h&&(a=x.clone(a,!0,!0),s&&x.merge(o,mt(a,"script"))),t.call(this[l],a,l);if(s)for(u=o[o.length-1].ownerDocument,x.map(o,ht),l=0;s>l;l++)a=o[l],at.test(a.type||"")&&!H.access(a,"globalEval")&&x.contains(u,a)&&(a.src?x._evalUrl(a.src):x.globalEval(a.textContent.replace(lt,"")))}return this}}),x.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){x.fn[e]=function(e){var n,r=[],i=x(e),o=i.length-1,s=0;for(;o>=s;s++)n=s===o?this:this.clone(!0),x(i[s])[t](n),h.apply(r,n.get());return this.pushStack(r)}}),x.extend({clone:function(e,t,n){var r,i,o,s,a=e.cloneNode(!0),u=x.contains(e.ownerDocument,e);if(!(x.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||x.isXMLDoc(e)))for(s=mt(a),o=mt(e),r=0,i=o.length;i>r;r++)yt(o[r],s[r]);if(t)if(n)for(o=o||mt(e),s=s||mt(a),r=0,i=o.length;i>r;r++)gt(o[r],s[r]);else gt(e,a);return s=mt(a,"script"),s.length>0&&dt(s,!u&&mt(e,"script")),a},buildFragment:function(e,t,n,r){var i,o,s,a,u,l,c=0,p=e.length,f=t.createDocumentFragment(),h=[];for(;p>c;c++)if(i=e[c],i||0===i)if("object"===x.type(i))x.merge(h,i.nodeType?[i]:i);else if(rt.test(i)){o=o||f.appendChild(t.createElement("div")),s=(nt.exec(i)||["",""])[1].toLowerCase(),a=ct[s]||ct._default,o.innerHTML=a[1]+i.replace(tt,"<$1></$2>")+a[2],l=a[0];while(l--)o=o.firstChild;x.merge(h,o.childNodes),o=f.firstChild,o.textContent=""}else h.push(t.createTextNode(i));f.textContent="",c=0;while(i=h[c++])if((!r||-1===x.inArray(i,r))&&(u=x.contains(i.ownerDocument,i),o=mt(f.appendChild(i),"script"),u&&dt(o),n)){l=0;while(i=o[l++])at.test(i.type||"")&&n.push(i)}return f},cleanData:function(e){var t,n,r,i,o,s,a=x.event.special,u=0;for(;(n=e[u])!==undefined;u++){if(F.accepts(n)&&(o=n[H.expando],o&&(t=H.cache[o]))){if(r=Object.keys(t.events||{}),r.length)for(s=0;(i=r[s])!==undefined;s++)a[i]?x.event.remove(n,i):x.removeEvent(n,i,t.handle);H.cache[o]&&delete H.cache[o]}delete L.cache[n[L.expando]]}},_evalUrl:function(e){return x.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})}});function pt(e,t){return x.nodeName(e,"table")&&x.nodeName(1===t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function ft(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function ht(e){var t=ut.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function dt(e,t){var n=e.length,r=0;for(;n>r;r++)H.set(e[r],"globalEval",!t||H.get(t[r],"globalEval"))}function gt(e,t){var n,r,i,o,s,a,u,l;if(1===t.nodeType){if(H.hasData(e)&&(o=H.access(e),s=H.set(t,o),l=o.events)){delete s.handle,s.events={};for(i in l)for(n=0,r=l[i].length;r>n;n++)x.event.add(t,i,l[i][n])}L.hasData(e)&&(a=L.access(e),u=x.extend({},a),L.set(t,u))}}function mt(e,t){var n=e.getElementsByTagName?e.getElementsByTagName(t||"*"):e.querySelectorAll?e.querySelectorAll(t||"*"):[];return t===undefined||t&&x.nodeName(e,t)?x.merge([e],n):n}function yt(e,t){var n=t.nodeName.toLowerCase();"input"===n&&ot.test(e.type)?t.checked=e.checked:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}x.fn.extend({wrapAll:function(e){var t;return x.isFunction(e)?this.each(function(t){x(this).wrapAll(e.call(this,t))}):(this[0]&&(t=x(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this)},wrapInner:function(e){return x.isFunction(e)?this.each(function(t){x(this).wrapInner(e.call(this,t))}):this.each(function(){var t=x(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=x.isFunction(e);return this.each(function(n){x(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){x.nodeName(this,"body")||x(this).replaceWith(this.childNodes)}).end()}});var vt,xt,bt=/^(none|table(?!-c[ea]).+)/,wt=/^margin/,Tt=RegExp("^("+b+")(.*)$","i"),Ct=RegExp("^("+b+")(?!px)[a-z%]+$","i"),kt=RegExp("^([+-])=("+b+")","i"),Nt={BODY:"block"},Et={position:"absolute",visibility:"hidden",display:"block"},St={letterSpacing:0,fontWeight:400},jt=["Top","Right","Bottom","Left"],Dt=["Webkit","O","Moz","ms"];function At(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Dt.length;while(i--)if(t=Dt[i]+n,t in e)return t;return r}function Lt(e,t){return e=t||e,"none"===x.css(e,"display")||!x.contains(e.ownerDocument,e)}function Ht(t){return e.getComputedStyle(t,null)}function qt(e,t){var n,r,i,o=[],s=0,a=e.length;for(;a>s;s++)r=e[s],r.style&&(o[s]=H.get(r,"olddisplay"),n=r.style.display,t?(o[s]||"none"!==n||(r.style.display=""),""===r.style.display&&Lt(r)&&(o[s]=H.access(r,"olddisplay",Rt(r.nodeName)))):o[s]||(i=Lt(r),(n&&"none"!==n||!i)&&H.set(r,"olddisplay",i?n:x.css(r,"display"))));for(s=0;a>s;s++)r=e[s],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[s]||"":"none"));return e}x.fn.extend({css:function(e,t){return x.access(this,function(e,t,n){var r,i,o={},s=0;if(x.isArray(t)){for(r=Ht(e),i=t.length;i>s;s++)o[t[s]]=x.css(e,t[s],!1,r);return o}return n!==undefined?x.style(e,t,n):x.css(e,t)},e,t,arguments.length>1)},show:function(){return qt(this,!0)},hide:function(){return qt(this)},toggle:function(e){var t="boolean"==typeof e;return this.each(function(){(t?e:Lt(this))?x(this).show():x(this).hide()})}}),x.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=vt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,s,a=x.camelCase(t),u=e.style;return t=x.cssProps[a]||(x.cssProps[a]=At(u,a)),s=x.cssHooks[t]||x.cssHooks[a],n===undefined?s&&"get"in s&&(i=s.get(e,!1,r))!==undefined?i:u[t]:(o=typeof n,"string"===o&&(i=kt.exec(n))&&(n=(i[1]+1)*i[2]+parseFloat(x.css(e,t)),o="number"),null==n||"number"===o&&isNaN(n)||("number"!==o||x.cssNumber[a]||(n+="px"),x.support.clearCloneStyle||""!==n||0!==t.indexOf("background")||(u[t]="inherit"),s&&"set"in s&&(n=s.set(e,n,r))===undefined||(u[t]=n)),undefined)}},css:function(e,t,n,r){var i,o,s,a=x.camelCase(t);return t=x.cssProps[a]||(x.cssProps[a]=At(e.style,a)),s=x.cssHooks[t]||x.cssHooks[a],s&&"get"in s&&(i=s.get(e,!0,n)),i===undefined&&(i=vt(e,t,r)),"normal"===i&&t in St&&(i=St[t]),""===n||n?(o=parseFloat(i),n===!0||x.isNumeric(o)?o||0:i):i}}),vt=function(e,t,n){var r,i,o,s=n||Ht(e),a=s?s.getPropertyValue(t)||s[t]:undefined,u=e.style;return s&&(""!==a||x.contains(e.ownerDocument,e)||(a=x.style(e,t)),Ct.test(a)&&wt.test(t)&&(r=u.width,i=u.minWidth,o=u.maxWidth,u.minWidth=u.maxWidth=u.width=a,a=s.width,u.width=r,u.minWidth=i,u.maxWidth=o)),a};function Ot(e,t,n){var r=Tt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function Ft(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,s=0;for(;4>o;o+=2)"margin"===n&&(s+=x.css(e,n+jt[o],!0,i)),r?("content"===n&&(s-=x.css(e,"padding"+jt[o],!0,i)),"margin"!==n&&(s-=x.css(e,"border"+jt[o]+"Width",!0,i))):(s+=x.css(e,"padding"+jt[o],!0,i),"padding"!==n&&(s+=x.css(e,"border"+jt[o]+"Width",!0,i)));return s}function Pt(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=Ht(e),s=x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=vt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Ct.test(i))return i;r=s&&(x.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+Ft(e,t,n||(s?"border":"content"),r,o)+"px"}function Rt(e){var t=o,n=Nt[e];return n||(n=Mt(e,t),"none"!==n&&n||(xt=(xt||x("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(xt[0].contentWindow||xt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=Mt(e,t),xt.detach()),Nt[e]=n),n}function Mt(e,t){var n=x(t.createElement(e)).appendTo(t.body),r=x.css(n[0],"display");return n.remove(),r}x.each(["height","width"],function(e,t){x.cssHooks[t]={get:function(e,n,r){return n?0===e.offsetWidth&&bt.test(x.css(e,"display"))?x.swap(e,Et,function(){return Pt(e,t,r)}):Pt(e,t,r):undefined},set:function(e,n,r){var i=r&&Ht(e);return Ot(e,n,r?Ft(e,t,r,x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,i),i):0)}}}),x(function(){x.support.reliableMarginRight||(x.cssHooks.marginRight={get:function(e,t){return t?x.swap(e,{display:"inline-block"},vt,[e,"marginRight"]):undefined}}),!x.support.pixelPosition&&x.fn.position&&x.each(["top","left"],function(e,t){x.cssHooks[t]={get:function(e,n){return n?(n=vt(e,t),Ct.test(n)?x(e).position()[t]+"px":n):undefined}}})}),x.expr&&x.expr.filters&&(x.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight},x.expr.filters.visible=function(e){return!x.expr.filters.hidden(e)}),x.each({margin:"",padding:"",border:"Width"},function(e,t){x.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+jt[r]+t]=o[r]||o[r-2]||o[0];return i}},wt.test(e)||(x.cssHooks[e+t].set=Ot)});var Wt=/%20/g,$t=/\[\]$/,Bt=/\r?\n/g,It=/^(?:submit|button|image|reset|file)$/i,zt=/^(?:input|select|textarea|keygen)/i;x.fn.extend({serialize:function(){return x.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=x.prop(this,"elements");return e?x.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!x(this).is(":disabled")&&zt.test(this.nodeName)&&!It.test(e)&&(this.checked||!ot.test(e))}).map(function(e,t){var n=x(this).val();return null==n?null:x.isArray(n)?x.map(n,function(e){return{name:t.name,value:e.replace(Bt,"\r\n")}}):{name:t.name,value:n.replace(Bt,"\r\n")}}).get()}}),x.param=function(e,t){var n,r=[],i=function(e,t){t=x.isFunction(t)?t():null==t?"":t,r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(t===undefined&&(t=x.ajaxSettings&&x.ajaxSettings.traditional),x.isArray(e)||e.jquery&&!x.isPlainObject(e))x.each(e,function(){i(this.name,this.value)});else for(n in e)_t(n,e[n],t,i);return r.join("&").replace(Wt,"+")};function _t(e,t,n,r){var i;if(x.isArray(t))x.each(t,function(t,i){n||$t.test(e)?r(e,i):_t(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==x.type(t))r(e,t);else for(i in t)_t(e+"["+i+"]",t[i],n,r)}x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){x.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),x.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var Xt,Ut,Yt=x.now(),Vt=/\?/,Gt=/#.*$/,Jt=/([?&])_=[^&]*/,Qt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Kt=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Zt=/^(?:GET|HEAD)$/,en=/^\/\//,tn=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,nn=x.fn.load,rn={},on={},sn="*/".concat("*");
try{Ut=i.href}catch(an){Ut=o.createElement("a"),Ut.href="",Ut=Ut.href}Xt=tn.exec(Ut.toLowerCase())||[];function un(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(w)||[];if(x.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function ln(e,t,n,r){var i={},o=e===on;function s(a){var u;return i[a]=!0,x.each(e[a]||[],function(e,a){var l=a(t,n,r);return"string"!=typeof l||o||i[l]?o?!(u=l):undefined:(t.dataTypes.unshift(l),s(l),!1)}),u}return s(t.dataTypes[0])||!i["*"]&&s("*")}function cn(e,t){var n,r,i=x.ajaxSettings.flatOptions||{};for(n in t)t[n]!==undefined&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&x.extend(!0,e,r),e}x.fn.load=function(e,t,n){if("string"!=typeof e&&nn)return nn.apply(this,arguments);var r,i,o,s=this,a=e.indexOf(" ");return a>=0&&(r=e.slice(a),e=e.slice(0,a)),x.isFunction(t)?(n=t,t=undefined):t&&"object"==typeof t&&(i="POST"),s.length>0&&x.ajax({url:e,type:i,dataType:"html",data:t}).done(function(e){o=arguments,s.html(r?x("<div>").append(x.parseHTML(e)).find(r):e)}).complete(n&&function(e,t){s.each(n,o||[e.responseText,t,e])}),this},x.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){x.fn[t]=function(e){return this.on(t,e)}}),x.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ut,type:"GET",isLocal:Kt.test(Xt[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":sn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":x.parseJSON,"text xml":x.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?cn(cn(e,x.ajaxSettings),t):cn(x.ajaxSettings,e)},ajaxPrefilter:un(rn),ajaxTransport:un(on),ajax:function(e,t){"object"==typeof e&&(t=e,e=undefined),t=t||{};var n,r,i,o,s,a,u,l,c=x.ajaxSetup({},t),p=c.context||c,f=c.context&&(p.nodeType||p.jquery)?x(p):x.event,h=x.Deferred(),d=x.Callbacks("once memory"),g=c.statusCode||{},m={},y={},v=0,b="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(2===v){if(!o){o={};while(t=Qt.exec(i))o[t[1].toLowerCase()]=t[2]}t=o[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===v?i:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return v||(e=y[n]=y[n]||e,m[e]=t),this},overrideMimeType:function(e){return v||(c.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>v)for(t in e)g[t]=[g[t],e[t]];else T.always(e[T.status]);return this},abort:function(e){var t=e||b;return n&&n.abort(t),k(0,t),this}};if(h.promise(T).complete=d.add,T.success=T.done,T.error=T.fail,c.url=((e||c.url||Ut)+"").replace(Gt,"").replace(en,Xt[1]+"//"),c.type=t.method||t.type||c.method||c.type,c.dataTypes=x.trim(c.dataType||"*").toLowerCase().match(w)||[""],null==c.crossDomain&&(a=tn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===Xt[1]&&a[2]===Xt[2]&&(a[3]||("http:"===a[1]?"80":"443"))===(Xt[3]||("http:"===Xt[1]?"80":"443")))),c.data&&c.processData&&"string"!=typeof c.data&&(c.data=x.param(c.data,c.traditional)),ln(rn,c,t,T),2===v)return T;u=c.global,u&&0===x.active++&&x.event.trigger("ajaxStart"),c.type=c.type.toUpperCase(),c.hasContent=!Zt.test(c.type),r=c.url,c.hasContent||(c.data&&(r=c.url+=(Vt.test(r)?"&":"?")+c.data,delete c.data),c.cache===!1&&(c.url=Jt.test(r)?r.replace(Jt,"$1_="+Yt++):r+(Vt.test(r)?"&":"?")+"_="+Yt++)),c.ifModified&&(x.lastModified[r]&&T.setRequestHeader("If-Modified-Since",x.lastModified[r]),x.etag[r]&&T.setRequestHeader("If-None-Match",x.etag[r])),(c.data&&c.hasContent&&c.contentType!==!1||t.contentType)&&T.setRequestHeader("Content-Type",c.contentType),T.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+("*"!==c.dataTypes[0]?", "+sn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)T.setRequestHeader(l,c.headers[l]);if(c.beforeSend&&(c.beforeSend.call(p,T,c)===!1||2===v))return T.abort();b="abort";for(l in{success:1,error:1,complete:1})T[l](c[l]);if(n=ln(on,c,t,T)){T.readyState=1,u&&f.trigger("ajaxSend",[T,c]),c.async&&c.timeout>0&&(s=setTimeout(function(){T.abort("timeout")},c.timeout));try{v=1,n.send(m,k)}catch(C){if(!(2>v))throw C;k(-1,C)}}else k(-1,"No Transport");function k(e,t,o,a){var l,m,y,b,w,C=t;2!==v&&(v=2,s&&clearTimeout(s),n=undefined,i=a||"",T.readyState=e>0?4:0,l=e>=200&&300>e||304===e,o&&(b=pn(c,T,o)),b=fn(c,b,T,l),l?(c.ifModified&&(w=T.getResponseHeader("Last-Modified"),w&&(x.lastModified[r]=w),w=T.getResponseHeader("etag"),w&&(x.etag[r]=w)),204===e||"HEAD"===c.type?C="nocontent":304===e?C="notmodified":(C=b.state,m=b.data,y=b.error,l=!y)):(y=C,(e||!C)&&(C="error",0>e&&(e=0))),T.status=e,T.statusText=(t||C)+"",l?h.resolveWith(p,[m,C,T]):h.rejectWith(p,[T,C,y]),T.statusCode(g),g=undefined,u&&f.trigger(l?"ajaxSuccess":"ajaxError",[T,c,l?m:y]),d.fireWith(p,[T,C]),u&&(f.trigger("ajaxComplete",[T,c]),--x.active||x.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return x.get(e,t,n,"json")},getScript:function(e,t){return x.get(e,undefined,t,"script")}}),x.each(["get","post"],function(e,t){x[t]=function(e,n,r,i){return x.isFunction(n)&&(i=i||r,r=n,n=undefined),x.ajax({url:e,type:t,dataType:i,data:n,success:r})}});function pn(e,t,n){var r,i,o,s,a=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),r===undefined&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in a)if(a[i]&&a[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}s||(s=i)}o=o||s}return o?(o!==u[0]&&u.unshift(o),n[o]):undefined}function fn(e,t,n,r){var i,o,s,a,u,l={},c=e.dataTypes.slice();if(c[1])for(s in e.converters)l[s.toLowerCase()]=e.converters[s];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(s=l[u+" "+o]||l["* "+o],!s)for(i in l)if(a=i.split(" "),a[1]===o&&(s=l[u+" "+a[0]]||l["* "+a[0]])){s===!0?s=l[i]:l[i]!==!0&&(o=a[0],c.unshift(a[1]));break}if(s!==!0)if(s&&e["throws"])t=s(t);else try{t=s(t)}catch(p){return{state:"parsererror",error:s?p:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}x.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return x.globalEval(e),e}}}),x.ajaxPrefilter("script",function(e){e.cache===undefined&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),x.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function(r,i){t=x("<script>").prop({async:!0,charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&i("error"===e.type?404:200,e.type)}),o.head.appendChild(t[0])},abort:function(){n&&n()}}}});var hn=[],dn=/(=)\?(?=&|$)|\?\?/;x.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=hn.pop()||x.expando+"_"+Yt++;return this[e]=!0,e}}),x.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,s,a=t.jsonp!==!1&&(dn.test(t.url)?"url":"string"==typeof t.data&&!(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&dn.test(t.data)&&"data");return a||"jsonp"===t.dataTypes[0]?(i=t.jsonpCallback=x.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,a?t[a]=t[a].replace(dn,"$1"+i):t.jsonp!==!1&&(t.url+=(Vt.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return s||x.error(i+" was not called"),s[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){s=arguments},r.always(function(){e[i]=o,t[i]&&(t.jsonpCallback=n.jsonpCallback,hn.push(i)),s&&x.isFunction(o)&&o(s[0]),s=o=undefined}),"script"):undefined}),x.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(e){}};var gn=x.ajaxSettings.xhr(),mn={0:200,1223:204},yn=0,vn={};e.ActiveXObject&&x(e).on("unload",function(){for(var e in vn)vn[e]();vn=undefined}),x.support.cors=!!gn&&"withCredentials"in gn,x.support.ajax=gn=!!gn,x.ajaxTransport(function(e){var t;return x.support.cors||gn&&!e.crossDomain?{send:function(n,r){var i,o,s=e.xhr();if(s.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(i in e.xhrFields)s[i]=e.xhrFields[i];e.mimeType&&s.overrideMimeType&&s.overrideMimeType(e.mimeType),e.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");for(i in n)s.setRequestHeader(i,n[i]);t=function(e){return function(){t&&(delete vn[o],t=s.onload=s.onerror=null,"abort"===e?s.abort():"error"===e?r(s.status||404,s.statusText):r(mn[s.status]||s.status,s.statusText,"string"==typeof s.responseText?{text:s.responseText}:undefined,s.getAllResponseHeaders()))}},s.onload=t(),s.onerror=t("error"),t=vn[o=yn++]=t("abort"),s.send(e.hasContent&&e.data||null)},abort:function(){t&&t()}}:undefined});var xn,bn,wn=/^(?:toggle|show|hide)$/,Tn=RegExp("^(?:([+-])=|)("+b+")([a-z%]*)$","i"),Cn=/queueHooks$/,kn=[An],Nn={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=Tn.exec(t),o=i&&i[3]||(x.cssNumber[e]?"":"px"),s=(x.cssNumber[e]||"px"!==o&&+r)&&Tn.exec(x.css(n.elem,e)),a=1,u=20;if(s&&s[3]!==o){o=o||s[3],i=i||[],s=+r||1;do a=a||".5",s/=a,x.style(n.elem,e,s+o);while(a!==(a=n.cur()/r)&&1!==a&&--u)}return i&&(s=n.start=+s||+r||0,n.unit=o,n.end=i[1]?s+(i[1]+1)*i[2]:+i[2]),n}]};function En(){return setTimeout(function(){xn=undefined}),xn=x.now()}function Sn(e,t,n){var r,i=(Nn[t]||[]).concat(Nn["*"]),o=0,s=i.length;for(;s>o;o++)if(r=i[o].call(n,t,e))return r}function jn(e,t,n){var r,i,o=0,s=kn.length,a=x.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;var t=xn||En(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,s=0,u=l.tweens.length;for(;u>s;s++)l.tweens[s].run(o);return a.notifyWith(e,[l,o,n]),1>o&&u?n:(a.resolveWith(e,[l]),!1)},l=a.promise({elem:e,props:x.extend({},t),opts:x.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:xn||En(),duration:n.duration,tweens:[],createTween:function(t,n){var r=x.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?a.resolveWith(e,[l,t]):a.rejectWith(e,[l,t]),this}}),c=l.props;for(Dn(c,l.opts.specialEasing);s>o;o++)if(r=kn[o].call(l,e,c,l.opts))return r;return x.map(c,Sn,l),x.isFunction(l.opts.start)&&l.opts.start.call(e,l),x.fx.timer(x.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function Dn(e,t){var n,r,i,o,s;for(n in e)if(r=x.camelCase(n),i=t[r],o=e[n],x.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),s=x.cssHooks[r],s&&"expand"in s){o=s.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}x.Animation=x.extend(jn,{tweener:function(e,t){x.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Nn[n]=Nn[n]||[],Nn[n].unshift(t)},prefilter:function(e,t){t?kn.unshift(e):kn.push(e)}});function An(e,t,n){var r,i,o,s,a,u,l=this,c={},p=e.style,f=e.nodeType&&Lt(e),h=H.get(e,"fxshow");n.queue||(a=x._queueHooks(e,"fx"),null==a.unqueued&&(a.unqueued=0,u=a.empty.fire,a.empty.fire=function(){a.unqueued||u()}),a.unqueued++,l.always(function(){l.always(function(){a.unqueued--,x.queue(e,"fx").length||a.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],"inline"===x.css(e,"display")&&"none"===x.css(e,"float")&&(p.display="inline-block")),n.overflow&&(p.overflow="hidden",l.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],wn.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(f?"hide":"show")){if("show"!==i||!h||h[r]===undefined)continue;f=!0}c[r]=h&&h[r]||x.style(e,r)}if(!x.isEmptyObject(c)){h?"hidden"in h&&(f=h.hidden):h=H.access(e,"fxshow",{}),o&&(h.hidden=!f),f?x(e).show():l.done(function(){x(e).hide()}),l.done(function(){var t;H.remove(e,"fxshow");for(t in c)x.style(e,t,c[t])});for(r in c)s=Sn(f?h[r]:0,r,l),r in h||(h[r]=s.start,f&&(s.end=s.start,s.start="width"===r||"height"===r?1:0))}}function Ln(e,t,n,r,i){return new Ln.prototype.init(e,t,n,r,i)}x.Tween=Ln,Ln.prototype={constructor:Ln,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(x.cssNumber[n]?"":"px")},cur:function(){var e=Ln.propHooks[this.prop];return e&&e.get?e.get(this):Ln.propHooks._default.get(this)},run:function(e){var t,n=Ln.propHooks[this.prop];return this.pos=t=this.options.duration?x.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Ln.propHooks._default.set(this),this}},Ln.prototype.init.prototype=Ln.prototype,Ln.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=x.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){x.fx.step[e.prop]?x.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[x.cssProps[e.prop]]||x.cssHooks[e.prop])?x.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Ln.propHooks.scrollTop=Ln.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},x.each(["toggle","show","hide"],function(e,t){var n=x.fn[t];x.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(Hn(t,!0),e,r,i)}}),x.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Lt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=x.isEmptyObject(e),o=x.speed(t,n,r),s=function(){var t=jn(this,x.extend({},e),o);(i||H.get(this,"finish"))&&t.stop(!0)};return s.finish=s,i||o.queue===!1?this.each(s):this.queue(o.queue,s)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=undefined),t&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=x.timers,s=H.get(this);if(i)s[i]&&s[i].stop&&r(s[i]);else for(i in s)s[i]&&s[i].stop&&Cn.test(i)&&r(s[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));(t||!n)&&x.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=H.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=x.timers,s=r?r.length:0;for(n.finish=!0,x.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;s>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function Hn(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=jt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}x.each({slideDown:Hn("show"),slideUp:Hn("hide"),slideToggle:Hn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){x.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),x.speed=function(e,t,n){var r=e&&"object"==typeof e?x.extend({},e):{complete:n||!n&&t||x.isFunction(e)&&e,duration:e,easing:n&&t||t&&!x.isFunction(t)&&t};return r.duration=x.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in x.fx.speeds?x.fx.speeds[r.duration]:x.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){x.isFunction(r.old)&&r.old.call(this),r.queue&&x.dequeue(this,r.queue)},r},x.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},x.timers=[],x.fx=Ln.prototype.init,x.fx.tick=function(){var e,t=x.timers,n=0;for(xn=x.now();t.length>n;n++)e=t[n],e()||t[n]!==e||t.splice(n--,1);t.length||x.fx.stop(),xn=undefined},x.fx.timer=function(e){e()&&x.timers.push(e)&&x.fx.start()},x.fx.interval=13,x.fx.start=function(){bn||(bn=setInterval(x.fx.tick,x.fx.interval))},x.fx.stop=function(){clearInterval(bn),bn=null},x.fx.speeds={slow:600,fast:200,_default:400},x.fx.step={},x.expr&&x.expr.filters&&(x.expr.filters.animated=function(e){return x.grep(x.timers,function(t){return e===t.elem}).length}),x.fn.offset=function(e){if(arguments.length)return e===undefined?this:this.each(function(t){x.offset.setOffset(this,e,t)});var t,n,i=this[0],o={top:0,left:0},s=i&&i.ownerDocument;if(s)return t=s.documentElement,x.contains(t,i)?(typeof i.getBoundingClientRect!==r&&(o=i.getBoundingClientRect()),n=qn(s),{top:o.top+n.pageYOffset-t.clientTop,left:o.left+n.pageXOffset-t.clientLeft}):o},x.offset={setOffset:function(e,t,n){var r,i,o,s,a,u,l,c=x.css(e,"position"),p=x(e),f={};"static"===c&&(e.style.position="relative"),a=p.offset(),o=x.css(e,"top"),u=x.css(e,"left"),l=("absolute"===c||"fixed"===c)&&(o+u).indexOf("auto")>-1,l?(r=p.position(),s=r.top,i=r.left):(s=parseFloat(o)||0,i=parseFloat(u)||0),x.isFunction(t)&&(t=t.call(e,n,a)),null!=t.top&&(f.top=t.top-a.top+s),null!=t.left&&(f.left=t.left-a.left+i),"using"in t?t.using.call(e,f):p.css(f)}},x.fn.extend({position:function(){if(this[0]){var e,t,n=this[0],r={top:0,left:0};return"fixed"===x.css(n,"position")?t=n.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),x.nodeName(e[0],"html")||(r=e.offset()),r.top+=x.css(e[0],"borderTopWidth",!0),r.left+=x.css(e[0],"borderLeftWidth",!0)),{top:t.top-r.top-x.css(n,"marginTop",!0),left:t.left-r.left-x.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||s;while(e&&!x.nodeName(e,"html")&&"static"===x.css(e,"position"))e=e.offsetParent;return e||s})}}),x.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,n){var r="pageYOffset"===n;x.fn[t]=function(i){return x.access(this,function(t,i,o){var s=qn(t);return o===undefined?s?s[n]:t[i]:(s?s.scrollTo(r?e.pageXOffset:o,r?o:e.pageYOffset):t[i]=o,undefined)},t,i,arguments.length,null)}});function qn(e){return x.isWindow(e)?e:9===e.nodeType&&e.defaultView}x.each({Height:"height",Width:"width"},function(e,t){x.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){x.fn[r]=function(r,i){var o=arguments.length&&(n||"boolean"!=typeof r),s=n||(r===!0||i===!0?"margin":"border");return x.access(this,function(t,n,r){var i;return x.isWindow(t)?t.document.documentElement["client"+e]:9===t.nodeType?(i=t.documentElement,Math.max(t.body["scroll"+e],i["scroll"+e],t.body["offset"+e],i["offset"+e],i["client"+e])):r===undefined?x.css(t,n,s):x.style(t,n,r,s)},t,o?r:undefined,o,null)}})}),x.fn.size=function(){return this.length},x.fn.andSelf=x.fn.addBack,"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=x:"function"==typeof define&&define.amd&&define("jquery",[],function(){return x}),"object"==typeof e&&"object"==typeof e.document&&(e.jQuery=e.$=x)})(window);

/* -*- mode: javascript; c-basic-offset: 4; indent-tabs-mode: nil -*- */
/*global $:false */
/*global pageTracker:false*/
/*jslint maxlen: 120 */
/**
 *  Protein Feature View - draws a graphical summary of PDB and UniProtKB
 *   relationships for a single UniProtKB sequence.
 *
 *  @author Andreas Prlic
 *  @date 2014 November
 */


define('viewer',['colors','draw','jquery'],
    function(colors, draw, jQuery) {

        /** A No args constructor. Needs to call setParent and loadUniprot from the user side
         *
         */

        function Viewer() {

            this.initClass();

            var that = this;
            $(window).resize(function () {

                $(that.parent).css('overflow', 'hidden');
                $(that.parent).css('width', 'auto');
                //$(parent).removeAttr('css');
                that.updateScale();
                that.repaint();
            });

        }


        /** construct new EntityView which is hooked up with a div for display
         *
         */
        // function Viewer(parentDiv, uniprotId) {

        //         this.initClass();
        //         this.setParentDiv(parentDiv);
        //         this.setSizeDiv(parentDiv);

        //         this.loadUniprot(uniprotId);

        //         $(window).resize(function () {

        //             $(parent).css('overflow', 'hidden');
        //             $(parent).css('width', 'auto');
        //             this.updateScale();
        //             this.repaint();
        //         });


        // }





        /** Initialize the internals
         *
         */
        Viewer.prototype.initClass = function () {


            $.ajaxSetup({timeout: 20000});


            this.data = {};

            this.version = "2014-12-17";



            this.showCondensed = true;

            this.colorBy = "Alignment Length";

            this.defaultSort = "Alignment Length";

            this.showSeqres = true;
            this.singlePDBmode = false;
            this.displayPDB = "";

            this.contentDiv = "#content";
            this.dialogDiv = "#dialog";
            this.scrollBarDiv = "#svgScrollBar";

            this.selectionStart = -1;
            this.selectionEnd = -1;


            this.masterURL = "/pdb/protein/";
            this.rcsbServer = "";

            this.listenerMap = {};

            $(this.scrollBarDiv).slider({
                orientation: "horizontal",
                range: "min",
                min: 0,
                max: 100,
                value: 0,
                animate: true
            });

            this._initialized = false;

            this.startedAt = new Date().getTime();

            //$(this.scrollBarDiv).bind('slidechange', jQuery.proxy( this, 'scollValueChanged' ));

            console.log("*** Protein Feature View V." + this.version + " ***");

        };


        Viewer.prototype.loadUniprot = function (uniprotId) {

            this.uniprotID = uniprotId;

            if (typeof uniprotId === 'undefined') {
                return;
            }
            this.data = {};

            var url = this.rcsbServer + this.masterURL + this.uniprotID + "?type=json";

            if (this.singlePDBmode) {
                url += "&display=" + this.displayPDB;
            }

            var that = this;

            $.getJSON(url, function (json) {

                console.log("got json response from " + url);
                that.setData(json);

                $(that.parent).svg();
                var svg = $(that.parent).svg('get');

                that.drawInitial(svg);
                that.updateScale();
                that.repaint();

            });

            this.registerEvents();


        };



        Viewer.prototype.registerEvents = function () {


            var that = this;
            $(this.parent).bind('click',
                function (path) {

                    var g = path.target.parentNode;
                    var id = g.id;

                    console.log("user clicked " + id);

                    if (id.indexOf('pfam') > -1) {

                        var pfampos = id.substring(4, id.length);
                        if (pfampos !== 'track') {
                            that.showPfamDialog(that.data.pfam.tracks[pfampos]);
                        }
                    } else if (id.indexOf('seq') > -1) {

                        that.showSequenceDialog();

                    } else if (id.indexOf('exon') > -1) {

                        var exonpos = id.substring(4, id.length);

                        console.log("clicked on exon " + id + " " + exonpos);

                        if (exonpos !== 'track') {
                            that.showExonDialog(that.data.exon.tracks[exonpos]);
                        }
                    } else if (id >= 0) {
                        var track = that.data.tracks[id];

                        that.showDialog(track);

                    }

                });


            $(this.scrollBarDiv).bind('slide', jQuery.proxy(this, 'scollValueChanged'));
            $(this.scrollBarDiv).bind('mouseup', jQuery.proxy(this, 'scrollReleased'));

        };


        var percentShow = 100;

        Viewer.prototype.scollValueChanged = function (event, ui) {


            //console.log(ui.value + " " +event);

            var viewPercent = ui.value;
            percentShow = viewPercent;


            this._dispatchEvent({'name':'sliderMovedEvent'},
                'sliderMoved', {'percent':viewPercent});
        };

        Viewer.prototype.scrollReleased = function () {

            var viewPercent = percentShow;

            this.setScrollValue(viewPercent);


            this._dispatchEvent({'name':'sliderReleased'},
                'sliderReleased', {'percent':viewPercent});
        };


        Viewer.prototype.setScrollValue = function(val){
            if ( val < 0) {
                val =0;
            } else if ( val > 100 ) {
                val = 100;
            }

            console.log("setting scroll value to " + val);

            var minScale = this.getMinScale();
            //
            var maxScale = this.params.maxTextSize;
            //
            var tmpMax = maxScale - minScale;

            // the user wants X percent to be visible

            //var hundredPerc = maxTextSize * sequence.length  ;

            var newScale = minScale + tmpMax * (val / 100.0);

            $(this.scrollBarDiv).slider("value",val);

            this.setScale(newScale);

            this.repaint();


        };



        /** set the URL to load the main data from. Can be used to specify a remote server.
         *
         * @param url
         */
        Viewer.prototype.setMasterURL = function (url) {
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
        Viewer.prototype.setTracks = function (tracks) {
            this.asyncTracks = tracks;
        };

        /** Sets the tracks to be displayed to the default, that is used at the RCSB PDB site
         *
         */
        Viewer.prototype.setDefaultTracks = function () {

            // single PDB mode does not show externl annotations
            if (this.singlePDBmode) {
                this.asyncTracks = [
                    {
                        'name': 'pdbsites',
                        'url': this.rcsbServer + '/pdb/protein/' + this.uniprotID +
                        '?type=json&track=pdbsites&display=' + this.displayPDB
                    },
                    {
                        'name': 'SCOP',
                        'url': this.rcsbServer + '/pdb/protein/' + this.uniprotID +
                        '?type=json&track=scop&display=' + this.displayPDB
                    },
                    {
                        'name': 'Validation',
                        'url': this.rcsbServer + '/pdb/protein/' + this.uniprotID +
                        '?type=json&track=validation&display=' + this.displayPDB
                    }
                ];
            } else {
                this.asyncTracks = [
                    {
                        'name': 'Exons',
                        'url': this.rcsbServer + '/pdb/protein/' + this.uniprotID +
                        '?type=json&track=exons'
                    },
                    {
                        'name': 'pfam',
                        'url': this.rcsbServer + '/pdb/protein/' + this.uniprotID +
                        '?type=json&track=pfam'
                    },
                    {
                        'name': 'pmp',
                        'url': this.rcsbServer + '/pdb/protein/' + this.uniprotID +
                        '?type=json&track=pmp'
                    },
                    {
                        'name': 'hydropathy',
                        'url': this.rcsbServer + '/pdb/protein/' + this.uniprotID +
                        '?type=json&track=hydropathy'
                    },
                    {
                        'name': 'Disorder',
                        'url': this.rcsbServer + '/pdb/protein/' + this.uniprotID +
                        '?type=json&track=jronn'
                    },
                    {
                        'name': 'SCOP',
                        'url': this.rcsbServer + '/pdb/protein/' + this.uniprotID +
                        '?type=json&track=scop'
                    },
                    {
                        'name': 'pdbsites',
                        'url': this.rcsbServer + '/pdb/protein/' + this.uniprotID +
                        '?type=json&track=pdbsites'
                    },
                    {
                        'name': 'phosporylation',
                        'url': this.rcsbServer + '/pdb/protein/' + this.uniprotID +
                        '?type=json&track=phosphorylation'
                    }


                ];
            }

        };


        Viewer.prototype.getData = function(){
            return this.data;
        };

        Viewer.prototype.setData = function (json) {

            this.data = json;


            // trigger async loads...
            if (typeof this.asyncTracks === 'undefined') {
                this.setDefaultTracks();
            }

            if (!this._initialized) {
                this._initialized = true;
                this._dispatchEvent({'name':'viewerReadyEvent'},
                    'viewerReady',this);
            }

            var successMethod = function (json) {
                that.parseJsonResponse(json);
            };
            var errorMethod = function (jqXHR, textStatus, exception) {

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
                //alert(url);
                //this.loadURLAsync(url);
                var that = this;

                jQuery.ajax({
                    url: url,
                    dataType: "json",
                    type: "GET",
                    cache: true,
                    context: that,
                    success: successMethod,
                    error: errorMethod
                });

            }


        };

        Viewer.prototype.loadURLAsync = function (url) {
            var that = this;
            console.log("requesting " + url);


            if (window.Worker) {

                var myWorker = new Worker('js/pfv/JsonWorker.js');

                myWorker.onerror = function (e) {
                    console.log("error when loading data from URL: " + url);
                    console.log('Error: Line ' + e.lineno + ' in ' + e.filename + ': ' + e.message);

                    myWorker.postMessage({'cmd': 'stop'});

                };

                myWorker.onmessage = function (event) {

                    var json = JSON.parse(event.data);

                    that.parseJsonResponse(json.json);

                    myWorker.postMessage({'cmd': 'stop'});

                };

                myWorker.postMessage({'cmd': 'load', 'msg': decodeURI(url)});

            } else {

                // older browsers...


                jQuery.ajax({
                    url: url,
                    dataType: "json",
                    type: "GET",
                    cache: true,
                    context: that,
                    success: function (json) {
                        that.parseJsonResponse(json);
                    },
                    error: function (jqXHR, textStatus, exception) {

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

        Viewer.prototype.parseJsonResponse = function (json) {

            //console.log("got json response..." + JSON.stringify(json));

            if (typeof json.pfam !== 'undefined') {
                this.data.pfam = json.pfam;
                console.log("got pfam response");
            } else if (typeof json.pmp !== 'undefined') {
                this.data.pmp = json.pmp;
                console.log("got PMP response");
            } else if (typeof json.pdbsites !== 'undefined') {

                this.data.pdbsites = json.pdbsites;
                console.log("got PDB sites response for " + json.pdbID);

            } else if (typeof json.phosphorylation !== 'undefined') {
                this.data.phospho = json.phosphorylation;
                console.log("got phosphosite response");
            } else if (typeof json.hydropathy !== 'undefined') {
                //alert(JSON.stringify(json));
                console.log("got hydropathy response");

                this.data.hydropathy_max = json.hydropathy.hydropathy_max;
                this.data.hydropathy_min = json.hydropathy.hydropathy_min;
                this.data.hydropathy = json.hydropathy;

            } else if (typeof json.jronn !== 'undefined') {
                //alert(JSON.stringify(json));
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
            }

            this.repaint();

        };

        Viewer.prototype.getUniprotID = function () {
            return this.data.uniprotID;
        };

        /** Switch to the display of a single PDB ID
         *
         * @param pdbId
         */
        Viewer.prototype.showPDB = function (pdbId) {

            if (typeof pdbId !== 'undefined') {
                this.singlePDBmode = true;
                this.displayPDB = pdbId;
                this.showCondensed = false;
            }

        };

        /** Toggle the display of all PDB ids or the restriction to only one
         *
         * @param flag
         */
        Viewer.prototype.showAll = function (flag) {

            this.singlePDBmode = flag;

        };

        //Viewer.prototype.setSizeDiv = function (sizeDivName) {
        //
        //    this.contentDiv = sizeDivName;
        //
        //};

        Viewer.prototype.setDialogDiv = function (dialogD) {

            this.dialogDiv = dialogD;

        };
        Viewer.prototype.setScrollBarDiv = function (scrollBarD) {

            this.scrollBarDiv = scrollBarD;

        };

        Viewer.prototype.getScrollBarValue = function () {

            return $(this.scrollBarDiv).slider('value');

        };

        Viewer.prototype.setParentDiv = function (parentDiv) {

            console.log("new Parent DIV: " + parentDiv);

            this.outerParent = parentDiv;

            this.contentDiv = parentDiv;

            var myInnerDiv = $("<div>");
            $(this.outerParent).append(myInnerDiv);

            this.parent = myInnerDiv;


        };


        Viewer.prototype.getParent = function () {
            return this.parent;
        };

        Viewer.prototype.getSVGWrapper = function () {

            //return parent.svg('get');
            return $(this.parent).svg('get');

        };
        Viewer.prototype.reloadData = function () {

            var pal = "";

            if (typeof this.data.paletteName !== 'undefined') {
                pal = "&palette=" + this.data.paletteName;
            }

            var url = "/pdb/protein/" + this.uniprotID + "?type=json" + pal;

            $.getJSON(url, function (json) {
                this.data = json;
                this.repaint();
            });


        };

        Viewer.prototype.reset = function () {

            $("#uniprotsubheader").html("");

            this.svg = $(this.parent).svg('get');

            if (typeof svg === 'undefined') {
                return;
            }

            this.svg.clear();
            this.data = {};
            this.hideColorLegend();

        };

        Viewer.prototype.repaint = function () {


            //alert($(parent).width());

            var now = new Date().getTime();

            console.log("repainting. time since start: " + (now - this.startedAt ));


            if (typeof this.parent === 'undefined') {
                return;
            }

            $("#uniprotsubheader").html("");

            var svg = $(this.parent).svg('get');

            if (typeof svg === 'undefined') {
                return;
            }

            svg.clear();

            this.drawInitial(svg);

            //this.resetSize(svg, (this.data.length) * this.drawer.scale + this.params.leftBorder +
            //    this.params.rightBorder, this.y + this.params.bottomBorder);

            this.drawer.maxY = this.y + this.params.bottomBorder;
            //hideColorLegend();


        };

        Viewer.prototype.showDialog = function (track) {


            if (typeof track === 'undefined') {
                return;
            }


            var pdbID = track.pdbID;
            var desc = track.desc;
            var chainID = track.chainID;

            if (typeof pageTracker !== 'undefined') {
                pageTracker._trackEvent('ProteinFeatureView', 'showPDBDialog', desc);
            }
            var html = "<span><img width='240' src='" + this.rcsbServer + "/pdb/images/" +
                pdbID.toLowerCase() + "_bio_r_250.jpg?getBest=true' /></span>";

            $(this.dialogDiv).html(html);

            var that = this;
            $(this.dialogDiv).dialog({
                title: 'View ' + pdbID + ' - ' + desc,
                height: 420,
                width: 280,
                modal: true,
                buttons: {
                    "OK": function () {
                        $(this).dialog("close");
                        that.load3DChain(pdbID, chainID);
                    },
                    "Cancel": function () {
                        $(this).dialog("close");
                    }
                }
            });

        };

        Viewer.prototype.load3DChain = function (pdbID, chainID) {

            console.log("loading " + pdbID + " chain ID: " + chainID);
            window.location = this.rcsbServer + "/pdb/explore/explore.do?structureId=" + pdbID;
            return;



        };



        Viewer.prototype.showSequenceDialog = function () {


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

            $(this.dialogDiv).html(html);

            $(this.dialogDiv).dialog({
                title: data.uniprotID + " - " + data.name,
                height: 300,
                width: 300,
                modal: true,
                buttons: {
                    //"OK": function() { $(this).dialog("close"); window.location = url ;},
                    "Cancel": function () {
                        $(this).dialog("close");
                    }
                }
            });

        };

        Viewer.prototype.showPfamDialog = function (pfam) {

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

            html += "<li>Find <a href='" + this.rcsbServer  +
                "/pdb/search/smartSubquery.do?smartSearchSubtype=PfamIdQuery&amp;pfamID=" +
                pfamId + "'>other PDB entries with the same Pfam domain</a></li>";
            html += "</ul>";

            $(this.dialogDiv).html(html);
            $(this.dialogDiv).dialog({
                title: pfamId + " - " + pfam.name,
                height: 300,
                width: 300,
                modal: true,
                buttons: {
                    //"OK": function() { $(this).dialog("close"); window.location = 
                    //'/pdb/search/smartSubquery.do?smartSearchSubtype=
                    //PfamIdQuery&pfamID='+pfam.acc ;},
                    "Cancel": function () {
                        $(this).dialog("close");
                    }
                }
            });

        };

        Viewer.prototype.showExonDialog = function (exon) {

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

            $(this.dialogDiv).html(html);
            $(this.dialogDiv).dialog({
                title: geneId + " - " + exon.name,
                height: 200,
                width: 300,
                modal: true,
                buttons: {
                    "OK": function () {
                        $(this).dialog("close");
                        window.location = '/pdb/gene/' + exon.acc;
                    },
                    "Cancel": function () {
                        $(this).dialog("close");
                    }
                }
            });

        };

        /** Set the zoom level. Can be either "View whole" or "Maximum zoom"
         *
         * @param zoom
         */
        Viewer.prototype.setZoomLevel = function (zoom) {


            //console.log($('#sequencezoom').val() + " ?? " + zoom);

            if (zoom.indexOf("whole") !== -1) {

                this.updateScale();

            } else {
                $(this.scrollBarDiv).slider("value", 100);

                this.setScale(this.params.maxTextSize);
            }

            this.repaint();

        };


        Viewer.prototype.getPreferredWidth = function () {

            var availWidth = $(this.contentDiv).width() - this.params.leftBorder - this.params.rightBorder;

            var visibleWidth = $(window).width() - $('#leftMenu').width() -
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

        Viewer.prototype.getMinScale = function () {

            var availWidth = this.getPreferredWidth();

            //$(window).width() - $('#leftMenu').width() - leftBorder -  rightBorder;
            return availWidth / ( this.sequence.length );

        };

        /** Update the scale to the default scale - currently to
         * show the whole sequence in the available space
         *
         */
        Viewer.prototype.updateScale = function () {

            var newScale = 1;

            if (typeof this.sequence !== "undefined") {
                var availWidth = this.getPreferredWidth();

                newScale = (availWidth ) / (this.sequence.length );

                $(this.scrollBarDiv).slider("value", 0);
                $(this.parent).css('overflow', 'auto');
                $(this.parent).css('width', $(this.outerParent).width());


            } else {
                console.error("sequence is not defined!");

                this.sequence = {};
                this.sequence.length = this.data.length;
                this.sequence.name = this.data.uniprotID;

            }
            console.log("update scale  " + newScale);

            this.drawer.setScale(newScale);

        };

        /** Set the scale of the current display. The value is the amount of
         * space given for rendering one amino acid.
         *
         * @param aaWidth - width of one amino acid
         */
        Viewer.prototype.setScale = function (aaWidth) {

            if (aaWidth > this.params.maxTextSize) {
                aaWidth = this.params.maxTextSize;
            }


            this.drawer.setScale(aaWidth);

        };


        /** Reset the size of the SVG object
         *
         * @param svg
         * @param width
         * @param height
         */
        Viewer.prototype.resetSize = function (svg, width, height) {

            svg.configure({
                width: width || $(svg._container).width(),
                height: height || $(svg._container).height()
            });


        };


        /** Do the actual drawing
         *
         */
        Viewer.prototype.drawInitial = function (svg) {

            if (typeof this.data.uniprotID === 'undefined') {
                alert('Did not find a UniProt ID! ' + JSON.stringify(this.data));
                return;
            }

            var now = new Date().getTime();

            var data = this.data;

            var y = this.y;

            this.sequence = {};
            this.sequence.length = data.length;
            this.sequence.name = data.uniprotID;

            var desc = data.desc;

            var header = "<h1>Protein Feature View - " + data.uniprotID;

            if (typeof (data.name !== 'undefined')) {
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

            var href = this.rcsbServer  +
                "/pdb/search/smart.do?smartComparator=and&smartSearchSubtype_0=" +
                "UpAccessionIdQuery&target=Current&accessionIdList_0=" + data.uniprotID;

            $('#searchinpdb').attr("href", href)
                .attr("title", "Find all matching PDB IDs for" + data.uniprotID)
                .html("Search PDB");


            $('#uniprotLength > span').html(data.length);
            $('#chainSummaryImage').hide();
            $('#uniprotSpecies > span').html(data.species);


            var drawer = new draw.Draw(this);

            if ( typeof this.drawer !== 'undefined') {
                drawer.scale = this.drawer.scale;
            }

            this.params = drawer.getParams();


            if ( drawer.scale < 0) {
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

            var uniprotBottomY = y;

            if (!this.singlePDBmode) {

                // 70 is the minimum space to render "uniprotkb"

                if (uniprotBottomY - uniprotTopY < 70) {
                    y = ( y - uniprotTopY) + 70;
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

            y = drawer.drawPDBValidation(svg, y);

            if ((!this.showCondensed) && ( !this.singlePDBmode )) {
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

            for (var i = 0; i < data.tracks.length; i++) {
                var track = data.tracks[i];

                if (this.singlePDBmode) {
                    //alert(track.pdbID + " " + displayPDB);
                    if (track.pdbID !== this.displayPDB) {
                        continue;
                    }
                    if (counter > this.params.maxTracksSingleMode) {
                        continue;
                    }
                } else if (this.showCondensed) {

                    if (!track.bestInCluster) {
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
            var callback = function () {
                if (typeof pageTracker !== 'undefined') {
                    pageTracker._trackEvent('ProteinFeatureView', 'showCondensedView', 'true');
                }
                that.setShowCondensed(false);
                $('#showCondensed').text("Show Condensed View");
            };

            var totalTracks = this.getTotalNrPDBTracks();

            if (this.showCondensed && !( this.singlePDBmode ) && ( totalTracks > 1)) {
                y = drawer.drawExpandCondensedSymbol(svg, pdbBottomY, title, callback);
            }


            //alert(JSON.stringify(data.externalTracks.names));
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

                    var callbackexternal = function () {
                    };

                    if (trackdata.label === "Homology Models from Protein Model Portal") {
                        callbackexternal = function () {
                            if (typeof pageTracker !== 'undefined') {
                                pageTracker._trackEvent('ProteinFeatureView',
                                    'showPMPDialog', data.uniprotID);
                            }

                            var html = "<h3>" + this.desc + "</h3>";

                            html += "<li>View all <a href='" + url +
                                "' target='_new'>Homology Models at the Protein Model Portal</a></li>";
                            html += "</ul>";


                            $(this.dialogDiv).html(html);
                            $(this.dialogDiv).dialog({
                                title: 'Protein Model Portal',
                                height: 300,
                                width: 300,
                                modal: true,
                                buttons: {
                                    "OK": function () {
                                        $(this).dialog("close");
                                        window.location = url;
                                    },
                                    "Cancel": function () {
                                        $(this).dialog("close");
                                    }
                                }
                            });
                        };
                    }

                    //alert(trackdata.label);
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
                var callback1 = function () {
                    window.location = this.rcsbServer  + "/pdb/protein/" + data.uniprotID;
                };
                y = drawer.drawExpandCondensedSymbol(svg, pdbBottomY, title1, callback1);
            }

            this.resetSize(svg, (data.length) * drawer.scale + this.params.leftBorder +
                this.params.rightBorder, y + this.params.bottomBorder);

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
            this.drawer = drawer;

            var end = new Date().getTime();

            console.log("time to repaint SVG graphics: " + (end-now));

        };


        /** Returns the total number of PDB entries that match to this UniProt.
         *
         */
        Viewer.prototype.getTotalNrPDBTracks = function () {


            var fullTrackCount = this.data.tracks.length;
            if (typeof this.data.backupTracks !== 'undefined') {
                //alert(data.tracks.length +" " + data.backupTracks.length);
                fullTrackCount = this.data.backupTracks.length;
            }
            return fullTrackCount;

        };




        Viewer.prototype.hideColorLegend = function () {
            $("#colorLegend").html("");
        };

        Viewer.prototype.changeColorSelect = function (str) {

            this.colorBy = str;

            if (str === "Resolution") {
                this.hideColorLegend();
                //this.paired_colors = data.colors;

                this.updateTrackColors(this.params.redblue_colors);
                this.repaint();
                this.showColorLegend();

            } else {

                this.hideColorLegend();

                this.updateTrackColors(this.params.paired_colors);
                this.repaint();

            }

        };

        Viewer.prototype.setShowCondensed = function (flag) {


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
        Viewer.prototype.filterTracks = function () {


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
                    if (( typeof track.bestInCluster !== 'undefined' ) &&
                        ( track.bestInCluster)) {
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


        Viewer.prototype.getShowCondensed = function () {

            return this.showCondensed;

        };
        Viewer.prototype.showColorLegend = function () {

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












        Viewer.prototype.getSequence = function () {
            return this.data.sequence;
        };

        Viewer.prototype.sequenceMotifPopup = function (motif, txt) {
            var html = "<h3>" + txt + "</h3>";
            html += "<ul>";
            if (typeof pageTracker !== 'undefined') {
                pageTracker._trackEvent('ProteinFeatureView', 'showSeqMotifDialog', txt);
            }

            //alert(seq.length + " " + this.start+ " " + this.end+ " | " + seq);
            var url = this.rcsbServer + "/pdb/search/smart.do?&smartSearchSubtype_0=" +
                "MotifQuery&target=Current&motif_0=";

            html += "<li>Perform a <a href='" + url + motif + "'>Sequence Motif Search</a>.</li>";


            html += "</ul>";
            return html;

        };

        Viewer.prototype.blastPopup = function (seq, url, hits, desc, txt) {
            var html = "<h3>" + txt + "</h3>";
            html += "<ul>";
            if (typeof pageTracker !== 'undefined') {
                pageTracker._trackEvent('ProteinFeatureView', 'showUniProtDialog', txt);
            }

            //alert(seq.length + " " + this.start+ " " + this.end+ " | " + seq);
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





        Viewer.prototype.sortTracks = function (text) {


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
            }
            else if (text === 'Alignment Length') {
                this.data.tracks = $(this.data.tracks).sort(this.sortAlignLength);
            }
            else {
                this.data.tracks = $(this.data.tracks).sort(sortAlphabet);
            }

            this.defaultSort = text;

        };



        jQuery.fn.extend({
            sort : function () {
                return this.pushStack([].sort.apply(this, arguments), []);
            }
        });


        function sortAlphabet(a, b) {
            if (a.pdbID === b.pdbID) {
                if (a.chainID === b.chainID) {
                    return 0;
                }
                else {
                    return a.chainID > b.chainID ? 1 : -1;
                }
            }
            return a.pdbID > b.pdbID ? 1 : -1;
        }

        function sortResolution(a, b) {
            if (a === 0 || b === null) {
                return 0;
            }

            if (( typeof a === 'undefined') ||
                ( typeof b === 'undefined')
            ) {
                return 0;
            }
            if (
                ( typeof a.resolution === 'undefined') &&
                ( typeof b.resolution === 'undefined')
            ) {
                return 0;
            }
            if (( typeof a.resolution === 'undefined') &&
                ( typeof b.resolution !== 'undefined')
            ) {
                return 1;
            }
            if (( typeof a.resolution !== 'undefined') &&
                ( typeof b.resolution === 'undefined')
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

        Viewer.prototype.sortLength = function (a, b) {
            if (a.length === b.length) {
                return 0;
            }
            return a.length > b.length ? -1 : 1;

        };
        Viewer.prototype.sortAlignLength = function (a, b) {
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


        Viewer.prototype.setPaletteName = function (name) {

            this.data.paletteName = name;
            this.reloadData();

        };

        Viewer.prototype.updatePalette = function () {

            $.each(this.data.palettes, function (key, value) {
                $('#paletteselect')
                    .append($("<option></option>")
                        .attr("value", value)
                        .text(value)
                );
            });


        };

        Viewer.prototype.setShowSeqres = function (showS) {

            this.showSeqres = showS;

            this.repaint();

        };
        Viewer.prototype.getShowSeqres = function () {

            return this.showSeqres;


        };


        /** seqposEnd is optional */
        Viewer.prototype.highlight = function (seqposStart, seqposEnd) {

            if (typeof seqposEnd === 'undefined') {
                seqposEnd = seqposStart;
            }

            //console.log('highlighting seq pos' + seqposStart + "-" +seqposEnd)

            this.selectionStart = seqposStart;
            this.selectionEnd = seqposEnd;

            this.repaint();

        };

        Viewer.prototype.updateURL = function (currUrl, param, paramVal) {
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
                callbacks.forEach(function (callback) {
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

        Viewer.prototype.setRcsbServer = function (server) {
            this.rcsbServer = server;
        };



        Viewer.prototype.requestFullscreen = function() {

            var cont = $(this.contentDiv).attr('id');
            console.log(cont);

            var elem = document.getElementById(cont);

            console.log("element:" + elem);

            $(elem).css({'width':'100%','height':'100%','padding':'5%','background':'white'});

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
            PFV: function (elem, options) {
                return new Viewer(elem, options);
            }



        };
    });



