const {getCollection} = require("../services/db/connection");
const {
    findOne, insertOneUser, insertManyUsers, updateOne, findMany,
} = require("../services/db/crud");

function createUser(req, res, next) {
    console.log("creation ....");
    res.send("dfsonkjlsdfn");
}

async function findUser(req, res, next) {
    try {
        console.log("Finding ....");
        const result = await findOne("tp2", {"name": "Théo"});
        return res.send(result);
    } catch (e) {
        console.log(e);
    }
}

async function findUsers(req, res, next) {
    try {
        console.log("Finding ....");
        const result = await findMany("tp2", {age: {$lt: 21}});
        return res.send(result);
    } catch (e) {
        console.log(e);
    }
}

async function insertUser(req, res, next) {
    try {
        console.log("Inserting ....");
        const result = await insertOneUser("users",req.body);
        return res.send(result);
    } catch (e) {
        console.log(e);
    }
}

async function insertUsers(req, res, next) {
    try {
        console.log("Inserting ....");
        const tp2 = getCollection("tp2");
        const doc = [
            {name: "theo", healthy: "true"},
            {name: "wow", healthy: "false"},
            {name: "coucou", healthy: "true"},
        ];
        const result = await tp2.insertMany(doc);
        return res.send(result);
    } catch (e) {
        console.log(e);
    }
}

async function updateUser(req, res, next) {
    try {
        console.log("Updating ....");
        const query = {
            person: {
                age: 40,
            },
        };

        const data = {
            $set: {
                person: {
                    name: "Théo",
                    age: 20,
                    lastName: "Massias",
                },
            },
        };

        console.log(data);
        const result = await updateOne("tp2", query, data);
        return res.send(result);
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    createUser,
    findUser,
    insertUser,
    insertUsers,
    updateUser,
    findUsers,
};
