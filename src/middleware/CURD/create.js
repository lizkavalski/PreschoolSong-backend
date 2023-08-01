require('../../models/index');
const { youTubeAPI } = require('../video/video');

async function YoutubeHandleCreate(req, res) {
  try {
    console.log(`this the youtube url${req.body.url}`)
    let dataAPI = await youTubeAPI(req.body.url)
    let userInput = req.body
    let apiInput=dataAPI[0]
    let newRecord = await req.model.create({
      title:apiInput.videoTitle,
      by: apiInput.channelName,
      category: userInput.category,
      url: userInput.url,
      image:apiInput.thumbnails

    });
    let message = {
      message: '"“bippity boppity boo.”- Fairy Godmother (Cinderella.)',
      newRecord,
    };
    res.status(201).json(message);
  }catch (error) {
    console.error('Error creating and storing new data:', error);
    res.status(500).json(error);
    throw error;
  }


}
async function handleCreate(req,res){
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  let message={
    message: '"“bippity boppity boo.”- Fairy Godmother (Cinderella.)',
    newRecord,
  }
  res.status(201).json(message);
}

async function modelCreate(req,res){
  // console.log('this is module', req.url)
  if(req.url === '/song'){
    console.log(`I'm in `)
    YoutubeHandleCreate(req,res)
  }else{
    handleCreate(req,res)
  }
}

module.exports={handleCreate, YoutubeHandleCreate, modelCreate} 