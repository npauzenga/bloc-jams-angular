(function() {
  /**
   * @function SongPlayer
   * @desc sets the current song, plays or pauses songs
   * @returns {Object} SongPlayer
   */
  function SongPlayer(Fixtures) {
    /**
     * @desc empty object to be returned
     * @type {Object}
     */
    var SongPlayer = {};

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
        stopSong(SongPlayer.currentSong);
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ["mp3"],
        preload: true
      });

      SongPlayer.currentSong = song;
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
     * @function getSongIndex
     * @desc finds the index of the current song in the album's songs array
     * @param {Object} song
     * @returns {Number} index integer
     */
    var getSongIndex = function(song) {
      return SongPlayer.currentAlbum.songs.indexOf(song);
    };

    /**
     * @function stopSong
     * @desc stops the provided song
     * @param {Object} song
     */
    var stopSong = function(song){
      currentBuzzObject.stop();
      song.playing = null;
    };

    /**
     * @desc the currently playing song
     * @type {Object}
     */
    SongPlayer.currentSong = null;

    /**
     * @desc the currently selected album
     * @type {Object}
     */
    SongPlayer.currentAlbum = Fixtures.getAlbum();

    /**
     * @function SongPlay.play
     * @desc sets the current song and plays it if the clicked song was not playing
     *  otherwise plays it if it was paused
     * @param {Object} song
     */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
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
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /**
     * @function SongPlay.previous
     * @desc gets the current song's index and decrements by one
     */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        stopSong(SongPlayer.currentSong);
      } else {
        var song = SongPlayer.currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    /**
     * @function SongPlay.next
     * @desc gets the current song's index and increments by one
     */
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      var albumLength = SongPlayer.currentAlbum.songs.length

      currentSongIndex++;

      if (currentSongIndex >= albumLength) {
        stopSong(SongPlayer.currentSong);
      } else {
        var song = SongPlayer.currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    return SongPlayer;
  }

  angular
    .module("blocJams")
    .factory("SongPlayer", SongPlayer);
})();
