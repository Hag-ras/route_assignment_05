import { userModel } from "./user.model.js";
import { postModel } from "./post.model.js";
import { commentModel } from "./comment.model.js";

// User Associations 
userModel.hasMany(postModel, {
    foreignKey: {
        name: "userId",
        allowNull: false
    }
});
userModel.hasMany(commentModel, {
    foreignKey: {
        name: "userId",
        allowNull: false
    }
});

// Post Associations 
postModel.belongsTo(userModel, {
    foreignKey: {
        name: "userId",
        allowNull: false
    }
});
postModel.hasMany(commentModel, {
    foreignKey: {
        name: "postId",
        allowNull: false
    }
});

// Comment Associations
commentModel.belongsTo(userModel, {
    foreignKey: {
        name: "userId",
        allowNull: false
    }
});
commentModel.belongsTo(postModel, {
    foreignKey: {
        name: "postId", 
        allowNull: false
    }
});

export { userModel, postModel, commentModel };