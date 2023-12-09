"use strict";
const dotenv = require('dotenv')
dotenv.config();
const {google}= require('googleapis');

const apiKey= process.env.API_KEY

const youtube = google.youtube({
  version: 'v3',
  auth: apiKey
});

function getVideoID(str) {
  let last = str.substring(str.lastIndexOf("=") + 1, str.length);
  return last;
}


async function youTubeAPI(url){
  console.log('this is the url',url)
  try {
    // Make API requests here
    const response = await youtube.videos.list({
      part: 'snippet',
      id: getVideoID(url),
      maxResults: 10
    });
   console.log("line 27",response.data);
   // Process the search results
   const items = response.data.items;
   const videoDetails = items.map(item => {
    const videoTitle = item.snippet.title;
    const channelName = item.snippet.channelTitle;
    const thumbnails = item.snippet.thumbnails.default.url;
    const youtubeId = item.id

    return {
      videoTitle,
      channelName,
      thumbnails,
      youtubeId
    };
  });

  return videoDetails;
  } catch (error) {
    console.error('Error testing YouTube API: ', error);
  }
}
//  getVideoID('https://www.youtube.com/watch?v=n61ULEU7CO0')
// YouTubeAPI('https://www.youtube.com/watch?v=n61ULEU7CO0');
module.exports = {youTubeAPI};
