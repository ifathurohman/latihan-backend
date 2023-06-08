const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    database: 'latihan-backend2',
    host: 'localhost',
    username: 'root',
    password: '',
    dialect: 'mysql'
});

(async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been establihsed successfully');
    } catch (error) {
      console.log('Unable to connect to the database', error );
    }
})();

module.exports = sequelize;