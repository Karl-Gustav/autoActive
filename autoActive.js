(function () {
  'use strict';

  angular.module('autoActive', [])
    .directive('autoActive', ['$location', '$timeout', function ($location, $timeout) {
      return {
        restrict: 'A',
        scope: false,
        link: function (scope, element, attr) {
          function setActive() {
            var path = $location.path();
            if (!path) {
              return;
            }

            angular.forEach(element.find('li'), function (li) {
              var anchor = li.querySelector('a');
              if (anchor.href.match('#' + path + '(?=\\?|$)')) {
                angular.element(li).addClass('active');
              } else {
                angular.element(li).removeClass('active');
              }
            });

            if (attr.href) {
              if (attr.href.match('#' + path + '(?=\\?|$)')) {
                element.addClass('active');
              } else {
                element.removeClass('active');
              }
            }
          }

          var timeout = $timeout(setActive, 1);
          var unbind = scope.$on('$locationChangeSuccess', setActive);
          scope.$on('$destroy', function() {
            $timeout.cancel(timeout);
            unbind();
          });
        }
      }
    }]);
}());
