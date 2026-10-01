import { userModel } from "./user.model.js";
import { postModel } from "./post.model.js";
import { commentModel } from "./comment.model.js";

// User Associations 
userModel.hasMany(postModel, {
    foreignKey: {
        name: "userId",
        allowNull: false
    },
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
});
userModel.hasMany(commentModel, {
    foreignKey: {
        name: "userId",
        allowNull: false
    },
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
});

// Post Associations 
postModel.belongsTo(userModel, {
    foreignKey: {
        name: "userId",
        allowNull: false
    },
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
});
postModel.hasMany(commentModel, {
    foreignKey: {
        name: "postId",
        allowNull: false
    },
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
});

// Comment Associations
commentModel.belongsTo(userModel, {
    foreignKey: {
        name: "userId",
        allowNull: false
    },
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
});
commentModel.belongsTo(postModel, {
    foreignKey: {
        name: "postId", 
        allowNull: false
    },
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
});

export { userModel, postModel, commentModel };