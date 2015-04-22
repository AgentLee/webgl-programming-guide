var runWebgl = (function () {
  var vShaderSrc, fShaderSrc;

  var runWebglScript = function(config, program) {
    var gl = getContext(config.canvasId);
    var callback = setupCallback(gl, program);
    setShader(config.vertShader, setVShaderSrc, callback);
    setShader(config.fragShader, setFShaderSrc, callback);
  };

  var getContext = function(canvasId) {
    var canvas = document.getElementById(canvasId);
    var context = null;

    try {
      context = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    } catch(e) {
      throw new Error("Could not obtain WebGL context.");
    }

    return context;
  };

  var setupCallback = function(gl, program) {
    return function () {
      if (vShaderSrc && fShaderSrc) {
        // provided by authors
        initShaders(gl, vShaderSrc, fShaderSrc);
        program(gl);
      }
    }
  };

  var setVShaderSrc = function(text) {
    vShaderSrc = text;
  }

  var setFShaderSrc = function(text) {
    fShaderSrc = text;
  }

  var setShader = function(fname, setter, callback) {
    var req = new XMLHttpRequest();

    req.onload = function (evt) {
      setter(evt.target.responseText);
      callback();
    }

    req.overrideMimeType('text/plain');
    req.open("GET", fname);
    req.send();
  };

  return runWebglScript;
})();
