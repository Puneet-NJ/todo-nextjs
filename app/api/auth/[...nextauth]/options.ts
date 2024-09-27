import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { userSession } from "@/lib/types/zodTypes/user";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";

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

				const existingUser = await prisma.user.findFirst({
					where: {
						email: restCredentials.email,
					},
				});
				if (existingUser) {
					const compareHash = await bcrypt.compare(
						restCredentials.password as string,
						existingUser.password
					);

					if (compareHash) {
						return {
							email: existingUser.email,
							name: existingUser.name,
							id: String(existingUser.id),
						};
					}
				}

				return null;
			},
		}),
	],

	secret: process.env.NEXTAUTH_SECRET,

	pages: {
		signIn: "/auth/signin",
	},
};
