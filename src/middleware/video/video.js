"use strict";
require('dotenv').config();
const {google}= require('googleapis');

const apiKey= process.env.API_KEY
console.log(apiKey)
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
      part: 'contentDetails,snippet',
      id: getVideoID(url),
      maxResults: 10
    });
    // console.log(response.data.items);
    return response.data.items
  } catch (error) {
    console.error('Error testing YouTube API: ', error);
  }
}
// getVideoID('https://www.youtube.com/watch?v=n61ULEU7CO0')
// YouTubeAPI('https://www.youtube.com/watch?v=n61ULEU7CO0');
module.exports = {youTubeAPI};
