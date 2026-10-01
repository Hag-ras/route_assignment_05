import { Op } from "sequelize";
import { commentModel, postModel, userModel } from "../../DB/models/index.js";

export const createBulkComments = async (comments) => {
	if (!Array.isArray(comments)) {
		throw new Error("Comments should be an array.", { cause: { status: 400 } });
	}

	return commentModel.bulkCreate(comments);
};

export const updateCommentById = async (commentId, userId, content) => {
	const comment = await commentModel.findByPk(commentId);

	if (!comment) {
		throw new Error("Comment not found!", { cause: { status: 404 } });
	}

	if (comment.userId != userId) {
		throw new Error("You are not authorized to update this comment.", { cause: { status: 403 } });
	}

	await comment.update({ content });
	return comment;
};

export const findOrCreateComment = async ({ postId, userId, content } = {}) => {
	if (postId == null || userId == null || !content) {
		throw new Error("postId, userId, and content are required.", { cause: { status: 400 } });
	}

	const comment = await commentModel.findOne({
		where: { postId, userId, content }
	});

	if (comment) {
		return { comment, created: false };
	}

	const createdComment = await commentModel.create({ postId, userId, content });
	return { comment: createdComment, created: true };
};

export const searchComments = async (word) => {
	const comments = await commentModel.findAll({
		where: { content: { [Op.like]: `%${word}%` } },
		attributes: ["id", "content", "postId", "userId", "createdAt", "updatedAt"]
	});

	return { count: comments.length, comments };
};

export const getNewestComments = async (postId) => {
	return commentModel.findAll({
		where: { postId },
		attributes: ["id", "content", "createdAt"],
		order: [["createdAt", "DESC"]],
		limit: 3
	});
};

export const getCommentDetails = async (commentId) => {
	const comment = await commentModel.findByPk(commentId, {
		attributes: ["id", "content", "createdAt", "updatedAt"],
		include: [
			{ model: userModel, attributes: ["id", "name", "email"] },
			{ model: postModel, attributes: ["id", "title", "content"] }
		]
	});

	if (!comment) {
		throw new Error("Comment not found!", { cause: { status: 404 } });
	}

	return comment;
};
