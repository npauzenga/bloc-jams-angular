(function() {
  function AlbumCtrl() {
    this.albumData = angular.copy(albumAllHailWestTexas);
  }

  angular
    .module("blocJams")
    .controller("AlbumCtrl", AlbumCtrl);
})();
