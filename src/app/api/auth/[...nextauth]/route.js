import NextAuth from "next-auth";
import CredientialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
	providers: [
		CredientialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: "Credentials",
			credentials: {
				username: {
					label: "email",
					type: "email",
					placeholder: "jsmith@text.com",
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "contraseña",
				},
			},
			async authorize(credentials, req) {
				// Aquí se puede colocar el usuario y contraseña hardcoded
				const hardcodedUser = {
					email: process.env.NEXT_PRIVATE_EMAIL,
					password: process.env.NEXT_PRIVATE_PASSWORD,
				};

				// Comprobamos si las credenciales coinciden con las hardcodeadas
				if (
					credentials.username === hardcodedUser.email ||
					credentials.password === hardcodedUser.password
				) {
					const user = {
						id: "1",
						name: "J Smith",
						email: "jsmith@example.com", // Aquí agregamos el token JWT duro
					};
					return user;
					// Si coinciden, devolvemos el usuario
					// return hardcodedUser;
				} else {
					// Si no coinciden, devolvemos null y mostrará un mensaje de error
					return null;
				}
			},
		}),
	],
	pages: {
		signIn: "/login",
	},
	// secret: "pupu123123",
	callbacks: {
		async jwt({ token, user }) {
			return { ...token, ...user };
		},
		async session({ session, token }) {
			session.user = token;
			return session;
		},
	},
});

export { handler as GET, handler as POST };
