const fs = require('fs');
const path = require('path');
const db = require('../../config/mongo');
const {ObjectId} = require('mongodb');

const index = async (req, res) => {
  db.collection('user')
    .find()
    .toArray()
    .then(result => res.send(result))
    .catch(error => res.send(error));
};

const view = async (req, res) => {
  const {id} = req.params;
  db.collection('user')
    .findOne({_id: new ObjectId(id)})
    .then(result => res.send(result))
    .catch(error => res.send(error));
};

const store = (req, res) => {
  const {UserID, CompanyID, Name, Email, Username, Password} = req.body;
  const Image = req.file;
  if (Image) {
    const target = path.join(__dirname, '../../uploads', Image.originalname);
    fs.renameSync(Image.path, target);
    db.collection('user')
      .insertOne({
        UserID,
        CompanyID,
        Name,
        Email,
        Username,
        Password,
        Image: `htttp://localhost:3000/public/${Image.originalname}`,
      })
      .then(result => res.send(result))
      .catch(error => res.send(error));
  }
};

const update = async (req, res) => {
  const {CompanyID, Name, Email, Username, Password} = req.body;
  const Image = req.file;
  if (Image) {
    const target = path.join(__dirname, '../../uploads', Image.originalname);
    fs.renameSync(Image.path, target);
    db.collection('user')
      .insertOne({
        UserID,
        CompanyID,
        Name,
        Email,
        Username,
        Password,
        Image: `htttp://localhost:3000/public/${Image.originalname}`,
      })
      .then(result => res.send(result))
      .catch(error => res.send(error));
  } else {
    db.collection('user')
      .updateOne({
        UserID,
        CompanyID,
        Name,
        Email,
        Username,
        Password,
      })
      .then(result => res.send(result))
      .catch(error => res.send(error));
  }
};

module.exports = {
  index,
  view,
  store,
  update,
};
