 const {song, theme}= require('../../models/index')

async function YoutubeHandleCreate(req, res) {
  try {
    let dataAPI = await youTubeAPI(req.body.url)
    let userInput = req.body
    let apiInput=dataAPI[0]
    let newRecord = await song.create({
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
  let newRecord = await theme.create(obj);
  let message={
    message: '"“bippity boppity boo.”- Fairy Godmother (Cinderella.)',
    newRecord,
  }
  res.status(201).json(message);
}
module.exports={handleCreate, YoutubeHandleCreate} 