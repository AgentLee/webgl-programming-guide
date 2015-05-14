var main = function () {
  var webgl = new Webgl();

  webgl.vertShaderPath  = "glsl/ch3/rotated-triangle.vsh";
  webgl.fragShaderPath  = "glsl/ch3/hello-triangle.fsh";
  webgl.attrNames       = ["Position"];
  webgl.uniNames        = ["xformMatrix"];

  webgl.script = function(gl) {
    var
      angle = 60,
      tx    = 0.3,
      ty    = 0.3,

      verticies = [
        { x: 0.0,   y: 0.5  },
        { x: -0.5,  y: -0.5 },
        { x: 0.5,   y: -0.5 }
      ];

      xformMatrix = new Matrix4();

    xformMatrix.setRotate(angle, 0, 0, 1);
    xformMatrix.translate(.5, .5, 0, 1);

    // set transformation matrix
    gl.uniformMatrix4fv(gl.uni.xformMatrix, false, xformMatrix.elements);

    // create vertex array buffer bound to a_Position
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, toGlVertArray(verticies), gl.STATIC_DRAW);
    gl.vertexAttribPointer(gl.attr.Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(gl.attr.Position);

    // set background color to black
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // draw the results
    gl.drawArrays(gl.TRIANGLES, 0, verticies.length);
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
