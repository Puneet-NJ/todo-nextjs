"use server";

import prisma from "../db";
import { todoSchema } from "../types/zodTypes/todo";

export default async function createTodo(
	title: string,
	description: string,
	userId: string
) {
	const todo = { title, description, userId };

	const validateInput = todoSchema.safeParse(todo);
	if (!validateInput.success) {
		const errorMessages = validateInput.error.errors.map((err) => err.message);

		return {
			message: errorMessages[0],
			status: 411,
		};
	}

	const response = await prisma.todo.create({
		data: {
			title,
			description,
			userId: Number(userId),
			completed: false,
		},
	});

	return {
		message: "Todo created successfully!!",
		status: 200,
	};
}
