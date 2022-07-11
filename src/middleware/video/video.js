"use strict"

class Video {
   getVideoID(str){
      let str= req.body.url
      let last = str.substring(str.lastIndexOf("=") + 1, str.length);
      return last
    };

}

module.exports = Video;

