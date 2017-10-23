import angular from 'angular'
import angularMeteor from 'angular-meteor'
import {Files} from "../../api/files"
import ngFileUpload from "ng-file-upload"

import template from './template.html'

class UploadController {
    constructor() {

        this.uploadFiles = ([file]) => {

            console.log(file);
            const upload = Files.insert({
                file: file,
                streams: "dynamic",
                chunkSize: "dynamic"
            })
        }
    }
}

export default angular.module("upload", [
    angularMeteor,
    ngFileUpload
]).component("upload", {
    templateUrl: "imports/components/upload/template.html",
    controller: UploadController
})