define([],function(){function e(e){var o=e.headers||{};"json"==e.dataType&&(o.accept="application/json");var r={headers:o,method:e.type,credentials:"same-origin"},a=e.contentType;e.data&&("string"==typeof e.data?r.body=e.data:(r.body=n(e.data),a=a||"application/x-www-form-urlencoded; charset=UTF-8")),a&&(o["Content-Type"]=a);var i=e.url;if(e.query){var c=n(e.query);c&&(i+="?"+c)}return e.timeout?t(i,r,e.timeout):fetch(i,r)}function t(e,t,n){return new Promise(function(o,r){var a=setTimeout(r,n);t=t||{},t.credentials="same-origin",fetch(e,t).then(function(e){clearTimeout(a),o(e)},function(){clearTimeout(a),r()})})}function n(e){var t=[];for(var n in e){var o=e[n];null!==o&&void 0!==o&&""!==o&&t.push(encodeURIComponent(n)+"="+encodeURIComponent(o))}return t.join("&")}function o(t){if(!t)throw new Error("Request cannot be null");return t.headers=t.headers||{},e(t).then(function(e){return e.status<400?"json"==t.dataType||"application/json"==t.headers.accept?e.json():"text"==t.dataType||0==(e.headers.get("Content-Type")||"").toLowerCase().indexOf("text/")?e.text():e:Promise.reject(e)},function(e){throw e})}return{getFetchPromise:e,ajax:o}});