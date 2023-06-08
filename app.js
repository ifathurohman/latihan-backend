const express = require('express');
const app = express();
const path = require('path');

const router = require('./app/user/routes');
const router2 = require('./app/userv2/routes');
const logger = require('morgan');

app.use(logger('dev'));
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use('/public', express.static(path.join(__dirname,'uploads')));
app.use('/api/v1',router);
app.use('/api/v2', router2);
app.use((req, res, next) => {
    res.status(404);
    res.send({
        status: 'Failed',
        message: 'Resource' + req.originalUrl + ' not found'
    })
})
app.listen(3000, () => console.log('Server:http://localhost:3000'))