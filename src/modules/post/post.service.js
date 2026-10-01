import { Sequelize } from 'sequelize'
import {commentModel, postModel, userModel} from '../../DB/models/index.js'

export const createPost = async(body)=>{
    const post = new postModel(body)
    await post.save()
    return post
}

export const deletePostById = async (postId, userId) => {
    const post = await postModel.findByPk(postId);

    if (!post) {
        throw new Error('Post not found!',{cause:{status:404}})
    }

    if (post.userId != userId) {
        throw new Error('You are not authorized to delete this post.',{cause:{status:403}})
    }

    await post.destroy();
    
    return post;
};

export const getPostsDetails = async () => {
    const posts = await postModel.findAll({
        attributes: ["id", "title"], 
        include: [
            {
                model: userModel,
                attributes: ["name"] 
            },
            {
                model: commentModel,
                attributes: ["id", "content"] 
            }
        ]
    });
    return posts;
};

export const getPostsCommentCount = async () => {
    const posts = await postModel.findAll({
        attributes: [
            "id",
            "title",
            [Sequelize.fn("COUNT", Sequelize.col("comments.id")), "commentCount"] 
        ],
        include: [
            {
                model: commentModel,
                required: false 
            }
        ],
        group: ['post.id'] 
    });
    return posts;
};