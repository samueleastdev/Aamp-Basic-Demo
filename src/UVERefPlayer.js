var playbackSpeeds = [-64, -32, -16, -4, 1, 4, 16, 32, 64];

//Comcast DRM config for AAMP
var comcastDrmConfig = {
  "com.microsoft.playready": "mds.ccp.xcal.tv",
  "com.widevine.alpha": "mds.ccp.xcal.tv",
  preferredKeysystem: "com.widevine.alpha",
};

//AAMP initConfig is used to pass certain predefined config params to AAMP
//Commented out values are not implemented for now
//Values assigned are default values of each config param
//All properties are optional.
var defaultInitConfig = {
  /**
   * max initial bitrate (kbps)
   */
  initialBitrate: 2500000,

  /**
   * min amount of buffer needed before playback (seconds)
   */
  //initialBuffer: number;

  /**
   * max amount of buffer during playback (seconds)
   */
  //playbackBuffer: number;

  /**
   * start position for playback (ms)
   */
  offset: 15,

  /**
   * network request timeout (ms)
   */
  networkTimeout: 10,

  /**
   * max amount of time to download ahead of playhead (seconds)
   * e.x:
   *   with a downloadBuffer of 10s there will be 10 seconds of
   *   video or audio stored in javascript memory and not in a
   *   playback buffer
   */
  //downloadBuffer: number;

  /**
   * min amount of bitrate (kbps)
   */
  //minBitrate: number;

  /**
   * max amount of bitrate (kbps)
   */
  //maxBitrate: number;

  /**
   * preferred audio language
   */
  preferredAudioLanguage: "en",

  /**
   * TSB length in seconds, value of 0 means it is disabled
   */
  //timeShiftBufferLength: number;

  /**
   * offset from live point for live assets (in secs)
   */
  liveOffset: 15,

  /**
   * drmConfig for the playback
   */

  drmConfig: comcastDrmConfig, //For sample structure comcastDrmConfig
};

var playerState = playerStatesEnum.idle;
var playbackRateIndex = playbackSpeeds.indexOf(1);
var urlIndex = 0;
var mutedStatus = false;
var playerObj = null;

window.onload = function () {
  initPlayerControls();
  resetPlayer();
  resetUIOnNewAsset();
};

function playbackStateChanged(event) {
  switch (event.state) {
    case playerStatesEnum.idle:
      playerState = playerStatesEnum.idle;
      break;
    case playerStatesEnum.initializing:
      playerState = playerStatesEnum.initializing;
      break;
    case playerStatesEnum.playing:
      playerState = playerStatesEnum.playing;
      break;
    case playerStatesEnum.paused:
      playerState = playerStatesEnum.paused;
      break;
    case playerStatesEnum.seeking:
      playerState = playerStatesEnum.seeking;
      break;
    default:
      console.log("State not expected");
      break;
  }
}

function mediaEndReached() {
  console.log("Media end reached event!");
  loadNextAsset();
}

function mediaSpeedChanged(event) {
  var currentRate = event.speed;
  if (currentRate != undefined) {
    if (currentRate != 0) {
      playbackRateIndex = playbackSpeeds.indexOf(currentRate);
    } else {
      playbackRateIndex = playbackSpeeds.indexOf(1);
    }
    if (currentRate != 0 && currentRate != 1) {
      showTrickmodeOverlay(currentRate);
    }

    if (currentRate === 1) {
      document.getElementById("playOrPauseIcon").src = "../icons/pause.png";
    } else {
      document.getElementById("playOrPauseIcon").src = "../icons/play.png";
    }
  }
}

function bitrateChanged(event) {
  console.log("bitrate changed event: " + JSON.stringify(event));
}

function mediaPlaybackFailed(event) {
  console.log("Media failed event: " + JSON.stringify(event));
  loadNextAsset();
}

function mediaMetadataParsed(event) {
  console.log("Media metadata event: " + JSON.stringify(event));
}

function subscribedTagNotifier(event) {
  console.log("Subscribed tag notifier event: " + JSON.stringify(event));
}

function mediaProgressUpdate(event) {
  var duration = event.durationMiliseconds;
  var position = event.positionMiliseconds;
  var value = (position / duration) * 100;
  var seekBar = document.getElementById("seekBar");
  document.getElementById("totalDuration").innerHTML = convertSStoHr(
    duration / 1000.0
  );
  document.getElementById("currentDuration").innerHTML = convertSStoHr(
    position / 1000.0
  );
  if (isFinite(value)) {
    seekBar.value = value;
    seekBar.style.width = value + "%";
    seekBar.style.backgroundColor = "red";
  }
}

function mediaPlaybackStarted() {
  document.getElementById("playOrPauseIcon").src = "../icons/pause.png";

  var availableVBitrates = playerObj.getVideoBitrates();
  if (availableVBitrates !== undefined) {
    createBitrateList(availableVBitrates);
  }
}

function mediaPlaybackBuffering(event) {
  if (event.buffering === true) {
    //bufferingDisplay(true);
  } else {
    //bufferingDisplay(false);
  }
}

function mediaDurationChanged(event) {
  console.log("Duration changed!");
}

function decoderHandleAvailable(event) {
  console.log("decoderHandleAvailable " + event.decoderHandle);
  XREReceiver.onEvent("onDecoderAvailable", {
    decoderHandle: event.decoderHandle,
  });
}

// helper functions
function resetPlayer() {
  if (playerState !== playerStatesEnum.idle) {
    playerObj.stop();
  }
  if (playerObj !== null) {
    playerObj.destroy();
    playerObj = null;
  }

  playerObj = new AAMPPlayer();
  playerObj.addEventListener("playbackStateChanged", playbackStateChanged);
  playerObj.addEventListener("playbackCompleted", mediaEndReached);
  playerObj.addEventListener("playbackSpeedChanged", mediaSpeedChanged);
  playerObj.addEventListener("bitrateChanged", bitrateChanged);
  playerObj.addEventListener("playbackFailed", mediaPlaybackFailed);
  playerObj.addEventListener("mediaMetadata", mediaMetadataParsed);
  playerObj.addEventListener("timedMetadata", subscribedTagNotifier);
  playerObj.addEventListener("playbackProgressUpdate", mediaProgressUpdate);
  playerObj.addEventListener("playbackStarted", mediaPlaybackStarted);
  //playerObj.addEventListener("bufferingChanged", mediaPlaybackBuffering);
  playerObj.addEventListener("durationChanged", mediaDurationChanged);
  playerObj.addEventListener("decoderAvailable", decoderHandleAvailable);
  playerState = playerStatesEnum.idle;
  mutedStatus = false;
}

function loadUrl(urlObject) {
  var initConfiguration = defaultInitConfig;
  initConfiguration.drmConfig = urlObject.drmConfig;
  playerObj.initConfig(initConfiguration);
  playerObj.load(urlObject.url);
}
