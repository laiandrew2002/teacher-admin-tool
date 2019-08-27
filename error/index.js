const { capitalizeFirstLetter,  validateEmail } = require('../utils/index');

const errorHandler = {
    validateEmail: (email, res) => {
        if (!validateEmail(email)) {
            return res.status(404).jsonp({
                "success": false, "message": "Email Incorrect Format"
            });
            return;
        }
    },

    validateTeacher: (teacher, res) => {
        if(!teacher) {
            return res.status(404).jsonp({"success": false, "message": "Teacher Email Not Found"});;
        }
        return;
    },

} 

module.exports = {errorHandler};