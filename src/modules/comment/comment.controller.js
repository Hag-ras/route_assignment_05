import { Router } from "express";
import {
	createBulkComments,
	findOrCreateComment,
	getCommentDetails,
	getNewestComments,
	searchComments,
	updateCommentById
} from "./comment.service.js";
import { successResponse } from "../../common/utils/successResponse.js";

const router = Router();

router.post('/', async (req, res) => {
	await createBulkComments(req.body.comments);
	return successResponse({ res, msg: "comments created." });
});

router.patch('/:commentId', async (req, res) => {
	const { userId, content } = req.body;
	const data = await updateCommentById(req.params.commentId, userId, content);
	return successResponse({ res, msg: "Comment updated successfully.", data });
});

router.post('/find-or-create', async (req, res) => {
	const data = await findOrCreateComment(req.body);
	return successResponse({ res, data });
});

router.get('/search', async (req, res) => {
	const data = await searchComments(req.query.word);
	return successResponse({ res, data });
});

router.get('/newest/:postId', async (req, res) => {
	const data = await getNewestComments(req.params.postId);
	return successResponse({ res, data });
});

router.get('/details/:id', async (req, res) => {
	const data = await getCommentDetails(req.params.id);
	return successResponse({ res, data });
});

export default router