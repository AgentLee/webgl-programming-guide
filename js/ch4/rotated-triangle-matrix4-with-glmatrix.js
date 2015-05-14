var main = function () {
  var webgl = new Webgl();

  webgl.vertShaderPath  = "glsl/ch3/rotated-triangle.vsh";
  webgl.fragShaderPath  = "glsl/ch3/hello-triangle.fsh";
  webgl.attrNames       = ["Position"];
  webgl.uniNames        = ["xformMatrix"];

  webgl.script = function(gl) {
    var
      angle = toRad(60);
      xform = mat4.create(),
      trans = vec3.fromValues(0, 0.3, 0),

      verts = new Float32Array([
         0.0,  0.5,
        -0.5, -0.5,
         0.5, -0.5
      ]);

    xform = mat4.rotateZ(xform, xform, angle);
    xform = mat4.translate(xform, xform, trans);

    // set transformation matrix
    gl.uniformMatrix4fv(gl.uni.xformMatrix, false, xform);

    // create vertex array buffer bound to a_Position
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    gl.vertexAttribPointer(gl.attr.Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(gl.attr.Position);

    // set background color to black
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // draw the results
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  webgl.runScript();
};

var toRad = function(deg) {
  return deg * 0.017
}
