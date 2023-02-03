const { getCollection } = require("./connection");

async function findOne(collectionName, query, options = {}) {
  try {
    const collection = getCollection(collectionName);
    const result = await collection.findOne(query, options);
    return result;
  } catch (e) {
    console.log(
      `Erreur lors de l execution de la fonction findOne avec les parametres suivants: ${query}`
    );
    console.log(e);
    throw e;
  }
}

async function findMany(collectionName, query, options = {projection: {_id:0}}) {
  try {
    const collection = getCollection(collectionName);

    const cursor = await collection.find(query, options);

    const result = [];

    console.log(cursor);

    await cursor.forEach((item) => result.push(item));
    
    console.log(result);

    return result;
  } catch (e) {
    console.log(
      `Erreur lors de l execution de la fonction findOne avec les parametres suivants: ${query}`
    );
    console.log(e);
    throw e;
  }
}

async function insertOne(collectionName, query, options = {}) {
    try {
      const collection = getCollection(collectionName);
      const result = await collection.insertOne(query, options);
      return result;
    } catch (e) {
      console.log(
        `Erreur lors de l execution de la fonction insertOne avec les parametres suivants: ${query}`
      );
      console.log(e);
      throw e;
    }
  }

  async function insertMany(collectionName, documents, options = {}) {
    try {
      const collection = getCollection(collectionName);
      const result = await collection.insertMany(documents);
      return result;
    } catch (e) {
      console.log(
        `Erreur lors de l execution de la fonction insertMany avec les parametres suivants: ${query}`
      );
      console.log(e);
      throw e;
    }
  }

  async function updateOne(collectionName, filter, document, options = {upsert: false}) {
    try {
      const collection = getCollection(collectionName);
      const result = await collection.updateOne(filter, document, options);
      return result;
    } catch (e) {
      console.log(
        `Erreur lors de l execution de la fonction updateOne avec les parametres suivants: ${filter}, ${document}.`
      );
      console.log(e);
      throw e;
    }
  }

module.exports = {
  findOne,
  findMany,
  insertOne,
  insertMany,
  updateOne,
};
