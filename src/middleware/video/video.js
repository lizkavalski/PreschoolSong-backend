"use strict";
const {google}= require('googleapis');

const apiKey= process.env.KEY


const youtube = google.youtube({
  version: 'v3',
  auth: apiKey
});

function getVideoID(str) {
  let last = str.substring(str.lastIndexOf("=") + 1, str.length);
  console.log(last)
  return last;
}


async function testYouTubeAPI() {
  try {
    // Make API requests here
    const response = await youtube.videos.list({
      part: 'contentDetails,snippet',
      id: getVideoID('https://www.youtube.com/watch?v=n61ULEU7CO0'),
      maxResults: 10
    });
    console.log(response.data.items);
  } catch (error) {
    console.error('Error testing YouTube API: ', error);
  }
}
// getVideoID('https://www.youtube.com/watch?v=n61ULEU7CO0')
testYouTubeAPI();
// module.exports = Video;
