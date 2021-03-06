﻿app.controller('signInCtrl', function ($scope, $rootScope, $location, AuthenticationService, GrecaptchaService) {
    $rootScope.title = "Sign In";

    $scope.submit = function () {
        $scope.account.grecaptchaResponse = GrecaptchaService.GetResponse();

        if ($scope.account.grecaptchaResponse == null || $scope.account.grecaptchaResponse.length == 0) {
            $scope.errorMessage = "You must prove you aren't a robot on recaptcha";
            return;
        }

        AuthenticationService.SignIn($scope.account).then(
            function (result) {
                $rootScope.home();
            }, function (err) {
                $scope.errorMessage = err;
                GrecaptchaService.Reload();
            }).catch(function (data) {
                $scope.errorMessage = "internal client error";
                console.log(data);
                GrecaptchaService.Reload();
            });
    }

    $scope.recaptchaValid = function() {
        var recaptchaValue = GrecaptchaService.GetResponse();
        return recaptchaValue != null && typeof recaptchaValue != "undefined" && recaptchaValue.length > 0;
    }

    GrecaptchaService.Configure($scope, 'g-recaptcha-sign-in');
});
