const { capitalizeFirstLetter,  validateEmail } = require('../utils/index');
const db = require('../db/db.config.js');
const Student = db.student;

const suspendStudent = async (req, res) => {

    let studentsEmail = req.body.student;
    
    if (!studentsEmail) {
        return res.status(404).jsonp({"success": false, "message": "Student Not Found"});
    }
    
    if (!validateEmail(studentsEmail)) {
        return res.status(404).jsonp({"success": false, "message": "Student Email Incorrect Format"});
    }
    
    try{
        const isRegister = await Student.findOne(
            { 
                where: { email: studentsEmail }
            }
        )
        if(!isRegister){
            return res.status(404).jsonp({"success": false, "message": "Student Email Not Registered"});
        }
        const result = await Student.update(
            {is_suspend: 1},
            {where: {email: studentsEmail}}
        )
        return res.status(204).jsonp()
        
    }catch(err){
        //console.log(err)
    }
}

module.exports = {
    suspendStudent
}