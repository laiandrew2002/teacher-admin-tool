
//const env = require('./env.js');

const env = require("./env.js"); // remove this and use process.env

// call the variables in .env by the following
const {
  DATABASE,
  DBUSERNAME,
  DBPASSWORD,
  SQLHOST,
  SQLPORT,
  DIALECT,
  TIMEZONE,
  DBPOOL_MAX,
  DBPOOL_MIN,
  DBPOOL_ACQUIRE,
  DBPOOL_IDLE
} = process.env;

const Sequelize = require('sequelize');
// const sequelize = new Sequelize(DATABASE, DBUSERNAME, DBPASSWORD, {
//   host: SQLHOST,
//   port: SQLPORT,
//   dialect: DIALECT,
//   operatorsAliases: false,
//   timezone: TIMEZONE,
//   pool: {
//     max: parseInt(DBPOOL_MAX),
//     min: parseInt(DBPOOL_MIN),
//     acquire: DBPOOL_ACQUIRE,
//     idle: DBPOOL_IDLE
//   }
// });

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  port: env.port,
  dialect: env.dialect,
  operatorsAliases: false,
  timezone: env.timezone,
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// //Models/tables
db.teacher = require('../model/teacher.model.js')(sequelize, Sequelize);
db.student = require('../model/student.model.js')(sequelize, Sequelize);
db.teacher_student = require('../model/teacher_student.model.js')(sequelize, Sequelize);

db.teacher.associate(db);
db.student.associate(db);

module.exports = db;