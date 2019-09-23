const express = require('express');
const swaggerUi = require('swagger-ui-express');
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.send({ status: "Teacher Administrative Tool API Running" });
});

//router.get('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = app => {
  app.use("/", router);
};