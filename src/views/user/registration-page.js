var angular= require("angular");
require("../shared/validators");

var reg= angular.module("registration",["validators","ngPasswordStrength"]);

reg.controller("registrationController",["$scope", function ($scope) {

    $scope.cancel = function () {
        window.history.back();
    };

    $scope.submit = function (valid, $event) {
      $scope.submitted = true;

      if (!valid) {
          $event.preventDefault();
      }
    }

}]);