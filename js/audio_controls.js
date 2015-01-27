;(function(bindTo) {
  var AudioControls = function(el) {
    this.el = el;
    this.videoEl = el.querySelector('.video-frame');
    this.muteButton =  this.el.querySelector('.mute');
    this.volumeBar = this.el.querySelector('.volume-bar');
  };

  AudioControls.prototype.mute = function() {
    this.videoEl.muted = true;
    this.muteButton.innerHTML = '<img src="images/mute.gif">';
  };

  AudioControls.prototype.unmute = function() {
    this.videoEl.muted = false;
    this.muteButton.innerHTML = '<img src="images/unmute.gif">';
  };

  AudioControls.prototype.setVolume = function(value) {
    //this probably needs to be refactored, storing the same data in 2 places
    this.videoEl.volume = this.volumeBar; 
  };

  AudioControls.prototype.toggleMute = function() {
    this.videoEl.muted ? this.unmute() : this.mute();
  };

  //not sold on this yet
  bindTo.AudioControls = AudioControls;
})(window);
