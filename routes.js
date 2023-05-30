const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const fs = require('fs');

router.get('/', (req, res) => {
  const {page, total} = req.query;
  res.send({
    status: 'Successfuly',
    message: 'Welcome to express js tutorial',
    page,
    total
  });
});

router.get('/product/:id', (req, res) => {
    res.send({
        id: req.params.id
    })
})

router.post('/product/', upload.single('image'), (req, res) => {
    const {name, price, stock, status} = req.body;
    const {image} = req.file;
    if(image){
        const target = path.join(__dirname, 'uploads', image.originalname);
        // fs.renameSync(image.path, target);
        res.sendFile(target);
        res.json({
            name, price, stock, status, image
        });
    }
})

router.get('/category/:tag', (req, res) => {
    const {category, tag} = req.params;
    res.send({
        category: category,
        tag: tag
    })
})

module.exports = router;