import { DataTypes } from "sequelize";
import { sequelize } from "../connection.db.js";

export const postModel = sequelize.define(
    "post",
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
        timestamps: true,
        paranoid:true
    }
);
