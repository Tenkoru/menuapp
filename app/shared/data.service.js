"use strict";

angular.module("menuApp").factory("DataService", [
    "$resource",
    function($resource) {
        return $resource(
            "menuData/menu.json",
            {},
            {
                query: {
                    method: "GET",
                    isArray: true
                }
            }
        );
    }
]);
