'use strict';
module.exports = (sequelize, Sequelize) => {
	const student = sequelize.define('student', {
	  name: {
		type: Sequelize.STRING,
		allowNull: false,
	  },
	  email: {
		type: Sequelize.STRING,
		allowNull: false,
	  },
	  is_suspend: {
		  type: Sequelize.TINYINT,
		  allowNull: false,
	  }
	});
	student.associate = (models) => {
		student.belongsToMany(models.teacher, {
			through: 'teachers_student',
			as: 'teacher',
			foreignKey: 'students_id',
			onDelete: 'CASCADE'
		})
	}
	return student;
}

