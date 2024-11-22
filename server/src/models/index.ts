import sequelize from "../config/connection";
import { UserFactory } from "./users";
import { ArticleFactory } from "./articles";

const User = UserFactory(sequelize);
const Article = ArticleFactory(sequelize);

User.hasMany(Article, {
    onDelete: 'CASCADE',
});

Article.belongsTo(User);

export { sequelize, User, Article };