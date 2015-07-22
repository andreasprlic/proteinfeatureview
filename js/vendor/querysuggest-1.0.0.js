/**
 * jquery QuerySuggest plugin
 *
 * Copyright (c) 2010 Dimitris Dimitropoulos (ddimitrop@gmail.com)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

function QuerySuggest (textbox,settings) {
  this.settings=$.extend(this.defaultSettings(),settings);
  this.textBoxId=$(textbox).attr('id');
  this.suggestId=this.textBoxId+"_querySuggest";
  this.queryExecutions={};
  this.emptyExecution=null;
  this.queryTexts=[];
  this.delayTimer=0;
  this.clearTimer=0;
  this.autoHide=true;
  this.pendingQuery=null;
  this.anotherPending=null;
}

$.fn.querySuggest = function(settings) {
    return this.each(function(i, textbox) {
            var querySuggest=new QuerySuggest(textbox,settings);
             $(textbox).focus(function(e){return querySuggest.enableSuggest(e);});
             $(textbox).blur(function(e){return querySuggest.disableSuggest(e);});                        
             $(textbox).keyup(function(e){return querySuggest.digestInput(e);});                        
             $(textbox).bind('paste',function(e){setTimeout(function(){return querySuggest.digestInput();},30);});                        
             $(textbox).after('<div id="'+querySuggest.suggestId+'" class="'+querySuggest.settings.cssClass+'" '+
                              'style="display:none;">'+
                              '</div>');
            $('#'+querySuggest.suggestId).click(function(e){
                querySuggest.autoHide=false;
                querySuggest.manualClose();
             });
            textbox.querySuggest=querySuggest;
    });
};

$.fn.getQuerySuggest = function() {
    if(this.length==0) {
        return null;
    }
    var textbox=this[0];
    return textbox.querySuggest;        
};


QuerySuggest.prototype.defaultSettings=function() {
  return {
      width:600,
      cssClass:'querySuggest',
      delay:800,
      align:'center',
      cacheSize:10,
      minQuerySize:1,
      maxQuerySize:500,
      condensed:false,
      initQuery:true,
      limit:6,
      present:function(querySuggest,suggestId,suggestions,query) {
            QuerySuggest.prototype.defaultPresent(querySuggest,suggestId,suggestions,query);
      },
      empty:function(querySuggest,suggestId) {QuerySuggest.prototype.defaultEmpty(querySuggest,suggestId);},
      queryUrl:function(query,querySuggest){return "";}
  };
};

QuerySuggest.prototype.enableSuggest=function() {
    /* Removed length variable */
    this.autoHide=true;
    this.querySuggestions();
};

QuerySuggest.prototype.disableSuggest=function() {
    var sid=this.suggestId;
    var querySuggest=this;
    setTimeout(function(){
        if(querySuggest.autoHide) {
            $('#'+sid).hide('fade','slow');
        }
    },200);
};

/* CLOSED LINK AT THE RIGHT BOTTOM */
QuerySuggest.prototype.manualClose=function() {
    if(!$('#suggestClose_'+this.suggestId).html()) {
       $('#'+this.suggestId).append("<div class='Close_SearchSuggestionWindow' id='suggestClose_"+this.suggestId+"'>" +
           "<a href='#' onclick='$(\"#"+this.suggestId+"\").hide();return false;'>close <span class='glyphicon glyphicon-remove'></span></a>" +
           "</div>");
    }
};

QuerySuggest.prototype.digestInput=function() {
    var input=$('#'+this.textBoxId).val();
    var qs=this;
    if(this.clearTimer===0) {
        this.clearTimer=setTimeout(function(){qs.emptySuggestions();},this.settings.delay*1.2);
    }
    if(this.delayTimer!==0) {
         clearTimeout(this.delayTimer);
         this.delayTimer=0;
    }
    if(!input || (input.length <this.settings.minQuerySize) || (input.length >this.settings.maxQuerySize) ) {
        $('#'+this.suggestId).hide();
         return;
    }
    this.delayTimer=setTimeout(function(){qs.querySuggestions();},this.settings.delay);
};

QuerySuggest.prototype.emptySuggestions=function() {
     this.clearTimer=0;
     if(this.delayTimer!==0) {
          return;
     }
     this.settings.empty(this,this.suggestId);
};

QuerySuggest.prototype.querySuggestions=function() {
    this.delayTimer=0;
    var input=$('#'+this.textBoxId).val();
    if(input.length < this.settings.minQuerySize) {
         input="";
    }
    if(!this.settings.initQuery && (input.length <this.settings.minQuerySize)) {
         $('#'+this.suggestId).hide();
         return;
    }
    if(this.pendingQuery) {
        if(!this.anotherPending || new Date().getTime()-this.anotherPending>2000) {
            this.anotherPending=new Date().getTime();
            return;
        } 
    }
    this.anotherPending=null;
    this.pendingQuery=input;
    this.pendingUrl=this.settings.queryUrl(this.pendingQuery,this);
    if(this.pendingUrl==null) {
        this.pendingQuery=null;
        $('#'+this.suggestId).hide();
        return;
    }
    var cachedSuggestions=this.queryExecutions[this.pendingUrl];
    if(!this.pendingQuery) {
        cachedSuggestions=this.emptyExecution;
    }
    if(cachedSuggestions !== undefined && cachedSuggestions !== null) {
         this.giveSuggestions(cachedSuggestions);
    } else {
        this.requestSuggestions();
    }
};

QuerySuggest.prototype.requestSuggestions=function() {
    var qs=this;
    var qr=this.pendingQuery;
    var url=this.pendingUrl;

    $.getJSON(this.pendingUrl,function(data) {
        qs.pendingQuery=qr;
        qs.pendingUrl=url;
        qs.giveSuggestions(data);
        if(qs.anotherPending) {
            qs.querySuggestions();
        }
    });
};

QuerySuggest.prototype.giveSuggestions=function(suggestions) {
   if(suggestions !== undefined && suggestions != null) {
       this.cacheSuggestions(this.pendingQuery,this.pendingUrl,suggestions);
   }
    var qr=this.pendingQuery;
    this.pendingQuery=null;
    this.pendingUrl=null;
    if(this.clearTimer!==0) {
         clearTimeout(this.clearTimer);
         this.clearTimer=0;
    }
    if(qr==$('#'+this.textBoxId).val()) {
       this.settings.present(this,this.suggestId,suggestions,qr);
       if(suggestions && suggestions.length) {
           $('#'+this.suggestId).show('fade','fast');
       } else {
           $('#'+this.suggestId).hide();
       }
    } else {
        $('#'+this.suggestId).hide();
    }
};

QuerySuggest.prototype.cacheSuggestions=function(queryText,queryUrl,suggestions) {
   if(!queryText) {
       this.emptyExecution=suggestions;
       return;
   }
       
   if(this.queryExecutions[queryUrl]) {
       var index=0;
       for(index=0; index<this.queryTexts.length; index++) {
           if(this.queryTexts[index]===queryUrl) {
                break;           
           }
       }
       if(index!==this.queryTexts.length)  {
          this.queryTexts.splice(index,1);        
       }
   }
   if(this.queryTexts.length>this.settings.cacheSize) {
       this.queryExecutions[this.queryTexts[0]]=null;
       this.queryTexts.splice(0,1);        
   }
   this.queryTexts.push(queryUrl);
   this.queryExecutions[queryUrl]=suggestions;
};

QuerySuggest.prototype.defaultEmpty=function(querySuggest,suggestId) {
    if(querySuggest.settings.initQuery) {
        if(querySuggest.emptyExecution) {
            querySuggest.settings.present(querySuggest,suggestId,querySuggest.emptyExecution,"");
        } else {
            querySuggest.querySuggestions();
        }
    } else {
        $('#'+suggestId).html("");
    }
};

QuerySuggest.prototype.defaultPresent=function(querySuggest,suggestId,suggestions,query){
   var html="";
   var i=0,j=0;
   if(suggestions) {
      for(i=0;i<suggestions.length;i++) {
         var suggestion=suggestions[i];
         html+="<div>"+suggestion.name+"<ul>";
         for(j=0;j<suggestion.matches.length;j++) {
              var match=suggestion.matches[j];
              html+="<li><a href='"+match.url+"'>"+match.label+"</a>";
         }
         html+="</ul></div>";
      }
      $('#'+suggestId).html(html);
   } else {
     querySuggest.settings.empty(querySuggest,suggestId);
   }
};
