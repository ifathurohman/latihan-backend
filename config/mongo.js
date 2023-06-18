const {MongoClient} = require('mongodb');

const url = 'mongodb://latihan:123@0.0.0.0:27017?authSource=admin';
const client = new MongoClient(url);

(async () => {
  try{
    await client.connect();
    console.log('koneksi ke mongodb berhasil');
  }catch(e){
    console.error(e);
  } 
})();

const db = client.db('latihan_mongo');

module.exports = db;