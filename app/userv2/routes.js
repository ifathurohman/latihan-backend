const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const UserControllerv2 = require('./controller');

router.get('/user', UserControllerv2.index);
router.get('/user/:id', UserControllerv2.view);
router.post('/user/', upload.single('Image'), UserControllerv2.store);
router.put('/user/:id', upload.single('Image'), UserControllerv2.update);
router.delete('/user/:id', upload.single('Image'), UserControllerv2.destroy);

module.exports = router;

