"use client";

import { useState } from "react";
import Button from "./Button";
import InputBox from "./InputBox";
import { useSession } from "next-auth/react";
import createTodo from "@/lib/actions/createTodo";

export default function AddTodoComp() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const session = useSession();

	const handleAddTodo = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!session.data?.user.id) return;

		const response = await createTodo(
			title,
			description,
			session.data?.user.id
		);

		if (response.status === 200) {
			alert(response.message);
		}
	};
	return (
		<form>
			<InputBox
				label="Title"
				placeholder="Todo title"
				type="text"
				onchange={(e) => setTitle(e.target.value)}
			/>

			<InputBox
				label="Description"
				placeholder="Todo description"
				type="text"
				onchange={(e) => setDescription(e.target.value)}
			/>

			<Button label="Add Todo" onclick={handleAddTodo} />
		</form>
	);
}
