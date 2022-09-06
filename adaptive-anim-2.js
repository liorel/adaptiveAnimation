var canvas,
  stage,
  exportRoot,
  anim_container,
  dom_overlay_container,
  fnStartAnimation
function init () {
  canvas = document.getElementById('canvas')
  anim_container = document.getElementById('animation_container')
  dom_overlay_container = document.getElementById('dom_overlay_container')
  var comp = AdobeAn.getComposition('7FA25BB1DCBDC940BF3DD6C3EDEC74FD')
  var lib = comp.getLibrary()
  handleComplete({}, comp)
}
function handleComplete (evt, comp) {
  //This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
  var lib = comp.getLibrary()
  var ss = comp.getSpriteSheet()
  exportRoot = new lib.deepvisibility()
  stage = new lib.Stage(canvas)
  //Registers the "tick" event listener.
  fnStartAnimation = function () {
    stage.addChild(exportRoot)
    createjs.Ticker.framerate = lib.properties.fps
    createjs.Ticker.addEventListener('tick', stage)
  }
  //Code to support hidpi screens and responsive scaling.
  AdobeAn.makeResponsive(true, 'both', false, 1, [
    canvas,
    anim_container,
    dom_overlay_container
  ])
  AdobeAn.compositionLoaded(lib.properties.id)
  fnStartAnimation()
}
