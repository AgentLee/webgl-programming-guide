function Webgl() {
  this.attrNames        = [];
  this.canvas           = null;
  this.canvasId         = "webgl";
  this.fragShaderPath   = null;
  this.fragShaderSrc    = null;
  this.vertShaderPath   = null;
  this.vertShaderSrc    = null;
  this.script           = null;

  this.runScript = function () {
    var proto = this;

    // helper functions

    var getContext = function() {

      if (!proto.canvas) {
        proto.canvas = document.getElementById(proto.canvasId);
      }

      try {
        var context = proto.canvas.getContext("webgl") || proto.canvas.getContext("experimental-webgl");
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
          var attrs = initAttributes(gl);
          proto.script(gl, attrs);
        }
      }
    };

    var initAttributes = function(gl) {
      var name = null;
      attrs = {};

      for (var i in proto.attrNames) {
        name = proto.attrNames[i];
        attrs[name] = gl.getAttribLocation(gl.program, "a_" + name);

        if (attrs[name] < 0) {
          throw new Error("Could not find attribute " + name + " in shaders.");
        }
      }

      return attrs;
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
