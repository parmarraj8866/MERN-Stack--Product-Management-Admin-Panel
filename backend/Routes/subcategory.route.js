const { store, index } = require('../Controller/subcategory.controller')

const router = require('express').Router()

router
.route('/')
.post(store)
.get(index)

module.exports = router