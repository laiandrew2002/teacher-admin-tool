const express = require('express');
const router = express.Router();

const registerController = require('../controllers/register');
const commonstudentsController = require('../controllers/commonStudents');
const suspendController = require('../controllers/suspendStudent');
const retrievenotificationsController = require('../controllers/retrieveNotifications');


router.post('/register', registerController.register);

router.get('/commonstudents', commonstudentsController.commonStudents);

router.post('/suspend', suspendController.suspendStudent);

router.post('/retrievefornotifications', retrievenotificationsController.retrieveNotifications);

module.exports = app => {
    app.use("/api", router);
  };
