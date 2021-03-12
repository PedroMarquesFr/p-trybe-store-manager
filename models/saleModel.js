const connection = require('./connection');
const { ObjectId } = require('mongodb');

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

const getAll = async () => {
  try {
    const sales = await connection().then((db) => db.collection('sales').find().toArray());
    return { sales };
  } catch (err) {
    console.error(err);
    return { err };
  }
};

const getById = async (id) => {
  try {
    console.log('id', id);
    const sales = await connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
    return sales;
  } catch (err) {
    console.error(err);
    return { err };
  }
};

const edit = async (id, array) => {
  try {
    const sales = await connection().then((db) =>
      db
        .collection('sales')
        .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { itensSold: array } }),
    );
    return sales;
  } catch (err) {
    console.error(err);
    return { err };
  }
};

const del = async (id) => {
  try {
    const deletedResult = await connection().then((db) =>
      db.collection('sales').findOneAndDelete({ _id: ObjectId(id) }),
    );
    console.log(deletedResult);
    return deletedResult;
  } catch (err) {
    console.error(err);
    return { err };
  }
};

module.exports = { add, getAll, getById, edit, del };
