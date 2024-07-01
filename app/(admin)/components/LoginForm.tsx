"use client";

import { useActionState } from "react";
import { authenticate } from "../utilities/authenticate";
import { useFormState } from "react-dom";

const LoginForm = () => {
	const [errorMessage, formAction, isPending] = useFormState(authenticate, undefined);

	return (
		<form action={formAction} className="flex flex-col w-1/3">
			<label>Email</label>
			<input
				id="email"
				type="email"
				name="email"
				placeholder="Enter your email address"
				required
			/>
			<label>Password</label>
			<input
				id="password"
				type="password"
				name="password"
				placeholder="Enter password"
				required
				minLength={8}
			/>
			<button type="submit" aria-disabled={isPending}>
				Login
			</button>
		</form>
	);
};

export default LoginForm;
