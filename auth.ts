// // import NextAuth from "next-auth";

// // export const { handlers, signIn, signOut, auth } = NextAuth({
// // 	providers: [],
// // });

// // With credentials
// import bcrypt from "bcrypt";
// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { z } from "zod";
// import { getAuthUser } from "./app/utilities/databaseFunctions";
// import { authConfig } from "./auth.config";

// export const { auth, signIn, signOut } = NextAuth({
// 	...authConfig,
// 	providers: [
// 		Credentials({
// 			async authorize(credentials) {
// 				const parsedCredentials = z
// 					.object({ email: z.string().email(), password: z.string().min(8) })
// 					.safeParse(credentials);

// 				if (parsedCredentials.success) {
// 					const { email, password } = parsedCredentials.data;
// 					const authUser = await getAuthUser(email);
// 					if (!authUser) return null;
// 					const passwordsMatch = await bcrypt.compare(password, authUser.password);
// 					// To-Do: Do we really have to convert the id to a string?
// 					if (passwordsMatch) return { ...authUser, id: authUser.id.toString() };
// 				}
// 				console.error("Invalid credentials");
// 				return null;
// 			},
// 		}),
// 	],
// });
