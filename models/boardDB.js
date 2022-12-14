const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: Sequelize.STRING(100),
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Post',
        tableName: 'Posts',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }
  static associate(db) {
    db.Post.belongsTo(db.userdata, {
      foriegnKey: 'userdatumId',
      targetKey: 'id',
    }); //부모 릴레이션인 users의 id를 자식릴레이션인 posts에서 UserId라는 컬럼으로 사용하고 이는 외래키임.
  }
};
