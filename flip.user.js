// ==UserScript==
// @name         GitHub: flip comparison
// @namespace    https://github.com/Procyon-b
// @version      0.2
// @description  flip direction of comparison
// @author       Achernar
// @match        https://github.com/*/compare/*...*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function(){
"use strict";
var E=document.getElementById("js-repo-pjax-container");
//console.info('insert flip direction?',E);
if (!E) { E=document.querySelector('nav.reponav'); E=E && E.parentNode.parentNode; }
if (!E) return;

var obs=new MutationObserver(cb), config = { attributes: false, childList: true, subtree: false};
obs.observe(E, config);

function cb(mutL,o) {
  for(var mut of mutL) {
    if (mut.type == 'childList') {
      addFlip();
      }
    }
}

function addFlip() {
  function aFlip(e) {
    if (!e) return;
    var ne='<style>#swapCompare:hover{cursor:pointer;}</style><span class="tooltipped tooltipped-n" aria-label="Flip sides of comparison"><svg id="swapCompare" class="octicon octicon-arrow-both" viewBox="0 0 20 16" version="1.1" height="'+(e.attributes.height.value || 16)+'" aria-hidden="true"><path d="M0 8l6-5v3h8V3l6 5-6 5v-3H6v3L0 8z"></path></svg></span>';
    e.parentNode.id="addedFlip";
    e.parentNode.innerHTML=ne+e.parentNode.innerHTML;
    document.getElementById('swapCompare').onclick=function(){
      if (! /^\/([^/]+)(\/[^/]+\/compare\/)([^/]+?)\.\.\.(?:([^:./]+):)?(.+)$/.test(location.pathname) ) return;
      location.pathname = (RegExp.$4 || RegExp.$1) + RegExp.$2 + RegExp.$5 +'...'+ (RegExp.$4? RegExp.$1 +':' :'') + RegExp.$3;
      }
    }

  aFlip(E.querySelector('.range-editor:not([id]) .octicon-git-compare'));
  }

addFlip();
})();
