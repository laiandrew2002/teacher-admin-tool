const { capitalizeFirstLetter,  validateEmail } = require('../utils/index');
const db = require('../db/db.config.js');
const Student = db.student;
const Teacher = db.teacher;
const Teacher_Student = db.teacher_student;

const register = async (req, res) => {
    
    let teacherEmail = req.body.teacher;
    let studentsEmails = req.body.students;

    if (!teacherEmail) {
        return res.status(404).jsonp({"success": false, "message": "Teacher Email Not Found"});;
    }

    if (!validateEmail(teacherEmail)) {
        return res.status(404).jsonp({"success": false, "message": "Teacher Email Incorrect Format"});
    }

    if (!studentsEmails.length) {
        return res.status(404).jsonp({"success": false, "message": "Student Not Found"});
    }

    let studentNamesArray = [];
    let studentEmailsArray = [];

    if(studentsEmails.length > 0){
        studentsEmails.forEach((e,i) => {
            if (!validateEmail(e)) {
                return res.status(404).jsonp({"success": false, "message": "Student Email Incorrect Format"});
            }
            let studentName  = capitalizeFirstLetter(e.split('@')[0]);
            let studentEmail = e;
            studentNamesArray.push(studentName);
            studentEmailsArray.push(studentEmail);
        });
    }

    let teacherName = capitalizeFirstLetter(teacherEmail.split('@')[0]);
    try{
        const insertTeacher = await Teacher.findOrCreate({
            where:{name: teacherName,},
            defaults:{email: teacherEmail}
        });

            //console.log("insertTeacher: ", insertTeacher[0].dataValues.id)
            const teacherId = insertTeacher[0].dataValues.id;
        
        for( i in studentNamesArray ) {
            const insertStudent = await Student.findOrCreate({
                where: { name: studentNamesArray[i] },
                defaults: { email: studentEmailsArray[i], is_suspend: 0 }
            })

            //console.log("insertStudent: ", insertStudent[0].dataValues.id)

            const studentId = insertStudent[0].dataValues.id;
            const insertrelation = await Teacher_Student.findOrCreate({
                where: {
                    teachers_id: teacherId,
                    students_id: studentId
                }
            });
            //console.log("insert: ", insertrelation)
            return res.status(204).jsonp();
            
        }

    } catch (error) {
        //console.log(error)
    }
}

module.exports = {
    register
}