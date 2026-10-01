import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.db.js";

class Post extends Model {}

Post.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: "post",
        timestamps: true,
        paranoid:true
    }
);

export const postModel = Post;
