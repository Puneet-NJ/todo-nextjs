"use client";

import { signOut } from "next-auth/react";
import Button from "./Button";
import { usePathname } from "next/navigation";

export default function AppBar() {
	const path = usePathname();

	if (path !== "/") return;
	return (
		<div className="flex px-40 py-5 w-full justify-between bg-slate-700">
			<h1 className="text-4xl">Todo App</h1>

			<Button
				label="Sign out"
				onclick={async () => {
					const res = await signOut();
				}}
			/>
		</div>
	);
}
