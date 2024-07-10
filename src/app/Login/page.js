"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

function LoginPage() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [error, setError] = useState(null);

	const onSubmit = handleSubmit(async (data) => {
		console.log(data);

		try {
			const res = await signIn("credentials", {
				email: data.email,
				password: data.password,
				redirect: false,
			});

			console.log(res);
			if (res.error) {
				setError(res.error);
			} else {
				router.push("/dashboard");
			}
		} catch (error) {
			console.error("Error al iniciar sesión:", error);
			setError("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
		}
	});

	const handleLogin = () => {
		onSubmit();
	};

	return (
		<div className="w-full h-full flex justify-center items-center ">
			{/* Lado Izquierdo */}
			<section className="w-1/2  max-w-[620px] h-full flex items-starts justify-center bg-[url('/login-bg.webp')] bg-contain bg-secondary-400 relative">
				<div className="text-center mt-16">
					<h1 className="text-white font-bold text-4xl mb-2">
						¡Bienvenido
						<br /> a <br />
						<span className="text-pink-500 text-4xl mr-2 font-bold">
							SG MASCO<span className="text-indigo-500 text-4xl">CLINIC!</span>
						</span>
					</h1>
				</div>
				{/* Imagen en la parte inferior */}
				<Image
					className="absolute bottom-0 "
					alt="Dog"
					src="/dog-bg.png"
					width={500}
					height={500}
					// alt="Picture of the author"
				/>
			</section>

			{/* Lado Derecho */}
			<section className="grow h-full flex justify-center items-center">
				<section className="w-1/2 bg-white text-secondary-400 font-medium rounded-lg shadow-lg p-6">
					{error && (
						<p className="bg-red-500 text-lg text-white p-3 rounded mb-2">
							{error}
						</p>
					)}
					<img className="m-auto p-2" alt="Dog" src="/mc-logo.png" />
					<h2 className="text-secondary-600 text-center font-bold text-3xl mb-4">
						Iniciar Sesión
					</h2>

					<label className="mb-2 block">Email:</label>
					<input
						type="email"
						{...register("email", {
							required: {
								value: true,
								message: "Email is required",
							},
						})}
						className="p-3 rounded border-2 border-secondary-400 block mb-4 w-full"
						placeholder="user@email.com"
					/>

					{errors.email && (
						<span className="text-red-500 text-xs">{errors.email.message}</span>
					)}

					<label className=" mb-2 block">Password:</label>
					<input
						type="password"
						{...register("password", {
							required: {
								value: true,
								message: "Password is required",
							},
						})}
						className=" p-3 rounded border-2 border-secondary-400 block mb-2 w-full"
						placeholder="******"
					/>

					{errors.password && (
						<span className="text-red-500 text-xs">
							{errors.password.message}
						</span>
					)}

					<button
						onClick={handleLogin}
						className="w-full bg-indigo-400 hover:bg-indigo-600 text-white p-3 rounded-lg mt-4"
					>
						Entrar
					</button>

					<p className="text-indigo-500 text-center mt-4">
						Serás enviado a la página de inicio
					</p>
				</section>
			</section>
		</div>
	);
}
export default LoginPage;
