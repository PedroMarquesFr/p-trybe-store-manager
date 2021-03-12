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

module.exports = { add };
