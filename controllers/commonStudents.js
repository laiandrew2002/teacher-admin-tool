const { capitalizeFirstLetter,  validateEmail } = require('../utils/index');
const { errorHandler } = require('../error/index')
const db = require('../db/db.config.js');
const Student = db.student;
const Teacher = db.teacher;
const Teacher_Student = db.teacher_student;


const commonStudents = async (req, res) => {

    let teacherEmails = req.query.teacher;
    console.log(teacherEmails)
    //let result = await errorHandler.validateEmail(teacherEmail, res)
    
    if (!teacherEmails) {
        res.status(404).jsonp({"success": false, "message": "Teacher Email Not Found"});;
        return;
    }

    if(!Array.isArray(teacherEmails)){
        teacherEmails = [teacherEmails];
    }

    let studentArrays = [];    

    if(teacherEmails.length > 0){
        teacherEmails.forEach((email, i) => {
            if (!validateEmail(email)) {
                res.status(404).jsonp({"success": false, "message": "Teacher Email Incorrect Format"});
                return;
            }
        });
    }
    try{

        for(i in teacherEmails){
            const students = await Student.findAll({
                include: [
                    {
                        model: Teacher, 
                        as: 'teacher',
                        where: { 
                            email: teacherEmails[i]
                        }
                    }
                ],
                attributes: ['id', 'email']
            })
            //console.log("result: ", students.length)
            let studentArray = students.map(e => e.dataValues.email);
            studentArrays.push(studentArray);
        }
    } catch(error){
        console.log(error)
    }

    
    console.log("array: ", studentArrays)

    //Find the common students among teachers
    const commonStudentArray =  studentArrays.shift().filter(v => {
        return studentArrays.every(a => {
            return a.indexOf(v) !== -1;
        });
    });

    res.json({students: commonStudentArray});
}

module.exports = {
    commonStudents
}