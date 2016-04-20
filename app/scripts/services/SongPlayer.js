(function() {
  /**
   * @function SongPlayer
   * @desc sets the current song, plays or pauses songs
   * @returns {Object} SongPlayer
   */
  function SongPlayer() {
    /**
     * @desc empty object to be returned
     * @type {Object}
     */
    var SongPlayer = {};

    /**
     * @desc the currently playing song
     * @type {Object}
     */
    var currentSong = null;

    /**
     * @desc Buzz object audio file
     * @type {Object}
     */
    var currentBuzzObject = null;

    /**
     * @function setSong
     * @desc Stops currently playing song and loads new audio file as currentBuzzObject
     * @param {Object} song
     */
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ["mp3"],
        preload: true
      });

      currentSong = song;
    };

    /**
     * @function playSong
     * @desc plays the current Buzz Object and sets the provided song's playing attr
     *  to true
     * @param {Object} song
     */
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    }

    /**
     * @function SongPlay.play
     * @desc sets the current song and plays it if the clicked song was not playing
     *  otherwise plays it if it was paused
     * @param {Object} song
     */
    SongPlayer.play = function(song) {
      if (currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };

    /**
     * @function SongPlay.pause
     * @desc pauses the current Buzz Object and sets the provided song's playing attr
     *  to false
     * @param {Object} song
     */
    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    };

    return SongPlayer;
  }

  angular
    .module("blocJams")
    .factory("SongPlayer", SongPlayer);
})();
