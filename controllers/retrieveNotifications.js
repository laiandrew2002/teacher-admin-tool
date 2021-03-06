const { validateEmail, removeDuplicate } = require('../utils/index');
const db = require('../db/db.config.js');
const Student = db.student;
const Teacher = db.teacher;
const Teacher_Student = db.teacher_student;

const retrieveNotifications = async (req, res) => {

  let teacherEmail = req.body.teacher;
  let notification = req.body.notification;

  if (!teacherEmail) {
    return res.status(404).jsonp({"success": false, "message": "Teacher Email Not Found"});;
  }

  if (!validateEmail(teacherEmail)) {
    return res.status(404).jsonp({"success": false, "message": "Teacher Email Incorrect Format"});
  }

  if (!notification) {
    return res.status(404).jsonp({"success": false, "message": "Notification Not Found"});
  }

  let notificationArray = notification.split(" ");
  let notificationEmails = [];

  notificationArray.forEach(email => {
    if (email.indexOf('@') === 0) {
      notificationEmails.push(email.slice(1));
    }
  });

  try{
    const isRegister = await Teacher.findOne(
      { 
        where: { email: teacherEmail }
      }
    );
    if(!isRegister){
      return res.status(404).jsonp({"success": false, "message": "Teacher Email Not Registered"});
    }

    const students = await Student.findAll({
      include: [
        {
          model: Teacher, 
          as: 'teacher',
          where: { email: teacherEmail },
        }
      ],
      where: { is_suspend: 0 },
      attributes: ['id', 'email']
    });

    //console.log("Students: ", students)
    let studentsArray = [];

    if(students.length > 0) {
      for(i in students) {
        studentsArray.push(students[i].dataValues.email);
      }
      studentsArray.push(...notificationEmails);
    }

    //Eliminate duplicated emails
    const notificationStudents = await removeDuplicate(studentsArray);

    return res.jsonp({
      students: notificationStudents
    });
  } catch(error) {
    throw error;
  }
}

module.exports = {
  retrieveNotifications
}