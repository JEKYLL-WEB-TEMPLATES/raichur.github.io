// KEYSTROKES //
shortcut = {
  'all_shortcuts':{},//All the shortcuts are stored in this array
  'add': function(shortcut_combination,callback,opt) {
    //Provide a set of default options
    var default_options = {
      'type':'keydown',
      'propagate':false,
      'disable_in_input':false,
      'target':document,
      'keycode':false
    }
    if(!opt) opt = default_options;
    else {
      for(var dfo in default_options) {
        if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
      }
    }

    var ele = opt.target;
    if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
    var ths = this;
    shortcut_combination = shortcut_combination.toLowerCase();

    //The function to be called at keypress
    var func = function(e) {
      e = e || window.event;

      if(opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields
        var element;
        if(e.target) element=e.target;
        else if(e.srcElement) element=e.srcElement;
        if(element.nodeType==3) element=element.parentNode;

        if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
      }

      //Find Which key is pressed
      if (e.keyCode) code = e.keyCode;
      else if (e.which) code = e.which;
      var character = String.fromCharCode(code).toLowerCase();

      if(code == 188) character=","; //If the user presses , when the type is onkeydown
        if(code == 190) character="."; //If the user presses , when the type is onkeydown

          var keys = shortcut_combination.split("+");
          //Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
          var kp = 0;

          //Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
          var shift_nums = {
            "`":"~",
            "1":"!",
            "2":"@",
            "3":"#",
            "4":"$",
            "5":"%",
            "6":"^",
            "7":"&",
            "8":"*",
            "9":"(",
            "0":")",
            "-":"_",
            "=":"+",
            ";":":",
            "'":"\"",
            ",":"<",
            ".":">",
            "/":"?",
            "\\":"|"
          }
          //Special Keys - and their codes
          var special_keys = {
            'esc':27,
            'escape':27,
            'tab':9,
            'space':32,
            'return':13,
            'enter':13,
            'backspace':8,

            'scrolllock':145,
            'scroll_lock':145,
            'scroll':145,
            'capslock':20,
            'caps_lock':20,
            'caps':20,
            'numlock':144,
            'num_lock':144,
            'num':144,

            'pause':19,
            'break':19,

            'insert':45,
            'home':36,
            'delete':46,
            'end':35,

            'pageup':33,
            'page_up':33,
            'pu':33,

            'pagedown':34,
            'page_down':34,
            'pd':34,

            'left':37,
            'up':38,
            'right':39,
            'down':40,

            'f1':112,
            'f2':113,
            'f3':114,
            'f4':115,
            'f5':116,
            'f6':117,
            'f7':118,
            'f8':119,
            'f9':120,
            'f10':121,
            'f11':122,
            'f12':123
          }

          var modifiers = {
            shift: { wanted:false, pressed:false},
            ctrl : { wanted:false, pressed:false},
            alt  : { wanted:false, pressed:false},
            meta : { wanted:false, pressed:false}	//Meta is Mac specific
          };

          if(e.ctrlKey)	modifiers.ctrl.pressed = true;
          if(e.shiftKey)	modifiers.shift.pressed = true;
          if(e.altKey)	modifiers.alt.pressed = true;
          if(e.metaKey)   modifiers.meta.pressed = true;

          for(var i=0; k=keys[i],i<keys.length; i++) {
            //Modifiers
            if(k == 'ctrl' || k == 'control') {
              kp++;
              modifiers.ctrl.wanted = true;

            } else if(k == 'shift') {
              kp++;
              modifiers.shift.wanted = true;

            } else if(k == 'alt') {
              kp++;
              modifiers.alt.wanted = true;
            } else if(k == 'meta') {
              kp++;
              modifiers.meta.wanted = true;
            } else if(k.length > 1) { //If it is a special key
              if(special_keys[k] == code) kp++;

            } else if(opt['keycode']) {
              if(opt['keycode'] == code) kp++;

            } else { //The special keys did not match
              if(character == k) kp++;
              else {
                if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
                  character = shift_nums[character];
                  if(character == k) kp++;
                }
              }
            }
          }

          if(kp == keys.length &&
            modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
            modifiers.shift.pressed == modifiers.shift.wanted &&
            modifiers.alt.pressed == modifiers.alt.wanted &&
            modifiers.meta.pressed == modifiers.meta.wanted) {
              callback(e);

              if(!opt['propagate']) { //Stop the event
                //e.cancelBubble is supported by IE - this will kill the bubbling process.
                e.cancelBubble = true;
                e.returnValue = false;

                //e.stopPropagation works in Firefox.
                if (e.stopPropagation) {
                  e.stopPropagation();
                  e.preventDefault();
                }
                return false;
              }
            }
          }
          this.all_shortcuts[shortcut_combination] = {
            'callback':func,
            'target':ele,
            'event': opt['type']
          };
          //Attach the function with the event
          if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
          else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
          else ele['on'+opt['type']] = func;
        },

        //Remove the shortcut - just specify the shortcut and I will remove the binding
        'remove':function(shortcut_combination) {
          shortcut_combination = shortcut_combination.toLowerCase();
          var binding = this.all_shortcuts[shortcut_combination];
          delete(this.all_shortcuts[shortcut_combination])
          if(!binding) return;
          var type = binding['event'];
          var ele = binding['target'];
          var callback = binding['callback'];

          if(ele.detachEvent) ele.detachEvent('on'+type, callback);
          else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
          else ele['on'+type] = false;
        }
      }

// JEKYLL SEARCH //
!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module){module.exports=function(){function receivedResponse(xhr){return 200==xhr.status&&4==xhr.readyState}function handleResponse(xhr,callback){xhr.onreadystatechange=function(){if(receivedResponse(xhr))try{callback(null,JSON.parse(xhr.responseText))}catch(err){callback(err,null)}}}var self=this;self.load=function(location,callback){var xhr=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");xhr.open("GET",location,!0),handleResponse(xhr,callback),xhr.send()}}},{}],2:[function(require,module){function FuzzySearchStrategy(){function createFuzzyRegExpFromString(string){return new RegExp(string.split("").join(".*?"),"gi")}var self=this;self.matches=function(string,crit){return"string"!=typeof string?!1:(string=string.trim(),!!string.match(createFuzzyRegExpFromString(crit)))}}module.exports=new FuzzySearchStrategy},{}],3:[function(require,module){function LiteralSearchStrategy(){function doMatch(string,crit){return string.toLowerCase().indexOf(crit.toLowerCase())>=0}var self=this;self.matches=function(string,crit){return"string"!=typeof string?!1:(string=string.trim(),doMatch(string,crit))}}module.exports=new LiteralSearchStrategy},{}],4:[function(require,module){module.exports=function(){function findMatches(store,crit,strategy){for(var data=store.get(),i=0;i<data.length&&matches.length<limit;i++)findMatchesInObject(data[i],crit,strategy);return matches}function findMatchesInObject(obj,crit,strategy){for(var key in obj)if(strategy.matches(obj[key],crit)){matches.push(obj);break}}function getSearchStrategy(){return fuzzy?fuzzySearchStrategy:literalSearchStrategy}var self=this,matches=[],fuzzy=!1,limit=10,fuzzySearchStrategy=require("./SearchStrategies/fuzzy"),literalSearchStrategy=require("./SearchStrategies/literal");self.setFuzzy=function(_fuzzy){fuzzy=!!_fuzzy},self.setLimit=function(_limit){limit=parseInt(_limit,10)||limit},self.search=function(data,crit){return crit?(matches.length=0,findMatches(data,crit,getSearchStrategy())):[]}}},{"./SearchStrategies/fuzzy":2,"./SearchStrategies/literal":3}],5:[function(require,module){module.exports=function(_store){function isObject(obj){return!!obj&&"[object Object]"==Object.prototype.toString.call(obj)}function isArray(obj){return!!obj&&"[object Array]"==Object.prototype.toString.call(obj)}function addObject(data){return store.push(data),data}function addArray(data){for(var added=[],i=0;i<data.length;i++)isObject(data[i])&&added.push(addObject(data[i]));return added}var self=this,store=[];isArray(_store)&&addArray(_store),self.clear=function(){return store.length=0,store},self.get=function(){return store},self.put=function(data){return isObject(data)?addObject(data):isArray(data)?addArray(data):void 0}}},{}],6:[function(require,module){module.exports=function(){var self=this,templatePattern=/\{(.*?)\}/g;self.setTemplatePattern=function(newTemplatePattern){templatePattern=newTemplatePattern},self.render=function(t,data){return t.replace(templatePattern,function(match,prop){return data[prop]||match})}}},{}],7:[function(require){!function(window){"use strict";function SimpleJekyllSearch(){function initWithJSON(){store.put(opt.dataSource),registerInput()}function initWithURL(url){jsonLoader.load(url,function(err,json){err?throwError("failed to get JSON ("+url+")"):(store.put(json),registerInput())})}function throwError(message){throw new Error("SimpleJekyllSearch --- "+message)}function validateOptions(_opt){for(var i=0;i<requiredOptions.length;i++){var req=requiredOptions[i];_opt[req]||throwError("You must specify a "+req)}}function assignOptions(_opt){for(var option in opt)opt[option]=_opt[option]||opt[option]}function isJSON(json){try{return json instanceof Object&&JSON.parse(JSON.stringify(json))}catch(e){return!1}}function emptyResultsContainer(){opt.resultsContainer.innerHTML=""}function appendToResultsContainer(text){opt.resultsContainer.innerHTML+=text}function registerInput(){opt.searchInput.addEventListener("keyup",function(e){return 0==e.target.value.length?void emptyResultsContainer():void render(searcher.search(store,e.target.value))})}function render(results){if(emptyResultsContainer(),0==results.length)return appendToResultsContainer(opt.noResultsText);for(var i=0;i<results.length;i++)appendToResultsContainer(templater.render(opt.searchResultTemplate,results[i]))}var self=this,requiredOptions=["searchInput","resultsContainer","dataSource"],opt={searchInput:null,resultsContainer:null,dataSource:[],searchResultTemplate:'<li><a href="{url}" title="{desc}">{title}</a></li>',noResultsText:"No results found",limit:10,fuzzy:!1};self.init=function(_opt){validateOptions(_opt),assignOptions(_opt),isJSON(opt.dataSource)?initWithJSON(opt.dataSource):initWithURL(opt.dataSource)}}var Searcher=require("./Searcher"),Templater=require("./Templater"),Store=require("./Store"),JSONLoader=require("./JSONLoader"),searcher=new Searcher,templater=new Templater,store=new Store,jsonLoader=new JSONLoader;window.SimpleJekyllSearch=new SimpleJekyllSearch}(window,document)},{"./JSONLoader":1,"./Searcher":4,"./Store":5,"./Templater":6}]},{},[7]);


// MY CODE //
// SimpleJekyllSearch.init({
//   searchInput: document.getElementById('search-input'),
//   resultsContainer: document.getElementById('results-container'),
//   dataSource: '/search.json',
// });

if(document.getElementById("next_link")) {
  shortcut.add("Left",function() {
    window.open(document.getElementById("next_link").getAttribute('href'),'_self',false);
  });
}
if(document.getElementById("prev_link")) {
  shortcut.add("Right",function() {
    window.open(document.getElementById("prev_link").getAttribute('href'),'_self',false);
  });
}
shortcut.add("Shift+Up", function() {
  window.open('/','_self',false);
});
