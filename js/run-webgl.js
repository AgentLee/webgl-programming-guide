function Webgl() {
  this.canvasId         = "webgl";
  this.vertShaderPath   = null;
  this.vertShaderSrc    = null;
  this.fragShaderPath   = null;
  this.fragShaderSrc    = null;
  this.script           = null;

  this.runScript = function () {
    var proto = this;

    // helper functions

    var getContext = function() {
      var canvas = document.getElementById(proto.canvasId);
      var context = null;

      try {
        context = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      } catch(e) {
        throw new Error("Could not obtain WebGL context.");
      }

      return context;
    };

    var setupUserScript = function(gl) {
      return function () {
        var vs = proto.vertShaderSrc;
        var fs = proto.fragShaderSrc;

        if (vs && fs) {
          initShaders(gl, vs, fs); // provided by authors
          proto.script(gl);
        }
      }
    };

    var setVertShaderSrc = function(text) {
      proto.vertShaderSrc = text;
    };

    var setFragShaderSrc = function(text) {
      proto.fragShaderSrc = text;
    };

    var setShaderSrc = function(fname, setter, userScript) {
      var req = new XMLHttpRequest();

      req.onload = function (e) {
        setter(e.target.responseText);
        userScript();
      }

      req.overrideMimeType('text/plain');
      req.open("GET", fname);
      req.send();
    };

    // run the provided script

    var gl = getContext();
    var script = setupUserScript(gl);

    script(); // if shader srcs are set manually

    if (!proto.vertShaderSrc) {
      setShaderSrc(proto.vertShaderPath, setVertShaderSrc, script);
    }

    if (!proto.fragShaderSrc) {
      setShaderSrc(proto.fragShaderPath, setFragShaderSrc, script);
    }
  };
}
