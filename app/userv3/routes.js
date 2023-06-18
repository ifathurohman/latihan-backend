const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload'});
const userController = require('./controller');

router.get('/user', userController.index);
router.get('/user/:id', userController.view);
router.post('/user/', upload.single('Image'), userController.store);

module.exports = router;