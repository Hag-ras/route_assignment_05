import { Sequelize } from "sequelize";
import { db_host, db_name, db_password, db_port, db_user } from "../config.js";

export const sequelize = new Sequelize(db_name,db_user,db_password,{
    port:db_port,
    host:db_host,
    dialect:"mysql",
    pool:{
        min:0,
        max:5
    }
})

export const bootStrapDB = async (app,port)=>{
    try {
        await sequelize.authenticate()
        await sequelize.sync({alter:false})
        console.log("DB connected successfully!");
        
        app.listen(port, () => console.log(`Example app listening on port !`))
    } catch (error) {
        console.log("Failed to connect to DB");
        process.exit(1)

        
    }
}