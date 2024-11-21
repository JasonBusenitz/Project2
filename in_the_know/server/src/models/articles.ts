import {
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
    DataTypes,
    type Sequelize,
    type ForeignKey,
} from 'sequelize';

import type { User } from './users.js'

export class Article extends Model<
    InferAttributes<Article>,
    InferCreationAttributes<Article>
> {
    declare id: CreationOptional<number>;
    declare author: string;
    declare title: string;
    declare url: string;
    declare userId: ForeignKey<User['id']>;
}

export function ArticleFactory(sequelize: Sequelize) {
    Article.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            author: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'article',
        }
    );
    return Article;
}