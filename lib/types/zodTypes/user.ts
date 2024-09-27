import zod from "zod";

export const userSession = zod.object({
	email: zod.string().email({ message: "Invalid email" }),
	password: zod
		.string()
		.min(5, { message: "Password must be atleast 5 characters" }),
});

export const userSignup = zod.object({
	name: zod.string().min(2, { message: "Name must be atleast 2 characters" }),
	email: zod.string().email({ message: "Invalid email" }),
	password: zod
		.string()
		.min(5, { message: "Password must be atleast 5 characters" }),
});

export type UserSession = zod.infer<typeof userSession>;
export type UserSignup = zod.infer<typeof userSignup>;
