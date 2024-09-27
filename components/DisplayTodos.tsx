import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import TodoComplete from "./TodoComplete";
import DeleteTodo from "./DeleteTodo";

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

						{/* YOU CAN ALSO HAVE THESE IN ONE COMPONENT */}
						<TodoComplete id={todo.id} completed={todo.completed} />
						<DeleteTodo id={todo.id} />
					</div>
				);
			})}
		</div>
	);
}
