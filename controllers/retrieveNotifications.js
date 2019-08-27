const { capitalizeFirstLetter,  validateEmail } = require('../utils/index');
const db = require('../db/db.config.js');
const Student = db.student;
const Teacher = db.teacher;
const Teacher_Student = db.teacher_student;

const retrieveNotifications = async (req, res) => {

    let teacherEmail = req.body.teacher;
    let notification = req.body.notification;

    if (!teacherEmail) {
        res.status(404).jsonp({"success": false, "message": "Teacher Email Not Found"});;
        return;
    }

    if (!validateEmail(teacherEmail)) {
        res.status(404).jsonp({"success": false, "message": "Teacher Email Incorrect Format"});
        return;
    }

    if (!notification) {
        res.status(404).jsonp({"success": false, "message": "Notification Not Found"});
        return;
    }


    let notificationArray = notification.split(" ");
    let notificationEmails = [];

    notificationArray.forEach(email => {
        if (email.indexOf('@') === 0){
            notificationEmails.push(email.slice(1))
        }
    });
    //console.log(notificationEmails)

    try{
        const isRegister = await Teacher.findOne(
            { 
                where: { email: teacherEmail }
            }
        );
        if(!isRegister){
            res.status(404).jsonp({"success": false, "message": "Teacher Email Not Registered"});
        }

        const students = await Student.findAll({
            include: [
                {
                    model: Teacher, 
                    as: 'teacher',
                    where: { 
                        email: teacherEmail,
                    },
                }
            ],
            where: {
                is_suspend: 0
            },
            attributes: ['id', 'email']
        });

        console.log("Students: ", students)
        let studentsArray = [];

        if(students.length > 0) {
            for(i in students){
                studentsArray.push(students[i].dataValues.email);
            }
            studentsArray.push(...notificationEmails);
        }

        //Eliminate duplicated emails
        const notificationStudents = studentsArray.filter((e,i) => studentsArray.indexOf(e) === i);

        res.jsonp({
            students: notificationStudents
        });

    } catch(error) {
        console.error(error)
    }
}

module.exports = {
    retrieveNotifications
}