module.exports = (sequelize, Sequelize) => {
	const teacher_student = sequelize.define('teachers_student', {

	  teachers_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
            model: 'teacher',
            key: 'id'
          }
	  },
	  students_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
            model: 'student',
            key: 'id'
          }
	  },
	  
	});
	
    return teacher_student;
    
}
