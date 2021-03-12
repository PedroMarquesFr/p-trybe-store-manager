const saleServ = require('../services/saleServ');

const add = (req, res) => {
  const salesArray = req.body;
  saleServ.add(salesArray).then((r) => res.status(r.err ? r.status : 200).json(r));
};

module.exports = { add };
