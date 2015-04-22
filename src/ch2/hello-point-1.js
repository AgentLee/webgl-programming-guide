var main = function () {

  webgl = new Webgl();
  webgl.vertShaderPath = "src/ch2/hello-point-1.vsh";
  webgl.fragShaderPath = "src/ch2/hello-point-1.fsh";

  webgl.script = function(gl) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);
  };

  webgl.runScript();

};
