import { where } from "sequelize"
import { userModel } from "../../DB/models/user.model.js"

export const signup = async(body)=>{
    const {name, email, password} = body
    const existingUser = await userModel.findOne({where:{email}})
    if(existingUser)
        throw new Error("Email already exists!")
    const user = await userModel.build(body)
    await user.save()
    return user
}

export const updateUser = async(body,params)=>{
    const {name, email, password} = body
    const existingUser = await userModel.findByPk(params.id)
    if(existingUser){
        await existingUser.update(body, {validate:false})
        return existingUser
    }
    const user = await userModel.create(body, {validate:false})
    return user

}

export const getUserByEmail = async(query)=>{
    const user = await userModel.findOne({where:{email:query.email},attributes:{exclude:["password"]}})
    if(!user){
        throw new Error('User not found!',{cause:{status:404}})
    } 
    return user
}

export const getUserById = async(params)=>{
    const user = await userModel.findByPk(params.id,{attributes:{exclude:["role", "password"]}})
    if(!user) {
        throw new Error('User not found!',{cause:{status:404}})
    } 
    return user

}