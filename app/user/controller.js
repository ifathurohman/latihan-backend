const fs = require('fs');
const path = require('path');
const connection = require('../../config/mysql');

const index = (req, res) => {
  const { search } = req.query;
  let exec = {};
  if (search){
    exec = {
      sql : 'SELECT * FROM ut_user WHERE Name Like ?',
      values : [`%${search}%`]
    }
  }else{
    exec = {
      sql: 'SELECT * FROM ut_user',
    }
  }
  connection.query(exec, _response(res));
};

const view = (req, res) => {
  connection.query(
    {
      sql: 'SELECT * FROM ut_user where UserID = ?',
      values: [req.params.id]
    }, _response(res));
};

const store = (req, res) =>{
  const {
    UserID,
    CompanyID,
    Name,
    Email,
    Username,
    Password,
  } = req.body;
  const Image = req.file;
  if(Image){
    const target = path.join(__dirname, '../../uploads', Image.originalname);
    fs.renameSync(Image.path, target);
    connection.query(
      {
        sql: 'INSERT INTO ut_user (UserID, CompanyID, Name, Email, Username, Password, Image) VALUES (?, ?, ?, ?, ?, ?, ?)',
        values: [
          UserID,
          CompanyID,
          Name,
          Email,
          Username,
          Password,
          `htttp://localhost:3000/public/${Image.originalname}`,
        ],
      },
      _response(res),
    );
  }
}

const update = (req, res) => {
  const {CompanyID, Name, Email, Username, Password} = req.body;
  const Image = req.file;
  let sql = '';
  let values = [];
  if (Image) {
    const target = path.join(__dirname, '../../uploads', Image.originalname);
    fs.renameSync(Image.path, target);
    sql =
      `Update ut_user SET CompanyID = ?, Name = ?, Email = ?, Username = ?, Password = ?, Image = ? WHERE UserID = ?`;
    values = [
      CompanyID,
      Name,
      Email,
      Username,
      Password,
      `htttp://localhost:3000/public/${Image.originalname}`,
      req.params.id,
    ];
  } else {
    sql =
      `Update ut_user SET CompanyID = ?, Name = ?, Email = ?, Username = ?, Password = ?  WHERE UserID = ?`;
    values = [CompanyID, Name, Email, Username, Password, req.params.id]; 
  }
  connection.query({sql, values}, _response(res));
}

const destroy = (req, res) => {
  connection.query(
    {
      sql: 'DELETE FROM ut_user where UserID = ?',
      values: [req.params.id],
    },
    _response(res),
  );
};

const _response = (res) => {
    return (error, result) => {
      if (error) {
        res.send({
          status: 'failed',
          response: error,
        });
      } else {
        res.send({
          status: 'success',
          response: result,
        });
      }
    }
}

module.exports = {
    index, view, store, update, destroy
}