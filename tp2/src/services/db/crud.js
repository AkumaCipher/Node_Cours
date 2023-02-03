const {getCollection} = require("./connection");

async function findOne(collectionName, query, options = {}) {
    try {
        const collection = getCollection(collectionName);
        return await collection.findOne(query, options);
    } catch (e) {
        console.log(
            `Erreur lors de l execution de la fonction findOne avec les parametres suivants: ${query}`
        );
        console.log(e);
        throw e;
    }
}

async function findMany(collectionName, query, options = {projection: {_id: 0}}) {
    try {
        const collection = getCollection(collectionName);

        const cursor = await collection.find(query, options);

        const result = [];

        await cursor.forEach((item) => result.push(item));

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
        return await collection.insertOne(query, options);
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
        return await collection.insertMany(documents);
    } catch (e) {
        console.log(
            `Erreur lors de l execution de la fonction insertMany avec les parametres suivants: ${documents}`
        );
        console.log(e);
        throw e;
    }
}

async function updateOne(collectionName, filter, document, options = {upsert: false}) {
    try {
        const collection = getCollection(collectionName);
        return await collection.updateOne(filter, document, options);
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
