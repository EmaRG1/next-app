import { auth, signIn, signOut } from "@/auth"
import Image from "next/image"
import Link from "next/link"

const Navbar = async() => {

    const session = await auth();

    return (
        <header className="bg-white px-5 py-3 sadow-sm font-work-sans">

            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={144} height={30}/>
                </Link>

                <div className="flex items-center gap-5 font-semibold text-black">
                    {
                        session && session?.user ? (
                            <>
                                <Link href="/startup/create">
                                    <span>Create</span>
                                </Link>

                                <form action={ async () => {
                                    "use server"
                                    await signOut()
                                }}>

                                    <button className="!text-primary" type="submit">
                                        Logout
                                    </button>
                                </form>

                                <Link href={`/user/`} className="flex items-center gap-2">
                                    <span>{session?.user?.name}</span>
                                    <Image src={session?.user?.image ?? 'avatar'} alt="avatar" width={32} height={32} className="rounded-full"/>
                                </Link>
                            </>
                        ) : (
                            <form action={ async () => {
                                "use server";
                                 await signIn( 'github' );
                            }}>
                                <button type="submit">
                                    Sign In
                                </button>
                            </form>
                        )
                    }
                </div>
            </nav>
        </header>
    )
}

export default Navbar