window.onload = function () {
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
};
