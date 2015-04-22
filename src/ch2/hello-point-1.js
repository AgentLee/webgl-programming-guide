var main = function () {
  var config = {
    canvasId:   "webgl",
    vertShader: "src/ch2/hello-point-1.vsh",
    fragShader: "src/ch2/hello-point-1.fsh"
  };

  runWebgl(config, function(gl) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);
  });
};
