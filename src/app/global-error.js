'use client'
// import Link from "next/link"; 
// import { useRouter } from "next/navigation";
import Link from "next/link";

export default function GlobalError({ error, reset }) {
  // const router = useRouter();

  // const handleRedirect = () => {
  //   // Redirigir al dashboard cuando se haga clic en el botón
  //   router.push("/dashboard");
  // };

  return (
    <html>
      <body className="bg-gray-100 h-screen flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-5xl font-bold text-indigo-500 mb-4">¡Ups, ha sucedido algo</h2>
          <h2 className="text-2xl font-bold text-indigo-500 mb-4">Refresca la pagina o vuelva al inicio</h2>
          <button
            onClick={() => reset()}
            className="mx-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none"
          >
            Intentar de nuevo
          </button>
          <Link
            href="/dashboard"
            className="mx-2 bg-pink-400 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none"
            // onClick={handleRedirect}
          >
            Volver al inicio
          </Link>
          {/* <Link href="/dashboard">
          </Link> */}
        </div>
      </body>
    </html>
  );
}


