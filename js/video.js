;(function(bindTo) {
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
