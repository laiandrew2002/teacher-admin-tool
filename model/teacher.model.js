module.exports = (sequelize, Sequelize) => {
	const teacher = sequelize.define('teacher', {
	  name: {
		type: Sequelize.STRING,
		allowNull: false,
	  },
	  email: {
		type: Sequelize.STRING,
		allowNull: false,
	  }
	});
	teacher.associate = (models) => {
		teacher.belongsToMany(models.student, {
			through: 'teachers_student',
			as: 'student',
			foreignKey: 'teachers_id',
			onDelete: 'CASCADE'
		})
	}
	
	return teacher;
}


