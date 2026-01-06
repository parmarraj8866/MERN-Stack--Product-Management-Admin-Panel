const { signup } = require("../Controller/user.controller")

const router = require("express").Router()

router.post("/signup", signup)

module.exports = router