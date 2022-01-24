const Sequelize = require("sequelize");

var sequelize = new Sequelize('books','MYSQL_USER', 'MYSQL_PASSWORD', {
    host: 'mysql_db',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});

sequelize
    .authenticate()
    .then(function (err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });
    
module.exports.sequelize = sequelize;

//export default sequelize;