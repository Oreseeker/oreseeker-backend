const { verify } = require('../model.js');

module.exports = async function (req, res) {
  const { verificationToken } = req.body;

  const status = await verify(verificationToken);

  if (!status) res.sendStatus(400);
  else res.sendStatus(200);
}
