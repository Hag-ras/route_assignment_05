import { Router } from "express";
import { createPost, deletePostById, getPostsCommentCount, getPostsDetails } from "./post.service.js";
import { successResponse } from "../../common/utils/successResponse.js";

const router = Router()

router.post('/', async(req, res, next)=>{
    const data = await createPost(req.body)
    return successResponse({res,status:201,msg:"Post created successfully!",data})
})

router.delete('/:id', async(req, res, next)=>{
    const userId = req.body.userId

    if(!userId){
        throw new Error("You should enter the owner Id")
    }
    await deletePostById(req.params.id, userId)
    return successResponse({res,status:204,msg:"Post deleted!"})
})

router.get('/details', async (req, res, next) => {
    
        const data = await getPostsDetails();
        return successResponse({res,data});
    
});

router.get('/comment-count', async (req, res, next) => {
        const data = await getPostsCommentCount();
        return successResponse({res,data});
    
});

export default router