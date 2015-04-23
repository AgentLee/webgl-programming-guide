var main = function () {

  webgl = new Webgl();
  webgl.vertShaderSrc = "void main() {}";
  webgl.fragShaderSrc = "void main() {}";

  webgl.script = function(gl) {
    gl.clearColor(0.0, 0.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  };

  webgl.runScript();
}
