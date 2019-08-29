const env = require("./env.js"); // remove this and use process.env

// call the variables in .env by the following

const Sequelize = require('sequelize');
// const sequelize = new Sequelize(DATABASE, DBUSERNAME, DBPASSWORD, {
//   host: SQLHOST,
//   port: SQLPORT,
//   dialect: DIALECT,
//   timezone: TIMEZONE,
//   pool: {
//     max: parseInt(DBPOOL_MAX),
//     min: parseInt(DBPOOL_MIN),
//     acquire: DBPOOL_ACQUIRE,
//     idle: DBPOOL_IDLE
//   }
// });

const sequelize = new Sequelize(env.development.database, env.development.username, env.development.password, {
  host: env.development.host,
  port: env.development.port,
  dialect: env.development.dialect,
  //operatorsAliases: false,
  timezone: env.development.timezone,
  pool: {
    max: env.development.max,
    min: env.development.pool.min,
    acquire: env.development.pool.acquire,
    idle: env.development.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.teacher = require('../model/teacher.model.js')(sequelize, Sequelize);
db.student = require('../model/student.model.js')(sequelize, Sequelize);
db.teacher_student = require('../model/teacher_student.model.js')(sequelize, Sequelize);

db.teacher.associate(db);
db.student.associate(db);

module.exports = db;