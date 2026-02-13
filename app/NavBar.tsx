'use client'
import Link from "next/dist/client/link";
import {AiFillBug} from "react-icons/ai";
import classNames from "classnames";
import {usePathname} from "next/dist/client/components/navigation";
import {Box, Container, Flex} from "@radix-ui/themes";
import {useSession} from "next-auth/react";

const NavBar = () => {
    const currentPage = usePathname()
    const {status, data: session} = useSession()
    const links = [
        {label: 'Dashboard', href: '/'},
        {label: 'Issues', href: '/issues'},
    ]
    return (
        <nav className="border-b border-gray-200  mb-5  px-5 py-5 navbar navbar-expand-lg navbar-dark bg-dark">
            <Container>
                <Flex justify="between">
                    <Flex align='center' gap='3'>
                        <Link className="navbar-brand" href="/"><AiFillBug/></Link>
                        <ul className="flex space-x-6">


                            {links.map((link) => (
                                <li key={link.href}>
                                    <Link className={classNames({
                                        "text-zinc-900": currentPage === link.href,
                                        "text-zinc-500": currentPage !== link.href,
                                        "hover:text-zinc-800 transition-colors": true
                                    })} key={link.label}
                                          href={link.href}>{link.label}</Link>
                                </li>
                            ))}

                        </ul>
                    </Flex>
                    <Box>
                        {status === "unauthenticated" && < Link href={"/api/auth/signin"}>
                            Login
                        </Link>}
                        {status === "authenticated" && < Link href={"/api/auth/signout"}>
                            Logout
                        </Link>}
                    </Box>
                </Flex>

            </Container>
        </nav>
    );
};

export default NavBar;
