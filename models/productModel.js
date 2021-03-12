const connection = require('./connection');
const { ObjectId } = require('mongodb');

const add = async (name, quantity) => {
  try {
    const result = await connection().then((db) =>
      db.collection('products').insertOne({ name, quantity }),
    );
    return { ...result.ops[0] };
  } catch (err) {
    console.error(err);
    return { err };
  }
};

const getAll = async () => {
  try {
    const result = await connection().then((db) => db.collection('products').find().toArray());
    return result;
  } catch (err) {
    console.error(err);
    return { err };
  }
};

const getByName = async (name) => {
  try {
    const result = await connection().then((db) => db.collection('products').findOne({ name }));
    return result;
  } catch (err) {
    console.error(err);
    return { err };
  }
};

const getById = async (id) => {
  try {
    const result = await connection().then((db) => db.collection('products').findOne(ObjectId(id)));
    return result;
  } catch (err) {
    console.error(err);
    return { err };
  }
};

const edit = async (name, quantity, id) => {
  try {
    const result = await connection().then((db) =>
      db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
    );
    return result;
  } catch (err) {
    console.error(err);
    return { err };
  }
};
const del = async (id) => {
  try {
    const result = await connection().then((db) =>
      db.collection('products').findOneAndDelete({ _id: ObjectId(id) }),
    );
    return result.value;
  } catch (error) {
    console.error(err);
    return { err: 'erro na requisicao' };
  }
};

module.exports = { add, getByName, getAll, getById, edit, del };
