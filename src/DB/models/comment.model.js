import { DataTypes } from "sequelize";
import { sequelize } from "../connection.db.js";

export const commentModel = sequelize.define(
    "comment",
    {
        content:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },
    {
        timestamps:true,
        paranoid:true
    }
)
