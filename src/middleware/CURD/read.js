async function handleGetAll(req, res) {
  let allRecords = await req.model.get();
  let message = {
    message: '"“Aw, you guys made me ink.”- Pearl (Finding Nemo.)',
    allRecords,
  };

  res.status(201).json(message); 
}
async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.get(id);
  let message = {
    message:
      '"Magic Mirror on the wall, who is the fairest one of all?”- Queen (Snow White and the Seven Drawfs)',
    theRecord,
  };
  res.status(201).json(message);
}

module.exports={handleGetAll, handleGetOne}