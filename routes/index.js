const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Teacher Administrative Tool' });
  res.send({status: "Teacher Administrative Tool API Running"})
});

module.exports = app => {
  app.use("/", router);
};