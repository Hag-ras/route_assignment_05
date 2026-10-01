import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.db.js";

class Comment extends Model {}

Comment.init(
    {
        content:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },
    {
        sequelize,
        modelName: "comment",
        timestamps:true,
        paranoid:true
    }
);

export const commentModel = Comment;
