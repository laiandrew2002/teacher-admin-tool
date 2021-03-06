
const env = {
    development: {
        database: 'school',
        username: 'root',
        password: 'secretpassword',
        host: 'localhost',
        port: '3306',
        dialect: 'mysql',
        timezone: 'Asia/Singapore',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
}

  module.exports = env;