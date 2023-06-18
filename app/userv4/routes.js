const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload'});
const userController = require('./controller');

router.get('/user', userController.index);
router.get('/user/:id', userController.view);
router.post('/user/', upload.single('Image'), userController.store);
router.put('/user/:id', upload.single('Image'), userController.update);
router.delete('/user/:id', upload.single('Image'), userController.destroy);

module.exports = router;
