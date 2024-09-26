import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { userSession } from "@/lib/types/zodTypes/user";
import prisma from "@/lib/db";

export const authOptions: NextAuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
		CredentialsProvider({
			name: "Credentials",

			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},

			async authorize(credentials) {
				const restCredentials = {
					email: credentials?.email,
					password: credentials?.password,
				};

				const validateCredentials = userSession.safeParse(restCredentials);
				if (!validateCredentials.success) {
					return null;
				}

				// Compare hashed password
				const existingUser = await prisma.user.findFirst({
					where: {
						email: restCredentials.email,
						password: restCredentials.password,
					},
				});
				if (existingUser) {
					return {
						email: existingUser.email,
						name: existingUser.name,
						id: String(existingUser.id),
					};
				}

				return null;
			},
		}),
	],

	secret: process.env.NEXTAUTH_SECRET,
};
