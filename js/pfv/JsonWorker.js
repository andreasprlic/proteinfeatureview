/**
 *  Protein Feature View v. {{ VERSION }} build {{ BUILD }} - draws a graphical summary of PDB and UniProtKB
 *   relationships for a single UniProtKB sequence.
 *
 *  @author Andreas Prlic
 */

/** A Worker that performs JSON calls in a background thread.
 *

 */

var idSeed = 0;

function newID() {
  return 'worker' + (++idSeed);
}

self.addEventListener('message', function(e) {

  var data = e.data;

  switch (data.cmd) {

    case 'stop':

      self.close(); // Terminates the worker.
      break;
    case 'load':
      var id = newID();

      load(data.msg, function(xhr) {
        var json = xhr.responseText;

        var r = {};
        r.msg = data.msg;
        r.json = JSON.parse(json);
        self.postMessage(JSON.stringify(r));
      });
      break;
    case 'jsonp':
      var id = newID();

      // the response method is part of the url "?jsonp=callbackMethod"
      console.log("importing " + data.msg)

      var data = importScripts(data.msg);

      break;
    default:
      self.postMessage('Unknown command: ' + data.msg);

  };
}, false);

//simple XHR request in pure JavaScript
function load(url, callback) {

  console.log("loading " + url);
  var xhr;

  if (typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
  else {
    var versions = ["MSXML2.XmlHttp.5.0",
      "MSXML2.XmlHttp.4.0",
      "MSXML2.XmlHttp.3.0",
      "MSXML2.XmlHttp.2.0",
      "Microsoft.XmlHttp"
    ]

    for (var i = 0, len = versions.length; i < len; i++) {
      try {
        xhr = new ActiveXObject(versions[i]);
        break;
      } catch (e) {}
    } // end for
  }

  xhr.onreadystatechange = ensureReadiness;

  function ensureReadiness() {
    if (xhr.readyState < 4) {
      return;
    }

    if (xhr.status !== 200) {
      return;
    }

    // all is well
    if (xhr.readyState === 4) {
      callback(xhr);
    }
  }

  xhr.open('GET', url, true);
  xhr.send('');
}
