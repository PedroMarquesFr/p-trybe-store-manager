const saleServ = require('../services/saleServ');
const saleModel = require('../models/saleModel');

const add = (req, res) => {
  const salesArray = req.body;
  saleServ.add(salesArray).then((r) => res.status(r.err ? r.status : 200).json(r));
};

const getAll = (req, res) => {
  saleModel.getAll().then((r) => res.json(r));
};

const getById = (req, res) => {
  const { id } = req.params;
  saleServ.getById(id).then((r) => res.status(r.err ? r.status : 200).json(r));
};

const edit = (req, res) => {
    req.body
    const { id } = req.params;
    saleServ.edit(id,req.body).then((r) => res.status(r.err ? r.status : 200).json(r));
}
const del = (req, res) => {
  const { id } = req.params;
  saleServ.del(id,req.body).then((r) => res.status(r.err ? r.status : 200).json(r));
}
module.exports = { add, getAll,getById, edit, del };
