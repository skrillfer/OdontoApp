require('dotenv').config();

module.exports = {
    development: {
        username: 'MYSQL_USER',
        password: 'MYSQL_PASSWORD',
        database: 'database_development',
        host: 'mysql_db',
        dialect: 'mysql'
    },
    "production": {
        username: 'MYSQL_USER',
        password: 'MYSQL_PASSWORD',
        database: 'database_development',
        host: 'mysql_db',
        "dialect": "mysql"
    }
}