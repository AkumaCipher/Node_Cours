const express = require("express");
const router = express.Router();
const {findUser, findUsers, insertUser, insertUsers, updateUser} = require("../controllers/users");

router.get("/find", findUser);

router.get("/findUsers", findUsers)

router.post("/create", insertUser);

router.post("/insertMultiple", insertUsers);

router.get("/update", updateUser);

module.exports = router;