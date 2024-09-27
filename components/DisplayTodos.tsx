import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

// Server side function
const getTodos = async (userId: string) => {
	const response = await prisma.todo.findMany({
		where: {
			userId: Number(userId),
		},
	});

	return response;
};

export default async function DisplayTodos() {
	const session = await getServerSession(authOptions);
	const todos = await getTodos(session?.user.id as string);

	const handleDeleteTodo = () => {};

	return (
		<div>
			{todos.map((todo) => {
				return (
					<div>
						<br />
						<div>{todo.title}</div>
						<div>{todo.description}</div>
						<div>{todo.createdAt.toString()}</div>

						<div>{todo.completed ? "completed" : "not completed"}</div>
					</div>
				);
			})}
		</div>
	);
}
