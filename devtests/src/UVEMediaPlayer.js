var playerStatesEnum = {
  idle: 0,
  initializing: 1,
  playing: 8,
  paused: 6,
  seeking: 7,
};
Object.freeze(playerStatesEnum);

class AAMPPlayer {
  constructor() {
    this.player = new AAMPMediaPlayer();
  }

  destroy() {
    if (this.player.getCurrentState() !== playerStatesEnum.idle) {
      this.player.stop();
    }

    this.player.release();
    this.player = null;
  }

  /**
   * URI of the Media being played by the Video Engine
   */
  load(url, autoplay) {
    console.log("LOADING", url, autoplay);
    this.player.load(url, autoplay);
  }

  /**
   * IConfig Object with key value pair of launch configuration
   */
  initConfig(configObj) {
    this.player.initConfig(configObj);
  }

  /**
   * Starts playback when enough data is buffered at playhead
   */
  play() {
    this.player.play();
  }

  /**
   * Pauses playback
   */
  pause() {
    this.player.pause();
  }

  detach() {
    this.player.detach();
  }

  /**
   * Stop playback and free resources
   */
  stop() {
    // Turn OFF CC
    XREReceiver.onEvent("onDecoderAvailable", { decoderHandle: null });
    this.player.stop();
  }

  /**
   * Performs a seek
   * @param timeSec the time in seconds to seek
   */
  seek(timeSec) {
    this.player.seek(timeSec);
  }

  /**
   * Gets the current state
   * This defaults to PlayState.PAUSED
   */
  getCurrentState() {
    return this.player.getCurrentState();
  }

  /**
   * Gets the duration of the content in seconds.
   */
  getDurationSec() {
    return this.player.getDurationSec();
  }

  /**
   * Gets the current user time in seconds.
   */
  getCurrentPosition() {
    return this.player.getCurrentPosition();
  }

  /**
   * Gets available video bitrates
   */
  getVideoBitrates() {
    return this.player.getVideoBitrates();
  }

  /**
   * Gets available audio bitrates
   */
  getAudioBitrates() {
    return this.player.getAudioBitrates();
  }

  /**
   * Gets the current video bitrate.
   */
  getCurrentVideoBitrate() {
    return this.player.getCurrentVideoBitrate();
  }

  /**
   * Sets the current video bitrate.
   */
  setVideoBitrate(bitrate) {
    this.player.setVideoBitrate(bitrate);
  }

  /**
   * Gets the current audio bitrate
   */
  getCurrentAudioBitrate() {
    return this.player.getCurrentAudioBitrate();
  }

  /**
   * Sets the current audio bitrate
   */
  setAudioBitrate(bitrate) {
    this.player.setAudioBitrate(bitrate);
  }

  /**
   * Gets the current audio track
   */
  getAudioTrack() {
    return this.player.getAudioTrack();
  }

  /**
   * Sets the current audio track
   */
  setAudioTrack(track) {
    this.player.setAudioTrack(track);
  }

  /**
   * Gets the current text track
   */
  getTextTrack() {
    return this.player.getTextTrack();
  }

  /**
   * Sets the current text track
   */
  setTextTrack(track) {
    this.player.setTextTrack(track);
  }

  /**
   * Gets the current volume (value between 0 and 1)
   */
  getVolume() {
    return this.player.getVolume();
  }

  /**
   * Sets the current volume (value between 0 and 1)
   */
  setVolume(volume) {
    this.player.setVolume(volume);
  }

  /**
   * Gets the current playback rate
   */
  getPlaybackRate() {
    return this.player.getPlaybackRate();
  }

  /**
   * Sets the current playback rate and overshoot if necessary
   */
  setPlaybackRate(rate, overshoot = 0) {
    this.player.setPlaybackRate(rate, overshoot);
  }

  // DRM
  /**
   * Returns a list of key system the video engine supports -- redundant?
   */
  getSupportedKeySystems() {
    return this.player.getSupportedKeySystems();
  }

  /**
   * Enables Player to specify the handle to the the IProtectionSchemeHandler
   */
  setProtectionSchemeInterface(IProtectionSchemeInterface) {
    this.player.setProtectionSchemeInterface(IProtectionSchemeInterface);
  }

  /**
   * Black out the video for parental controls
   */
  setVideoMute(enabled) {
    this.player.setVideoMute(enabled);
  }

  // DAI
  /**
   * Subscribe to specific tags / DOM Element
   */
  setSubscribedTags(tagNames) {
    console.log("tagNames", tagNames);
    // Used to identify Content Break period
    this.player.setSubscribedTags(tagNames);
  }

  /**
   * Can be used by Player to get all the content break. Normally Video engine will raise an event for each content Break
   * providing a ContentBreak Id that the Player can then provide array of content to be replaced on inserted.
   */
  getContentBreaks() {
    return this.player.getContentBreaks();
  }

  /**
   * Player calls this function inside event handling for upcoming content Break and provides an array of content to replace or insert.
   */
  updateAlternateContent(CB_ID, arrContent) {}

  addEventListener(eventName, eventHandler) {
    return this.player.addEventListener(eventName, eventHandler, null);
  }

  removeEventListener(eventName, eventHandler) {
    return this.player.addEventListener(eventName, eventHandler, null);
  }

  /**
   * Set the DRM config params
   */
  setDRMConfig(config) {
    this.player.setDRMConfig(config);
  }

  /**
   * Add custom headers to HTTP requests
   */
  addCustomHTTPHeader(headerName, headerValue) {
    this.player.addCustomHTTPHeader(headerName, headerValue);
  }

  /**
   * Remove a custom headers set previously, with empty args will delete all
   */
  removeCustomHTTPHeader(headerName) {
    this.player.removeCustomHTTPHeader(headerName);
  }

  /**
   * Set display video rectangle co-ordinates
   */
  setVideoRect(x, y, w, h) {
    this.player.setVideoRect(x, y, w, h);
  }

  /**
   * Set video zoom
   */
  setVideoZoom(videoZoom) {
    this.player.setVideoZoom(videoZoom);
  }

  /**
   * Get UVE API version
   */
  get version() {
    return this.player.version;
  }
}
