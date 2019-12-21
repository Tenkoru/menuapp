"use strict";

angular.module("menuApp").config([
    "$routeProvider",
    function config($routeProvider) {
        angular.lowercase = angular.$$lowercase;
        $routeProvider
            .when("/menu", {
                template: "<menu-container></menu-container>"
            })
            .otherwise("/menu");
    }
]);
