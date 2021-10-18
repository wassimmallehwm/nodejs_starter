const express = require('express');
const { create, update, findAll, findOne, remove } = require('../controllers/role.controller');
const {auth, admin,} = require('../middleware/auth');
const router = express.Router();

router.post('/create', auth, admin, create);

router.put('/update', auth, admin, update);

router.get('/findAll', auth, admin, findAll);

router.get('/findOne/:id', auth, admin, findOne);

router.delete('/remove/:id', auth, admin, remove);

module.exports = router;