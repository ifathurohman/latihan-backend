const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const UserController = require('./controller');

router.get('/user', UserController.index);
router.get('/user/:id', UserController.view);
router.post('/user/', upload.single('image'), UserController.store);
router.put('/user/:id', upload.single('image'), UserController.update);
router.delete('/user/:id', upload.single('image'), UserController.destroy);

module.exports = router;