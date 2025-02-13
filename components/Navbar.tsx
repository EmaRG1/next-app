import { auth, signIn, signOut } from "@/auth"
import { BadgePlus, LogOut } from "lucide-react";
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = async() => {

    const session = await auth();

    return (
        <header className="z-50 bg-white shadow-sm px-5 py-3 font-work-sans">

            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image src="/firstbyte.png" alt="logo" width={144} height={30} className="p-1.5"/>
                </Link>

                <div className="flex items-center gap-5 font-semibold text-black">
                    {
                        session && session?.user ? (
                            <>
                                <Link href="/startup/create">
                                    <span className="max-sm:hidden">Create</span>
                                    <BadgePlus className="sm:hidden size-6"/> 
                                </Link>

                                <form action={ async () => {
                                    "use server"
                                    await signOut()
                                }}>

                                    <button className="!text-primary" type="submit">
                                        <span className="max-sm:hidden">Logout</span>
                                        <LogOut className="sm:hidden mt-2 size-6 text-red-500"/>
                                    </button>
                                </form>

                                <Link href={`/user/${session?.id}`} className="flex items-center gap-2">
                                    <Avatar className="size-10">
                                        <AvatarImage src={session?.user?.image!} alt={session?.user?.name!} />
                                        <AvatarFallback>AV</AvatarFallback>
                                    </Avatar>
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