window._hyperscript.addFeature("eventsource",function(e,n,t){if(t.matchToken("eventsource")){var r,o=!1,u=e.requireElement("dotOrColonPath",t).evaluate().split("."),i=u.pop();t.matchToken("from")&&(r=e.requireElement("stringLike",t)),t.matchToken("with")&&t.matchToken("credentials")&&(o=!0);for(var c={eventSource:null,listeners:[],retryCount:0,open:function(e){if(null==e){if(null==c.eventSource||null==c.eventSource.url)throw"no url defined for EventSource.";e=c.eventSource.url}if(null!=c.eventSource)if(e!=c.eventSource.url)c.eventSource.close();else if(c.eventSource.readyState!=EventSource.CLOSED)return;c.eventSource=new EventSource(e,{withCredentials:o}),c.eventSource.addEventListener("open",function(e){c.retryCount=0}),c.eventSource.addEventListener("error",function(e){if(c.eventSource.readyState==EventSource.CLOSED){c.retryCount=Math.min(7,c.retryCount+1);var n=Math.random()*(2^c.retryCount)*500;window.setTimeout(c.open,n)}});for(var n=0;n<c.listeners.length;n++){var t=c.listeners[n];c.eventSource.addEventListener(t.type,t.handler,t.options)}},close:function(){null!=c.eventSource&&c.eventSource.close(),c.retryCount=0},addEventListener:function(e,n,t){c.listeners.push({type:e,handler:n,options:t}),null!=c.eventSource&&c.eventSource.addEventListener(e,n,t)}},a={name:i,object:c,install:function(e){n.assignToNamespace(e,u,i,c)}};t.matchToken("on");){var l=e.requireElement("stringLike",t,"Expected event name").evaluate(),s="";t.matchToken("as")&&(s=e.requireElement("stringLike",t,"Expected encoding type").evaluate());var v=e.requireElement("commandList",t);f(v),t.requireToken("end"),c.listeners.push({type:l,handler:d(s,v)})}return t.requireToken("end"),null!=r&&c.open(r.evaluate()),a;function d(e,t){return function(r){var o=function(e,n){return"json"==n?JSON.parse(e):e}(r.data,e),u=n.makeContext(c,a,c);u.event=r,u.result=o,t.execute(u)}}function f(e){if(e.next)return f(e.next);e.next={type:"implicitReturn",op:function(e){return n.HALT},execute:function(e){}}}}});
//# sourceMappingURL=eventsource.modern.js.map
