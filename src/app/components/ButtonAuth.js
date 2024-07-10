"use client"
import { useSession, signIn, signOut } from "next-auth/react"
 
export default function ButtonAuth() {
  const { data: session, status } = useSession()

  if(status == "loading"){
    return <p className="text-black">Cargando...</p>
  }
  console.log({session, status});
  if (session) {
    return (
      <>
      <p className="text-black">Signed in as {session.user.email}</p> <br />
        <br />
        <button onClick={() => signOut()} className="flex gap-x-3 items-center bg-secondary-400 hover:bg-secondary-600 transition duration-300 rounded-3xl font-semibold text-sm text-white px-5 py-2 mr-3">Sign out</button>
        <pre>
        <code className="text-black">{JSON.stringify(session, null, 2)}</code>
      </pre>
      </>
    )
  }
  return (
    <> 
      <p className="text-black">Not signed in</p> <br />
      <button onClick={() => signIn()} className="flex gap-x-3 items-center bg-secondary-400 hover:bg-secondary-600 transition duration-300 rounded-3xl font-semibold text-sm text-white px-5 py-2 mr-3">Sign in</button>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
    </>
  )
}