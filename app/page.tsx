import AddTodoComp from "@/components/AddTodoComp";
import DisplayTodos from "@/components/DisplayTodos";

// YOU COULD ADD HEADER/APPBAR HERE ITSELF BUT IM DOING IT THE HARD WAY i.e. LAYOUT.TSX
export default function Home() {
	return (
		<div>
			<AddTodoComp />

			<DisplayTodos />
		</div>
	);
}
