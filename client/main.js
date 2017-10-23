import angular from 'angular';
import angularMeteor from 'angular-meteor';
import search from "../imports/components/search/component"
import upload from "../imports/components/upload/component"
import hashlist from "../imports/components/hashlist/component"

angular.module("hash-list", [
    angularMeteor,
    search.name,
    upload.name,
    hashlist.name
]);

