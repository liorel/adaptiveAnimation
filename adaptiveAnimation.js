;(function (cjs, an) {
  var p // shortcut to reference prototypes
  var lib = {}
  var ss = {}
  var img = {}
  lib.ssMetadata = []
  ;(lib.AnMovieClip = function () {
    this.currentSoundStreamInMovieclip
    this.actionFrames = []
    this.soundStreamDuration = new Map()
    this.streamSoundSymbolsList = []
    this.gotoAndPlayForStreamSoundSync = function (positionOrLabel) {
      cjs.MovieClip.prototype.gotoAndPlay.call(this, positionOrLabel)
    }
    this.gotoAndPlay = function (positionOrLabel) {
      this.clearAllSoundStreams()
      this.startStreamSoundsForTargetedFrame(positionOrLabel)
      cjs.MovieClip.prototype.gotoAndPlay.call(this, positionOrLabel)
    }
    this.play = function () {
      this.clearAllSoundStreams()
      this.startStreamSoundsForTargetedFrame(this.currentFrame)
      cjs.MovieClip.prototype.play.call(this)
    }
    this.gotoAndStop = function (positionOrLabel) {
      cjs.MovieClip.prototype.gotoAndStop.call(this, positionOrLabel)
      this.clearAllSoundStreams()
    }
    this.stop = function () {
      cjs.MovieClip.prototype.stop.call(this)
      this.clearAllSoundStreams()
    }
    this.startStreamSoundsForTargetedFrame = function (targetFrame) {
      for (var index = 0; index < this.streamSoundSymbolsList.length; index++) {
        if (
          index <= targetFrame &&
          this.streamSoundSymbolsList[index] != undefined
        ) {
          for (var i = 0; i < this.streamSoundSymbolsList[index].length; i++) {
            var sound = this.streamSoundSymbolsList[index][i]
            if (sound.endFrame > targetFrame) {
              var targetPosition = Math.abs(
                ((targetFrame - sound.startFrame) / lib.properties.fps) * 1000
              )
              var instance = playSound(sound.id)
              var remainingLoop = 0
              if (sound.offset) {
                targetPosition = targetPosition + sound.offset
              } else if (sound.loop > 1) {
                var loop = targetPosition / instance.duration
                remainingLoop = Math.floor(sound.loop - loop)
                if (targetPosition == 0) {
                  remainingLoop -= 1
                }
                targetPosition = targetPosition % instance.duration
              }
              instance.loop = remainingLoop
              instance.position = Math.round(targetPosition)
              this.InsertIntoSoundStreamData(
                instance,
                sound.startFrame,
                sound.endFrame,
                sound.loop,
                sound.offset
              )
            }
          }
        }
      }
    }
    this.InsertIntoSoundStreamData = function (
      soundInstance,
      startIndex,
      endIndex,
      loopValue,
      offsetValue
    ) {
      this.soundStreamDuration.set(
        { instance: soundInstance },
        {
          start: startIndex,
          end: endIndex,
          loop: loopValue,
          offset: offsetValue
        }
      )
    }
    this.clearAllSoundStreams = function () {
      var keys = this.soundStreamDuration.keys()
      for (var i = 0; i < this.soundStreamDuration.size; i++) {
        var key = keys.next().value
        key.instance.stop()
      }
      this.soundStreamDuration.clear()
      this.currentSoundStreamInMovieclip = undefined
    }
    this.stopSoundStreams = function (currentFrame) {
      if (this.soundStreamDuration.size > 0) {
        var keys = this.soundStreamDuration.keys()
        for (var i = 0; i < this.soundStreamDuration.size; i++) {
          var key = keys.next().value
          var value = this.soundStreamDuration.get(key)
          if (value.end == currentFrame) {
            key.instance.stop()
            if (this.currentSoundStreamInMovieclip == key) {
              this.currentSoundStreamInMovieclip = undefined
            }
            this.soundStreamDuration.delete(key)
          }
        }
      }
    }
    this.computeCurrentSoundStreamInstance = function (currentFrame) {
      if (this.currentSoundStreamInMovieclip == undefined) {
        if (this.soundStreamDuration.size > 0) {
          var keys = this.soundStreamDuration.keys()
          var maxDuration = 0
          for (var i = 0; i < this.soundStreamDuration.size; i++) {
            var key = keys.next().value
            var value = this.soundStreamDuration.get(key)
            if (value.end > maxDuration) {
              maxDuration = value.end
              this.currentSoundStreamInMovieclip = key
            }
          }
        }
      }
    }
    this.getDesiredFrame = function (currentFrame, calculatedDesiredFrame) {
      for (var frameIndex in this.actionFrames) {
        if (frameIndex > currentFrame && frameIndex < calculatedDesiredFrame) {
          return frameIndex
        }
      }
      return calculatedDesiredFrame
    }
    this.syncStreamSounds = function () {
      this.stopSoundStreams(this.currentFrame)
      this.computeCurrentSoundStreamInstance(this.currentFrame)
      if (this.currentSoundStreamInMovieclip != undefined) {
        var soundInstance = this.currentSoundStreamInMovieclip.instance
        if (soundInstance.position != 0) {
          var soundValue = this.soundStreamDuration.get(
            this.currentSoundStreamInMovieclip
          )
          var soundPosition = soundValue.offset
            ? soundInstance.position - soundValue.offset
            : soundInstance.position
          var calculatedDesiredFrame =
            soundValue.start + (soundPosition / 1000) * lib.properties.fps
          if (soundValue.loop > 1) {
            calculatedDesiredFrame +=
              (((soundValue.loop - soundInstance.loop - 1) *
                soundInstance.duration) /
                1000) *
              lib.properties.fps
          }
          calculatedDesiredFrame = Math.floor(calculatedDesiredFrame)
          var deltaFrame = calculatedDesiredFrame - this.currentFrame
          if (deltaFrame >= 2) {
            this.gotoAndPlayForStreamSoundSync(
              this.getDesiredFrame(this.currentFrame, calculatedDesiredFrame)
            )
          }
        }
      }
    }
  }).prototype = p = new cjs.MovieClip()
  // symbols:
  // helper functions:
  function mc_symbol_clone () {
    var clone = this._cloneProps(
      new this.constructor(this.mode, this.startPosition, this.loop)
    )
    clone.gotoAndStop(this.currentFrame)
    clone.paused = this.paused
    clone.framerate = this.framerate
    return clone
  }
  function getMCSymbolPrototype (symbol, nominalBounds, frameBounds) {
    var prototype = cjs.extend(symbol, cjs.MovieClip)
    prototype.clone = mc_symbol_clone
    prototype.nominalBounds = nominalBounds
    prototype.frameBounds = frameBounds
    return prototype
  }
  ;(lib.vtext = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {})
    // Layer_1
    this.shape = new cjs.Shape()
    this.shape.graphics
      .f('#1BC263')
      .s()
      .p(
        'AgPAeQgHgDgEgIIAPgJQABAEAEADQADACAEAAQAEAAACgBQABgBAAAAQABAAAAgBQAAAAABgBQAAgBAAgBQAAgDgEAAIgHgDIgKgEQgFgCgDgDQgEgEAAgHQAAgGAEgFQADgFAGgCQAFgCAGgBQAIABAGADQAHADAEAIIgPAHQgBgDgDgBQgCgCgEAAQgCAAgCABQgBAAAAABQgBAAAAABQAAAAgBABQAAAAAAABQABADADABIAHADIAKADQAFADADACQAEAEAAAHQAAAIgEAEQgDAFgGACQgGADgHAAQgJAAgHgFg'
      )
    this.shape.setTransform(24.675, 1.2)
    this.shape_1 = new cjs.Shape()
    this.shape_1.graphics
      .f('#1BC263')
      .s()
      .p(
        'AgQAdQgIgEgFgHQgEgIAAgKQAAgJAEgHQAFgIAIgEQAHgFAKgBQAKABAHAFQAHAEAEAIQAFAHgBAJIAAADIAAAEIgwAAQACAHAFACQAFADAFAAQAFAAAEgBQADgDADgDIANAIQgFAHgGADQgIAFgJAAQgKgBgIgFgAARgFQgCgHgEgDQgFgEgFABQgGAAgEADQgFADgBAHIAgAAIAAAAg'
      )
    this.shape_1.setTransform(18.2, 1.2)
    this.shape_2 = new cjs.Shape()
    this.shape_2.graphics
      .f('#1BC263')
      .s()
      .p('AgHAvIAAhdIAPAAIAABdg')
    this.shape_2.setTransform(13.05, -0.3)
    this.shape_3 = new cjs.Shape()
    this.shape_3.graphics
      .f('#1BC263')
      .s()
      .p(
        'AgRAdQgHgEgFgHQgEgIAAgKQAAgJAEgHQAFgIAHgEQAIgFAJgBQAJABAIAFQAIAEAFAIQAEAHAAAJQAAAKgEAIQgFAHgIAEQgIAFgJABQgJgBgIgFgAgIgPQgEACgCAFQgDAEAAAEQAAAGADAEQACADAEADQAEACAEAAQAFAAAEgCQAEgDACgDQACgEABgGQgBgEgCgEQgCgFgEgCQgEgCgFAAQgEAAgEACg'
      )
    this.shape_3.setTransform(7.875, 1.2)
    this.shape_4 = new cjs.Shape()
    this.shape_4.graphics
      .f('#1BC263')
      .s()
      .p(
        'AgRAhIAAhAIARAAIAAALQABgGAGgDQAFgDAGAAIAAATIgJAAQgEACgDAEQgCADAAAGIAAAfg'
      )
    this.shape_4.setTransform(2.175, 1.125)
    this.shape_5 = new cjs.Shape()
    this.shape_5.graphics
      .f('#1BC263')
      .s()
      .p(
        'AgiAuIAAhaIARAAIAAAIQAEgFAEgCQAGgCAGgBQAJABAHAFQAHAEAFAIQAEAHAAAKQAAAKgEAHQgFAHgHAEQgHAFgJABQgGAAgGgDQgEgDgEgEIAAAhgAgMgZQgFAGAAAIQAAAJAFADQAFAFAHABQAIgBAFgFQAFgDAAgJQAAgIgFgGQgFgEgIAAQgHAAgFAEg'
      )
    this.shape_5.setTransform(-7.05, 2.4)
    this.shape_6 = new cjs.Shape()
    this.shape_6.graphics
      .f('#1BC263')
      .s()
      .p(
        'AgiAuIAAhaIARAAIAAAIQADgFAFgCQAGgCAGgBQAJABAHAFQAHAEAFAIQAEAHAAAKQAAAKgEAHQgFAHgHAEQgHAFgJABQgGAAgGgDQgFgDgDgEIAAAhgAgMgZQgFAGAAAIQAAAJAFADQAFAFAHABQAIgBAFgFQAFgDAAgJQAAgIgFgGQgFgEgIAAQgHAAgFAEg'
      )
    this.shape_6.setTransform(-14.95, 2.4)
    this.shape_7 = new cjs.Shape()
    this.shape_7.graphics
      .f('#1BC263')
      .s()
      .p('AAXAtIgFgQIgjAAIgGAQIgTAAIAfhaIAWAAIAgBagAAMANIgMglIgMAlIAYAAg')
    this.shape_7.setTransform(-23.3, -0.1)
    this.timeline.addTween(
      cjs.Tween.get({})
        .to({
          state: [
            { t: this.shape_7 },
            { t: this.shape_6 },
            { t: this.shape_5 },
            { t: this.shape_4 },
            { t: this.shape_3 },
            { t: this.shape_2 },
            { t: this.shape_1 },
            { t: this.shape }
          ]
        })
        .wait(1)
    )
    this._renderFirstFrame()
  }).prototype = p = new cjs.MovieClip()
  p.nominalBounds = new cjs.Rectangle(-29.6, -9.8, 59.3, 19.700000000000003)
  ;(lib.Symbol1 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {})
    // Layer_1
    this.shape = new cjs.Shape()
    this.shape.graphics
      .f()
      .s('#1BC263')
      .ss(2)
      .p('AAAn9Im5D/IAAH9IG5D/IG6j/IAAn9g')
    this.shape_1 = new cjs.Shape()
    this.shape_1.graphics
      .f('#F5D537')
      .s()
      .p('Am4D/IAAn9IG4j/IG5D/IAAH9Im5D/g')
    this.timeline.addTween(
      cjs.Tween.get({})
        .to({ state: [{ t: this.shape_1 }, { t: this.shape }] })
        .wait(1)
    )
    this._renderFirstFrame()
  }).prototype = p = new cjs.MovieClip()
  p.nominalBounds = new cjs.Rectangle(-45.1, -52.1, 90.30000000000001, 104.2)
  ;(lib.Resourcetext = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {})
    // Layer_1
    this.shape = new cjs.Shape()
    this.shape.graphics
      .f('#212121')
      .s()
      .p(
        'AACApQgFgCgDgGQgDgFAAgJIAAgaIgLAAIAAgQIALAAIAAgNIAQgFIAAASIAPAAIAAAQIgPAAIAAAaQAAAEABABQACACAEAAIAIAAIAAAPIgKABIgKgBg'
      )
    this.shape.setTransform(31.2, 17.3821)
    this.shape_1 = new cjs.Shape()
    this.shape_1.graphics
      .f('#212121')
      .s()
      .p(
        'AANAiIAAglQABgHgEgDQgEgEgFAAQgGAAgDAEQgFAEAAAJIAAAiIgRAAIAAhAIARAAIAAAHQADgEAFgDQAFgDAGAAQAHAAAGAEQAFADADAGQADAGAAAIIAAAog'
      )
    this.shape_1.setTransform(25.4, 18.15)
    this.shape_2 = new cjs.Shape()
    this.shape_2.graphics
      .f('#212121')
      .s()
      .p(
        'AgQAeQgIgFgFgIQgDgHAAgKQAAgJADgIQAFgHAIgEQAHgFAKgBQAJABAIAFQAHAEAEAHQAFAJgBAIIAAAEIAAADIgwAAQABAGAGADQAFADAFAAQAFAAAEgCQAEgBABgDIAOAIQgFAGgGAEQgIADgJAAQgKAAgIgEgAAQgFQgBgHgEgDQgFgDgFAAQgGAAgFADQgEAEgBAGIAfAAIAAAAg'
      )
    this.shape_2.setTransform(18.1, 18.25)
    this.shape_3 = new cjs.Shape()
    this.shape_3.graphics
      .f('#212121')
      .s()
      .p(
        'AAgAiIAAgmQAAgGgDgDQgDgEgFAAQgGABgDADQgDADAAAIIAAAkIgQAAIAAgmQAAgGgDgDQgDgEgFAAQgGABgDADQgDADAAAIIAAAkIgRAAIAAhAIARAAIAAAGQACgEAFgCQAEgDAHAAQAGAAAEADQAEADACAEQADgEAFgDQAFgDAHAAQALABAHAHQAGAHAAAMIAAAog'
      )
    this.shape_3.setTransform(9.025, 18.15)
    this.shape_4 = new cjs.Shape()
    this.shape_4.graphics
      .f('#212121')
      .s()
      .p(
        'AgQAeQgIgFgEgIQgFgHAAgKQAAgJAFgIQAEgHAHgEQAJgFAJgBQAJABAIAFQAHAEAEAHQAFAJAAAIIAAAEIgBADIgwAAQACAGAFADQAEADAGAAQAFAAAEgCQAEgBACgDIANAIQgFAGgHAEQgHADgJAAQgKAAgIgEgAARgFQgCgHgFgDQgEgDgFAAQgGAAgEADQgFAEgCAGIAhAAIAAAAg'
      )
    this.shape_4.setTransform(-0.05, 18.25)
    this.shape_5 = new cjs.Shape()
    this.shape_5.graphics
      .f('#212121')
      .s()
      .p('AgHAwIAAhfIAQAAIAABfg')
    this.shape_5.setTransform(-5.2, 16.75)
    this.shape_6 = new cjs.Shape()
    this.shape_6.graphics
      .f('#212121')
      .s()
      .p(
        'AADApQgGgCgDgGQgDgFAAgJIAAgaIgLAAIAAgQIALAAIAAgNIAPgFIAAASIAQAAIAAAQIgQAAIAAAaQAAAEACABQACACAEAAIAIAAIAAAPIgKABIgJgBg'
      )
    this.shape_6.setTransform(-9.2, 17.3821)
    this.shape_7 = new cjs.Shape()
    this.shape_7.graphics
      .f('#212121')
      .s()
      .p(
        'AgIAvIAAhAIAQAAIAABAgAgGgcQgDgDgBgEQABgFADgDQACgDAEAAQAFAAACADQADADAAAFQAAAEgDADQgCADgFAAQgEAAgCgDg'
      )
    this.shape_7.setTransform(-12.9, 16.825)
    this.shape_8 = new cjs.Shape()
    this.shape_8.graphics
      .f('#212121')
      .s()
      .p(
        'AACApQgFgCgDgGQgDgFAAgJIAAgaIgMAAIAAgQIAMAAIAAgNIAPgFIAAASIAPAAIAAAQIgPAAIAAAaQABAEACABQABACADAAIAIAAIAAAPIgJABIgKgBg'
      )
    this.shape_8.setTransform(-16.9, 17.3821)
    this.shape_9 = new cjs.Shape()
    this.shape_9.graphics
      .f('#212121')
      .s()
      .p(
        'AAOAiIAAglQgBgHgDgDQgDgEgHAAQgEAAgFAEQgDAEAAAJIAAAiIgRAAIAAhAIARAAIAAAHQACgEAGgDQAEgDAGAAQAHAAAFAEQAGADADAGQAEAGAAAIIAAAog'
      )
    this.shape_9.setTransform(-22.7, 18.15)
    this.shape_10 = new cjs.Shape()
    this.shape_10.graphics
      .f('#212121')
      .s()
      .p(
        'AgQAeQgIgFgEgIQgEgHgBgKQABgJAEgIQAEgHAHgEQAIgFAJgBQALABAGAFQAIAEAEAHQAEAJABAIIAAAEIgBADIgwAAQACAGAEADQAFADAGAAQAFAAAEgCQADgBACgDIAOAIQgEAGgIAEQgGADgKAAQgKAAgIgEgAAQgFQgBgHgFgDQgEgDgGAAQgFAAgFADQgEAEgCAGIAgAAIAAAAg'
      )
    this.shape_10.setTransform(-30, 18.25)
    this.shape_11 = new cjs.Shape()
    this.shape_11.graphics
      .f('#212121')
      .s()
      .p(
        'AgOAdQgIgEgEgHQgFgIAAgKQAAgJAFgHQAEgIAIgEQAHgFAJgBQAKABAIAFQAHAEAEAIIgOAIQgCgEgEgDQgEgCgFAAQgGABgFAEQgFAFAAAHQAAAIAFAEQAFAGAGAAQAFAAAEgCQAEgDACgEIAPAJQgFAHgHAEQgIAFgKABQgJgBgHgFg'
      )
    this.shape_11.setTransform(7.425, 1.2)
    this.shape_12 = new cjs.Shape()
    this.shape_12.graphics
      .f('#212121')
      .s()
      .p(
        'AgHAvIAAhAIAQAAIAABAgAgGgcQgDgDAAgEQAAgFADgDQADgDADAAQAFAAADADQADADAAAFQAAAEgDADQgDADgFAAQgDAAgDgDg'
      )
    this.shape_12.setTransform(2.45, -0.225)
    this.shape_13 = new cjs.Shape()
    this.shape_13.graphics
      .f('#212121')
      .s()
      .p(
        'AgKAvIAAgwIgJAAIAAgQIAJAAIAAgBQAAgNAIgIQAGgHAQABIAAAQQgHgBgDADQgDADgBAGIAAABIAOAAIAAAQIgOAAIAAAwg'
      )
    this.shape_13.setTransform(-0.9, -0.2017)
    this.shape_14 = new cjs.Shape()
    this.shape_14.graphics
      .f('#212121')
      .s()
      .p(
        'AgHAvIAAhAIAPAAIAABAgAgGgcQgDgDgBgEQABgFADgDQACgDAEAAQAEAAADADQAEADAAAFQAAAEgEADQgDADgEAAQgEAAgCgDg'
      )
    this.shape_14.setTransform(-4.5, -0.225)
    this.shape_15 = new cjs.Shape()
    this.shape_15.graphics
      .f('#212121')
      .s()
      .p(
        'AgOAdQgIgEgEgHQgFgIAAgKQAAgJAFgHQAEgIAIgEQAHgFAJgBQAKABAIAFQAHAEAEAIIgOAIQgCgEgEgDQgEgCgFAAQgGABgFAEQgFAFAAAHQAAAIAFAEQAFAGAGAAQAFAAAEgCQAEgDACgEIAPAJQgFAHgHAEQgIAFgKABQgJgBgHgFg'
      )
    this.shape_15.setTransform(-9.175, 1.2)
    this.shape_16 = new cjs.Shape()
    this.shape_16.graphics
      .f('#212121')
      .s()
      .p(
        'AgQAdQgIgEgFgHQgDgIAAgKQAAgJADgHQAFgIAHgEQAJgFAIgBQALABAGAFQAIAEAEAIQAEAHAAAJIAAADIAAAEIgwAAQABAHAFACQAGADAFAAQAFAAAEgBQADgDACgDIAOAIQgEAHgIADQgGAFgKAAQgKgBgIgFgAAQgFQgBgHgEgDQgFgEgGABQgFAAgFADQgEADgBAHIAfAAIAAAAg'
      )
    this.shape_16.setTransform(-16.3, 1.2)
    this.shape_17 = new cjs.Shape()
    this.shape_17.graphics
      .f('#212121')
      .s()
      .p(
        'AgiAuIAAhaIARAAIAAAIQADgFAGgCQAFgCAGgBQAJABAHAFQAHAEAEAIQAEAHABAKQgBAKgEAHQgEAHgHAEQgHAFgJABQgGAAgFgDQgGgDgDgEIAAAhgAgMgZQgFAGAAAIQAAAJAFADQAFAFAHABQAIgBAFgFQAFgDAAgJQAAgIgFgGQgFgEgIAAQgHAAgFAEg'
      )
    this.shape_17.setTransform(-23.75, 2.4)
    this.shape_18 = new cjs.Shape()
    this.shape_18.graphics
      .f('#212121')
      .s()
      .p(
        'AgPAeQgHgDgEgIIAPgJQABAEAEADQADACAEAAQAEAAACgBQABgBAAAAQABAAAAgBQAAAAABgBQAAgBAAgBQAAgDgEAAIgHgDIgKgEQgFgCgDgDQgEgEAAgHQAAgGAEgFQADgFAGgCQAFgCAGgBQAIABAGADQAHADAEAIIgPAHQgBgDgDgBQgCgCgEAAQgCAAgCABQgBAAAAABQgBAAAAABQAAAAgBABQAAAAAAABQABADADABIAHADIAKADQAFADADACQAEAEAAAHQAAAIgEAEQgDAFgGACQgGADgHAAQgJAAgHgFg'
      )
    this.shape_18.setTransform(-30.825, 1.2)
    this.shape_19 = new cjs.Shape()
    this.shape_19.graphics
      .f('#212121')
      .s()
      .p(
        'AgQAeQgIgFgFgIQgDgHAAgKQAAgJADgIQAFgHAIgFQAHgEAKAAQAJAAAHAEQAIAFAEAHQAFAIgBAJIAAAEIAAADIgwAAQABAGAFADQAGADAFAAQAFAAAEgCQADgCACgCIAOAIQgFAGgGAEQgIADgJAAQgKAAgIgEgAAQgFQgBgHgEgDQgFgDgFAAQgGAAgFADQgEADgBAHIAfAAIAAAAg'
      )
    this.shape_19.setTransform(16.65, -15.85)
    this.shape_20 = new cjs.Shape()
    this.shape_20.graphics
      .f('#212121')
      .s()
      .p(
        'AgOAeQgIgFgEgIQgFgHAAgKQAAgJAFgIQAEgHAIgFQAHgEAJAAQAKAAAIAEQAHAFAEAHIgOAJQgCgEgEgCQgEgDgFAAQgGABgFAEQgFAFAAAHQAAAIAFAFQAFAEAGAAQAFAAAEgCQAEgCACgEIAPAIQgFAIgHAFQgIAEgKAAQgJAAgHgEg'
      )
    this.shape_20.setTransform(9.775, -15.85)
    this.shape_21 = new cjs.Shape()
    this.shape_21.graphics
      .f('#212121')
      .s()
      .p(
        'AgRAhIAAhAIARAAIAAALQABgGAGgDQAFgDAGAAIAAATQgEgBgFABQgEACgDAEQgCADAAAGIAAAfg'
      )
    this.shape_21.setTransform(4.325, -15.925)
    this.shape_22 = new cjs.Shape()
    this.shape_22.graphics
      .f('#212121')
      .s()
      .p(
        'AgSAeQgFgDgDgGQgDgGgBgJIAAgmIARAAIAAAkQABAHADADQADADAGAAQAFABAFgEQADgEAAgIIAAgiIASAAIAAA/IgSAAIAAgHQgDAEgFADQgEADgGgBQgHABgGgEg'
      )
    this.shape_22.setTransform(-1.8, -15.75)
    this.shape_23 = new cjs.Shape()
    this.shape_23.graphics
      .f('#212121')
      .s()
      .p(
        'AgRAeQgHgFgFgIQgEgHAAgKQAAgJAEgIQAFgHAHgFQAIgEAJAAQAJAAAIAEQAIAFAFAHQAEAIAAAJQAAAKgEAHQgFAIgIAFQgIAEgJAAQgJAAgIgEgAgIgOQgEACgCADQgDAEAAAFQAAAFADAEQACAFAEABQAEADAEAAQAFAAAEgDQAEgBACgFQACgEABgFQgBgFgCgEQgCgDgEgCQgEgDgFAAQgEAAgEADg'
      )
    this.shape_23.setTransform(-9.075, -15.85)
    this.shape_24 = new cjs.Shape()
    this.shape_24.graphics
      .f('#212121')
      .s()
      .p(
        'AgPAfQgHgFgEgHIAPgIQABAEAEACQADACAEAAQAEAAACgCQABAAAAAAQABgBAAAAQAAgBABAAQAAgBAAAAQAAgDgEgCIgHgDIgKgDQgFgCgDgDQgEgEAAgGQAAgIAEgEQADgEAGgDQAFgCAGAAQAIAAAGADQAHAEAEAGIgPAIQgBgDgDgCQgCgCgEAAQgCABgCABQgBAAAAABQgBAAAAABQAAAAgBABQAAAAAAABQABADADABIAHADIAKADQAFACADAEQAEADAAAIQAAAGgEAFQgDAFgGACQgGADgHgBQgJAAgHgDg'
      )
    this.shape_24.setTransform(-15.775, -15.85)
    this.shape_25 = new cjs.Shape()
    this.shape_25.graphics
      .f('#212121')
      .s()
      .p(
        'AgQAeQgIgFgFgIQgDgHAAgKQAAgJADgIQAFgHAHgFQAJgEAIAAQALAAAGAEQAIAFAEAHQAEAIAAAJIAAAEIAAADIgwAAQACAGAEADQAGADAFAAQAFAAAEgCQADgCACgCIAOAIQgEAGgIAEQgGADgKAAQgKAAgIgEgAAQgFQgBgHgFgDQgEgDgGAAQgFAAgFADQgEADgCAHIAgAAIAAAAg'
      )
    this.shape_25.setTransform(-22.25, -15.85)
    this.shape_26 = new cjs.Shape()
    this.shape_26.graphics
      .f('#212121')
      .s()
      .p(
        'AAPAtIgRgfIgOAAIAAAfIgSAAIAAhZIAkAAQAIAAAHADQAHAFAEAHQAEAGAAAIQAAAJgFAGQgFAHgIAEIAVAigAgQgBIASAAQAFAAADgEQAEgDAAgHQAAgFgEgEQgDgEgFABIgSAAg'
      )
    this.shape_26.setTransform(-29.475, -17.15)
    this.timeline.addTween(
      cjs.Tween.get({})
        .to({
          state: [
            { t: this.shape_26 },
            { t: this.shape_25 },
            { t: this.shape_24 },
            { t: this.shape_23 },
            { t: this.shape_22 },
            { t: this.shape_21 },
            { t: this.shape_20 },
            { t: this.shape_19 },
            { t: this.shape_18 },
            { t: this.shape_17 },
            { t: this.shape_16 },
            { t: this.shape_15 },
            { t: this.shape_14 },
            { t: this.shape_13 },
            { t: this.shape_12 },
            { t: this.shape_11 },
            { t: this.shape_10 },
            { t: this.shape_9 },
            { t: this.shape_8 },
            { t: this.shape_7 },
            { t: this.shape_6 },
            { t: this.shape_5 },
            { t: this.shape_4 },
            { t: this.shape_3 },
            { t: this.shape_2 },
            { t: this.shape_1 },
            { t: this.shape }
          ]
        })
        .wait(1)
    )
    this._renderFirstFrame()
  }).prototype = p = new cjs.MovieClip()
  p.nominalBounds = new cjs.Rectangle(-35.8, -26.9, 71.6, 53.8)
  ;(lib.IdentityTEXT = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {})
    // Layer_1
    this.shape = new cjs.Shape()
    this.shape.graphics
      .f('#1BC263')
      .s()
      .p(
        'AgXAtIAAgPQAHAAAEgDQAEgDACgHIgbg+IASAAIAQAsIAPgsIASAAIgYBAQgFAOgHAHQgIAGgLAAIgCgBg'
      )
    this.shape.setTransform(23.525, 12.0519)
    this.shape_1 = new cjs.Shape()
    this.shape_1.graphics
      .f('#1BC263')
      .s()
      .p(
        'AgRAhIAAhAIARAAIAAALQABgGAGgDQAFgDAGAAIAAATIgJAAQgEACgDAEQgCADAAAGIAAAfg'
      )
    this.shape_1.setTransform(18.275, 10.675)
    this.shape_2 = new cjs.Shape()
    this.shape_2.graphics
      .f('#1BC263')
      .s()
      .p(
        'AgRAdQgHgEgFgHQgEgIAAgKQAAgJAEgIQAFgHAHgEQAIgFAJgBQAJABAIAFQAIAEAFAHQAEAIAAAJQAAAKgEAIQgFAHgIAEQgIAFgJABQgJgBgIgFgAgIgPQgEADgCAEQgDADAAAFQAAAGADADQACAFAEACQAEACAEAAQAFAAAEgCQAEgCACgFQACgDABgGQgBgFgCgDQgCgEgEgDQgEgCgFAAQgEAAgEACg'
      )
    this.shape_2.setTransform(12.125, 10.75)
    this.shape_3 = new cjs.Shape()
    this.shape_3.graphics
      .f('#1BC263')
      .s()
      .p(
        'AADApQgGgCgDgGQgDgFAAgJIAAgaIgMAAIAAgQIAMAAIAAgNIAPgFIAAASIAQAAIAAAQIgQAAIAAAaQAAAEACABQACACADAAIAJAAIAAAPIgKABIgJgBg'
      )
    this.shape_3.setTransform(5.85, 9.8821)
    this.shape_4 = new cjs.Shape()
    this.shape_4.graphics
      .f('#1BC263')
      .s()
      .p(
        'AgOAdQgIgEgEgHQgFgIAAgKQAAgJAFgIQAEgHAIgEQAHgFAJgBQAKABAIAFQAHAEAEAHIgOAJQgCgEgEgDQgEgCgFAAQgGAAgFAFQgFAFAAAHQAAAIAFAEQAFAGAGAAQAFAAAEgCQAEgDACgEIAPAJQgFAHgHAEQgIAFgKABQgJgBgHgFg'
      )
    this.shape_4.setTransform(0.425, 10.75)
    this.shape_5 = new cjs.Shape()
    this.shape_5.graphics
      .f('#1BC263')
      .s()
      .p(
        'AgQAdQgIgEgEgHQgFgIAAgKQAAgJAFgIQAEgHAHgEQAIgFAJgBQAKABAHAFQAIAEAEAHQAEAJABAIIAAADIgBAEIgwAAQACAHAEACQAFADAGAAQAFAAAEgBQAEgCACgEIANAIQgEAHgIADQgHAFgJAAQgKgBgIgFgAARgFQgCgHgFgDQgEgEgGABQgFAAgEADQgFADgCAHIAhAAIAAAAg'
      )
    this.shape_5.setTransform(-6.7, 10.75)
    this.shape_6 = new cjs.Shape()
    this.shape_6.graphics
      .f('#1BC263')
      .s()
      .p(
        'AgRAhIAAhAIARAAIAAALQABgGAGgDQAFgDAGAAIAAATIgJAAQgEACgDAEQgCADAAAGIAAAfg'
      )
    this.shape_6.setTransform(-12.325, 10.675)
    this.shape_7 = new cjs.Shape()
    this.shape_7.graphics
      .f('#1BC263')
      .s()
      .p(
        'AgIAvIAAhAIARAAIAABAgAgGgcQgDgDAAgEQAAgFADgDQADgDADAAQAFAAADADQACADAAAFQAAAEgCADQgDADgFAAQgDAAgDgDg'
      )
    this.shape_7.setTransform(-16.25, 9.325)
    this.shape_8 = new cjs.Shape()
    this.shape_8.graphics
      .f('#1BC263')
      .s()
      .p(
        'AgnAuIAAhbIAkAAQAMABAJAFQALAHAFAKQAGAKAAAMQAAANgGAKQgFAKgLAHQgJAFgMABgAgVAdIASAAQAHAAAGgFQAGgDADgGQADgGABgJQgBgIgDgGQgDgGgGgDQgGgFgHAAIgSAAg'
      )
    this.shape_8.setTransform(-22, 9.45)
    this.shape_9 = new cjs.Shape()
    this.shape_9.graphics
      .f('#1BC263')
      .s()
      .p(
        'AgXAtIAAgPQAHAAAEgDQAEgDACgHIgbg+IASAAIAQAsIAPgsIASAAIgYBAQgFAOgHAHQgIAGgLAAIgCgBg'
      )
    this.shape_9.setTransform(14.725, -6.9981)
    this.shape_10 = new cjs.Shape()
    this.shape_10.graphics
      .f('#1BC263')
      .s()
      .p(
        'AADApQgGgCgDgGQgDgFAAgJIAAgaIgMAAIAAgQIAMAAIAAgNIAPgFIAAASIAQAAIAAAQIgQAAIAAAaQAAAEACABQACACAEAAIAIAAIAAAPIgKABIgJgBg'
      )
    this.shape_10.setTransform(8.9, -9.1679)
    this.shape_11 = new cjs.Shape()
    this.shape_11.graphics
      .f('#1BC263')
      .s()
      .p(
        'AgIAvIAAhAIAQAAIAABAgAgGgcQgDgDgBgEQABgFADgDQACgDAEAAQAEAAADADQADADAAAFQAAAEgDADQgDADgEAAQgEAAgCgDg'
      )
    this.shape_11.setTransform(5.2, -9.725)
    this.shape_12 = new cjs.Shape()
    this.shape_12.graphics
      .f('#1BC263')
      .s()
      .p(
        'AACApQgFgCgDgGQgDgFAAgJIAAgaIgMAAIAAgQIAMAAIAAgNIAQgFIAAASIAOAAIAAAQIgOAAIAAAaQAAAEACABQABACADAAIAIAAIAAAPIgJABIgKgBg'
      )
    this.shape_12.setTransform(1.2, -9.1679)
    this.shape_13 = new cjs.Shape()
    this.shape_13.graphics
      .f('#1BC263')
      .s()
      .p(
        'AAOAiIAAglQgBgHgDgDQgDgEgHAAQgEAAgFAEQgDAEAAAIIAAAjIgSAAIAAhAIASAAIAAAHQACgFAGgCQAEgDAGAAQAHAAAFAEQAGADADAGQADAGABAIIAAAog'
      )
    this.shape_13.setTransform(-4.6, -8.4)
    this.shape_14 = new cjs.Shape()
    this.shape_14.graphics
      .f('#1BC263')
      .s()
      .p(
        'AgQAeQgIgFgFgIQgDgHAAgKQAAgJADgIQAFgHAHgFQAJgEAIgBQALABAGAEQAIAFAEAHQAEAJAAAIIAAAEIAAADIgwAAQACAGAEADQAGADAFAAQAFAAAEgCQADgCACgCIAOAIQgEAGgIAEQgGADgKAAQgKAAgIgEgAAQgFQgBgHgFgDQgEgDgGAAQgFAAgFADQgEAEgCAGIAgAAIAAAAg'
      )
    this.shape_14.setTransform(-11.9, -8.3)
    this.shape_15 = new cjs.Shape()
    this.shape_15.graphics
      .f('#1BC263')
      .s()
      .p(
        'AgSAqQgHgFgEgIQgEgHgBgKQABgKAEgHQAEgHAHgFQAHgEAJgBQAGAAAFADQAGACADAFIAAghIARAAIAABaIgRAAIAAgIQgDAEgGADQgFADgGgBQgJAAgHgEgAgMAAQgFADAAAJQAAAIAFAGQAFAEAHAAQAIAAAFgEQAFgGAAgIQAAgJgFgDQgFgFgIgBQgHABgFAFg'
      )
    this.shape_15.setTransform(-19.725, -9.5)
    this.shape_16 = new cjs.Shape()
    this.shape_16.graphics
      .f('#1BC263')
      .s()
      .p('AgIAuIAAhaIARAAIAABag')
    this.shape_16.setTransform(-25.1, -9.6)
    this.timeline.addTween(
      cjs.Tween.get({})
        .to({
          state: [
            { t: this.shape_16 },
            { t: this.shape_15 },
            { t: this.shape_14 },
            { t: this.shape_13 },
            { t: this.shape_12 },
            { t: this.shape_11 },
            { t: this.shape_10 },
            { t: this.shape_9 },
            { t: this.shape_8 },
            { t: this.shape_7 },
            { t: this.shape_6 },
            { t: this.shape_5 },
            { t: this.shape_4 },
            { t: this.shape_3 },
            { t: this.shape_2 },
            { t: this.shape_1 },
            { t: this.shape }
          ]
        })
        .wait(1)
    )
    this._renderFirstFrame()
  }).prototype = p = new cjs.MovieClip()
  p.nominalBounds = new cjs.Rectangle(-28.8, -19.3, 57.7, 38.7)
  ;(lib.IdentityBG = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {})
    // Layer_1
    this.shape = new cjs.Shape()
    this.shape.graphics
      .f()
      .s('#1BC263')
      .ss(2)
      .p('EAAAggpI8RQVMAAAAgpIcRQVIcSwVMAAAggpg')
    this.shape_1 = new cjs.Shape()
    this.shape_1.graphics
      .f('#FFFFFF')
      .s()
      .p('A8RQVMAAAggpIcRwVIcSQVMAAAAgpI8SQVg')
    this.timeline.addTween(
      cjs.Tween.get({})
        .to({ state: [{ t: this.shape_1 }, { t: this.shape }] })
        .wait(1)
    )
    this._renderFirstFrame()
  }).prototype = p = new cjs.MovieClip()
  p.nominalBounds = new cjs.Rectangle(-182, -210.1, 364, 420.2)
  ;(lib.Highleveltext = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {})
    // Layer_1
    this.shape = new cjs.Shape()
    this.shape.graphics
      .f('#038C4C')
      .s()
      .p(
        'AACApQgFgCgDgGQgDgFAAgJIAAgaIgLAAIAAgQIALAAIAAgNIAQgFIAAASIAPAAIAAAQIgPAAIAAAaQAAAEABABQACACAEAAIAIAAIAAAPIgKABIgKgBg'
      )
    this.shape.setTransform(31.2, 9.8821)
    this.shape_1 = new cjs.Shape()
    this.shape_1.graphics
      .f('#038C4C')
      .s()
      .p(
        'AANAiIAAgmQABgGgEgEQgEgCgFAAQgGgBgDAEQgFAEAAAJIAAAiIgRAAIAAhBIARAAIAAAIQADgFAFgCQAFgCAGgBQAHABAGADQAFADADAGQADAGAAAIIAAAog'
      )
    this.shape_1.setTransform(25.4, 10.65)
    this.shape_2 = new cjs.Shape()
    this.shape_2.graphics
      .f('#038C4C')
      .s()
      .p(
        'AgQAdQgIgEgFgHQgDgIAAgKQAAgJADgIQAFgHAIgEQAHgFAKgBQAJABAIAFQAHAEAEAHQAFAJgBAIIAAADIAAAEIgwAAQABAHAGACQAFADAFAAQAFAAAEgBQAEgCABgEIAOAIQgFAHgGADQgIAFgJAAQgKgBgIgFgAAQgFQgBgHgEgDQgFgEgFABQgGAAgFADQgEADgBAHIAfAAIAAAAg'
      )
    this.shape_2.setTransform(18.1, 10.75)
    this.shape_3 = new cjs.Shape()
    this.shape_3.graphics
      .f('#038C4C')
      .s()
      .p(
        'AAgAiIAAgnQAAgFgDgEQgDgCgFAAQgGAAgDADQgDADAAAIIAAAkIgQAAIAAgnQAAgFgDgEQgDgCgFAAQgGAAgDADQgDADAAAIIAAAkIgRAAIAAhBIARAAIAAAHQACgDAFgDQAEgCAHgBQAGABAEACQAEACACAFQADgFAFgCQAFgCAHgBQALABAHAHQAGAHAAAMIAAAog'
      )
    this.shape_3.setTransform(9.025, 10.65)
    this.shape_4 = new cjs.Shape()
    this.shape_4.graphics
      .f('#038C4C')
      .s()
      .p(
        'AgQAdQgIgEgEgHQgFgIAAgKQAAgJAFgIQAEgHAHgEQAJgFAJgBQAJABAIAFQAHAEAEAHQAFAJAAAIIAAADIgBAEIgwAAQACAHAFACQAEADAGAAQAFAAAEgBQAEgCACgEIANAIQgFAHgHADQgHAFgJAAQgKgBgIgFgAARgFQgCgHgFgDQgEgEgFABQgGAAgEADQgFADgCAHIAhAAIAAAAg'
      )
    this.shape_4.setTransform(-0.05, 10.75)
    this.shape_5 = new cjs.Shape()
    this.shape_5.graphics
      .f('#038C4C')
      .s()
      .p('AgHAwIAAhfIAQAAIAABfg')
    this.shape_5.setTransform(-5.2, 9.25)
    this.shape_6 = new cjs.Shape()
    this.shape_6.graphics
      .f('#038C4C')
      .s()
      .p(
        'AADApQgGgCgDgGQgDgFAAgJIAAgaIgLAAIAAgQIALAAIAAgNIAPgFIAAASIAQAAIAAAQIgQAAIAAAaQAAAEACABQACACAEAAIAIAAIAAAPIgKABIgJgBg'
      )
    this.shape_6.setTransform(-9.2, 9.8821)
    this.shape_7 = new cjs.Shape()
    this.shape_7.graphics
      .f('#038C4C')
      .s()
      .p(
        'AgIAvIAAhAIAQAAIAABAgAgGgcQgDgDgBgEQABgFADgDQACgDAEAAQAFAAACADQADADAAAFQAAAEgDADQgCADgFAAQgEAAgCgDg'
      )
    this.shape_7.setTransform(-12.9, 9.325)
    this.shape_8 = new cjs.Shape()
    this.shape_8.graphics
      .f('#038C4C')
      .s()
      .p(
        'AACApQgFgCgDgGQgDgFAAgJIAAgaIgMAAIAAgQIAMAAIAAgNIAPgFIAAASIAPAAIAAAQIgPAAIAAAaQABAEACABQABACADAAIAIAAIAAAPIgJABIgKgBg'
      )
    this.shape_8.setTransform(-16.9, 9.8821)
    this.shape_9 = new cjs.Shape()
    this.shape_9.graphics
      .f('#038C4C')
      .s()
      .p(
        'AAOAiIAAgmQgBgGgDgEQgDgCgHAAQgEgBgFAEQgDAEAAAJIAAAiIgRAAIAAhBIARAAIAAAIQACgFAGgCQAEgCAGgBQAHABAFADQAGADADAGQAEAGAAAIIAAAog'
      )
    this.shape_9.setTransform(-22.7, 10.65)
    this.shape_10 = new cjs.Shape()
    this.shape_10.graphics
      .f('#038C4C')
      .s()
      .p(
        'AgQAdQgIgEgEgHQgEgIgBgKQABgJAEgIQAEgHAHgEQAIgFAJgBQALABAGAFQAIAEAEAHQAEAJABAIIAAADIgBAEIgwAAQACAHAEACQAFADAGAAQAFAAAEgBQADgCACgEIAOAIQgEAHgIADQgGAFgKAAQgKgBgIgFgAAQgFQgBgHgFgDQgEgEgGABQgFAAgFADQgEADgCAHIAgAAIAAAAg'
      )
    this.shape_10.setTransform(-30, 10.75)
    this.shape_11 = new cjs.Shape()
    this.shape_11.graphics
      .f('#038C4C')
      .s()
      .p('AgIAwIAAhfIARAAIAABfg')
    this.shape_11.setTransform(21.55, -9.8)
    this.shape_12 = new cjs.Shape()
    this.shape_12.graphics
      .f('#038C4C')
      .s()
      .p(
        'AgQAeQgIgFgEgIQgEgHAAgKQAAgJAEgIQAEgHAHgFQAJgEAIgBQALABAGAEQAIAFAEAHQAEAJAAAIIAAAEIAAADIgwAAQACAGAEADQAGADAFAAQAFAAAEgCQADgCACgCIAOAIQgEAGgIAEQgGADgKAAQgKAAgIgEgAAQgFQgBgHgFgDQgEgDgGAAQgFAAgFADQgEAEgCAGIAgAAIAAAAg'
      )
    this.shape_12.setTransform(16.45, -8.3)
    this.shape_13 = new cjs.Shape()
    this.shape_13.graphics
      .f('#038C4C')
      .s()
      .p('AgJAhIgYhAIASAAIAPAsIAQgsIASAAIgZBAg')
    this.shape_13.setTransform(9.425, -8.3)
    this.shape_14 = new cjs.Shape()
    this.shape_14.graphics
      .f('#038C4C')
      .s()
      .p(
        'AgQAeQgIgFgFgIQgEgHAAgKQAAgJAEgIQAFgHAIgFQAHgEAKgBQAKABAHAEQAHAFAEAHQAFAJgBAIIAAAEIAAADIgwAAQACAGAFADQAFADAFAAQAFAAAEgCQADgCADgCIANAIQgFAGgGAEQgIADgJAAQgKAAgIgEgAARgFQgCgHgEgDQgFgDgFAAQgGAAgEADQgFAEgBAGIAgAAIAAAAg'
      )
    this.shape_14.setTransform(2.45, -8.3)
    this.shape_15 = new cjs.Shape()
    this.shape_15.graphics
      .f('#038C4C')
      .s()
      .p('AgHAwIAAhfIAPAAIAABfg')
    this.shape_15.setTransform(-2.7, -9.8)
    this.shape_16 = new cjs.Shape()
    this.shape_16.graphics
      .f('#038C4C')
      .s()
      .p(
        'AAOAuIAAgmQAAgHgEgCQgEgEgGAAQgEAAgFAEQgDADAAAIIAAAkIgRAAIAAhaIARAAIAAAhQADgFAEgCQAFgDAGAAQAHAAAFAEQAGADADAGQADAGAAAHIAAApg'
      )
    this.shape_16.setTransform(-10.75, -9.6)
    this.shape_17 = new cjs.Shape()
    this.shape_17.graphics
      .f('#038C4C')
      .s()
      .p(
        'AgRAsQgIgFgEgIIAOgIQACAEAEACQAEADAGAAQAIABAFgFQAEgEAAgHIAAgHQgDAEgFADQgGACgGAAQgJAAgHgFQgHgEgFgIQgEgGAAgJQAAgJAEgIQAFgIAHgEQAHgEAJgBQAGABAGADQAFACADAFIAAgIIARAAIAAA9QgBAKgEAHQgFAHgIADQgIADgIAAQgKAAgIgDgAgMgZQgFAEAAAIQAAAIAFAFQAFAEAHAAQAIAAAFgEQAFgFAAgIQAAgIgFgEQgFgGgIAAQgHAAgFAGg'
      )
    this.shape_17.setTransform(-18.525, -7)
    this.shape_18 = new cjs.Shape()
    this.shape_18.graphics
      .f('#038C4C')
      .s()
      .p(
        'AgIAvIAAhAIAQAAIAABAgAgGgcQgDgDAAgEQAAgFADgDQACgDAEAAQAFAAADADQACADAAAFQAAAEgCADQgDADgFAAQgEAAgCgDg'
      )
    this.shape_18.setTransform(-23.8, -9.725)
    this.shape_19 = new cjs.Shape()
    this.shape_19.graphics
      .f('#038C4C')
      .s()
      .p('AARAuIAAgmIghAAIAAAmIgSAAIAAhaIASAAIAAAkIAhAAIAAgkIASAAIAABag')
    this.shape_19.setTransform(-29.475, -9.6)
    this.timeline.addTween(
      cjs.Tween.get({})
        .to({
          state: [
            { t: this.shape_19 },
            { t: this.shape_18 },
            { t: this.shape_17 },
            { t: this.shape_16 },
            { t: this.shape_15 },
            { t: this.shape_14 },
            { t: this.shape_13 },
            { t: this.shape_12 },
            { t: this.shape_11 },
            { t: this.shape_10 },
            { t: this.shape_9 },
            { t: this.shape_8 },
            { t: this.shape_7 },
            { t: this.shape_6 },
            { t: this.shape_5 },
            { t: this.shape_4 },
            { t: this.shape_3 },
            { t: this.shape_2 },
            { t: this.shape_1 },
            { t: this.shape }
          ]
        })
        .wait(1)
    )
    this._renderFirstFrame()
  }).prototype = p = new cjs.MovieClip()
  p.nominalBounds = new cjs.Rectangle(-35.8, -19.3, 71.6, 38.7)
  ;(lib.Highlevelbg = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {})
    // Layer_1
    this.shape = new cjs.Shape()
    this.shape.graphics
      .f()
      .s('#1BC263')
      .ss(2)
      .p('AAAuIIsPHEIAAOJIMPHEIMQnEIAAuJg')
    this.shape.setTransform(0.025, 0)
    this.shape_1 = new cjs.Shape()
    this.shape_1.graphics
      .f('#A4E7C1')
      .s()
      .p('AsPHEIAAuHIMPnFIMQHFIAAOHIsQHFg')
    this.shape_1.setTransform(0.025, 0)
    this.timeline.addTween(
      cjs.Tween.get({})
        .to({ state: [{ t: this.shape_1 }, { t: this.shape }] })
        .wait(1)
    )
    this._renderFirstFrame()
  }).prototype = p = new cjs.MovieClip()
  p.nominalBounds = new cjs.Rectangle(-79.3, -91.6, 158.7, 183.2)
  ;(lib.ClipGroup = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {})
    // Layer_4
    this.shape = new cjs.Shape()
    this.shape.graphics
      .f()
      .s('#1BC263')
      .ss(2)
      .p('AAAn9Im4D/IAAH9IG4D/IG6j/IAAn9g')
    this.shape.setTransform(88.1, 96.45, 1, 1, 0, 0, 0, 0, 0.1)
    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1))
    // Layer_2 (mask)
    var mask = new cjs.Shape()
    mask._off = true
    mask.graphics.p('Am5D/IAAn9IG5j/IG5D/IAAH9Im5D/g')
    mask.setTransform(88.1, 96.35)
    // Layer_3
    this.shape_1 = new cjs.Shape()
    this.shape_1.graphics
      .f()
      .s('#1BC263')
      .p('As6HdIZ1u5')
    this.shape_1.setTransform(100.975, 140.075)
    this.shape_2 = new cjs.Shape()
    this.shape_2.graphics
      .f()
      .s('#1BC263')
      .p('As6HeIZ1u7')
    this.shape_2.setTransform(99.575, 133)
    this.shape_3 = new cjs.Shape()
    this.shape_3.graphics
      .f()
      .s('#1BC263')
      .p('As6HdIZ1u5')
    this.shape_3.setTransform(98.175, 125.925)
    this.shape_4 = new cjs.Shape()
    this.shape_4.graphics
      .f()
      .s('#1BC263')
      .p('As5HdIZzu5')
    this.shape_4.setTransform(96.8, 118.875)
    this.shape_5 = new cjs.Shape()
    this.shape_5.graphics
      .f()
      .s('#1BC263')
      .p('As6HdIZ1u5')
    this.shape_5.setTransform(95.4, 111.775)
    this.shape_6 = new cjs.Shape()
    this.shape_6.graphics
      .f()
      .s('#1BC263')
      .p('As6HdIZ1u5')
    this.shape_6.setTransform(94.025, 104.725)
    this.shape_7 = new cjs.Shape()
    this.shape_7.graphics
      .f()
      .s('#1BC263')
      .p('As6HdIZ1u5')
    this.shape_7.setTransform(92.625, 97.625)
    this.shape_8 = new cjs.Shape()
    this.shape_8.graphics
      .f()
      .s('#1BC263')
      .p('As6HdIZ1u5')
    this.shape_8.setTransform(91.225, 90.575)
    this.shape_9 = new cjs.Shape()
    this.shape_9.graphics
      .f()
      .s('#1BC263')
      .p('As5HdIZ0u5')
    this.shape_9.setTransform(89.85, 83.525)
    this.shape_10 = new cjs.Shape()
    this.shape_10.graphics
      .f()
      .s('#1BC263')
      .p('As6HdIZ0u5')
    this.shape_10.setTransform(88.45, 76.425)
    this.shape_11 = new cjs.Shape()
    this.shape_11.graphics
      .f()
      .s('#1BC263')
      .p('As6HdIZ1u5')
    this.shape_11.setTransform(87.075, 69.375)
    this.shape_12 = new cjs.Shape()
    this.shape_12.graphics
      .f()
      .s('#1BC263')
      .p('As6HdIZ1u5')
    this.shape_12.setTransform(85.675, 62.275)
    this.shape_13 = new cjs.Shape()
    this.shape_13.graphics
      .f()
      .s('#1BC263')
      .p('As6HdIZ1u5')
    this.shape_13.setTransform(84.275, 55.225)
    this.shape_14 = new cjs.Shape()
    this.shape_14.graphics
      .f()
      .s('#1BC263')
      .p('As6HdIZ1u5')
    this.shape_14.setTransform(82.9, 48.175)
    var maskedShapeInstanceList = [
      this.shape_1,
      this.shape_2,
      this.shape_3,
      this.shape_4,
      this.shape_5,
      this.shape_6,
      this.shape_7,
      this.shape_8,
      this.shape_9,
      this.shape_10,
      this.shape_11,
      this.shape_12,
      this.shape_13,
      this.shape_14
    ]
    for (
      var shapedInstanceItr = 0;
      shapedInstanceItr < maskedShapeInstanceList.length;
      shapedInstanceItr++
    ) {
      maskedShapeInstanceList[shapedInstanceItr].mask = mask
    }
    this.timeline.addTween(
      cjs.Tween.get({})
        .to({
          state: [
            { t: this.shape_14 },
            { t: this.shape_13 },
            { t: this.shape_12 },
            { t: this.shape_11 },
            { t: this.shape_10 },
            { t: this.shape_9 },
            { t: this.shape_8 },
            { t: this.shape_7 },
            { t: this.shape_6 },
            { t: this.shape_5 },
            { t: this.shape_4 },
            { t: this.shape_3 },
            { t: this.shape_2 },
            { t: this.shape_1 }
          ]
        })
        .wait(1)
    )
    this._renderFirstFrame()
  }).prototype = getMCSymbolPrototype(
    lib.ClipGroup,
    new cjs.Rectangle(43, 44.2, 90.30000000000001, 104.3),
    null
  )
  ;(lib.ClipGroup_1 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {})
    // Layer_4
    this.shape_15 = new cjs.Shape()
    this.shape_15.graphics
      .f()
      .s('#1BC263')
      .ss(2)
      .p('AAAuIIsPHFIAAOIIMPHEIMQnEIAAuIg')
    this.shape_15.setTransform(156.2, 170.8, 1, 1, 0, 0, 0, 0, 0.1)
    this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(1))
    // Layer_2 (mask)
    var mask_1 = new cjs.Shape()
    mask_1._off = true
    mask_1.graphics.p('AsPHEIAAuHIMPnFIMQHFIAAOHIsQHFg')
    mask_1.setTransform(156.225, 170.7)
    // Layer_3
    this.shape_16 = new cjs.Shape()
    this.shape_16.graphics
      .f()
      .s('#1BC263')
      .p('A26NPMAt1gad')
    this.shape_16.setTransform(179.075, 248.3)
    this.shape_17 = new cjs.Shape()
    this.shape_17.graphics
      .f()
      .s('#1BC263')
      .p('A27NPMAt3gad')
    this.shape_17.setTransform(177.85, 242.025)
    this.shape_18 = new cjs.Shape()
    this.shape_18.graphics
      .f()
      .s('#1BC263')
      .p('A26NPMAt1gad')
    this.shape_18.setTransform(176.625, 235.75)
    this.shape_19 = new cjs.Shape()
    this.shape_19.graphics
      .f()
      .s('#1BC263')
      .p('A26NPMAt1gad')
    this.shape_19.setTransform(175.375, 229.475)
    this.shape_20 = new cjs.Shape()
    this.shape_20.graphics
      .f()
      .s('#1BC263')
      .p('A26NPMAt1gad')
    this.shape_20.setTransform(174.125, 223.2)
    this.shape_21 = new cjs.Shape()
    this.shape_21.graphics
      .f()
      .s('#1BC263')
      .p('A27NPMAt2gad')
    this.shape_21.setTransform(172.9, 216.925)
    this.shape_22 = new cjs.Shape()
    this.shape_22.graphics
      .f()
      .s('#1BC263')
      .p('A26NPMAt1gad')
    this.shape_22.setTransform(171.675, 210.65)
    this.shape_23 = new cjs.Shape()
    this.shape_23.graphics
      .f()
      .s('#1BC263')
      .p('A26NPMAt1gad')
    this.shape_23.setTransform(170.425, 204.375)
    this.shape_24 = new cjs.Shape()
    this.shape_24.graphics
      .f()
      .s('#1BC263')
      .p('A27NPMAt3gad')
    this.shape_24.setTransform(169.2, 198.1)
    this.shape_25 = new cjs.Shape()
    this.shape_25.graphics
      .f()
      .s('#1BC263')
      .p('A26NPMAt1gad')
    this.shape_25.setTransform(167.975, 191.825)
    this.shape_26 = new cjs.Shape()
    this.shape_26.graphics
      .f()
      .s('#1BC263')
      .p('A26NPMAt1gad')
    this.shape_26.setTransform(166.725, 185.55)
    this.shape_27 = new cjs.Shape()
    this.shape_27.graphics
      .f()
      .s('#1BC263')
      .p('A27NPMAt3gad')
    this.shape_27.setTransform(165.5, 179.275)
    this.shape_28 = new cjs.Shape()
    this.shape_28.graphics
      .f()
      .s('#1BC263')
      .p('A26NPMAt1gad')
    this.shape_28.setTransform(164.275, 173)
    this.shape_29 = new cjs.Shape()
    this.shape_29.graphics
      .f()
      .s('#1BC263')
      .p('A26NPMAt1gad')
    this.shape_29.setTransform(163.025, 166.725)
    this.shape_30 = new cjs.Shape()
    this.shape_30.graphics
      .f()
      .s('#1BC263')
      .p('A27NPMAt3gad')
    this.shape_30.setTransform(161.8, 160.45)
    this.shape_31 = new cjs.Shape()
    this.shape_31.graphics
      .f()
      .s('#1BC263')
      .p('A26NPMAt1gad')
    this.shape_31.setTransform(160.575, 154.175)
    this.shape_32 = new cjs.Shape()
    this.shape_32.graphics
      .f()
      .s('#1BC263')
      .p('A26NPMAt1gad')
    this.shape_32.setTransform(159.325, 147.9)
    this.shape_33 = new cjs.Shape()
    this.shape_33.graphics
      .f()
      .s('#1BC263')
      .p('A27NPMAt3gad')
    this.shape_33.setTransform(158.1, 141.625)
    this.shape_34 = new cjs.Shape()
    this.shape_34.graphics
      .f()
      .s('#1BC263')
      .p('A26NPMAt1gad')
    this.shape_34.setTransform(156.875, 135.35)
    this.shape_35 = new cjs.Shape()
    this.shape_35.graphics
      .f()
      .s('#1BC263')
      .p('A26NPMAt1gad')
    this.shape_35.setTransform(155.625, 129.075)
    this.shape_36 = new cjs.Shape()
    this.shape_36.graphics
      .f()
      .s('#1BC263')
      .p('A26NPMAt2gad')
    this.shape_36.setTransform(154.4, 122.8)
    this.shape_37 = new cjs.Shape()
    this.shape_37.graphics
      .f()
      .s('#1BC263')
      .p('A26NPMAt1gad')
    this.shape_37.setTransform(153.175, 116.525)
    this.shape_38 = new cjs.Shape()
    this.shape_38.graphics
      .f()
      .s('#1BC263')
      .p('A26NPMAt1gad')
    this.shape_38.setTransform(151.925, 110.25)
    this.shape_39 = new cjs.Shape()
    this.shape_39.graphics
      .f()
      .s('#1BC263')
      .p('A27NPMAt3gad')
    this.shape_39.setTransform(150.7, 103.975)
    this.shape_40 = new cjs.Shape()
    this.shape_40.graphics
      .f()
      .s('#1BC263')
      .p('A26NPMAt1gad')
    this.shape_40.setTransform(149.475, 97.7)
    this.shape_41 = new cjs.Shape()
    this.shape_41.graphics
      .f()
      .s('#1BC263')
      .p('A26NPMAt1gad')
    this.shape_41.setTransform(148.225, 91.425)
    this.shape_42 = new cjs.Shape()
    this.shape_42.graphics
      .f()
      .s('#1BC263')
      .p('A27NPMAt3gad')
    this.shape_42.setTransform(147, 85.15)
    var maskedShapeInstanceList = [
      this.shape_16,
      this.shape_17,
      this.shape_18,
      this.shape_19,
      this.shape_20,
      this.shape_21,
      this.shape_22,
      this.shape_23,
      this.shape_24,
      this.shape_25,
      this.shape_26,
      this.shape_27,
      this.shape_28,
      this.shape_29,
      this.shape_30,
      this.shape_31,
      this.shape_32,
      this.shape_33,
      this.shape_34,
      this.shape_35,
      this.shape_36,
      this.shape_37,
      this.shape_38,
      this.shape_39,
      this.shape_40,
      this.shape_41,
      this.shape_42
    ]
    for (
      var shapedInstanceItr = 0;
      shapedInstanceItr < maskedShapeInstanceList.length;
      shapedInstanceItr++
    ) {
      maskedShapeInstanceList[shapedInstanceItr].mask = mask_1
    }
    this.timeline.addTween(
      cjs.Tween.get({})
        .to({
          state: [
            { t: this.shape_42 },
            { t: this.shape_41 },
            { t: this.shape_40 },
            { t: this.shape_39 },
            { t: this.shape_38 },
            { t: this.shape_37 },
            { t: this.shape_36 },
            { t: this.shape_35 },
            { t: this.shape_34 },
            { t: this.shape_33 },
            { t: this.shape_32 },
            { t: this.shape_31 },
            { t: this.shape_30 },
            { t: this.shape_29 },
            { t: this.shape_28 },
            { t: this.shape_27 },
            { t: this.shape_26 },
            { t: this.shape_25 },
            { t: this.shape_24 },
            { t: this.shape_23 },
            { t: this.shape_22 },
            { t: this.shape_21 },
            { t: this.shape_20 },
            { t: this.shape_19 },
            { t: this.shape_18 },
            { t: this.shape_17 },
            { t: this.shape_16 }
          ]
        })
        .wait(1)
    )
    this._renderFirstFrame()
  }).prototype = getMCSymbolPrototype(
    lib.ClipGroup_1,
    new cjs.Rectangle(76.9, 79.1, 158.7, 183.20000000000002),
    null
  )
  ;(lib.ClipGroup_2 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {})
    // Layer_4
    this.shape_43 = new cjs.Shape()
    this.shape_43.graphics
      .f()
      .s('#1BC263')
      .ss(2)
      .p('AAA0TIxlKKIAAUTIRlKKIRmqKIAA0Tg')
    this.shape_43.setTransform(224.3, 245.15, 1, 1, 0, 0, 0, 0, 0.1)
    this.timeline.addTween(cjs.Tween.get(this.shape_43).wait(1))
    // Layer_2 (mask)
    var mask_2 = new cjs.Shape()
    mask_2._off = true
    mask_2.graphics.p('AxlKKIAA0TIRlqKIRmKKIAAUTIxmKKg')
    mask_2.setTransform(224.325, 245.05)
    // Layer_3
    this.shape_44 = new cjs.Shape()
    this.shape_44.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_44.setTransform(257.15, 356.55)
    this.shape_45 = new cjs.Shape()
    this.shape_45.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_45.setTransform(255.8, 349.65)
    this.shape_46 = new cjs.Shape()
    this.shape_46.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_46.setTransform(254.45, 342.75)
    this.shape_47 = new cjs.Shape()
    this.shape_47.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_47.setTransform(253.05, 335.85)
    this.shape_48 = new cjs.Shape()
    this.shape_48.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_48.setTransform(251.7, 328.95)
    this.shape_49 = new cjs.Shape()
    this.shape_49.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_49.setTransform(250.35, 322.05)
    this.shape_50 = new cjs.Shape()
    this.shape_50.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_50.setTransform(249, 315.175)
    this.shape_51 = new cjs.Shape()
    this.shape_51.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_51.setTransform(247.65, 308.275)
    this.shape_52 = new cjs.Shape()
    this.shape_52.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_52.setTransform(246.3, 301.4)
    this.shape_53 = new cjs.Shape()
    this.shape_53.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_53.setTransform(244.95, 294.5)
    this.shape_54 = new cjs.Shape()
    this.shape_54.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_54.setTransform(243.6, 287.6)
    this.shape_55 = new cjs.Shape()
    this.shape_55.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_55.setTransform(242.25, 280.7)
    this.shape_56 = new cjs.Shape()
    this.shape_56.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_56.setTransform(240.85, 273.8)
    this.shape_57 = new cjs.Shape()
    this.shape_57.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_57.setTransform(239.5, 266.9)
    this.shape_58 = new cjs.Shape()
    this.shape_58.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_58.setTransform(238.15, 260.025)
    this.shape_59 = new cjs.Shape()
    this.shape_59.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_59.setTransform(236.8, 253.125)
    this.shape_60 = new cjs.Shape()
    this.shape_60.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_60.setTransform(235.45, 246.25)
    this.shape_61 = new cjs.Shape()
    this.shape_61.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_61.setTransform(234.1, 239.35)
    this.shape_62 = new cjs.Shape()
    this.shape_62.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_62.setTransform(232.75, 232.45)
    this.shape_63 = new cjs.Shape()
    this.shape_63.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_63.setTransform(231.4, 225.55)
    this.shape_64 = new cjs.Shape()
    this.shape_64.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_64.setTransform(230.05, 218.65)
    this.shape_65 = new cjs.Shape()
    this.shape_65.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_65.setTransform(228.65, 211.75)
    this.shape_66 = new cjs.Shape()
    this.shape_66.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_66.setTransform(227.3, 204.875)
    this.shape_67 = new cjs.Shape()
    this.shape_67.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_67.setTransform(225.95, 197.975)
    this.shape_68 = new cjs.Shape()
    this.shape_68.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_68.setTransform(224.6, 191.1)
    this.shape_69 = new cjs.Shape()
    this.shape_69.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_69.setTransform(223.25, 184.2)
    this.shape_70 = new cjs.Shape()
    this.shape_70.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_70.setTransform(221.9, 177.3)
    this.shape_71 = new cjs.Shape()
    this.shape_71.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_71.setTransform(220.55, 170.4)
    this.shape_72 = new cjs.Shape()
    this.shape_72.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_72.setTransform(219.2, 163.5)
    this.shape_73 = new cjs.Shape()
    this.shape_73.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_73.setTransform(217.85, 156.6)
    this.shape_74 = new cjs.Shape()
    this.shape_74.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_74.setTransform(216.5, 149.725)
    this.shape_75 = new cjs.Shape()
    this.shape_75.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_75.setTransform(215.1, 142.825)
    this.shape_76 = new cjs.Shape()
    this.shape_76.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_76.setTransform(213.75, 135.95)
    this.shape_77 = new cjs.Shape()
    this.shape_77.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_77.setTransform(212.4, 129.05)
    this.shape_78 = new cjs.Shape()
    this.shape_78.graphics
      .f()
      .s('#1BC263')
      .p('Egg7ATBMBB3gmB')
    this.shape_78.setTransform(211.05, 122.15)
    var maskedShapeInstanceList = [
      this.shape_44,
      this.shape_45,
      this.shape_46,
      this.shape_47,
      this.shape_48,
      this.shape_49,
      this.shape_50,
      this.shape_51,
      this.shape_52,
      this.shape_53,
      this.shape_54,
      this.shape_55,
      this.shape_56,
      this.shape_57,
      this.shape_58,
      this.shape_59,
      this.shape_60,
      this.shape_61,
      this.shape_62,
      this.shape_63,
      this.shape_64,
      this.shape_65,
      this.shape_66,
      this.shape_67,
      this.shape_68,
      this.shape_69,
      this.shape_70,
      this.shape_71,
      this.shape_72,
      this.shape_73,
      this.shape_74,
      this.shape_75,
      this.shape_76,
      this.shape_77,
      this.shape_78
    ]
    for (
      var shapedInstanceItr = 0;
      shapedInstanceItr < maskedShapeInstanceList.length;
      shapedInstanceItr++
    ) {
      maskedShapeInstanceList[shapedInstanceItr].mask = mask_2
    }
    this.timeline.addTween(
      cjs.Tween.get({})
        .to({
          state: [
            { t: this.shape_78 },
            { t: this.shape_77 },
            { t: this.shape_76 },
            { t: this.shape_75 },
            { t: this.shape_74 },
            { t: this.shape_73 },
            { t: this.shape_72 },
            { t: this.shape_71 },
            { t: this.shape_70 },
            { t: this.shape_69 },
            { t: this.shape_68 },
            { t: this.shape_67 },
            { t: this.shape_66 },
            { t: this.shape_65 },
            { t: this.shape_64 },
            { t: this.shape_63 },
            { t: this.shape_62 },
            { t: this.shape_61 },
            { t: this.shape_60 },
            { t: this.shape_59 },
            { t: this.shape_58 },
            { t: this.shape_57 },
            { t: this.shape_56 },
            { t: this.shape_55 },
            { t: this.shape_54 },
            { t: this.shape_53 },
            { t: this.shape_52 },
            { t: this.shape_51 },
            { t: this.shape_50 },
            { t: this.shape_49 },
            { t: this.shape_48 },
            { t: this.shape_47 },
            { t: this.shape_46 },
            { t: this.shape_45 },
            { t: this.shape_44 }
          ]
        })
        .wait(1)
    )
    this._renderFirstFrame()
  }).prototype = getMCSymbolPrototype(
    lib.ClipGroup_2,
    new cjs.Rectangle(110.8, 114, 227.09999999999997, 262.2),
    null
  )
  ;(lib.ClipGroup_3 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {})
    // Layer_4
    this.shape_79 = new cjs.Shape()
    this.shape_79.graphics
      .f()
      .s('#1BC263')
      .ss(2)
      .p('AAA6eI27NQIAAaeIW7NPIW8tPIAA6eg')
    this.shape_79.setTransform(292.4, 319.45, 1, 1, 0, 0, 0, 0, 0.1)
    this.timeline.addTween(cjs.Tween.get(this.shape_79).wait(1))
    // Layer_2 (mask)
    var mask_3 = new cjs.Shape()
    mask_3._off = true
    mask_3.graphics.p('A27NQIAA6eIW7tQIW8NQIAAaeI28NPg')
    mask_3.setTransform(292.4, 319.35)
    // Layer_3
    this.shape_80 = new cjs.Shape()
    this.shape_80.graphics
      .f()
      .s('#1BC263')
      .p('Egq7AYzMBV3gxl')
    this.shape_80.setTransform(335.2, 464.725)
    this.shape_81 = new cjs.Shape()
    this.shape_81.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_81.setTransform(333.925, 458.2)
    this.shape_82 = new cjs.Shape()
    this.shape_82.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_82.setTransform(332.625, 451.7)
    this.shape_83 = new cjs.Shape()
    this.shape_83.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_83.setTransform(331.375, 445.2)
    this.shape_84 = new cjs.Shape()
    this.shape_84.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_84.setTransform(330.075, 438.7)
    this.shape_85 = new cjs.Shape()
    this.shape_85.graphics
      .f()
      .s('#1BC263')
      .p('Egq7AYzMBV4gxl')
    this.shape_85.setTransform(328.8, 432.2)
    this.shape_86 = new cjs.Shape()
    this.shape_86.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_86.setTransform(327.525, 425.7)
    this.shape_87 = new cjs.Shape()
    this.shape_87.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_87.setTransform(326.25, 419.2)
    this.shape_88 = new cjs.Shape()
    this.shape_88.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_88.setTransform(324.975, 412.7)
    this.shape_89 = new cjs.Shape()
    this.shape_89.graphics
      .f()
      .s('#1BC263')
      .p('Egq7AYzMBV4gxl')
    this.shape_89.setTransform(323.7, 406.2)
    this.shape_90 = new cjs.Shape()
    this.shape_90.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_90.setTransform(322.425, 399.7)
    this.shape_91 = new cjs.Shape()
    this.shape_91.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_91.setTransform(321.125, 393.2)
    this.shape_92 = new cjs.Shape()
    this.shape_92.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_92.setTransform(319.85, 386.7)
    this.shape_93 = new cjs.Shape()
    this.shape_93.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_93.setTransform(318.575, 380.2)
    this.shape_94 = new cjs.Shape()
    this.shape_94.graphics
      .f()
      .s('#1BC263')
      .p('Egq7AYzMBV4gxl')
    this.shape_94.setTransform(317.3, 373.7)
    this.shape_95 = new cjs.Shape()
    this.shape_95.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_95.setTransform(316.025, 367.2)
    this.shape_96 = new cjs.Shape()
    this.shape_96.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_96.setTransform(314.75, 360.675)
    this.shape_97 = new cjs.Shape()
    this.shape_97.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_97.setTransform(313.475, 354.175)
    this.shape_98 = new cjs.Shape()
    this.shape_98.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_98.setTransform(312.175, 347.675)
    this.shape_99 = new cjs.Shape()
    this.shape_99.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV4gxl')
    this.shape_99.setTransform(310.9, 341.175)
    this.shape_100 = new cjs.Shape()
    this.shape_100.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_100.setTransform(309.625, 334.675)
    this.shape_101 = new cjs.Shape()
    this.shape_101.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_101.setTransform(308.35, 328.15)
    this.shape_102 = new cjs.Shape()
    this.shape_102.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_102.setTransform(307.075, 321.65)
    this.shape_103 = new cjs.Shape()
    this.shape_103.graphics
      .f()
      .s('#1BC263')
      .p('Egq7AYzMBV4gxl')
    this.shape_103.setTransform(305.8, 315.15)
    this.shape_104 = new cjs.Shape()
    this.shape_104.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_104.setTransform(304.525, 308.65)
    this.shape_105 = new cjs.Shape()
    this.shape_105.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_105.setTransform(303.225, 302.15)
    this.shape_106 = new cjs.Shape()
    this.shape_106.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_106.setTransform(301.975, 295.65)
    this.shape_107 = new cjs.Shape()
    this.shape_107.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_107.setTransform(300.675, 289.15)
    this.shape_108 = new cjs.Shape()
    this.shape_108.graphics
      .f()
      .s('#1BC263')
      .p('Egq7AYzMBV4gxl')
    this.shape_108.setTransform(299.4, 282.65)
    this.shape_109 = new cjs.Shape()
    this.shape_109.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_109.setTransform(298.125, 276.15)
    this.shape_110 = new cjs.Shape()
    this.shape_110.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_110.setTransform(296.85, 269.65)
    this.shape_111 = new cjs.Shape()
    this.shape_111.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_111.setTransform(295.575, 263.15)
    this.shape_112 = new cjs.Shape()
    this.shape_112.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_112.setTransform(294.275, 256.65)
    this.shape_113 = new cjs.Shape()
    this.shape_113.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_113.setTransform(293.025, 250.15)
    this.shape_114 = new cjs.Shape()
    this.shape_114.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_114.setTransform(291.725, 243.65)
    this.shape_115 = new cjs.Shape()
    this.shape_115.graphics
      .f()
      .s('#1BC263')
      .p('Egq7AYzMBV4gxl')
    this.shape_115.setTransform(290.45, 237.15)
    this.shape_116 = new cjs.Shape()
    this.shape_116.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_116.setTransform(289.175, 230.625)
    this.shape_117 = new cjs.Shape()
    this.shape_117.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV4gxl')
    this.shape_117.setTransform(287.9, 224.125)
    this.shape_118 = new cjs.Shape()
    this.shape_118.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_118.setTransform(286.625, 217.625)
    this.shape_119 = new cjs.Shape()
    this.shape_119.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_119.setTransform(285.325, 211.125)
    this.shape_120 = new cjs.Shape()
    this.shape_120.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_120.setTransform(284.075, 204.6)
    this.shape_121 = new cjs.Shape()
    this.shape_121.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_121.setTransform(282.775, 198.125)
    this.shape_122 = new cjs.Shape()
    this.shape_122.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_122.setTransform(281.5, 191.625)
    this.shape_123 = new cjs.Shape()
    this.shape_123.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_123.setTransform(280.225, 185.125)
    this.shape_124 = new cjs.Shape()
    this.shape_124.graphics
      .f()
      .s('#1BC263')
      .p('Egq7AYzMBV3gxl')
    this.shape_124.setTransform(278.95, 178.625)
    this.shape_125 = new cjs.Shape()
    this.shape_125.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_125.setTransform(277.675, 172.125)
    this.shape_126 = new cjs.Shape()
    this.shape_126.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_126.setTransform(276.375, 165.625)
    this.shape_127 = new cjs.Shape()
    this.shape_127.graphics
      .f()
      .s('#1BC263')
      .p('Egq8AYzMBV5gxl')
    this.shape_127.setTransform(275.125, 159.125)
    var maskedShapeInstanceList = [
      this.shape_80,
      this.shape_81,
      this.shape_82,
      this.shape_83,
      this.shape_84,
      this.shape_85,
      this.shape_86,
      this.shape_87,
      this.shape_88,
      this.shape_89,
      this.shape_90,
      this.shape_91,
      this.shape_92,
      this.shape_93,
      this.shape_94,
      this.shape_95,
      this.shape_96,
      this.shape_97,
      this.shape_98,
      this.shape_99,
      this.shape_100,
      this.shape_101,
      this.shape_102,
      this.shape_103,
      this.shape_104,
      this.shape_105,
      this.shape_106,
      this.shape_107,
      this.shape_108,
      this.shape_109,
      this.shape_110,
      this.shape_111,
      this.shape_112,
      this.shape_113,
      this.shape_114,
      this.shape_115,
      this.shape_116,
      this.shape_117,
      this.shape_118,
      this.shape_119,
      this.shape_120,
      this.shape_121,
      this.shape_122,
      this.shape_123,
      this.shape_124,
      this.shape_125,
      this.shape_126,
      this.shape_127
    ]
    for (
      var shapedInstanceItr = 0;
      shapedInstanceItr < maskedShapeInstanceList.length;
      shapedInstanceItr++
    ) {
      maskedShapeInstanceList[shapedInstanceItr].mask = mask_3
    }
    this.timeline.addTween(
      cjs.Tween.get({})
        .to({
          state: [
            { t: this.shape_127 },
            { t: this.shape_126 },
            { t: this.shape_125 },
            { t: this.shape_124 },
            { t: this.shape_123 },
            { t: this.shape_122 },
            { t: this.shape_121 },
            { t: this.shape_120 },
            { t: this.shape_119 },
            { t: this.shape_118 },
            { t: this.shape_117 },
            { t: this.shape_116 },
            { t: this.shape_115 },
            { t: this.shape_114 },
            { t: this.shape_113 },
            { t: this.shape_112 },
            { t: this.shape_111 },
            { t: this.shape_110 },
            { t: this.shape_109 },
            { t: this.shape_108 },
            { t: this.shape_107 },
            { t: this.shape_106 },
            { t: this.shape_105 },
            { t: this.shape_104 },
            { t: this.shape_103 },
            { t: this.shape_102 },
            { t: this.shape_101 },
            { t: this.shape_100 },
            { t: this.shape_99 },
            { t: this.shape_98 },
            { t: this.shape_97 },
            { t: this.shape_96 },
            { t: this.shape_95 },
            { t: this.shape_94 },
            { t: this.shape_93 },
            { t: this.shape_92 },
            { t: this.shape_91 },
            { t: this.shape_90 },
            { t: this.shape_89 },
            { t: this.shape_88 },
            { t: this.shape_87 },
            { t: this.shape_86 },
            { t: this.shape_85 },
            { t: this.shape_84 },
            { t: this.shape_83 },
            { t: this.shape_82 },
            { t: this.shape_81 },
            { t: this.shape_80 }
          ]
        })
        .wait(1)
    )
    this._renderFirstFrame()
  }).prototype = getMCSymbolPrototype(
    lib.ClipGroup_3,
    new cjs.Rectangle(144.6, 148.8, 295.6, 341.2),
    null
  )
  ;(lib.ClipGroup_4 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {})
    // Layer_4
    this.shape_128 = new cjs.Shape()
    this.shape_128.graphics
      .f()
      .s('#1BC263')
      .ss(2)
      .p('EAAAggpI8RQVMAAAAgpIcRQVIcSwVMAAAggpg')
    this.shape_128.setTransform(360.55, 393.25, 1, 1, 0, 0, 0, 0, 0.1)
    this.timeline.addTween(cjs.Tween.get(this.shape_128).wait(1))
    // Layer_2 (mask)
    var mask_4 = new cjs.Shape()
    mask_4._off = true
    mask_4.graphics.p('A8RQVMAAAggpIcRwVIcSQVMAAAAgpI8SQVg')
    mask_4.setTransform(360.55, 393.175)
    // Layer_3
    this.shape_129 = new cjs.Shape()
    this.shape_129.graphics
      .f()
      .s('#1BC263')
      .p('Eg09AelMBp7g9J')
    this.shape_129.setTransform(413.3, 573.175)
    this.shape_130 = new cjs.Shape()
    this.shape_130.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp6g9J')
    this.shape_130.setTransform(412.1, 567.1)
    this.shape_131 = new cjs.Shape()
    this.shape_131.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_131.setTransform(410.925, 561.025)
    this.shape_132 = new cjs.Shape()
    this.shape_132.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_132.setTransform(409.725, 554.925)
    this.shape_133 = new cjs.Shape()
    this.shape_133.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_133.setTransform(408.525, 548.85)
    this.shape_134 = new cjs.Shape()
    this.shape_134.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_134.setTransform(407.325, 542.775)
    this.shape_135 = new cjs.Shape()
    this.shape_135.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_135.setTransform(406.125, 536.675)
    this.shape_136 = new cjs.Shape()
    this.shape_136.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_136.setTransform(404.925, 530.6)
    this.shape_137 = new cjs.Shape()
    this.shape_137.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_137.setTransform(403.725, 524.525)
    this.shape_138 = new cjs.Shape()
    this.shape_138.graphics
      .f()
      .s('#1BC263')
      .p('Eg09AelMBp7g9J')
    this.shape_138.setTransform(402.55, 518.45)
    this.shape_139 = new cjs.Shape()
    this.shape_139.graphics
      .f()
      .s('#1BC263')
      .p('Eg09AelMBp7g9J')
    this.shape_139.setTransform(401.35, 512.375)
    this.shape_140 = new cjs.Shape()
    this.shape_140.graphics
      .f()
      .s('#1BC263')
      .p('Eg09AelMBp7g9J')
    this.shape_140.setTransform(400.15, 506.275)
    this.shape_141 = new cjs.Shape()
    this.shape_141.graphics
      .f()
      .s('#1BC263')
      .p('Eg09AelMBp7g9J')
    this.shape_141.setTransform(398.95, 500.2)
    this.shape_142 = new cjs.Shape()
    this.shape_142.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_142.setTransform(397.775, 494.125)
    this.shape_143 = new cjs.Shape()
    this.shape_143.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_143.setTransform(396.575, 488.025)
    this.shape_144 = new cjs.Shape()
    this.shape_144.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_144.setTransform(395.375, 481.95)
    this.shape_145 = new cjs.Shape()
    this.shape_145.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_145.setTransform(394.175, 475.875)
    this.shape_146 = new cjs.Shape()
    this.shape_146.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_146.setTransform(392.975, 469.775)
    this.shape_147 = new cjs.Shape()
    this.shape_147.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_147.setTransform(391.775, 463.7)
    this.shape_148 = new cjs.Shape()
    this.shape_148.graphics
      .f()
      .s('#1BC263')
      .p('Eg09AelMBp7g9J')
    this.shape_148.setTransform(390.6, 457.625)
    this.shape_149 = new cjs.Shape()
    this.shape_149.graphics
      .f()
      .s('#1BC263')
      .p('Eg09AelMBp7g9J')
    this.shape_149.setTransform(389.4, 451.525)
    this.shape_150 = new cjs.Shape()
    this.shape_150.graphics
      .f()
      .s('#1BC263')
      .p('Eg09AelMBp7g9J')
    this.shape_150.setTransform(388.2, 445.45)
    this.shape_151 = new cjs.Shape()
    this.shape_151.graphics
      .f()
      .s('#1BC263')
      .p('Eg09AelMBp7g9J')
    this.shape_151.setTransform(387, 439.375)
    this.shape_152 = new cjs.Shape()
    this.shape_152.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_152.setTransform(385.825, 433.275)
    this.shape_153 = new cjs.Shape()
    this.shape_153.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_153.setTransform(384.625, 427.2)
    this.shape_154 = new cjs.Shape()
    this.shape_154.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_154.setTransform(383.425, 421.125)
    this.shape_155 = new cjs.Shape()
    this.shape_155.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_155.setTransform(382.225, 415.025)
    this.shape_156 = new cjs.Shape()
    this.shape_156.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_156.setTransform(381.025, 408.95)
    this.shape_157 = new cjs.Shape()
    this.shape_157.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_157.setTransform(379.825, 402.875)
    this.shape_158 = new cjs.Shape()
    this.shape_158.graphics
      .f()
      .s('#1BC263')
      .p('Eg09AelMBp7g9J')
    this.shape_158.setTransform(378.65, 396.775)
    this.shape_159 = new cjs.Shape()
    this.shape_159.graphics
      .f()
      .s('#1BC263')
      .p('Eg09AelMBp7g9J')
    this.shape_159.setTransform(377.45, 390.7)
    this.shape_160 = new cjs.Shape()
    this.shape_160.graphics
      .f()
      .s('#1BC263')
      .p('Eg09AelMBp7g9J')
    this.shape_160.setTransform(376.25, 384.625)
    this.shape_161 = new cjs.Shape()
    this.shape_161.graphics
      .f()
      .s('#1BC263')
      .p('Eg09AelMBp7g9J')
    this.shape_161.setTransform(375.05, 378.525)
    this.shape_162 = new cjs.Shape()
    this.shape_162.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_162.setTransform(373.875, 372.45)
    this.shape_163 = new cjs.Shape()
    this.shape_163.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_163.setTransform(372.675, 366.375)
    this.shape_164 = new cjs.Shape()
    this.shape_164.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_164.setTransform(371.475, 360.275)
    this.shape_165 = new cjs.Shape()
    this.shape_165.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_165.setTransform(370.275, 354.2)
    this.shape_166 = new cjs.Shape()
    this.shape_166.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_166.setTransform(369.075, 348.125)
    this.shape_167 = new cjs.Shape()
    this.shape_167.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_167.setTransform(367.875, 342.025)
    this.shape_168 = new cjs.Shape()
    this.shape_168.graphics
      .f()
      .s('#1BC263')
      .p('Eg09AelMBp7g9J')
    this.shape_168.setTransform(366.7, 335.95)
    this.shape_169 = new cjs.Shape()
    this.shape_169.graphics
      .f()
      .s('#1BC263')
      .p('Eg09AelMBp7g9J')
    this.shape_169.setTransform(365.5, 329.875)
    this.shape_170 = new cjs.Shape()
    this.shape_170.graphics
      .f()
      .s('#1BC263')
      .p('Eg09AelMBp7g9J')
    this.shape_170.setTransform(364.3, 323.775)
    this.shape_171 = new cjs.Shape()
    this.shape_171.graphics
      .f()
      .s('#1BC263')
      .p('Eg09AelMBp7g9J')
    this.shape_171.setTransform(363.1, 317.7)
    this.shape_172 = new cjs.Shape()
    this.shape_172.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_172.setTransform(361.925, 311.625)
    this.shape_173 = new cjs.Shape()
    this.shape_173.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AekMBp5g9I')
    this.shape_173.setTransform(360.725, 305.55)
    this.shape_174 = new cjs.Shape()
    this.shape_174.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_174.setTransform(359.525, 299.475)
    this.shape_175 = new cjs.Shape()
    this.shape_175.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AekMBp5g9I')
    this.shape_175.setTransform(358.325, 293.4)
    this.shape_176 = new cjs.Shape()
    this.shape_176.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AekMBp5g9I')
    this.shape_176.setTransform(357.125, 287.3)
    this.shape_177 = new cjs.Shape()
    this.shape_177.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_177.setTransform(355.925, 281.225)
    this.shape_178 = new cjs.Shape()
    this.shape_178.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AekMBp5g9I')
    this.shape_178.setTransform(354.725, 275.15)
    this.shape_179 = new cjs.Shape()
    this.shape_179.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AekMBp6g9I')
    this.shape_179.setTransform(353.55, 269.05)
    this.shape_180 = new cjs.Shape()
    this.shape_180.graphics
      .f()
      .s('#1BC263')
      .p('Eg09AelMBp7g9J')
    this.shape_180.setTransform(352.35, 262.975)
    this.shape_181 = new cjs.Shape()
    this.shape_181.graphics
      .f()
      .s('#1BC263')
      .p('Eg09AekMBp7g9I')
    this.shape_181.setTransform(351.15, 256.9)
    this.shape_182 = new cjs.Shape()
    this.shape_182.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_182.setTransform(349.975, 250.825)
    this.shape_183 = new cjs.Shape()
    this.shape_183.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AekMBp5g9I')
    this.shape_183.setTransform(348.775, 244.75)
    this.shape_184 = new cjs.Shape()
    this.shape_184.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_184.setTransform(347.575, 238.65)
    this.shape_185 = new cjs.Shape()
    this.shape_185.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_185.setTransform(346.375, 232.575)
    this.shape_186 = new cjs.Shape()
    this.shape_186.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AekMBp5g9I')
    this.shape_186.setTransform(345.175, 226.5)
    this.shape_187 = new cjs.Shape()
    this.shape_187.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_187.setTransform(343.975, 220.4)
    this.shape_188 = new cjs.Shape()
    this.shape_188.graphics
      .f()
      .s('#1BC263')
      .p('Eg08AelMBp5g9J')
    this.shape_188.setTransform(342.775, 214.325)
    this.shape_189 = new cjs.Shape()
    this.shape_189.graphics
      .f()
      .s('#1BC263')
      .p('Eg09AekMBp7g9I')
    this.shape_189.setTransform(341.6, 208.25)
    this.shape_190 = new cjs.Shape()
    this.shape_190.graphics
      .f()
      .s('#1BC263')
      .p('Eg09AelMBp7g9J')
    this.shape_190.setTransform(340.4, 202.15)
    this.shape_191 = new cjs.Shape()
    this.shape_191.graphics
      .f()
      .s('#1BC263')
      .p('Eg09AelMBp7g9J')
    this.shape_191.setTransform(339.2, 196.075)
    var maskedShapeInstanceList = [
      this.shape_129,
      this.shape_130,
      this.shape_131,
      this.shape_132,
      this.shape_133,
      this.shape_134,
      this.shape_135,
      this.shape_136,
      this.shape_137,
      this.shape_138,
      this.shape_139,
      this.shape_140,
      this.shape_141,
      this.shape_142,
      this.shape_143,
      this.shape_144,
      this.shape_145,
      this.shape_146,
      this.shape_147,
      this.shape_148,
      this.shape_149,
      this.shape_150,
      this.shape_151,
      this.shape_152,
      this.shape_153,
      this.shape_154,
      this.shape_155,
      this.shape_156,
      this.shape_157,
      this.shape_158,
      this.shape_159,
      this.shape_160,
      this.shape_161,
      this.shape_162,
      this.shape_163,
      this.shape_164,
      this.shape_165,
      this.shape_166,
      this.shape_167,
      this.shape_168,
      this.shape_169,
      this.shape_170,
      this.shape_171,
      this.shape_172,
      this.shape_173,
      this.shape_174,
      this.shape_175,
      this.shape_176,
      this.shape_177,
      this.shape_178,
      this.shape_179,
      this.shape_180,
      this.shape_181,
      this.shape_182,
      this.shape_183,
      this.shape_184,
      this.shape_185,
      this.shape_186,
      this.shape_187,
      this.shape_188,
      this.shape_189,
      this.shape_190,
      this.shape_191
    ]
    for (
      var shapedInstanceItr = 0;
      shapedInstanceItr < maskedShapeInstanceList.length;
      shapedInstanceItr++
    ) {
      maskedShapeInstanceList[shapedInstanceItr].mask = mask_4
    }
    this.timeline.addTween(
      cjs.Tween.get({})
        .to({
          state: [
            { t: this.shape_191 },
            { t: this.shape_190 },
            { t: this.shape_189 },
            { t: this.shape_188 },
            { t: this.shape_187 },
            { t: this.shape_186 },
            { t: this.shape_185 },
            { t: this.shape_184 },
            { t: this.shape_183 },
            { t: this.shape_182 },
            { t: this.shape_181 },
            { t: this.shape_180 },
            { t: this.shape_179 },
            { t: this.shape_178 },
            { t: this.shape_177 },
            { t: this.shape_176 },
            { t: this.shape_175 },
            { t: this.shape_174 },
            { t: this.shape_173 },
            { t: this.shape_172 },
            { t: this.shape_171 },
            { t: this.shape_170 },
            { t: this.shape_169 },
            { t: this.shape_168 },
            { t: this.shape_167 },
            { t: this.shape_166 },
            { t: this.shape_165 },
            { t: this.shape_164 },
            { t: this.shape_163 },
            { t: this.shape_162 },
            { t: this.shape_161 },
            { t: this.shape_160 },
            { t: this.shape_159 },
            { t: this.shape_158 },
            { t: this.shape_157 },
            { t: this.shape_156 },
            { t: this.shape_155 },
            { t: this.shape_154 },
            { t: this.shape_153 },
            { t: this.shape_152 },
            { t: this.shape_151 },
            { t: this.shape_150 },
            { t: this.shape_149 },
            { t: this.shape_148 },
            { t: this.shape_147 },
            { t: this.shape_146 },
            { t: this.shape_145 },
            { t: this.shape_144 },
            { t: this.shape_143 },
            { t: this.shape_142 },
            { t: this.shape_141 },
            { t: this.shape_140 },
            { t: this.shape_139 },
            { t: this.shape_138 },
            { t: this.shape_137 },
            { t: this.shape_136 },
            { t: this.shape_135 },
            { t: this.shape_134 },
            { t: this.shape_133 },
            { t: this.shape_132 },
            { t: this.shape_131 },
            { t: this.shape_130 },
            { t: this.shape_129 }
          ]
        })
        .wait(1)
    )
    this._renderFirstFrame()
  }).prototype = getMCSymbolPrototype(
    lib.ClipGroup_4,
    new cjs.Rectangle(178.6, 183.1, 364, 420.19999999999993),
    null
  )
  ;(lib.Approlesbg = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {})
    // Layer_1
    this.shape = new cjs.Shape()
    this.shape.graphics
      .f()
      .s('#1BC263')
      .ss(2)
      .p('AAA0TIxlKKIAAUTIRlKKIRmqKIAA0Tg')
    this.shape.setTransform(0.025, 0)
    this.shape_1 = new cjs.Shape()
    this.shape_1.graphics
      .f('#D1F3E0')
      .s()
      .p('AxlKKIAA0TIRlqKIRmKKIAAUTIxmKKg')
    this.shape_1.setTransform(0.025, 0)
    this.timeline.addTween(
      cjs.Tween.get({})
        .to({ state: [{ t: this.shape_1 }, { t: this.shape }] })
        .wait(1)
    )
    this._renderFirstFrame()
  }).prototype = p = new cjs.MovieClip()
  p.nominalBounds = new cjs.Rectangle(-113.5, -131.1, 227.1, 262.2)
  ;(lib.AccessTEXT = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {})
    // Layer_1
    this.shape = new cjs.Shape()
    this.shape.graphics
      .f('#1BC263')
      .s()
      .p(
        'AgPAeQgHgDgEgIIAPgJQABAEAEADQADACAEAAQAEAAACgBQABgBAAAAQABAAAAgBQAAAAABgBQAAgBAAgBQAAgDgEAAIgHgDIgKgEQgFgCgDgDQgEgEAAgHQAAgGAEgFQADgFAGgCQAFgCAGgBQAIABAGADQAHADAEAIIgPAHQgBgDgDgBQgCgCgEAAQgCAAgCABQgBAAAAABQgBAAAAABQAAAAgBABQAAAAAAABQABADADABIAHADIAKADQAFADADACQAEAEAAAHQAAAIgEAEQgDAFgGACQgGADgHAAQgJAAgHgFg'
      )
    this.shape.setTransform(17.475, 1.2)
    this.shape_1 = new cjs.Shape()
    this.shape_1.graphics
      .f('#1BC263')
      .s()
      .p(
        'AgPAeQgHgDgEgIIAPgJQABAEAEADQADACAEAAQAEAAACgBQABgBAAAAQABAAAAgBQAAAAABgBQAAgBAAgBQAAgDgEAAIgHgDIgKgEQgFgCgDgDQgEgEAAgHQAAgGAEgFQADgFAGgCQAFgCAGgBQAIABAGADQAHADAEAIIgPAHQgBgDgDgBQgCgCgEAAQgCAAgCABQgBAAAAABQgBAAAAABQAAAAgBABQAAAAAAABQABADADABIAHADIAKADQAFADADACQAEAEAAAHQAAAIgEAEQgDAFgGACQgGADgHAAQgJAAgHgFg'
      )
    this.shape_1.setTransform(11.675, 1.2)
    this.shape_2 = new cjs.Shape()
    this.shape_2.graphics
      .f('#1BC263')
      .s()
      .p(
        'AgQAdQgIgEgFgHQgDgIAAgKQAAgJADgHQAFgIAHgEQAJgFAIgBQALABAGAFQAIAEAEAIQAEAHABAJIAAADIgBAEIgwAAQACAHAEACQAGADAFAAQAFAAAEgBQADgDACgDIAOAIQgEAHgIADQgGAFgKAAQgKgBgIgFgAAQgFQgBgHgFgDQgEgEgGABQgFAAgFADQgEADgCAHIAgAAIAAAAg'
      )
    this.shape_2.setTransform(5.2, 1.2)
    this.shape_3 = new cjs.Shape()
    this.shape_3.graphics
      .f('#1BC263')
      .s()
      .p(
        'AgOAdQgIgEgEgHQgFgIAAgKQAAgJAFgHQAEgIAIgEQAHgFAJgBQAKABAIAFQAHAEAEAIIgOAIQgCgEgEgDQgEgCgFAAQgGABgFAEQgFAFAAAHQAAAIAFAEQAFAGAGAAQAFAAAEgCQAEgDACgEIAPAJQgFAHgHAEQgIAFgKABQgJgBgHgFg'
      )
    this.shape_3.setTransform(-1.675, 1.2)
    this.shape_4 = new cjs.Shape()
    this.shape_4.graphics
      .f('#1BC263')
      .s()
      .p(
        'AgOAdQgIgEgEgHQgFgIAAgKQAAgJAFgHQAEgIAIgEQAHgFAJgBQAKABAIAFQAHAEAEAIIgOAIQgCgEgEgDQgEgCgFAAQgGABgFAEQgFAFAAAHQAAAIAFAEQAFAGAGAAQAFAAAEgCQAEgDACgEIAPAJQgFAHgHAEQgIAFgKABQgJgBgHgFg'
      )
    this.shape_4.setTransform(-8.375, 1.2)
    this.shape_5 = new cjs.Shape()
    this.shape_5.graphics
      .f('#1BC263')
      .s()
      .p('AAXAtIgFgQIgjAAIgGAQIgTAAIAfhaIAWAAIAgBagAAMANIgMglIgMAlIAYAAg')
    this.shape_5.setTransform(-16.1, -0.1)
    this.timeline.addTween(
      cjs.Tween.get({})
        .to({
          state: [
            { t: this.shape_5 },
            { t: this.shape_4 },
            { t: this.shape_3 },
            { t: this.shape_2 },
            { t: this.shape_1 },
            { t: this.shape }
          ]
        })
        .wait(1)
    )
    this._renderFirstFrame()
  }).prototype = p = new cjs.MovieClip()
  p.nominalBounds = new cjs.Rectangle(-22.4, -9.8, 44.9, 19.700000000000003)
  ;(lib.AccessBG = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {})
    // Layer_1
    this.shape = new cjs.Shape()
    this.shape.graphics
      .f()
      .s('#1BC263')
      .ss(2)
      .p('AAA6eI27NQIAAaeIW7NPIW8tPIAA6eg')
    this.shape_1 = new cjs.Shape()
    this.shape_1.graphics
      .f('#E8F9EF')
      .s()
      .p('A27NQIAA6eIW7tQIW8NQIAAaeI28NPg')
    this.timeline.addTween(
      cjs.Tween.get({})
        .to({ state: [{ t: this.shape_1 }, { t: this.shape }] })
        .wait(1)
    )
    this._renderFirstFrame()
  }).prototype = p = new cjs.MovieClip()
  p.nominalBounds = new cjs.Rectangle(-147.8, -170.6, 295.6, 341.2)
  ;(lib.Symbol2 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {})
    // Layer_1
    this.instance = new lib.Symbol1('synched', 0)
    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1))
    this._renderFirstFrame()
  }).prototype = p = new cjs.MovieClip()
  p.nominalBounds = new cjs.Rectangle(-45.1, -52.1, 90.30000000000001, 104.2)
  ;(lib.Resourcebg = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {})
    // Layer_1
    this.instance = new lib.Highlevelbg('synched', 0)
    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1))
    this._renderFirstFrame()
  }).prototype = p = new cjs.MovieClip()
  p.nominalBounds = new cjs.Rectangle(-79.3, -91.6, 158.7, 183.2)
  ;(lib.IdentitySTRIPESBG = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {})
    // Layer_1
    this.instance = new lib.ClipGroup_4()
    this.instance.setTransform(15.75, -8.55, 1, 1, 0, 0, 0, 376.3, 384.6)
    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1))
    this._renderFirstFrame()
  }).prototype = p = new cjs.MovieClip()
  p.nominalBounds = new cjs.Rectangle(-360.8, -393.2, 753, 769.4)
  ;(lib.Highlevelstripesbg = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {})
    // Layer_1
    this.instance = new lib.ClipGroup_1()
    this.instance.setTransform(6.8, -4, 1, 1, 0, 0, 0, 163, 166.7)
    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1))
    this._renderFirstFrame()
  }).prototype = p = new cjs.MovieClip()
  p.nominalBounds = new cjs.Rectangle(-156.4, -170.7, 326.5, 333.5)
  ;(lib.Approlesstripesbg = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {})
    // Layer_1
    this.instance = new lib.ClipGroup_2()
    this.instance.setTransform(9.8, -5.75, 1, 1, 0, 0, 0, 234.1, 239.3)
    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1))
    this._renderFirstFrame()
  }).prototype = p = new cjs.MovieClip()
  p.nominalBounds = new cjs.Rectangle(-224.5, -245.1, 468.7, 478.79999999999995)
  ;(lib.AccessSTRIPESBG = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {})
    // Layer_1
    this.instance = new lib.ClipGroup_3()
    this.instance.setTransform(12.8, -7.45, 1, 1, 0, 0, 0, 305.2, 311.9)
    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1))
    this._renderFirstFrame()
  }).prototype = p = new cjs.MovieClip()
  p.nominalBounds = new cjs.Rectangle(-292.6, -319.4, 610.8, 624)
  ;(lib._5 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {})
    // Layer_1_copy_copy (mask)
    var mask = new cjs.Shape()
    mask._off = true
    var mask_graphics_59 = new cjs.Graphics().p('AgXBcIAAi3IAvAAIAAC3g')
    var mask_graphics_60 = new cjs.Graphics().p('AgpBcIAAi3IBTAAIAAC3g')
    var mask_graphics_61 = new cjs.Graphics().p('Ag8BcIAAi3IB5AAIAAC3g')
    var mask_graphics_62 = new cjs.Graphics().p('AhOBcIAAi3ICdAAIAAC3g')
    var mask_graphics_63 = new cjs.Graphics().p('AhhBcIAAi3IDDAAIAAC3g')
    var mask_graphics_64 = new cjs.Graphics().p('AhzBcIAAi3IDnAAIAAC3g')
    var mask_graphics_65 = new cjs.Graphics().p('AiGBcIAAi3IENAAIAAC3g')
    var mask_graphics_66 = new cjs.Graphics().p('AiYBcIAAi3IExAAIAAC3g')
    var mask_graphics_67 = new cjs.Graphics().p('AirBcIAAi3IFXAAIAAC3g')
    var mask_graphics_68 = new cjs.Graphics().p('Ai9BcIAAi3IF7AAIAAC3g')
    var mask_graphics_69 = new cjs.Graphics().p('AjQBcIAAi3IGhAAIAAC3g')
    var mask_graphics_70 = new cjs.Graphics().p('AjiBcIAAi3IHFAAIAAC3g')
    var mask_graphics_71 = new cjs.Graphics().p('Aj1BcIAAi3IHrAAIAAC3g')
    var mask_graphics_72 = new cjs.Graphics().p('AkHBcIAAi3IIPAAIAAC3g')
    var mask_graphics_73 = new cjs.Graphics().p('AkaBcIAAi3II1AAIAAC3g')
    var mask_graphics_74 = new cjs.Graphics().p('AksBcIAAi3IJZAAIAAC3g')
    var mask_graphics_75 = new cjs.Graphics().p('Ak/BcIAAi3IJ/AAIAAC3g')
    var mask_graphics_76 = new cjs.Graphics().p('AlRBcIAAi3IKjAAIAAC3g')
    var mask_graphics_77 = new cjs.Graphics().p('AlkBcIAAi3ILJAAIAAC3g')
    var mask_graphics_78 = new cjs.Graphics().p('Al2BcIAAi3ILtAAIAAC3g')
    var mask_graphics_79 = new cjs.Graphics().p('AmJBcIAAi3IMTAAIAAC3g')
    this.timeline.addTween(
      cjs.Tween.get(mask)
        .to({ graphics: null, x: 0, y: 0 })
        .wait(59)
        .to({ graphics: mask_graphics_59, x: -30.075, y: 13.875 })
        .wait(1)
        .to({ graphics: mask_graphics_60, x: -28.225, y: 13.825 })
        .wait(1)
        .to({ graphics: mask_graphics_61, x: -26.375, y: 13.775 })
        .wait(1)
        .to({ graphics: mask_graphics_62, x: -24.525, y: 13.725 })
        .wait(1)
        .to({ graphics: mask_graphics_63, x: -22.675, y: 13.675 })
        .wait(1)
        .to({ graphics: mask_graphics_64, x: -20.825, y: 13.625 })
        .wait(1)
        .to({ graphics: mask_graphics_65, x: -19.025, y: 13.575 })
        .wait(1)
        .to({ graphics: mask_graphics_66, x: -17.175, y: 13.525 })
        .wait(1)
        .to({ graphics: mask_graphics_67, x: -15.325, y: 13.475 })
        .wait(1)
        .to({ graphics: mask_graphics_68, x: -13.475, y: 13.425 })
        .wait(1)
        .to({ graphics: mask_graphics_69, x: -11.625, y: 13.375 })
        .wait(1)
        .to({ graphics: mask_graphics_70, x: -9.775, y: 13.325 })
        .wait(1)
        .to({ graphics: mask_graphics_71, x: -7.925, y: 13.275 })
        .wait(1)
        .to({ graphics: mask_graphics_72, x: -6.075, y: 13.225 })
        .wait(1)
        .to({ graphics: mask_graphics_73, x: -4.225, y: 13.175 })
        .wait(1)
        .to({ graphics: mask_graphics_74, x: -2.375, y: 13.125 })
        .wait(1)
        .to({ graphics: mask_graphics_75, x: -0.575, y: 13.075 })
        .wait(1)
        .to({ graphics: mask_graphics_76, x: 1.275, y: 13.025 })
        .wait(1)
        .to({ graphics: mask_graphics_77, x: 3.125, y: 12.975 })
        .wait(1)
        .to({ graphics: mask_graphics_78, x: 4.975, y: 12.925 })
        .wait(1)
        .to({ graphics: mask_graphics_79, x: 6.825, y: 12.875 })
        .wait(1)
    )
    // Resource_text_copy_copy
    this.instance = new lib.Resourcetext('synched', 0)
    this.instance.setTransform(8.1, -2.4)
    this.instance._off = true
    var maskedShapeInstanceList = [this.instance]
    for (
      var shapedInstanceItr = 0;
      shapedInstanceItr < maskedShapeInstanceList.length;
      shapedInstanceItr++
    ) {
      maskedShapeInstanceList[shapedInstanceItr].mask = mask
    }
    this.timeline.addTween(
      cjs.Tween.get(this.instance)
        .wait(59)
        .to({ _off: false }, 0)
        .wait(21)
    )
    // Layer_1_copy (mask)
    var mask_1 = new cjs.Shape()
    mask_1._off = true
    var mask_1_graphics_39 = new cjs.Graphics().p('AgXBcIAAi3IAvAAIAAC3g')
    var mask_1_graphics_40 = new cjs.Graphics().p('AgmBcIAAi3IBNAAIAAC3g')
    var mask_1_graphics_41 = new cjs.Graphics().p('Ag2BcIAAi3IBtAAIAAC3g')
    var mask_1_graphics_42 = new cjs.Graphics().p('AhFBcIAAi3ICLAAIAAC3g')
    var mask_1_graphics_43 = new cjs.Graphics().p('AhUBcIAAi3ICpAAIAAC3g')
    var mask_1_graphics_44 = new cjs.Graphics().p('AhkBcIAAi3IDJAAIAAC3g')
    var mask_1_graphics_45 = new cjs.Graphics().p('AhzBcIAAi3IDnAAIAAC3g')
    var mask_1_graphics_46 = new cjs.Graphics().p('AiCBcIAAi3IEFAAIAAC3g')
    var mask_1_graphics_47 = new cjs.Graphics().p('AiSBcIAAi3IElAAIAAC3g')
    var mask_1_graphics_48 = new cjs.Graphics().p('AihBcIAAi3IFDAAIAAC3g')
    var mask_1_graphics_49 = new cjs.Graphics().p('AixBcIAAi3IFjAAIAAC3g')
    var mask_1_graphics_50 = new cjs.Graphics().p('AjABcIAAi3IGBAAIAAC3g')
    var mask_1_graphics_51 = new cjs.Graphics().p('AjPBcIAAi3IGfAAIAAC3g')
    var mask_1_graphics_52 = new cjs.Graphics().p('AjfBcIAAi3IG/AAIAAC3g')
    var mask_1_graphics_53 = new cjs.Graphics().p('AjuBcIAAi3IHdAAIAAC3g')
    var mask_1_graphics_54 = new cjs.Graphics().p('Aj9BcIAAi3IH7AAIAAC3g')
    var mask_1_graphics_55 = new cjs.Graphics().p('AkNBcIAAi3IIbAAIAAC3g')
    var mask_1_graphics_56 = new cjs.Graphics().p('AkcBcIAAi3II5AAIAAC3g')
    var mask_1_graphics_57 = new cjs.Graphics().p('AkrBcIAAi3IJYAAIAAC3g')
    var mask_1_graphics_58 = new cjs.Graphics().p('Ak7BcIAAi3IJ3AAIAAC3g')
    var mask_1_graphics_59 = new cjs.Graphics().p('AlKBcIAAi3IKVAAIAAC3g')
    this.timeline.addTween(
      cjs.Tween.get(mask_1)
        .to({ graphics: null, x: 0, y: 0 })
        .wait(39)
        .to({ graphics: mask_1_graphics_39, x: -30.075, y: -2.625 })
        .wait(1)
        .to({ graphics: mask_1_graphics_40, x: -28.55, y: -2.575 })
        .wait(1)
        .to({ graphics: mask_1_graphics_41, x: -27, y: -2.575 })
        .wait(1)
        .to({ graphics: mask_1_graphics_42, x: -25.475, y: -2.575 })
        .wait(1)
        .to({ graphics: mask_1_graphics_43, x: -23.925, y: -2.525 })
        .wait(1)
        .to({ graphics: mask_1_graphics_44, x: -22.4, y: -2.475 })
        .wait(1)
        .to({ graphics: mask_1_graphics_45, x: -20.85, y: -2.475 })
        .wait(1)
        .to({ graphics: mask_1_graphics_46, x: -19.325, y: -2.425 })
        .wait(1)
        .to({ graphics: mask_1_graphics_47, x: -17.775, y: -2.425 })
        .wait(1)
        .to({ graphics: mask_1_graphics_48, x: -16.25, y: -2.425 })
        .wait(1)
        .to({ graphics: mask_1_graphics_49, x: -14.7, y: -2.375 })
        .wait(1)
        .to({ graphics: mask_1_graphics_50, x: -13.2, y: -2.325 })
        .wait(1)
        .to({ graphics: mask_1_graphics_51, x: -11.675, y: -2.325 })
        .wait(1)
        .to({ graphics: mask_1_graphics_52, x: -10.125, y: -2.325 })
        .wait(1)
        .to({ graphics: mask_1_graphics_53, x: -8.6, y: -2.275 })
        .wait(1)
        .to({ graphics: mask_1_graphics_54, x: -7.05, y: -2.225 })
        .wait(1)
        .to({ graphics: mask_1_graphics_55, x: -5.525, y: -2.225 })
        .wait(1)
        .to({ graphics: mask_1_graphics_56, x: -3.975, y: -2.175 })
        .wait(1)
        .to({ graphics: mask_1_graphics_57, x: -2.45, y: -2.175 })
        .wait(1)
        .to({ graphics: mask_1_graphics_58, x: -0.9, y: -2.175 })
        .wait(1)
        .to({ graphics: mask_1_graphics_59, x: 0.625, y: -2.125 })
        .wait(21)
    )
    // Resource_text_copy
    this.instance_1 = new lib.Resourcetext('synched', 0)
    this.instance_1.setTransform(8.1, -2.4)
    this.instance_1._off = true
    var maskedShapeInstanceList = [this.instance_1]
    for (
      var shapedInstanceItr = 0;
      shapedInstanceItr < maskedShapeInstanceList.length;
      shapedInstanceItr++
    ) {
      maskedShapeInstanceList[shapedInstanceItr].mask = mask_1
    }
    this.timeline.addTween(
      cjs.Tween.get(this.instance_1)
        .wait(39)
        .to({ _off: false }, 0)
        .wait(41)
    )
    // Layer_1 (mask)
    var mask_2 = new cjs.Shape()
    mask_2._off = true
    var mask_2_graphics_19 = new cjs.Graphics().p('AgXBcIAAi3IAvAAIAAC3g')
    var mask_2_graphics_20 = new cjs.Graphics().p('AgmBcIAAi3IBNAAIAAC3g')
    var mask_2_graphics_21 = new cjs.Graphics().p('Ag2BcIAAi3IBtAAIAAC3g')
    var mask_2_graphics_22 = new cjs.Graphics().p('AhFBcIAAi3ICLAAIAAC3g')
    var mask_2_graphics_23 = new cjs.Graphics().p('AhUBcIAAi3ICpAAIAAC3g')
    var mask_2_graphics_24 = new cjs.Graphics().p('AhkBcIAAi3IDJAAIAAC3g')
    var mask_2_graphics_25 = new cjs.Graphics().p('AhzBcIAAi3IDnAAIAAC3g')
    var mask_2_graphics_26 = new cjs.Graphics().p('AiCBcIAAi3IEFAAIAAC3g')
    var mask_2_graphics_27 = new cjs.Graphics().p('AiSBcIAAi3IElAAIAAC3g')
    var mask_2_graphics_28 = new cjs.Graphics().p('AihBcIAAi3IFDAAIAAC3g')
    var mask_2_graphics_29 = new cjs.Graphics().p('AixBcIAAi3IFjAAIAAC3g')
    var mask_2_graphics_30 = new cjs.Graphics().p('AjABcIAAi3IGBAAIAAC3g')
    var mask_2_graphics_31 = new cjs.Graphics().p('AjPBcIAAi3IGfAAIAAC3g')
    var mask_2_graphics_32 = new cjs.Graphics().p('AjfBcIAAi3IG/AAIAAC3g')
    var mask_2_graphics_33 = new cjs.Graphics().p('AjuBcIAAi3IHdAAIAAC3g')
    var mask_2_graphics_34 = new cjs.Graphics().p('Aj9BcIAAi3IH7AAIAAC3g')
    var mask_2_graphics_35 = new cjs.Graphics().p('AkNBcIAAi3IIbAAIAAC3g')
    var mask_2_graphics_36 = new cjs.Graphics().p('AkcBcIAAi3II5AAIAAC3g')
    var mask_2_graphics_37 = new cjs.Graphics().p('AkrBcIAAi3IJYAAIAAC3g')
    var mask_2_graphics_38 = new cjs.Graphics().p('Ak7BcIAAi3IJ3AAIAAC3g')
    var mask_2_graphics_39 = new cjs.Graphics().p('AlKBcIAAi3IKVAAIAAC3g')
    this.timeline.addTween(
      cjs.Tween.get(mask_2)
        .to({ graphics: null, x: 0, y: 0 })
        .wait(19)
        .to({ graphics: mask_2_graphics_19, x: -30.075, y: -20.125 })
        .wait(1)
        .to({ graphics: mask_2_graphics_20, x: -28.55, y: -20.125 })
        .wait(1)
        .to({ graphics: mask_2_graphics_21, x: -27, y: -20.125 })
        .wait(1)
        .to({ graphics: mask_2_graphics_22, x: -25.475, y: -20.125 })
        .wait(1)
        .to({ graphics: mask_2_graphics_23, x: -23.925, y: -20.125 })
        .wait(1)
        .to({ graphics: mask_2_graphics_24, x: -22.4, y: -20.125 })
        .wait(1)
        .to({ graphics: mask_2_graphics_25, x: -20.85, y: -20.125 })
        .wait(1)
        .to({ graphics: mask_2_graphics_26, x: -19.325, y: -20.125 })
        .wait(1)
        .to({ graphics: mask_2_graphics_27, x: -17.775, y: -20.125 })
        .wait(1)
        .to({ graphics: mask_2_graphics_28, x: -16.25, y: -20.125 })
        .wait(1)
        .to({ graphics: mask_2_graphics_29, x: -14.7, y: -20.125 })
        .wait(1)
        .to({ graphics: mask_2_graphics_30, x: -13.2, y: -20.125 })
        .wait(1)
        .to({ graphics: mask_2_graphics_31, x: -11.675, y: -20.125 })
        .wait(1)
        .to({ graphics: mask_2_graphics_32, x: -10.125, y: -20.125 })
        .wait(1)
        .to({ graphics: mask_2_graphics_33, x: -8.6, y: -20.125 })
        .wait(1)
        .to({ graphics: mask_2_graphics_34, x: -7.05, y: -20.125 })
        .wait(1)
        .to({ graphics: mask_2_graphics_35, x: -5.525, y: -20.125 })
        .wait(1)
        .to({ graphics: mask_2_graphics_36, x: -3.975, y: -20.125 })
        .wait(1)
        .to({ graphics: mask_2_graphics_37, x: -2.45, y: -20.125 })
        .wait(1)
        .to({ graphics: mask_2_graphics_38, x: -0.9, y: -20.125 })
        .wait(1)
        .to({ graphics: mask_2_graphics_39, x: 0.625, y: -20.125 })
        .wait(41)
    )
    // Resource_text
    this.instance_2 = new lib.Resourcetext('synched', 0)
    this.instance_2.setTransform(8.1, -2.4)
    this.instance_2._off = true
    var maskedShapeInstanceList = [this.instance_2]
    for (
      var shapedInstanceItr = 0;
      shapedInstanceItr < maskedShapeInstanceList.length;
      shapedInstanceItr++
    ) {
      maskedShapeInstanceList[shapedInstanceItr].mask = mask_2
    }
    this.timeline.addTween(
      cjs.Tween.get(this.instance_2)
        .wait(19)
        .to({ _off: false }, 0)
        .wait(61)
    )
    // Layer_3
    this.instance_3 = new lib.Symbol2('synched', 0)
    this.instance_3.setTransform(-4, 2.5)
    this.timeline.addTween(
      cjs.Tween.get(this.instance_3)
        .to({ x: 4, y: -2.5 }, 19)
        .wait(61)
    )
    // _Clip_Group_
    this.instance_4 = new lib.ClipGroup()
    this.instance_4.setTransform(-0.1, 0.25, 1, 1, 0, 0, 0, 92, 94.1)
    this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(80))
    this._renderFirstFrame()
  }).prototype = p = new cjs.MovieClip()
  p.nominalBounds = new cjs.Rectangle(-92.3, -93.9, 184.39999999999998, 188.4)
  ;(lib._3 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {})
    // Layer_1 (mask)
    var mask = new cjs.Shape()
    mask._off = true
    var mask_graphics_14 = new cjs.Graphics().p('AgWCRIAAkhIAsAAIAAEhg')
    var mask_graphics_15 = new cjs.Graphics().p('AgrCRIAAkhIBXAAIAAEhg')
    var mask_graphics_16 = new cjs.Graphics().p('AhACRIAAkhICBAAIAAEhg')
    var mask_graphics_17 = new cjs.Graphics().p('AhVCRIAAkhICrAAIAAEhg')
    var mask_graphics_18 = new cjs.Graphics().p('AhqCRIAAkhIDVAAIAAEhg')
    var mask_graphics_19 = new cjs.Graphics().p('Ah/CRIAAkhID/AAIAAEhg')
    var mask_graphics_20 = new cjs.Graphics().p('AiVCRIAAkhIEqAAIAAEhg')
    var mask_graphics_21 = new cjs.Graphics().p('AiqCRIAAkhIFUAAIAAEhg')
    var mask_graphics_22 = new cjs.Graphics().p('Ai/CRIAAkhIF/AAIAAEhg')
    var mask_graphics_23 = new cjs.Graphics().p('AjUCRIAAkhIGpAAIAAEhg')
    var mask_graphics_24 = new cjs.Graphics().p('AjpCRIAAkhIHTAAIAAEhg')
    var mask_graphics_25 = new cjs.Graphics().p('Aj+CRIAAkhIH9AAIAAEhg')
    var mask_graphics_26 = new cjs.Graphics().p('AkTCRIAAkhIInAAIAAEhg')
    var mask_graphics_27 = new cjs.Graphics().p('AkpCRIAAkhIJTAAIAAEhg')
    var mask_graphics_28 = new cjs.Graphics().p('Ak+CRIAAkhIJ9AAIAAEhg')
    var mask_graphics_29 = new cjs.Graphics().p('AlTCRIAAkhIKnAAIAAEhg')
    this.timeline.addTween(
      cjs.Tween.get(mask)
        .to({ graphics: null, x: 0, y: 0 })
        .wait(14)
        .to({ graphics: mask_graphics_14, x: -99.25, y: -51.95 })
        .wait(1)
        .to({ graphics: mask_graphics_15, x: -97.125, y: -51.95 })
        .wait(1)
        .to({ graphics: mask_graphics_16, x: -95.025, y: -51.95 })
        .wait(1)
        .to({ graphics: mask_graphics_17, x: -92.9, y: -51.95 })
        .wait(1)
        .to({ graphics: mask_graphics_18, x: -90.8, y: -51.95 })
        .wait(1)
        .to({ graphics: mask_graphics_19, x: -88.675, y: -51.95 })
        .wait(1)
        .to({ graphics: mask_graphics_20, x: -86.55, y: -51.95 })
        .wait(1)
        .to({ graphics: mask_graphics_21, x: -84.45, y: -51.95 })
        .wait(1)
        .to({ graphics: mask_graphics_22, x: -82.35, y: -51.95 })
        .wait(1)
        .to({ graphics: mask_graphics_23, x: -80.25, y: -51.95 })
        .wait(1)
        .to({ graphics: mask_graphics_24, x: -78.125, y: -51.95 })
        .wait(1)
        .to({ graphics: mask_graphics_25, x: -76, y: -51.95 })
        .wait(1)
        .to({ graphics: mask_graphics_26, x: -73.9, y: -51.95 })
        .wait(1)
        .to({ graphics: mask_graphics_27, x: -71.775, y: -51.95 })
        .wait(1)
        .to({ graphics: mask_graphics_28, x: -69.675, y: -51.95 })
        .wait(1)
        .to({ graphics: mask_graphics_29, x: -67.55, y: -51.95 })
        .wait(1)
    )
    // v_text
    this.instance = new lib.vtext('synched', 0)
    this.instance.setTransform(-66.75, -55.85)
    this.instance._off = true
    var maskedShapeInstanceList = [this.instance]
    for (
      var shapedInstanceItr = 0;
      shapedInstanceItr < maskedShapeInstanceList.length;
      shapedInstanceItr++
    ) {
      maskedShapeInstanceList[shapedInstanceItr].mask = mask
    }
    this.timeline.addTween(
      cjs.Tween.get(this.instance)
        .wait(14)
        .to({ _off: false }, 0)
        .wait(16)
    )
    // App_roles_bg
    this.instance_1 = new lib.Approlesbg('synched', 0)
    this.instance_1.setTransform(-5, 3)
    this.timeline.addTween(
      cjs.Tween.get(this.instance_1)
        .to({ x: 5, y: -3 }, 14)
        .wait(16)
    )
    // App_roles_stripes_bg
    this.instance_2 = new lib.Approlesstripesbg('synched', 0)
    this.instance_2.setTransform(4.8, -2.7, 1, 1, 0, 0, 0, 9.8, -5.7)
    this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(30))
    this._renderFirstFrame()
  }).prototype = p = new cjs.MovieClip()
  p.nominalBounds = new cjs.Rectangle(-118.5, -134.1, 237.1, 268.29999999999995)
  ;(lib._2 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {})
    // Layer_1 (mask)
    var mask = new cjs.Shape()
    mask._off = true
    var mask_graphics_15 = new cjs.Graphics().p('AgeBiIAAjDIA9AAIAADDg')
    var mask_graphics_16 = new cjs.Graphics().p('AgwBiIAAjDIBgAAIAADDg')
    var mask_graphics_17 = new cjs.Graphics().p('AhBBiIAAjDICDAAIAADDg')
    var mask_graphics_18 = new cjs.Graphics().p('AhSBiIAAjDIClAAIAADDg')
    var mask_graphics_19 = new cjs.Graphics().p('AhjBiIAAjDIDHAAIAADDg')
    var mask_graphics_20 = new cjs.Graphics().p('Ah0BiIAAjDIDpAAIAADDg')
    var mask_graphics_21 = new cjs.Graphics().p('AiGBiIAAjDIEMAAIAADDg')
    var mask_graphics_22 = new cjs.Graphics().p('AiXBiIAAjDIEvAAIAADDg')
    var mask_graphics_23 = new cjs.Graphics().p('AioBiIAAjDIFRAAIAADDg')
    var mask_graphics_24 = new cjs.Graphics().p('Ai5BiIAAjDIFzAAIAADDg')
    var mask_graphics_25 = new cjs.Graphics().p('AjKBiIAAjDIGVAAIAADDg')
    var mask_graphics_26 = new cjs.Graphics().p('AjbBiIAAjDIG3AAIAADDg')
    var mask_graphics_27 = new cjs.Graphics().p('AjtBiIAAjDIHaAAIAADDg')
    var mask_graphics_28 = new cjs.Graphics().p('Aj+BiIAAjDIH9AAIAADDg')
    var mask_graphics_29 = new cjs.Graphics().p('AkPBiIAAjDIIfAAIAADDg')
    var mask_graphics_30 = new cjs.Graphics().p('AkgBiIAAjDIJBAAIAADDg')
    var mask_graphics_31 = new cjs.Graphics().p('AkxBiIAAjDIJjAAIAADDg')
    this.timeline.addTween(
      cjs.Tween.get(mask)
        .to({ graphics: null, x: 0, y: 0 })
        .wait(15)
        .to({ graphics: mask_graphics_15, x: -130.325, y: -75.6 })
        .wait(1)
        .to({ graphics: mask_graphics_16, x: -128.6, y: -75.6 })
        .wait(1)
        .to({ graphics: mask_graphics_17, x: -126.875, y: -75.6 })
        .wait(1)
        .to({ graphics: mask_graphics_18, x: -125.175, y: -75.6 })
        .wait(1)
        .to({ graphics: mask_graphics_19, x: -123.45, y: -75.6 })
        .wait(1)
        .to({ graphics: mask_graphics_20, x: -121.725, y: -75.6 })
        .wait(1)
        .to({ graphics: mask_graphics_21, x: -120, y: -75.6 })
        .wait(1)
        .to({ graphics: mask_graphics_22, x: -118.3, y: -75.6 })
        .wait(1)
        .to({ graphics: mask_graphics_23, x: -116.575, y: -75.6 })
        .wait(1)
        .to({ graphics: mask_graphics_24, x: -114.85, y: -75.6 })
        .wait(1)
        .to({ graphics: mask_graphics_25, x: -113.125, y: -75.6 })
        .wait(1)
        .to({ graphics: mask_graphics_26, x: -111.425, y: -75.6 })
        .wait(1)
        .to({ graphics: mask_graphics_27, x: -109.7, y: -75.6 })
        .wait(1)
        .to({ graphics: mask_graphics_28, x: -107.975, y: -75.6 })
        .wait(1)
        .to({ graphics: mask_graphics_29, x: -106.25, y: -75.6 })
        .wait(1)
        .to({ graphics: mask_graphics_30, x: -104.55, y: -75.6 })
        .wait(1)
        .to({ graphics: mask_graphics_31, x: -102.825, y: -75.6 })
        .wait(1)
    )
    // Access_TEXT
    this.instance = new lib.AccessTEXT('synched', 0)
    this.instance.setTransform(-104.75, -75.6)
    this.instance._off = true
    var maskedShapeInstanceList = [this.instance]
    for (
      var shapedInstanceItr = 0;
      shapedInstanceItr < maskedShapeInstanceList.length;
      shapedInstanceItr++
    ) {
      maskedShapeInstanceList[shapedInstanceItr].mask = mask
    }
    this.timeline.addTween(
      cjs.Tween.get(this.instance)
        .wait(15)
        .to({ _off: false }, 0)
        .wait(17)
    )
    // Access_BG
    this.instance_1 = new lib.AccessBG('synched', 0)
    this.instance_1.setTransform(-8, 4.5)
    this.timeline.addTween(
      cjs.Tween.get(this.instance_1)
        .to({ x: 8, y: -4.5 }, 15)
        .wait(17)
    )
    // Access_STRIPES_BG
    this.instance_2 = new lib.AccessSTRIPESBG('synched', 0)
    this.instance_2.setTransform(4.8, -3, 1, 1, 0, 0, 0, 12.8, -7.5)
    this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(32))
    this._renderFirstFrame()
  }).prototype = p = new cjs.MovieClip()
  p.nominalBounds = new cjs.Rectangle(-155.8, -175.1, 311.6, 350.29999999999995)
  ;(lib._1 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {})
    // Layer_1_copy (mask)
    var mask = new cjs.Shape()
    mask._off = true
    var mask_graphics_26 = new cjs.Graphics().p('AggBSIAAijIBAAAIAACjg')
    var mask_graphics_27 = new cjs.Graphics().p('Ag5BTIAAilIBzAAIAAClg')
    var mask_graphics_28 = new cjs.Graphics().p('AhTBSIAAijICnAAIAACjg')
    var mask_graphics_29 = new cjs.Graphics().p('AhsBTIAAilIDZAAIAAClg')
    var mask_graphics_30 = new cjs.Graphics().p('AiFBSIAAijIELAAIAACjg')
    var mask_graphics_31 = new cjs.Graphics().p('AifBTIAAilIE/AAIAAClg')
    var mask_graphics_32 = new cjs.Graphics().p('Ai4BTIAAilIFxAAIAAClg')
    var mask_graphics_33 = new cjs.Graphics().p('AjSBSIAAikIGlAAIAACkg')
    var mask_graphics_34 = new cjs.Graphics().p('AjrBTIAAikIHXAAIAACkg')
    var mask_graphics_35 = new cjs.Graphics().p('AkFBSIAAikIIKAAIAACkg')
    var mask_graphics_36 = new cjs.Graphics().p('AkeBSIAAijII9AAIAACjg')
    var mask_graphics_37 = new cjs.Graphics().p('As9krIAAilIJxAAIAAClg')
    this.timeline.addTween(
      cjs.Tween.get(mask)
        .to({ graphics: null, x: 0, y: 0 })
        .wait(26)
        .to({ graphics: mask_graphics_26, x: -162.7, y: -85.2 })
        .wait(1)
        .to({ graphics: mask_graphics_27, x: -160.15, y: -85.15 })
        .wait(1)
        .to({ graphics: mask_graphics_28, x: -157.6, y: -85.1 })
        .wait(1)
        .to({ graphics: mask_graphics_29, x: -155.075, y: -85.05 })
        .wait(1)
        .to({ graphics: mask_graphics_30, x: -152.525, y: -85 })
        .wait(1)
        .to({ graphics: mask_graphics_31, x: -149.975, y: -84.95 })
        .wait(1)
        .to({ graphics: mask_graphics_32, x: -147.425, y: -84.95 })
        .wait(1)
        .to({ graphics: mask_graphics_33, x: -144.875, y: -84.9 })
        .wait(1)
        .to({ graphics: mask_graphics_34, x: -142.325, y: -84.85 })
        .wait(1)
        .to({ graphics: mask_graphics_35, x: -139.8, y: -84.8 })
        .wait(1)
        .to({ graphics: mask_graphics_36, x: -137.25, y: -84.75 })
        .wait(1)
        .to({ graphics: mask_graphics_37, x: -82.975, y: -46.475 })
        .wait(1)
    )
    // Identity_TEXT_copy
    this.instance = new lib.IdentityTEXT('synched', 0)
    this.instance.setTransform(-132.1, -93.9)
    this.instance._off = true
    var maskedShapeInstanceList = [this.instance]
    for (
      var shapedInstanceItr = 0;
      shapedInstanceItr < maskedShapeInstanceList.length;
      shapedInstanceItr++
    ) {
      maskedShapeInstanceList[shapedInstanceItr].mask = mask
    }
    this.timeline.addTween(
      cjs.Tween.get(this.instance)
        .wait(26)
        .to({ _off: false }, 0)
        .wait(12)
    )
    // Layer_1 (mask)
    var mask_1 = new cjs.Shape()
    mask_1._off = true
    var mask_1_graphics_15 = new cjs.Graphics().p('AggBTIAAilIBAAAIAAClg')
    var mask_1_graphics_16 = new cjs.Graphics().p('Ag5BTIAAilIBzAAIAAClg')
    var mask_1_graphics_17 = new cjs.Graphics().p('AhTBTIAAilICnAAIAAClg')
    var mask_1_graphics_18 = new cjs.Graphics().p('AhsBTIAAilIDZAAIAAClg')
    var mask_1_graphics_19 = new cjs.Graphics().p('AiFBTIAAilIELAAIAAClg')
    var mask_1_graphics_20 = new cjs.Graphics().p('AifBTIAAilIE/AAIAAClg')
    var mask_1_graphics_21 = new cjs.Graphics().p('Ai4BTIAAilIFxAAIAAClg')
    var mask_1_graphics_22 = new cjs.Graphics().p('AjSBTIAAilIGlAAIAAClg')
    var mask_1_graphics_23 = new cjs.Graphics().p('AjrBTIAAilIHXAAIAAClg')
    var mask_1_graphics_24 = new cjs.Graphics().p('AkFBTIAAilIIKAAIAAClg')
    var mask_1_graphics_25 = new cjs.Graphics().p('AkeBTIAAilII9AAIAAClg')
    var mask_1_graphics_26 = new cjs.Graphics().p('Ak4BTIAAilIJxAAIAAClg')
    this.timeline.addTween(
      cjs.Tween.get(mask_1)
        .to({ graphics: null, x: 0, y: 0 })
        .wait(15)
        .to({ graphics: mask_1_graphics_15, x: -162.7, y: -101.7 })
        .wait(1)
        .to({ graphics: mask_1_graphics_16, x: -160.15, y: -101.7 })
        .wait(1)
        .to({ graphics: mask_1_graphics_17, x: -157.6, y: -101.7 })
        .wait(1)
        .to({ graphics: mask_1_graphics_18, x: -155.075, y: -101.7 })
        .wait(1)
        .to({ graphics: mask_1_graphics_19, x: -152.525, y: -101.7 })
        .wait(1)
        .to({ graphics: mask_1_graphics_20, x: -149.975, y: -101.7 })
        .wait(1)
        .to({ graphics: mask_1_graphics_21, x: -147.425, y: -101.7 })
        .wait(1)
        .to({ graphics: mask_1_graphics_22, x: -144.875, y: -101.7 })
        .wait(1)
        .to({ graphics: mask_1_graphics_23, x: -142.325, y: -101.7 })
        .wait(1)
        .to({ graphics: mask_1_graphics_24, x: -139.8, y: -101.7 })
        .wait(1)
        .to({ graphics: mask_1_graphics_25, x: -137.25, y: -101.7 })
        .wait(1)
        .to({ graphics: mask_1_graphics_26, x: -134.7, y: -101.7 })
        .wait(12)
    )
    // Identity_TEXT
    this.instance_1 = new lib.IdentityTEXT('synched', 0)
    this.instance_1.setTransform(-132.1, -93.9)
    this.instance_1._off = true
    var maskedShapeInstanceList = [this.instance_1]
    for (
      var shapedInstanceItr = 0;
      shapedInstanceItr < maskedShapeInstanceList.length;
      shapedInstanceItr++
    ) {
      maskedShapeInstanceList[shapedInstanceItr].mask = mask_1
    }
    this.timeline.addTween(
      cjs.Tween.get(this.instance_1)
        .wait(15)
        .to({ _off: false }, 0)
        .wait(23)
    )
    // Identity_BG
    this.instance_2 = new lib.IdentityBG('synched', 0)
    this.instance_2.setTransform(-11.5, 7.15)
    this.timeline.addTween(
      cjs.Tween.get(this.instance_2)
        .to({ x: 11.5, y: -6.85 }, 15)
        .wait(23)
    )
    // Identity_STRIPES_BG
    this.instance_3 = new lib.IdentitySTRIPESBG('synched', 0)
    this.instance_3.setTransform(4.2, -1.8, 1, 1, 0, 0, 0, 15.7, -8.6)
    this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(38))
    this._renderFirstFrame()
  }).prototype = p = new cjs.MovieClip()
  p.nominalBounds = new cjs.Rectangle(-193.5, -216.9, 387, 434.20000000000005)
  ;(lib.Resourcestripesbg = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {})
    // Layer_1
    this.instance = new lib.Highlevelstripesbg('synched', 0)
    this.instance.setTransform(6.8, -4, 1, 1, 0, 0, 0, 6.8, -4)
    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1))
    this._renderFirstFrame()
  }).prototype = p = new cjs.MovieClip()
  p.nominalBounds = new cjs.Rectangle(-79.3, -91.6, 158.7, 183.2)
  ;(lib._4 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {})
    // Layer_1_copy (mask)
    var mask = new cjs.Shape()
    mask._off = true
    var mask_graphics_23 = new cjs.Graphics().p('AlYBEIAAjCIBFAAIAADCg')
    var mask_graphics_24 = new cjs.Graphics().p('Ag9BhIAAjCIB7AAIAADCg')
    var mask_graphics_25 = new cjs.Graphics().p('AhZBiIAAjDICzAAIAADDg')
    var mask_graphics_26 = new cjs.Graphics().p('Ah1BhIAAjBIDrAAIAADBg')
    var mask_graphics_27 = new cjs.Graphics().p('AiRBhIAAjBIEjAAIAADBg')
    var mask_graphics_28 = new cjs.Graphics().p('AitBhIAAjCIFbAAIAADCg')
    var mask_graphics_29 = new cjs.Graphics().p('AjJBhIAAjBIGTAAIAADBg')
    var mask_graphics_30 = new cjs.Graphics().p('AjlBhIAAjBIHLAAIAADBg')
    var mask_graphics_31 = new cjs.Graphics().p('AkBBhIAAjCIIDAAIAADCg')
    var mask_graphics_32 = new cjs.Graphics().p('AkdBiIAAjDII7AAIAADDg')
    var mask_graphics_33 = new cjs.Graphics().p('Ak5BiIAAjDIJzAAIAADDg')
    var mask_graphics_34 = new cjs.Graphics().p('AlVBhIAAjBIKrAAIAADBg')
    var mask_graphics_35 = new cjs.Graphics().p('AlxBiIAAjCILiAAIAADCg')
    this.timeline.addTween(
      cjs.Tween.get(mask)
        .to({ graphics: null, x: 0, y: 0 })
        .wait(23)
        .to({ graphics: mask_graphics_23, x: -34.5, y: -12.725 })
        .wait(1)
        .to({ graphics: mask_graphics_24, x: -61.975, y: -15.6 })
        .wait(1)
        .to({ graphics: mask_graphics_25, x: -58.375, y: -15.45 })
        .wait(1)
        .to({ graphics: mask_graphics_26, x: -54.825, y: -15.3 })
        .wait(1)
        .to({ graphics: mask_graphics_27, x: -51.225, y: -15.2 })
        .wait(1)
        .to({ graphics: mask_graphics_28, x: -47.65, y: -15.05 })
        .wait(1)
        .to({ graphics: mask_graphics_29, x: -44.05, y: -14.95 })
        .wait(1)
        .to({ graphics: mask_graphics_30, x: -40.5, y: -14.85 })
        .wait(1)
        .to({ graphics: mask_graphics_31, x: -36.925, y: -14.7 })
        .wait(1)
        .to({ graphics: mask_graphics_32, x: -33.325, y: -14.55 })
        .wait(1)
        .to({ graphics: mask_graphics_33, x: -29.775, y: -14.45 })
        .wait(1)
        .to({ graphics: mask_graphics_34, x: -26.175, y: -14.3 })
        .wait(1)
        .to({ graphics: mask_graphics_35, x: -22.6, y: -14.2 })
        .wait(1)
    )
    // High_level_text_copy
    this.instance = new lib.Highleveltext('synched', 0)
    this.instance.setTransform(-26.3, -24.45)
    this.instance._off = true
    var maskedShapeInstanceList = [this.instance]
    for (
      var shapedInstanceItr = 0;
      shapedInstanceItr < maskedShapeInstanceList.length;
      shapedInstanceItr++
    ) {
      maskedShapeInstanceList[shapedInstanceItr].mask = mask
    }
    this.timeline.addTween(
      cjs.Tween.get(this.instance)
        .wait(23)
        .to({ _off: false }, 0)
        .wait(13)
    )
    // Layer_1 (mask)
    var mask_1 = new cjs.Shape()
    mask_1._off = true
    var mask_1_graphics_11 = new cjs.Graphics().p('AgiBhIAAjBIBEAAIAADBg')
    var mask_1_graphics_12 = new cjs.Graphics().p('Ag+BhIAAjBIB8AAIAADBg')
    var mask_1_graphics_13 = new cjs.Graphics().p('AhZBhIAAjBICzAAIAADBg')
    var mask_1_graphics_14 = new cjs.Graphics().p('Ah1BhIAAjBIDrAAIAADBg')
    var mask_1_graphics_15 = new cjs.Graphics().p('AiRBhIAAjBIEjAAIAADBg')
    var mask_1_graphics_16 = new cjs.Graphics().p('AitBhIAAjBIFbAAIAADBg')
    var mask_1_graphics_17 = new cjs.Graphics().p('AjJBhIAAjBIGTAAIAADBg')
    var mask_1_graphics_18 = new cjs.Graphics().p('AjlBhIAAjBIHLAAIAADBg')
    var mask_1_graphics_19 = new cjs.Graphics().p('AkBBhIAAjBIIDAAIAADBg')
    var mask_1_graphics_20 = new cjs.Graphics().p('AkdBhIAAjBII7AAIAADBg')
    var mask_1_graphics_21 = new cjs.Graphics().p('Ak5BhIAAjBIJzAAIAADBg')
    var mask_1_graphics_22 = new cjs.Graphics().p('AlUBhIAAjBIKqAAIAADBg')
    var mask_1_graphics_23 = new cjs.Graphics().p('AlwBhIAAjBILiAAIAADBg')
    this.timeline.addTween(
      cjs.Tween.get(mask_1)
        .to({ graphics: null, x: 0, y: 0 })
        .wait(11)
        .to({ graphics: mask_1_graphics_11, x: -65.55, y: -34.2 })
        .wait(1)
        .to({ graphics: mask_1_graphics_12, x: -62.75, y: -34.2 })
        .wait(1)
        .to({ graphics: mask_1_graphics_13, x: -59.975, y: -34.2 })
        .wait(1)
        .to({ graphics: mask_1_graphics_14, x: -57.175, y: -34.2 })
        .wait(1)
        .to({ graphics: mask_1_graphics_15, x: -54.4, y: -34.2 })
        .wait(1)
        .to({ graphics: mask_1_graphics_16, x: -51.6, y: -34.2 })
        .wait(1)
        .to({ graphics: mask_1_graphics_17, x: -48.8, y: -34.2 })
        .wait(1)
        .to({ graphics: mask_1_graphics_18, x: -46.05, y: -34.2 })
        .wait(1)
        .to({ graphics: mask_1_graphics_19, x: -43.25, y: -34.2 })
        .wait(1)
        .to({ graphics: mask_1_graphics_20, x: -40.475, y: -34.2 })
        .wait(1)
        .to({ graphics: mask_1_graphics_21, x: -37.675, y: -34.2 })
        .wait(1)
        .to({ graphics: mask_1_graphics_22, x: -34.9, y: -34.2 })
        .wait(1)
        .to({ graphics: mask_1_graphics_23, x: -32.1, y: -34.2 })
        .wait(13)
    )
    // High_level_text
    this.instance_1 = new lib.Highleveltext('synched', 0)
    this.instance_1.setTransform(-26.3, -24.45)
    this.instance_1._off = true
    var maskedShapeInstanceList = [this.instance_1]
    for (
      var shapedInstanceItr = 0;
      shapedInstanceItr < maskedShapeInstanceList.length;
      shapedInstanceItr++
    ) {
      maskedShapeInstanceList[shapedInstanceItr].mask = mask_1
    }
    this.timeline.addTween(
      cjs.Tween.get(this.instance_1)
        .wait(11)
        .to({ _off: false }, 0)
        .wait(25)
    )
    // Resource_bg
    this.instance_2 = new lib.Resourcebg('synched', 0)
    this.instance_2.setTransform(-4, 2.5)
    this.timeline.addTween(
      cjs.Tween.get(this.instance_2)
        .to({ x: 4, y: -2.5 }, 11)
        .wait(25)
    )
    // Resource_stripes_bg
    this.instance_3 = new lib.Resourcestripesbg('synched', 0)
    this.instance_3.setTransform(2.8, -1.5, 1, 1, 0, 0, 0, 6.8, -4)
    this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(36))
    this._renderFirstFrame()
  }).prototype = p = new cjs.MovieClip()
  p.nominalBounds = new cjs.Rectangle(-83.3, -94.1, 166.7, 188.3)
  // stage content:
  ;(lib.deepvisibility = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {})
    this.actionFrames = [0]
    // timeline functions:
    this.frame_0 = function () {
      this.clearAllSoundStreams()
    }
    // actions tween:
    this.timeline.addTween(
      cjs.Tween.get(this)
        .call(this.frame_0)
        .wait(339)
    )
    // __TEXT
    this.instance = new lib._5('synched', 0, false)
    this.instance.setTransform(523.3, 268.15, 1, 1, 0, 0, 0, -0.1, 0.3)
    this.instance._off = true
    this.timeline.addTween(
      cjs.Tween.get(this.instance)
        .wait(149)
        .to({ _off: false }, 0)
        .wait(190)
    )
    // __TEXT
    this.instance_1 = new lib._4('synched', 0, false)
    this.instance_1.setTransform(457.45, 266.35, 1, 1, 0, 0, 0, 2.8, -1.5)
    this.instance_1._off = true
    this.timeline.addTween(
      cjs.Tween.get(this.instance_1)
        .wait(108)
        .to({ _off: false }, 0)
        .wait(231)
    )
    // __TEXT
    this.instance_2 = new lib._3('synched', 0, false)
    this.instance_2.setTransform(389.75, 265.65, 1, 1, 0, 0, 0, 4.8, -2.7)
    this.instance_2._off = true
    this.timeline.addTween(
      cjs.Tween.get(this.instance_2)
        .wait(73)
        .to({ _off: false }, 0)
        .wait(266)
    )
    // __TEXT
    this.instance_3 = new lib._2('synched', 0, false)
    this.instance_3.setTransform(318.05, 266.85, 1, 1, 0, 0, 0, 4.8, -3)
    this.instance_3._off = true
    this.timeline.addTween(
      cjs.Tween.get(this.instance_3)
        .wait(42)
        .to({ _off: false }, 0)
        .wait(297)
    )
    // _1TEXT
    this.instance_4 = new lib._1('synched', 0, false)
    this.instance_4.setTransform(245.25, 270.4, 1, 1, 0, 0, 0, 4.2, -1.8)
    this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(339))
    this._renderFirstFrame()
  }).prototype = p = new lib.AnMovieClip()
  p.nominalBounds = new cjs.Rectangle(351.6, 324.3, 221, 165.2)
  // library properties:
  lib.properties = {
    id: '7FA25BB1DCBDC940BF3DD6C3EDEC74FD',
    width: 608,
    height: 538,
    fps: 24,
    color: '#FFFFFF',
    opacity: 1.0,
    manifest: [],
    preloads: []
  }
  // bootstrap callback support:
  ;(lib.Stage = function (canvas) {
    createjs.Stage.call(this, canvas)
  }).prototype = p = new createjs.Stage()
  p.setAutoPlay = function (autoPlay) {
    this.tickEnabled = autoPlay
  }
  p.play = function () {
    this.tickEnabled = true
    this.getChildAt(0).gotoAndPlay(this.getTimelinePosition())
  }
  p.stop = function (ms) {
    if (ms) this.seek(ms)
    this.tickEnabled = false
  }
  p.seek = function (ms) {
    this.tickEnabled = true
    this.getChildAt(0).gotoAndStop((lib.properties.fps * ms) / 1000)
  }
  p.getDuration = function () {
    return (this.getChildAt(0).totalFrames / lib.properties.fps) * 1000
  }
  p.getTimelinePosition = function () {
    return (this.getChildAt(0).currentFrame / lib.properties.fps) * 1000
  }
  an.bootcompsLoaded = an.bootcompsLoaded || []
  if (!an.bootstrapListeners) {
    an.bootstrapListeners = []
  }
  an.bootstrapCallback = function (fnCallback) {
    an.bootstrapListeners.push(fnCallback)
    if (an.bootcompsLoaded.length > 0) {
      for (var i = 0; i < an.bootcompsLoaded.length; ++i) {
        fnCallback(an.bootcompsLoaded[i])
      }
    }
  }
  an.compositions = an.compositions || {}
  an.compositions['7FA25BB1DCBDC940BF3DD6C3EDEC74FD'] = {
    getStage: function () {
      return exportRoot.stage
    },
    getLibrary: function () {
      return lib
    },
    getSpriteSheet: function () {
      return ss
    },
    getImages: function () {
      return img
    }
  }
  an.compositionLoaded = function (id) {
    an.bootcompsLoaded.push(id)
    for (var j = 0; j < an.bootstrapListeners.length; j++) {
      an.bootstrapListeners[j](id)
    }
  }
  an.getComposition = function (id) {
    return an.compositions[id]
  }
  an.makeResponsive = function (
    isResp,
    respDim,
    isScale,
    scaleType,
    domContainers
  ) {
    var lastW,
      lastH,
      lastS = 1
    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()
    function resizeCanvas () {
      var w = lib.properties.width,
        h = lib.properties.height
      var iw = window.innerWidth,
        ih = window.innerHeight
      var pRatio = window.devicePixelRatio || 1,
        xRatio = iw / w,
        yRatio = ih / h,
        sRatio = 1
      if (isResp) {
        if (
          (respDim == 'width' && lastW == iw) ||
          (respDim == 'height' && lastH == ih)
        ) {
          sRatio = lastS
        } else if (!isScale) {
          if (iw < w || ih < h) sRatio = Math.min(xRatio, yRatio)
        } else if (scaleType == 1) {
          sRatio = Math.min(xRatio, yRatio)
        } else if (scaleType == 2) {
          sRatio = Math.max(xRatio, yRatio)
        }
      }
      domContainers[0].width = w * pRatio * sRatio
      domContainers[0].height = h * pRatio * sRatio
      domContainers.forEach(function (container) {
        container.style.width = w * sRatio + 'px'
        container.style.height = h * sRatio + 'px'
      })
      stage.scaleX = pRatio * sRatio
      stage.scaleY = pRatio * sRatio
      lastW = iw
      lastH = ih
      lastS = sRatio
      stage.tickOnUpdate = false
      stage.update()
      stage.tickOnUpdate = true
    }
  }
  an.handleSoundStreamOnTick = function (event) {
    if (!event.paused) {
      var stageChild = stage.getChildAt(0)
      if (!stageChild.paused) {
        stageChild.syncStreamSounds()
      }
    }
  }
})((createjs = createjs || {}), (AdobeAn = AdobeAn || {}))
var createjs, AdobeAn

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
