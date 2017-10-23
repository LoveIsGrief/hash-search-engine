import angular from 'angular'
import angularMeteor from 'angular-meteor'
import {Hashes} from "../../api/hashes"

import template from './template.html'

class SearchCtrl {
    constructor($scope) {
        $scope.viewModel(this)

        this.searchTerm = ''
        this.regex = "[A-Za-z0-9]{64}"

        this.helpers({
            hashes() {
                return Hashes.find({})
            }
        })
    }
}

export default angular.module("search", [
    angularMeteor
]).component("search", {
    templateUrl: "imports/components/search/template.html",
    controller: ["$scope", SearchCtrl]
})