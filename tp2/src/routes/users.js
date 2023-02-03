const express = require("express");
const router = express.Router();
const {createUser, findUser, findUsers, insertUser, insertUsers, updateUser} = require("../controllers/users");

router.get("/create", createUser);

router.get("/find", findUser);

router.get("/findUsers", findUsers)

router.get("/insert", insertUser);

router.get("/insertMultiple", insertUsers);

router.get("/update", updateUser);

module.exports = router;