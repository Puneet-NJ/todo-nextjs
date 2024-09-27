"use server";

import prisma from "../db";
import { userSignup } from "../types/zodTypes/user";
import bcrypt from "bcrypt";

export default async function SignupUser(
	name: string,
	email: string,
	password: string
) {
	const user = { name, email, password };

	const validateUser = userSignup.safeParse(user);
	if (!validateUser.success) {
		const errorMessages = validateUser.error.errors.map((err) => err.message);

		return { message: errorMessages[0], status: 411 };
	}

	// Check if the user already exists
	const existingUser = await prisma.user.findFirst({
		where: {
			email,
		},
	});
	if (existingUser) {
		return {
			message: "Email already exists",
			status: 411,
		};
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const response = await prisma.user.create({
		data: { name, email, password: hashedPassword },
	});

	return { message: "User created successfully", status: 200 };
}
