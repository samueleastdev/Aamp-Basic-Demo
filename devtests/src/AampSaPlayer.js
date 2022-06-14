/*export class AampSaPlayer {
  constructor() {
    this.playbackSpeeds = [-64, -32, -16, -4, 1, 4, 16, 32, 64];
    this.player = this.createPlayer();
  }

  load(url) {
    this.player.load(url);
  }

  createPlayer() {


    const player = new AAMPPlayer();

    player.initConfig({
      initialBitrate: 2500000,
      offset: 15,
      networkTimeout: 10,
      preferredAudioLanguage: "en",
      liveOffset: 15,
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
    loadNextAsset();
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
*/
