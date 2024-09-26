"use client";

import { useState } from "react";
import InputBox from "./InputBox";
import Button from "./Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserSession } from "@/lib/types/zodTypes/user";

export default function () {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSignin = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const session: UserSession = { email, password };

		if (email.length === 0) {
			return setError("Email is invalid");
		}
		if (password.length < 5) {
			return setError("Password must be atleast 5 characters");
		}

		const response = await signIn("credentials", {
			...session,
			redirect: false,
		});

		if (response?.error) return alert("Error!! Incorrect email/password");

		router.push("/");
	};

	return (
		<form>
			<InputBox
				label="Email"
				placeholder="john@mail.com"
				type="text"
				onchange={(e) => {
					setEmail(e.target.value);
				}}
			/>

			<InputBox
				label="Password"
				type="password"
				onchange={(e) => {
					setPassword(e.target.value);
				}}
				min={5}
			/>

			<Button label="Sign in" onclick={handleSignin} />

			<div className="text-red-600">{error}</div>
		</form>
	);
}
