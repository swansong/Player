;(function(bindTo) {
  var PlayerUtils = function(el) {
    this.el = el;
    this.videoEl = this.el.querySelector('.video-frame');
    this.duration = this.el.querySelector('.duration');
    this.seekBar = this.el.querySelector('.seek-bar');
    this.playButton = this.el.querySelector('.play-pause');
    this.current = this.el.querySelector('.current');
    this.audioControls = new bindTo.AudioControls(this.el);
    this.video = new bindTo.Video(this.videoEl);
  };

  PlayerUtils.prototype.pause = function() {
    this.videoEl.pause();
  };

  PlayerUtils.prototype.play = function() {
    this.videoEl.play();
  };

  PlayerUtils.prototype.generateTimestamp = function(timestamp) {
    var totalSec = timestamp,
        hours = parseInt(totalSec / 3600) % 24,
        minutes = parseInt(totalSec / 60) % 60,
        seconds = Math.ceil(totalSec % 60),
        result = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);

        if (hours > 0) {
          result = (hours < 10 ? "0" + hours : hours) + ":" + result;
        }

    return result;
  };

  PlayerUtils.prototype.setDuration = function() {
    //here's some more storage repitition that should be removed
    this.duration.innerHTML = this.generateTimestamp(this.videoEl.duration || 0);
  };

  PlayerUtils.prototype.setPlayerCurrentTime = function() {
    this.videoEl.currentTime = (this.videoEl.duration || 0) * (this.seekBar.value / 100);
  };

  PlayerUtils.prototype.setPlayerCurrentTimestamp = function() {
    this.current.innerHTML = this.generateTimestamp(this.videoEl.currentTime);
  };

  PlayerUtils.prototype.setPlayerSeekBarPosition = function() {
    this.seekBar.value = (100 / this.videoEl.duration) * this.videoEl.currentTime;
  };

  PlayerUtils.prototype.togglePlay = function() {
    if (this.videoEl.paused === true) {
      this.play();
      this.playButton.innerHTML = '<img src="images/pause.gif">';
    } else {
      this.pause();
      this.playButton.innerHTML = '<img src="images/play.gif">';
    }
  }

  bindTo.PlayerUtils = PlayerUtils;
})(window);
