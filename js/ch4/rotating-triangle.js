var main = function () {
  var webgl = new Webgl();

  webgl.vertShaderPath  = "glsl/ch3/rotated-triangle.vsh";
  webgl.fragShaderPath  = "glsl/ch3/hello-triangle.fsh";
  webgl.attrNames       = ["Position"];
  webgl.uniNames        = ["xformMatrix"];

  webgl.script = function(gl) {
    var prevTimeMs = performance.now();
    var prevXform = mat4.create();
    var radsPerSec = toRad(45);
    var ident4 = mat4.create();

    var verts = new Float32Array([
       0.0,  0.5,
      -0.5, -0.5,
       0.5, -0.5
    ]);

    gl.clearColor(0.0, 0.0, 0.0, 1.0); // set clear color
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); // init array buffer

    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    gl.vertexAttribPointer(gl.attr.Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(gl.attr.Position);

    var tick = function(timeMs) {
      var deltaTimeSecs = (timeMs - prevTimeMs) / 1000;
      var deltaRads = radsPerSec * deltaTimeSecs;
      prevTimeMs = timeMs;
      prevXform = mat4.rotateZ(prevXform, prevXform, deltaRads);

      // set transformation matrix
      gl.uniformMatrix4fv(gl.uni.xformMatrix, false, prevXform);

      // draw stuff
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      window.requestAnimationFrame(tick);
    }

    tick(prevTimeMs);
  };

  webgl.runScript();
};

var toRad = function(deg) {
  return deg * 0.017
}
