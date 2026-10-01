import { Router } from "express";
import { getUserByEmail, getUserById, signup, updateUser } from "./user.service.js";
import { successResponse } from "../../common/utils/successResponse.js";

const router = Router();

router.post('/signup',async(req, res, next)=>{
    const data = await signup(req.body)
    return successResponse({res,status:200,msg:"User Created Successfully!",data})
})

router.put('/:id', async(req, res, next)=>{
    const data = await updateUser(req.body, req.params)
    return successResponse({res,msg:"User Updated Successfully!",data})

})

router.get('/by-email', async(req, res, next)=>{
    const data = await getUserByEmail(req.query)
    return successResponse({res,data})

})

router.get('/:id', async(req, res, next)=>{
    const data = await getUserById(req.params)
    return successResponse({res,data})

})
export default router