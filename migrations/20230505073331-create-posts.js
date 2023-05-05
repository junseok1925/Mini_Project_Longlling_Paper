'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      postId: {
				allowNull: false,     // 값이 비어있는 걸 허용하지 않는다 (Null을 허용하지 않는다.)
				autoIncrement: true,  // 자동으로 값이 증가, 해당 컬럼이 기본키(Primary Key)일 경우 자동으로 1씩 증가. 즉, 레코드의 식별자로 사용되기 위해
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			UserId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				reference: {
					model: "Users",
					key: "userId",
				},
				onDelete: "CASCADE",
			},
			nickname: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			title: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			content: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,              
				defaultValue: Sequelize.fn("now"),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("now"),
			},
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};