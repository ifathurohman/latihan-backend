const fs = require('fs');
const path = require('path');
const User = require('./model');
const {ObjectId} = require('mongodb');

const index = async (req, res) => {
  const {search} = req.query;
  if (search) {
    await User.findOne({
      Name: search,
    })
      .then(result => res.send(result))
      .catch(error => res.send(error));
  } else {
    await User.find()
      .then(result => res.send(result))
      .catch(error => res.send(error));
  }
};

const view = async (req, res) => {
  const {id} = req.params;
  User.findOne({_id: new ObjectId(id)})
    .then(result => res.send(result))
    .catch(error => res.send(error));
};

const store = (req, res) => {
  const {UserID, CompanyID, Name, Email, Username, Password} = req.body;
  const Image = req.file;
  try {
    if (Image) {
      const target = path.join(__dirname, '../../uploads', Image.originalname);
      fs.renameSync(Image.path, target);
      User.create({
        UserID,
        CompanyID,
        Name,
        Email,
        Username,
        Password,
        Image: `http://localhost:3000/public/${Image.originalname}`,
      })
        .then(result =>
          res.status(200).json({
            status: true,
            message: 'User Added successfully.',
            data: result,
          }),
        )
        .catch(error =>
          res.status(400).json({
            errorMessage: error.errors,
            status: false,
          }),
        );
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false,
    });
  }
};

const update = async (req, res) => {
  const {UserID, CompanyID, Name, Email, Username, Password} = req.body;
  const Image = req.file;
  try {
    if (Image) {
      const target = path.join(__dirname, '../../uploads', Image.originalname);
      fs.renameSync(Image.path, target);
      User.updateOne({
        UserID,
        CompanyID,
        Name,
        Email,
        Username,
        Password,
        Image: `http://localhost:3000/public/${Image.originalname}`,
      })
        .then(result =>
          res.status(200).json({
            status: true,
            message: 'User Update successfully.',
            data: result,
          }),
        )
        .catch(error =>
          res.status(400).json({
            errorMessage: error.errors,
            status: false,
          }),
        );
    } else {
      User.updateOne({
        UserID,
        CompanyID,
        Name,
        Email,
        Username,
        Password,
      })
        .then(result =>
          res.status(200).json({
            status: true,
            message: 'User Update successfully.',
            data: result,
          }),
        )
        .catch(error =>
          res.status(400).json({
            errorMessage: error.errors,
            status: false,
          }),
        );
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false,
    });
  }
};

const destroy = async (req, res) => {
  const {id} = req.params;
  User.findOneAndRemove({_id: new ObjectId(id)})
    .then(result => res.send(result))
    .catch(error => res.send(error));
};

module.exports = {
  index,
  view,
  store,
  update,
  destroy,
};
