const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comments');
const auth = require('../middleware/auth');

router.post('/', auth, commentCtrl.createComments);
router.put('/:id', auth, commentCtrl.modifyComments);
router.delete('/:id', auth, commentCtrl.deleteComments);

module.exports = router;