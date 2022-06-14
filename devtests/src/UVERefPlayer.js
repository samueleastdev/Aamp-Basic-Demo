window.onload = function () {
  initPlayerControls();
  const player = new AAMPMediaPlayer();
  player.load(
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  );
  player.play();

  var adPlayer = new AAMPMediaPlayer(); // create background player
  adPlayer.load(
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    false
  );

  setTimeout(() => {
    player.detach();
    adPlayer.play();
    player.stop();
  }, 12000);
  resetUIOnNewAsset();
};
class AampSaPlayer {
  constructor() {
    this.playbackSpeeds = [-64, -32, -16, -4, 1, 4, 16, 32, 64];
    this.player = this.createPlayer();
  }

  load(url, autoplay) {
    console.log("Player loaded", autoplay);
    this.player.load(url, autoplay);
  }

  createPlayer() {
    const player = new AAMPPlayer();

    player.initConfig({
      initialBitrate: 2500000,
      offset: 15,
      networkTimeout: 0,
      preferredAudioLanguage: "en",
      liveOffset: 0,
    });
    player.addEventListener("playbackStateChanged", this.playbackStateChanged);
    player.addEventListener("playbackCompleted", this.mediaEndReached);
    player.addEventListener("playbackSpeedChanged", this.mediaSpeedChanged);
    player.addEventListener("bitrateChanged", this.bitrateChanged);
    player.addEventListener("playbackFailed", this.mediaPlaybackFailed);
    player.addEventListener("mediaMetadata", this.mediaMetadataParsed);
    player.addEventListener("timedMetadata", this.subscribedTagNotifier);
    player.addEventListener("playbackProgressUpdate", this.mediaProgressUpdate);
    player.addEventListener("playbackStarted", this.mediaPlaybackStarted);
    //player.addEventListener("bufferingChanged", mediaPlaybackBuffering);
    player.addEventListener("durationChanged", this.mediaDurationChanged);
    player.addEventListener("decoderAvailable", this.decoderHandleAvailable);
    //playerState = playerStatesEnum.idle;
    //mutedStatus = false;
    return player;
  }

  play() {
    this.player.play();
  }

  stop() {
    this.player.stop();
  }

  detach() {
    this.player.detach();
  }

  destroy() {
    this.player.stop();
    this.player.destroy();
    this.player = null;
  }

  playbackStateChanged(event) {
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

  mediaEndReached() {
    console.log("Media end reached event!");
    // loadNextAsset();
  }

  mediaSpeedChanged(event) {
    var currentRate = event.speed;
    if (currentRate != undefined) {
      if (currentRate != 0) {
        playbackRateIndex = this.playbackSpeeds.indexOf(currentRate);
      } else {
        playbackRateIndex = this.playbackSpeeds.indexOf(1);
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

  bitrateChanged(event) {
    console.log("bitrate changed event: " + JSON.stringify(event));
  }

  mediaPlaybackFailed(event) {
    console.log("Media failed event: " + JSON.stringify(event));
    loadNextAsset();
  }

  mediaMetadataParsed(event) {
    console.log("Media metadata event: " + JSON.stringify(event));
  }

  subscribedTagNotifier(event) {
    console.log("Subscribed tag notifier event: " + JSON.stringify(event));
  }

  mediaProgressUpdate(event) {
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

  mediaPlaybackStarted() {
    document.getElementById("playOrPauseIcon").src = "../icons/pause.png";

    var availableVBitrates = playerObj.getVideoBitrates();
    if (availableVBitrates !== undefined) {
      createBitrateList(availableVBitrates);
    }
  }

  mediaPlaybackBuffering(event) {
    if (event.buffering === true) {
      //bufferingDisplay(true);
    } else {
      //bufferingDisplay(false);
    }
  }

  mediaDurationChanged(event) {
    console.log("Duration changed!");
  }

  decoderHandleAvailable(event) {
    console.log("decoderHandleAvailable " + event.decoderHandle);
    XREReceiver.onEvent("onDecoderAvailable", {
      decoderHandle: event.decoderHandle,
    });
  }
}
