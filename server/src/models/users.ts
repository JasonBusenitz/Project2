import {
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    DataTypes,
    type Sequelize,
} from 'sequelize';
import bcrypt from 'bcrypt';

export class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
> {
    declare id: number;
    declare username: string;
    declare email: string;
    declare password: string;

    async setPassword(newPassword: string): Promise<void> {
        this.password = await bcrypt.hash(newPassword, 10);
    }

    async checkPassword(loginPw: string): Promise<boolean> {
        const result = await bcrypt.compare(loginPw, this.password);
        return result;
    }
}

export function UserFactory(sequelize: Sequelize) {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Please enter a password',
                    },
                    len: {
                        args: [8, 20],
                        msg: 'Your password must be between 8 and 20 characters long',
                    },
                },
            },
        },
        {
            hooks: {
                beforeCreate: async (newUserData) => {
                    await newUserData.setPassword(newUserData.password);
                },
                beforeUpdate: async (updatedUserData) => {
                    if (updatedUserData.password) {
                        await updatedUserData.setPassword(updatedUserData.password);
                    }
                },
            },
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'user',
        }
    );

    return User;
}
