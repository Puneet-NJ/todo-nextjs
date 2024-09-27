"use client";

import deleteTodo from "@/lib/actions/deleteTodo";
import Button from "./Button";
import { useRouter } from "next/navigation";

export default function DeleteTodo({ id }: { id: number }) {
	const router = useRouter();

	const handleDeleteTodo = async () => {
		const response = await deleteTodo(id);

		if (response.status !== 200) alert(response.message);

		router.refresh();
	};

	return <Button label="🗑️" onclick={handleDeleteTodo} />;
}
