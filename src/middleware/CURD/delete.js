
async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  let message = {
    message: '"Danger Will Robinson"--Robot (Lost in Space)',
    deletedRecord,
  };
  res.status(200).json(message);
}

module.exports={handleDelete}