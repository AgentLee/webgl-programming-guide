var points = [];

var main = function () {
  var webgl = new Webgl();

  webgl.vertShaderPath  = "glsl/ch2/colored-points.vsh";
  webgl.fragShaderPath  = "glsl/ch2/colored-points.fsh";
  webgl.attrNames       = ["Position"]
  webgl.uniNames        = ["FragColor"]

  webgl.script = function(gl) {
    gl.canvas.onmousedown = function (e) { drawPoints(e, gl) };

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  };

  webgl.runScript();
};

var drawPoints = function(e, gl) {
  var height =  gl.canvas.height;
  var width =   gl.canvas.width;
  var rect =    gl.canvas.getBoundingClientRect();
  var x = ((e.clientX - rect.left) - width / 2) / (width / 2);
  var y = (height / 2 - (e.clientY - rect.top)) / (height / 2);
  var red = (x + 1) / 2;
  var green = (y + 1) / 2;
  var blue = 1 - (red + green) / 2;

  points.push({
    position: [x, y, 0.0],
    color: [red, green, blue, 1.0]
  });

  gl.clear(gl.COLOR_BUFFER_BIT);

  for (var i in points) {
    gl.vertexAttrib3fv(gl.attr.Position, points[i].position);
    gl.uniform4fv(gl.uni.FragColor, points[i].color);
    gl.drawArrays(gl.POINTS, 0, 1);
  }
};
