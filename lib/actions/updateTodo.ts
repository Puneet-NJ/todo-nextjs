"use server";

import prisma from "../db";

export default async function (id: number, completed: boolean) {
	try {
		const response = await prisma.todo.update({
			where: {
				id,
			},
			data: {
				completed,
			},
		});

		return { message: "Marked todo as complete", status: 200 };
	} catch (err) {
		return { message: "Invalid id", status: 411 };
	}
}
