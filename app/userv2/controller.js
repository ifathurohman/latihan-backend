const fs = require('fs');
const path = require('path');
const {Op} = require('sequelize');
const User = require('./model');

const index = async (req, res) => {
  const {search} = req.query;
  let exec = {};
  try {
    if (search) {
      exec = await User.findAll({
        where: {
          Name: {
            [Op.like]: search,
          },
        },
      });
    } else {
      exec = await User.findAll();
    }
    res.send(exec);
  } catch (e) {
    res.send(e);
  }
};

const view = async (req, res) => {
  try {
    const result = await User.findAll({
      where: {
        UserID: req.params.id,
      },
    });
    res.send(result);
  } catch (e) {
    res.send(e);
  }
};

const store = async (req, res) => {
  const {UserID, CompanyID, Name, Email, Username, Password} = req.body;
  const Image = req.file;
  if (Image) {
    const target = path.join(__dirname, '../../uploads', Image.originalname);
    fs.renameSync(Image.path, target);
    try {
      await User.sync();
      const result = await User.create({
        UserID,
        CompanyID,
        Name,
        Email,
        Username,
        Password,
        Image: `htttp://localhost:3000/public/${Image.originalname}`,
      });
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  }
};

const update = async (req, res) => {
  const {CompanyID, Name, Email, Username, Password} = req.body;
  const Image = req.file;
  let exec = {};
  try {
    if (Image) {
      const target = path.join(__dirname, '../../uploads', Image.originalname);
      fs.renameSync(Image.path, target);
      exec = await User.update(
        {
          CompanyID,
          Name,
          Email,
          Username,
          Password,
          Image: `htttp://localhost:3000/public/${Image.originalname}`,
        },
        {
          where: {
            UserID: req.params.id,
          },
        },
      );
    } else {
      exec = await User.update(
        {
          CompanyID,
          Name,
          Email,
          Username,
          Password,
        },
        {
          where: {
            UserID: req.params.id,
          },
        },
      );
    }
    res.send(exec);
  } catch (e) {
    res.send(e);
  }
};

const destroy = async (req, res) => {
  try {
    const result = await User.destroy({
      where: {
        UserID: req.params.id,
      }
    });
    res.send(String(result));
  } catch (e) {
    res.send(e);
  }
};

module.exports = {
  index,
  view,
  store,
  update,
  destroy,
};
