export { default } from "next-auth/middleware";

export const config = {
	matcher: [
		"/dashboard/:path*",
		"/customers/:path*",
		"/pets/:path*",
		"/medical-histories/:path*",
		"/consultations/:path*",
	],
};
