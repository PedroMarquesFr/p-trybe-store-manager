const saleModel = require('../models/saleModel');
const productModel = require('../models/productModel');
const errMessage = require('./serializeErrorMessage');

var checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');

const add = async (itensSoldArray) => {
  for (let index = 0; index < itensSoldArray.length; index++) {
    if (
      !Number.isInteger(itensSoldArray[index].quantity) ||
      itensSoldArray[index].quantity <= 0 ||
      !checkForHexRegExp.test(itensSoldArray[index].productId)
    )
      return errMessage('invalid_data', 'Wrong product ID or invalid quantity', 422);

    const doesProductWithIdExists = await productModel.getById(itensSoldArray[index].productId);

    if (!doesProductWithIdExists)
      return errMessage('invalid_data', 'Wrong product ID or invalid quantity', 422);
  }
  const resp = await saleModel.add(itensSoldArray);
  return resp;
};

const getById = async (id) => {
  if (!checkForHexRegExp.test(id)) return errMessage('not_found', 'Sale not found', 404);
  const doesSaleWithIdExists = await saleModel.getById(id);
  if (!doesSaleWithIdExists) return errMessage('not_found', 'Sale not found', 404);
  return doesSaleWithIdExists;
};

const edit = async (idSale, itensSoldArray) => {
  if (!checkForHexRegExp.test(idSale))
    return errMessage('invalid_data', 'Wrong product ID or invalid quantity', 422);
  for (let index = 0; index < itensSoldArray.length; index++) {
    if (!Number.isInteger(itensSoldArray[index].quantity) || itensSoldArray[index].quantity <= 0)
      return errMessage('invalid_data', 'Wrong product ID or invalid quantity', 422);

    const doesProductWithIdExists = await productModel.getById(itensSoldArray[index].productId);
    if (!doesProductWithIdExists)
      return errMessage('invalid_data', 'Wrong product ID or invalid quantity', 422);
  }
  const attItem = await saleModel.edit(idSale, itensSoldArray);
  return attItem.ok
    ? { _id: idSale, itensSold: itensSoldArray }
    : errMessage('invalid_data', 'Wrong product ID or invalid quantity', 422);
};

const del = async (idSale) => {
  if (!checkForHexRegExp.test(idSale)) return errMessage('invalid_data', 'Wrong sale ID format', 422);
  const wasSaleDeleted = await saleModel.del(idSale);
  return wasSaleDeleted.value?wasSaleDeleted.value:errMessage('invalid_data', 'Wrong sale ID format', 422);
};

module.exports = { add, getById, edit, del };
