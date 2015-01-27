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
;;(function(bindTo) {
  var Video = function(el) {
    this.el = el;
  };

  Video.prototype.initFullScreen = function() {
    if (this.el.requestFullscreen) {
      this.el.requestFullscreen();
    } else if (this.el.mozRequestFullScreen) {
      this.el.mozRequestFullScreen();
    } else if (this.el.webkitRequestFullscreen) {
      this.el.webkitRequestFullscreen();
    }
  };

  bindTo.Video = Video;
})(window);
;;(function(bindTo) {
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
;;(function(bindTo) {
  //TODO only require a single getElementById
  var el = document.getElementById("video-id"),
      videoEl = el.querySelector(".video-frame"),
      playButton = el.querySelector(".play-pause"),
      muteButton = el.querySelector(".mute"),
      fullScreenButton = el.querySelector(".full-screen"),
      seekBar = el.querySelector(".seek-bar"),
      volumeBar = el.querySelector(".volume-bar"),
      duration = el.querySelector(".duration"),
      current = el.querySelector(".current");

  var playerUtils = new bindTo.PlayerUtils(el);
  
  //TODO move these into player_utils
  videoEl.ondurationchange = function() {
    playerUtils.setDuration();
  };

  playButton.addEventListener("click", function() {
    playerUtils.togglePlay();
  });

  videoEl.addEventListener("click", function() {
    playerUtils.togglePlay();
  });

  muteButton.addEventListener("click", function() {
    playerUtils.audioControls.toggleMute();
  });

  fullScreenButton.addEventListener("click", function() {
    playerUtils.video.initFullScreen();
  });

  seekBar.addEventListener("change", function() {
    playerUtils.setPlayerCurrentTime();
  });

  videoEl.addEventListener("timeupdate", function() {
    playerUtils.setPlayerSeekBarPosition();
    playerUtils.setPlayerCurrentTimestamp();
  });

  seekBar.addEventListener("mousedown", function() {
    playerUtils.pause();
  });

  seekBar.addEventListener("mouseup", function() {
    playerUtils.play();
  });

  volumeBar.addEventListener("change", function() {
    playerUtils.audioControls.setVolume();
  });
})(window);
