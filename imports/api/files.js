import {FilesCollection} from 'meteor/ostrio:files';

export const Files = new FilesCollection({
    collectionName: 'Files',
    allowClientCode: false, // Disallow remove files from Client
    onBeforeUpload(file) {
        // Only allow 10 MB
        if (file.size <= 10485760) {
            return true;
        } else {
            return 'Please upload image, with size equal or less than 10MB';
        }
    },
    onAfterUpload(file) {
        import JSHashes from "jshashes"
        import {Hashes} from "./hashes"
        const fs = Npm.require('fs');

        const exists = fs.existsSync(file.path);
        if(!exists){
            console.error("File doesn't exist")
            return
        }

        const SHA256 = new JSHashes.SHA256();
        let hash = SHA256.hex(fs.readFileSync(file.path, {encoding: "utf8"}));
        let foundHashes = Hashes.find({hash: hash});
        if (foundHashes.count() < 1) {
            // TODO Hash the file multiple times in MD5 and others
            // TODO Decide on the DB structure in order to store multiple hashes and links per file all while
            // TODO  maintaing a fast search
            // Maybe Hashes should just be a hash with a reference to the real object with a data structure TBD
            Hashes.insert({
                hash: hash,
                names: [file.name],
                mime: file.mime,
                links: []
            })
        } else {
            // TODO add more information to the db about the file
        }

        // We don't want to keep the file, just the hash
        Files.remove({_id: file._id})
    }
});