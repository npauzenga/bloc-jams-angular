(function() {
  function seekBar($document) {
    /**
     * @function calculatePercent
     * @desc calculates horizontal percent along seek bar where event occurred
     * @param {Object} seekBar, event
     */
    var calculatePercent = function(seekBar, event) {
      var offsetX = event.pageX - seekBar.offset().left;
      var seekBarWidth = seekBar.width();
      var offsetXPercent = offsetX / seekBarWidth;
      offsetXPercent = Math.max(0, offsetXPercent);
      offsetXPercent = Math.min(1, offsetXPercent);
      return offsetXPercent;
    };

    return {
      templateUrl: "/templates/directives/seek_bar.html",
      replace: true,
      restrict: "E",
      scope: { },
      link: function(scope, element, attributes) {
        /**
         * @desc current value of seek bar
         * @type {Number}
         */
        scope.value = 0;

        /**
         * @desc maximum value of song and volume seek bars
         * @type {Number}
         */
        scope.max = 100;

        /**
         * @desc seekBar dom element
         * @type {Object} jQuery object
         */
        var seekBar = $(element);

        /**
         * @function percentString
         * @desc calculates a percent based on the value and maximum value of a
         *  seek bar
         * @returns calculated percent as a string
         */
        var percentString = function() {
          var value = scope.value;
          var max = scope.max;
          var percent = value / max * 100;
          return percent + "%";
        };

        /**
         * @function fillStyle
         * @returns the width of the seek bar fill element based on calculated
         *  percent
         */
        scope.fillStyle = function() {
          return { width: percentString() };
        };

        /**
         * @function onClickSeekBar
         * @desc updates seek bar value based on width and location of click
         */
        scope.onClickSeekBar = function(event) {
          var percent = calculatePercent(seekBar, event);
          scope.value = percent * scope.max;
        };

        /**
         * @function trackThumb
         * @desc updates and constantly applies seek bar value as user drags thumb
         */
        scope.trackThumb = function() {
          $document.bind("mousemove.thumb", function(event) {
            var percent = calculatePercent(seekBar, event);
            scope.$apply(function() {
              scope.value = percent * scope.max;
            });
          });

          $document.bind("mouseup.thumb", function() {
            $document.unbind("mousemove.thumb");
            $document.bind("mouseup.thumb");
          });
        };
      }
    };
  }

  angular
    .module("blocJams")
    .directive("seekBar", ["$document", seekBar]);
})();
