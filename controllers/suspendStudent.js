const { capitalizeFirstLetter,  validateEmail } = require('../utils/index');
const db = require('../db/db.config.js');
const Student = db.student;

const suspendStudent = async (req, res) => {
    // let teacherEmail = req.body.teacher;
    let studentsEmail = req.body.student;
    
    if (!studentsEmail.length) {
        res.status(404).jsonp({"success": false, "message": "Student Not Found"});
        return;
    }
    
    if (!validateEmail(studentsEmail)) {
        res.status(404).jsonp({"success": false, "message": "Student Email Incorrect Format"});
        return;
    }
    
    try{
        const isRegister = await Student.findOne(
            { 
                where: { email: studentsEmail }
            }
        )
        if(!isRegister){
            res.status(404).jsonp({"success": false, "message": "Student Email Not Registered"});
        }
        const result = await Student.update(
            {is_suspend: 1},
            {where: {email: studentsEmail}}
        )
        res.status(204).send()
        console.log("result: ",result)
    }catch(err){
        console.log(err)
    }
    
}

module.exports = {
    suspendStudent
}