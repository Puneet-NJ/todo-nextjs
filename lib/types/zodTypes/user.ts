import zod from "zod";

export const userSession = zod.object({
	email: zod.string().email({ message: "Invalid email" }),
	password: zod
		.string()
		.min(5, { message: "Password must be atleast 5 characters" }),
});
