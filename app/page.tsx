import AddTodoComp from "@/components/AddTodoComp";
import DisplayTodos from "@/components/DisplayTodos";

export default function Home() {
	return (
		<div>
			<AddTodoComp />

			<DisplayTodos />
		</div>
	);
}
