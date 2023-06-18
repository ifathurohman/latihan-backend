const mongoose = require('mongoose');
mongoose.connect('mongodb://latihan:123@0.0.0.0:27017/latihan_mongo?authSource=admin');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Server database terhubung'));