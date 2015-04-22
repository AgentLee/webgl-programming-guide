var main = function () {
  on3dCanvas("webgl", function(gl) {

    var VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE;

    VERTEX_SHADER_SOURCE = 'void main() {'
      + 'gl_Position = vec4(0.0, 0.0, 0.0, 1.0);'
      + 'gl_PointSize = 10.0;'
      + '}';

    FRAGMENT_SHADER_SOURCE = 'void main() {'
      + 'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);'
      + '}';

    // provided by authors
    initShaders(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);

  });
}
