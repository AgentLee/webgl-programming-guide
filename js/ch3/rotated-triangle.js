var main = function () {
  var webgl = new Webgl();

  webgl.vertShaderPath  = "glsl/ch3/rotated-triangle.vsh";
  webgl.fragShaderPath  = "glsl/ch3/hello-triangle.fsh";
  webgl.attrNames       = ["Position"];
  webgl.uniNames        = ["xformMatrix"];

  webgl.script = function(gl) {
    var angle = 60;

    var verticies = [
      { x: 0.0,   y: 0.5  },
      { x: -0.5,  y: -0.5 },
      { x: 0.5,   y: -0.5  }
    ];

    // set transformation matrix
    gl.uniformMatrix4fv(gl.uni.xformMatrix, false, xformMatrixForAngle(angle));

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

var toRadians = function(degrees) {
  return Math.PI * degrees / 180;
};

// openGL species matrix rows as columns; this transformation
// undoes that clusterfuck
var toGlMatrixFromRows = function(matrix) {
  var xformed = [];

  while (matrix[0].length) {
    for (var i in matrix) {
      xformed.push(matrix[i].shift());
    }
  }

  return new Float32Array(xformed);
}

var xformMatrixForAngle = function(degrees) {
  var
    radians = toRadians(90),
    cosB    = Math.cos(radians),
    sinB    = Math.sin(radians),

    matrix = [
      [cosB, -sinB, 0.0, 0.0],
      [sinB,  cosB, 0.0, 0.0],
      [0.0,   0.0,  1.0, 0.0],
      [0.0,   0.0,  0.0, 1.0]
    ];

  return toGlMatrixFromRows(matrix);
}
