import zod from "zod";

export const todoSchema = zod.object({
	title: zod.string().min(2, { message: "Title must be atleast 2 characters" }),
	description: zod
		.string()
		.min(2, { message: "Description must be atleast 2 characters" }),
	userId: zod.string(),
});

export type TodoSchema = zod.infer<typeof todoSchema>;
