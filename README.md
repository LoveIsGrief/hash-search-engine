The idea behind this is to search for places to download a file that has a specific hash.

# Inspiration

When looking for DDLs the files often have a hash in the publication, 
 however all the links are dead. After a while, that gets annoying,
 so the obvious solution is to write a website that takes out a lof of the work.
 
# Problems

Most DDLs have ephemeral links as in you go to mediafire, 
 but the actual link to the file has to be navigated to and is behind CAPTCHA.
 Therefore downloading the file itself to check the hash and create a link
 in the DB might not be possible.
 
How would one validate links then? Would we have to go the route of JDownloader
 that detects the CAPTCHA and sends it to the user? Would JDownloader itself be used?
 
# How version 1 will work

## 1. Fill DB

 The DB will be filled by either crawling the web or users pasting links into the search.  
 The server will then download the file, calculate hashes (SHA1, MD5, MD6, SHA256, etc.)
  and save those with the link.
  
Restrictions will apply e.g max file size of 100MB and a mux number of simultaneous downloads.

## 2. Search

2 possibilities:

a. user drags and drops a file into an area, it's download onto the server 
 and the hash calculated. A search with the hash is done
 
b. the hash is directly entered / pasted into the search field by the user

# Version 2

It should support hashing by mime-type. MP3s could be hashed using MusicBrainz's lib,
 images by another lib, etc.
 That would allow searching for files that are similar and only differ in certain attributes
  like image size, pitch in music, etc.

Furthermore searches could be "similarity" searches, where a distance to the search term 
 is calculated and the results rated.
 
# Version 3

Tackle the file-hoster problem. Maybe JDownloader provides a command-line lib or
 we could hook into it:

Per download

 - run JDownloader in an Xfvb instance
 - replace the default browser by a script that just saves the URL to the local JD page
   used to solve the CAPTCHA
 - proxy a URL on the webserver to the JD URL e.g /captcha/$ID --> http://localhost:<port>/...
 
With some preconfiguration of JDownloader, it may be possible to know 
 where the file will end up and then do our work of calculating the hashes etc.