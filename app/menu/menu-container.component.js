"use strict";

angular.module("menuContainer").component("menuContainer", {
    templateUrl: "menu/menu-container.template.html",
    controller: [
        "$http",
        "$uibModal",
        "$localStorage",
        function MenuController($http, $uibModal, $localStorage) {
            var self = this;
            self.$storage = $localStorage;
            self.headers = ["title", "image", "rating", "price"];
            self.image = {
                width: "150px",
                height: "150px"
            };

            self.orderProp = self.$storage.orderProp || "title";
            self.reverse = self.$storage.reverse || false;

            self.allQuery = self.$storage.allQuery;
            self.titleQuery = self.$storage.titleQuery;
            self.imageQuery = self.$storage.imageQuery;
            self.ratingQuery = self.$storage.ratingQuery;
            self.priceQuery = self.$storage.priceQuery;

            self.sortBy = function(propName) {
                self.reverse = self.orderProp === propName ? !self.reverse : false;
                self.orderProp = propName;

                self.$storage.reverse = self.reverse;
                self.$storage.orderProp = self.orderProp;
            };
            // self.search = function(item) {
            //     return (
            //         self.searchCompare(item.title) ||
            //         self.searchCompare(item.image) ||
            //         self.searchCompare(item.rating) ||
            //         self.searchCompare(item.price)
            //     );
            // };
            self.searchCompare = function(string) {
                return (
                    angular
                        .lowercase(string)
                        .toString()
                        .indexOf(angular.lowercase(self.allQuery) || "") !== -1
                );
            };
            self.resetFilters = function() {
                self.allQuery = "";
                self.titleQuery = "";
                self.imageQuery = "";
                self.ratingQuery = "";
                self.priceQuery = "";
                self.$storage.allQuery = "";
                self.$storage.titleQuery = "";
                self.$storage.imageQuery = "";
                self.$storage.ratingQuery = "";
                self.$storage.priceQuery = "";
            };

            self.saveToLocalstorage = function(type, value) {
                switch (type) {
                    case "all": {
                        self.$storage.allQuery = value;
                        break;
                    }
                    case "title": {
                        self.$storage.titleQuery = value;
                        break;
                    }
                    case "image": {
                        self.$storage.imageQuery = value;
                        break;
                    }
                    case "rating": {
                        self.$storage.ratingQuery = value;
                        break;
                    }
                    case "price": {
                        self.$storage.priceQuery = value;
                        break;
                    }
                }
            };
            self.openModal = function(item) {
                $uibModal
                    .open({
                        animation: self.animationsEnabled,
                        ariaLabelledBy: "modal-title",
                        ariaDescribedBy: "modal-body",
                        templateUrl: "modal/modal.template.html",
                        controller: "modalCtrl",
                        controllerAs: "self",
                        resolve: {
                            item: function() {
                                return item;
                            }
                        }
                    })
                    .result.then(
                        function() {},
                        function(res) {}
                    );
            };
            self.closeModal = function() {
                $uibModal.close();
            };

            $http.get("menuData/menu.json").then(function(response) {
                self.items = response.data;
            });
        }
    ]
});
