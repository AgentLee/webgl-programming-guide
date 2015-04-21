var on3dCanvas = function (canvasId, callback) {
  var canvas, context;
  canvas  = document.getElementById(canvasId);
  context = null;

  try {
    context = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  } catch(e) {
    throw new Error("Could not obtain WebGL context.");
  }

  callback(context);
}
