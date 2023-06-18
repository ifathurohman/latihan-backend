require('./config/mongoose');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

// const router = require('./app/user/routes');
// const router2 = require('./app/userv2/routes');
const router3 = require('./app/userv3/routes');
const router4 = require('./app/userv4/routes');
const logger = require('morgan');

app.use(cors());
app.use(logger('dev'));
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use('/public', express.static(path.join(__dirname,'uploads')));
// app.use('/api/v1',router);
// app.use('/api/v2', router2);
app.use('/api/v3', router3);
app.use('/api/v4', router4);
app.use((req, res, next) => {
    res.status(404);
    res.send({
        status: 'Failed',
        message: 'Resource' + req.originalUrl + ' not found'
    })
})
app.listen(3000, () => console.log('Server:http://localhost:3000'))