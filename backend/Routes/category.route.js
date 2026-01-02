const { store, index } = require('../Controller/category.controller')

const router = require('express').Router()

router
.route('/')
.post(store)
.get(index)

module.exports = router