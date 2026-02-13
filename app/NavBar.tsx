'use client'
import Link from "next/dist/client/link";
import {AiFillBug} from "react-icons/ai";
import classNames from "classnames";
import {usePathname} from "next/dist/client/components/navigation";
import {Avatar, Box, Container, DropdownMenu, Flex} from "@radix-ui/themes";
import {useSession} from "next-auth/react";

const NavBar = () => {
    const currentPage = usePathname()
    const {status, data: session} = useSession()
    const links = [
        {label: 'Dashboard', href: '/'},
        {label: 'Issues', href: '/issues'},
    ]
    return (
        <nav className="border-b border-gray-200 py-3">
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
                        {status === "authenticated" && (
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <Avatar src={session.user!.image!} size='2' radius='full'
                                            fallback={session.user!.name?.[0] || 'U'}
                                            referrerPolicy='no-referrer'
                                    />
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    <DropdownMenu.Label>
                                        {session.user!.email}
                                    </DropdownMenu.Label>
                                    <DropdownMenu.Item>
                                        < Link href={"/api/auth/signout"}>
                                            Logout
                                        </Link>
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        )}
                    </Box>
                </Flex>

            </Container>
        </nav>
    );
};

export default NavBar;
