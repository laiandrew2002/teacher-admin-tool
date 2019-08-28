
const {
    DEV_DATABASE,
    DEV_DB_USERNAME,
    DEV_DB_PASSWORD,
    DEV_SQL_HOST,
    DEV_SQL_PORT,
    TIMEZONE,
  } = process.env;

// const env = {
//     development: {
//         database: DEV_DATABASE,
//         username: DEV_DB_USERNAME,
//         password: DEV_DB_PASSWORD,
//         host: DEV_SQL_HOST,
//         port: DEV_SQL_PORT,
//         dialect: 'mysql',
//         timezone: TIMEZONE,
//         pool: {
//             max: 5,
//             min: 0,
//             acquire: 30000,
//             idle: 10000
//         }
//     }
// }

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