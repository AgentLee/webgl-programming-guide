var main = function () {

  var webgl = new Webgl();
  webgl.vertShaderPath = "glsl/ch2/hello-point-2.vsh";
  webgl.fragShaderPath = "glsl/ch2/hello-point-1.fsh";
  webgl.attrNames      = ["Position", "PointSize"];

  webgl.script = function(gl, attr) {
    gl.vertexAttrib3f(attr.Position, 0.5, -0.5, 0.0);   // pass vertex position to attribute var
    gl.vertexAttrib1f(attr.PointSize, 2.0);             // pass vertex size to attribute var
    gl.clearColor(0.0, 0.0, 0.0, 1.0);                      // set color for clearing <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);                          // clear <canvas>
    gl.drawArrays(gl.POINTS, 0, 1);                         // draw a point
  };

  webgl.runScript();

};

