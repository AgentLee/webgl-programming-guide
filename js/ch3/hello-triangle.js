var main = function () {
  var webgl = new Webgl();

  webgl.vertShaderPath  = "glsl/ch3/hello-triangle.vsh";
  webgl.fragShaderPath  = "glsl/ch3/hello-triangle.fsh";
  webgl.attrNames       = ["Position"]

  webgl.script = function(gl) {
    var verticies = [
      { x: 0.0,   y: 0.5 },
      { x: -0.5,  y: -0.5 },
      { x: 0.5,   y: -0.5 }
    ]

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, toGlVertArray(verticies), gl.STATIC_DRAW);
    gl.vertexAttribPointer(gl.attr.Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(gl.attr.Position);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.LINE_LOOP, 0, verticies.length);
  };

  webgl.runScript();
};

var toGlVertArray = function (verticies) {
  var inline = [];

  for (var i in verticies) {
    inline.push(verticies[i].x);
    inline.push(verticies[i].y);
  }

  return new Float32Array(inline);
};
