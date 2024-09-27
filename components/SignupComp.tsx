"use client";

import { useState } from "react";
import InputBox from "./InputBox";
import Button from "./Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import SignupUser from "@/lib/actions/SignupUser";

export default function () {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (email.length === 0) {
			return setError("Email is invalid");
		}
		if (password.length < 5) {
			return setError("Password must be atleast 5 characters");
		}
		if (name.length < 2) {
			return setError("Name must be atleast 2 characters");
		}

		const res = await SignupUser(name, email, password);

		if (res.status === 200) {
			const signinResponse = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});
			if (signinResponse?.error) alert("Error");
			router.push("/");
		}
	};

	return (
		<form>
			<InputBox
				label="Name"
				placeholder="John Doe"
				type="text"
				onchange={(e) => {
					setName(e.target.value);
				}}
			/>

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

			<Button label="Sign up" onclick={handleSignup} />

			<div className="text-red-600">{error}</div>
		</form>
	);
}
