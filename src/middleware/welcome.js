async function datapage(req, res) {
  let message = {
    message: '"There no place like home"- Dorothy(Wizard of Oz)',
  };
  res.status(200).json(message);
}

module.exports = {datapage}