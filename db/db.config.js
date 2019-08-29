const env = require("./env.js"); 

const Sequelize = require('sequelize');

const sequelize = new Sequelize(env.development.database, env.development.username, env.development.password, {
  host: env.development.host,
  port: env.development.port,
  dialect: env.development.dialect,
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