const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const add = async (productsArray) => {
  try {
    const result = await connection().then((db) =>
      db.collection('sales').insertOne({ itensSold: productsArray }),
    );
    // console.log(result);
    return { ...result.ops[0] };
  } catch (err) {
    console.error(err);
    return { err };
  }
};

module.exports = { add };
