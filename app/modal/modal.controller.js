"use strict";

angular.module("menuContainer").controller("modalCtrl", function($uibModalInstance, item) {
    var self = this;
    self.item = item;
    self.modalClose = function() {
        $uibModalInstance.close();
    };
});
