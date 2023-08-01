async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj);
  let message = {
    message:
      "“Hockety pockety wockety wack! Odds and ends and bric-a-brac!”- Merlin(The Sword in the Stone)",
    updatedRecord,
  };
  res.status(200).json(message);
}

module.exports={handleUpdate}