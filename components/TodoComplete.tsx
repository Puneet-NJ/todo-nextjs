"use client";

import { ChangeEvent } from "react";
import InputBox from "./InputBox";
import updateTodo from "@/lib/actions/updateTodo";
import { useRouter } from "next/navigation";

export default function ({
	id,
	completed,
}: {
	id: number;
	completed: boolean;
}) {
	const router = useRouter();

	console.log(completed);
	const handleOnchange = async (e: ChangeEvent<HTMLInputElement>) => {
		console.log("hi " + completed);

		const response = await updateTodo(id, !completed);

		router.refresh();
	};

	return (
		<div>
			<InputBox
				type="checkbox"
				label="Completed"
				onchange={handleOnchange}
				checked={completed}
			/>
		</div>
	);
}
