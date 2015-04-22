var helloCanvas = function () {
  on3dCanvas("webgl", function(gl) {

    gl.clearColor(0.0, 0.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

  });
}
