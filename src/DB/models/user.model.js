import { DataTypes } from "sequelize";
import { sequelize } from "../connection.db.js";

export const userModel = sequelize.define(
    "user",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: { msg: "please enter a valid email format!" }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                checkPasswordLength(value){
                    if(value.length <= 6){
                        throw new Error(`Password should be more than 6 character`)
                    }
                }
            }
        },
        role: {
            type: DataTypes.ENUM("user", "admin"),
            allowNull: false
        },
    },
    {
        timestamps: true,
        paranoid: true,
        hooks:{
            beforeCreate:(user,Option)=>{
                const checkNameLength = (name)=>{
                    if(name.length < 3){
                        throw new Error(`Name must be at least 3 characters`)
                    }
                }
                checkNameLength(user.name)
            }
        }
    }
);

