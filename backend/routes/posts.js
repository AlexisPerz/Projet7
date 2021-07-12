const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/posts');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, postCtrl.getAllPosts);
router.post('/', auth, multer, postCtrl.createPosts);
router.get('/:id', auth, postCtrl.getOnePosts);
router.put('/:id', auth, multer, postCtrl.modifyPosts);
router.delete('/:id', auth, postCtrl.deletePosts);

module.exports = router;