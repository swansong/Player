;(function(bindTo) {
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
