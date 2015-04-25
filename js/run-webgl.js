function Webgl() {
  this.attrNames        = [];
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
      var canvas, context;
      canvas = document.getElementById(proto.canvasId);

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
          initAttributes(gl);
          initUniforms(gl);
          proto.script(gl);
        }
      }
    };

    var initAttributes = function(gl) {
      var name = null;
      gl.attr = {};

      for (var i in proto.attrNames) {
        name = proto.attrNames[i];
        gl.attr[name] = gl.getAttribLocation(gl.program, "a_" + name);

        if (gl.attr[name] < 0) {
          throw new Error("Could not find attribute " + name + " in shaders.");
        }
      }
    };

    var initUniforms = function(gl) {
      var name = null;
      gl.uni = {};

      for (var i in proto.uniNames) {
        name = proto.uniNames[i];
        gl.uni[name] = gl.getUniformLocation(gl.program, "u_" + name);

        if (!gl.uni[name]) {
          throw new Error("Could not find uniform " + name + " in shaders.");
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
