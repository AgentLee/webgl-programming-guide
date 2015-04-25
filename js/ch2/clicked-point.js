var points = [];

var main = function () {
  var webgl = new Webgl();

  webgl.vertShaderPath  = "glsl/ch2/clicked-point.vsh";
  webgl.fragShaderPath  = "glsl/ch2/hello-point-1.fsh";
  webgl.attrNames       = ["Position"]

  webgl.script = function(gl) {
    gl.canvas.onmousedown = function (e) { drawPoint(e, gl) };

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  };

  webgl.runScript();
};

var drawPoint = function(e, gl) {
  var height =  gl.canvas.height;
  var width =   gl.canvas.width;
  var rect =    gl.canvas.getBoundingClientRect();

  points.push({
    x: ((e.clientX - rect.left) - width / 2) / (width / 2),
    y: (height / 2 - (e.clientY - rect.top)) / (height / 2)
  });

  gl.clear(gl.COLOR_BUFFER_BIT);

  for (var i in points) {
    gl.vertexAttrib3f(gl.attr.Position, points[i].x, points[i].y, 0.0);
    gl.drawArrays(gl.POINTS, 0, 1);
  }
};
