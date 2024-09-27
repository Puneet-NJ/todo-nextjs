"use server";

import prisma from "../db";

export default async function deleteTodo(id: number) {
	try {
		const response = await prisma.todo.delete({
			where: {
				id,
			},
		});

		return {
			message: "Todo deleted",
			status: 200,
		};
	} catch (err) {
		return {
			message: "Invalid id or internal server error",
			status: 500,
		};
	}
}
