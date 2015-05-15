var main = function () {
  var webgl = new Webgl();

  webgl.vertShaderPath  = "glsl/ch5/multi-attribute-size.vsh";
  webgl.fragShaderPath  = "glsl/ch5/multi-attribute-size.fsh";
  webgl.attrNames       = ["Position", "PointSize"];

  webgl.script = function(gl) {
    var verts = new Float32Array([
       0.0,  0.5,
      -0.5, -0.5,
       0.5, -0.5
    ]);

    var sizes = new Float32Array([
      10.0, 20.0, 30.0
    ]);

    var vertBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    gl.vertexAttribPointer(gl.attr.Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(gl.attr.Position);

    var sizeBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);
    gl.vertexAttribPointer(gl.attr.PointSize, 1, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(gl.attr.PointSize);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 3);
  };

  webgl.runScript();
};
