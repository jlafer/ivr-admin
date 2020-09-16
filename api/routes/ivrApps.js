var express = require('express');
var router = express.Router({ mergeParams: true });
var ivrAppController = require('../controllers/ivrAppController');

const {create, list, getById, fetchOne, patchOne, deleteOne} = ivrAppController;

router.post('/', create);
router.get('/:id', getById, fetchOne);
router.get('/', list);
router.patch('/:id', getById, patchOne);
router.delete('/:id', getById, deleteOne);

module.exports = router;
