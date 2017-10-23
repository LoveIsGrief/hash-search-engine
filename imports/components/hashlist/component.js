import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Hashes} from "../../api/hashes"

import template from './template.html';

class HastlistController {

    constructor($scope) {
        $scope.viewModel(this)
        this.helpers({
            hashes() {
                return Hashes.find({})
            }
        })
    }

}

export default angular.module("hashlist", [
    angularMeteor
]).component("hashlist", {
    templateUrl: "imports/components/hashlist/template.html",
    controller: ["$scope", HastlistController]
})