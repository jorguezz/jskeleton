"use strict";
var __cov_MSQb18Hj2yB41Hf3oDDHEg = (Function('return this'))();
if (!__cov_MSQb18Hj2yB41Hf3oDDHEg.__coverage__) { __cov_MSQb18Hj2yB41Hf3oDDHEg.__coverage__ = {}; }
__cov_MSQb18Hj2yB41Hf3oDDHEg = __cov_MSQb18Hj2yB41Hf3oDDHEg.__coverage__;
if (!(__cov_MSQb18Hj2yB41Hf3oDDHEg['src/helpers/html-bars.js'])) {
   __cov_MSQb18Hj2yB41Hf3oDDHEg['src/helpers/html-bars.js'] = {"path":"src/helpers/html-bars.js","s":{"1":0,"2":0,"3":0,"4":1,"5":0,"6":0,"7":0,"8":0,"9":1,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0},"b":{},"f":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0},"fnMap":{"1":{"name":"(anonymous_1)","line":6,"loc":{"start":{"line":6,"column":31},"end":{"line":6,"column":58}}},"2":{"name":"normalizeArray","line":11,"loc":{"start":{"line":11,"column":4},"end":{"line":11,"column":40}}},"3":{"name":"normalizeObject","line":21,"loc":{"start":{"line":21,"column":4},"end":{"line":21,"column":42}}},"4":{"name":"(anonymous_4)","line":31,"loc":{"start":{"line":31,"column":44},"end":{"line":31,"column":125}}},"5":{"name":"(anonymous_5)","line":39,"loc":{"start":{"line":39,"column":40},"end":{"line":39,"column":62}}},"6":{"name":"(anonymous_6)","line":47,"loc":{"start":{"line":47,"column":37},"end":{"line":47,"column":48}}}},"statementMap":{"1":{"start":{"line":4,"column":4},"end":{"line":4,"column":28}},"2":{"start":{"line":6,"column":4},"end":{"line":8,"column":6}},"3":{"start":{"line":7,"column":8},"end":{"line":7,"column":46}},"4":{"start":{"line":11,"column":4},"end":{"line":19,"column":5}},"5":{"start":{"line":12,"column":8},"end":{"line":12,"column":42}},"6":{"start":{"line":14,"column":8},"end":{"line":16,"column":9}},"7":{"start":{"line":15,"column":12},"end":{"line":15,"column":50}},"8":{"start":{"line":18,"column":8},"end":{"line":18,"column":19}},"9":{"start":{"line":21,"column":4},"end":{"line":29,"column":5}},"10":{"start":{"line":22,"column":8},"end":{"line":22,"column":21}},"11":{"start":{"line":24,"column":8},"end":{"line":26,"column":9}},"12":{"start":{"line":25,"column":12},"end":{"line":25,"column":57}},"13":{"start":{"line":28,"column":8},"end":{"line":28,"column":19}},"14":{"start":{"line":31,"column":4},"end":{"line":37,"column":6}},"15":{"start":{"line":32,"column":8},"end":{"line":32,"column":50}},"16":{"start":{"line":33,"column":8},"end":{"line":33,"column":47}},"17":{"start":{"line":34,"column":8},"end":{"line":36,"column":10}},"18":{"start":{"line":39,"column":4},"end":{"line":44,"column":7}},"19":{"start":{"line":43,"column":8},"end":{"line":43,"column":43}},"20":{"start":{"line":47,"column":4},"end":{"line":49,"column":7}},"21":{"start":{"line":48,"column":8},"end":{"line":48,"column":38}}},"branchMap":{}};
}
__cov_MSQb18Hj2yB41Hf3oDDHEg = __cov_MSQb18Hj2yB41Hf3oDDHEg['src/helpers/html-bars.js'];
__cov_MSQb18Hj2yB41Hf3oDDHEg.s['1']++;Jskeleton._helpers={};__cov_MSQb18Hj2yB41Hf3oDDHEg.s['2']++;Jskeleton.registerHelper=function(name,helperFunc){__cov_MSQb18Hj2yB41Hf3oDDHEg.f['1']++;__cov_MSQb18Hj2yB41Hf3oDDHEg.s['3']++;Jskeleton._helpers[name]=helperFunc;};function normalizeArray(env,array){__cov_MSQb18Hj2yB41Hf3oDDHEg.f['2']++;__cov_MSQb18Hj2yB41Hf3oDDHEg.s['5']++;var out=new Array(array.length);__cov_MSQb18Hj2yB41Hf3oDDHEg.s['6']++;for(var i=0,l=array.length;i<l;i++){__cov_MSQb18Hj2yB41Hf3oDDHEg.s['7']++;out[i]=env.hooks.getValue(array[i]);}__cov_MSQb18Hj2yB41Hf3oDDHEg.s['8']++;return out;}function normalizeObject(env,object){__cov_MSQb18Hj2yB41Hf3oDDHEg.f['3']++;__cov_MSQb18Hj2yB41Hf3oDDHEg.s['10']++;var out={};__cov_MSQb18Hj2yB41Hf3oDDHEg.s['11']++;for(var prop in object){__cov_MSQb18Hj2yB41Hf3oDDHEg.s['12']++;out[prop]=env.hooks.getValue(object[prop]);}__cov_MSQb18Hj2yB41Hf3oDDHEg.s['13']++;return out;}__cov_MSQb18Hj2yB41Hf3oDDHEg.s['14']++;Jskeleton.htmlBars.hooks.invokeHelper=function(morph,env,scope,visitor,_params,_hash,helper,templates,context){__cov_MSQb18Hj2yB41Hf3oDDHEg.f['4']++;__cov_MSQb18Hj2yB41Hf3oDDHEg.s['15']++;var params=normalizeArray(env,_params);__cov_MSQb18Hj2yB41Hf3oDDHEg.s['16']++;var hash=normalizeObject(env,_hash);__cov_MSQb18Hj2yB41Hf3oDDHEg.s['17']++;return{value:helper.call(context,hash,env,params,templates)};};__cov_MSQb18Hj2yB41Hf3oDDHEg.s['18']++;Jskeleton.registerHelper('example',function(params,env){__cov_MSQb18Hj2yB41Hf3oDDHEg.f['5']++;__cov_MSQb18Hj2yB41Hf3oDDHEg.s['19']++;console.log('example helper',env);});__cov_MSQb18Hj2yB41Hf3oDDHEg.s['20']++;Jskeleton.registerHelper('pepe',function(){__cov_MSQb18Hj2yB41Hf3oDDHEg.f['6']++;__cov_MSQb18Hj2yB41Hf3oDDHEg.s['21']++;console.log('example helper');});