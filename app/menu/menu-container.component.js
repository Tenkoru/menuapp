"use strict";

angular.module("menuContainer").component("menuContainer", {
    templateUrl: "menu/menu-container.template.html",
    controller: [
        "DataService",
        "$uibModal",
        "$localStorage",
        function MenuController(DataService, $uibModal, $localStorage) {
            var self = this;

            self.items = DataService.query();
            self.$storage = $localStorage;
            self.headers = ["title", "image", "rating", "price"];
            self.imageProps = {
                width: "150px",
                height: "150px"
            };
            self.search = {};

            self.orderProp = self.$storage.orderProp || "title";
            self.reverse = self.$storage.reverse || false;

            self.allFieldsQuery = self.$storage.allFieldsQuery;
            self.headers.forEach(function(header) {
                self.search[header] = self.$storage[header];
            });

            self.sortBy = function(propName) {
                self.reverse = self.orderProp === propName ? !self.reverse : false;
                self.orderProp = propName;

                self.$storage.reverse = self.reverse;
                self.$storage.orderProp = self.orderProp;
            };
            self.allFieldsSearch = function(item) {
                return (
                    self.searchCompare(item.title) ||
                    self.searchCompare(item.image) ||
                    self.searchCompare(item.rating) ||
                    self.searchCompare(item.price)
                );
            };
            self.searchCompare = function(string) {
                return (
                    angular
                        .lowercase(string)
                        .toString()
                        .indexOf(angular.lowercase(self.allFieldsQuery) || "") !== -1
                );
            };
            self.resetFilters = function() {
                self.allFieldsQuery = "";
                self.$storage.allFieldsQuery = "";
                self.headers.forEach(function(header) {
                    self.search[header] = "";
                    self.$storage[header] = ""
                });
            };

            self.saveToLocalstorage = function(type, value) {
                if (type === "all") {
                    self.$storage.allFieldsQuery = value;
                } else {
                    self.$storage[type] = value;
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

        }
    ]
});
