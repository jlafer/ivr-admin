var express = require('express');
var router = express.Router();
var organizationController = require('../controllers/organizationController');

const {create, list, getById, fetchOne, patchOne, deleteOne} = organizationController;

router.post('/', create);
router.get('/', list);
router.get('/:id', getById, fetchOne);
router.patch('/:id', getById, patchOne);
router.delete('/:id', getById, deleteOne);

module.exports = router;
