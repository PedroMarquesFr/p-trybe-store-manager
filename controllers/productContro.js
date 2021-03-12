const productServ = require('../services/productServ');
// const productModel = require('../models/productModel');

const add = async (req, res) => {
  const { name, quantity } = req.body;

  const resp = await productServ.add(name, quantity);
  res.status(resp.err ? resp.status : 201).json(resp);
};

const getAll = async (req, res) => {
  productServ.getAll().then((r) => {
    res.json(r);
  });
};

const getById = async (req, res) => {
  const { id } = req.params;
  productServ.getById(id).then((r) => res.status(r.err ? r.status : 200).json(r));
};

const edit = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const resp = await productServ.edit(name, quantity, id);
  res.status(resp.err ? resp.status : 200).json(resp);
};

const del = async (req, res) => {
  const { id } = req.params;
  const resp = await productServ.del(id);
  res.status(resp.err ? resp.status : 200).json(resp);
};

module.exports = { add, getAll, getById, edit, del };
