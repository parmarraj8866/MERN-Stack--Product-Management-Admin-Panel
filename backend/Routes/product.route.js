const { store, index } = require('../Controller/product.controller')
const upload = require("../middleware/upload")

const router = require('express').Router()

router
.route('/')
.post(upload.single('p_image') ,store)
.get(index)

module.exports = router