(function() {
  function Fixtures() {
    var Fixtures = {};

    var albumAllHailWestTexas = {
      title: "All Hail West Texas",
      artist: "The Mountain Goats",
      label: "Rough Trade",
      year: "2001",
      albumArtUrl: "/assets/images/album_covers/01.png",
      songs: [
      { title: "Blue", duration: 161.71, audioUrl: "/assets/music/blue" },
      { title: "Green", duration: 103.96, audioUrl: "/assets/music/green" },
      { title: "Red", duration: 268.45, audioUrl: "/assets/music/red" },
      { title: "Pink", duration: 153.14, audioUrl: "/assets/music/pink" },
      { title: "Magenta", duration: 374.22, audioUrl: "/assets/music/magenta" }
      ]
    };

    var albumLifeAndDeath = {
      title: "Life and Death of an American Fourtracker",
      artist: "John Vanderslice",
      label: "Barsuk",
      year: "2003",
      albumArtUrl: "/assets/images/album_covers/01.png",
      songs: [
      { title: "Blue", duration: "4:26" },
      { title: "Green", duration: "3:26" },
      { title: "Red", duration: "4:16" },
      { title: "Pink", duration: "4:24" },
      { title: "Magenta", duration: "6:26" }
      ]
    };

    Fixtures.getCollection = function(numberOfAlbums) {
      var albumArray = [];

      for (var i = 0, j = numberOfAlbums; i < j; i++) {
        albumArray.push(albumAllHailWestTexas);
      }
      return albumArray;
    };

    Fixtures.getAlbum = function() {
      return albumAllHailWestTexas;
    };

    return Fixtures;
  }

  angular
    .module('blocJams')
    .factory('Fixtures', Fixtures);
})();
