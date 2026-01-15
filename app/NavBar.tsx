'use client'
import Link from "next/dist/client/link";
import {AiFillBug} from "react-icons/ai";
import classNames from "classnames";
import {usePathname} from "next/dist/client/components/navigation";

const NavBar = () => {
    const currentPage = usePathname()
    const links = [
        {label: 'Dashboard', href: '/'},
        {label: 'Issues', href: '/issues'},
    ]
    return (
        <nav
            className="flex border-b border-gray-200 space-x-6 mb-5  px-5 h-14 items-center navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" href="/"><AiFillBug/></Link>
            <ul className="flex space-x-6">
                {links.map((link) => (
                    <Link className={classNames({
                        "text-zinc-900" : currentPage === link.href,
                        "text-zinc-500" : currentPage !== link.href,
                        "hover:text-zinc-800 transition-colors" : true
                    })} key={link.label}
                          href={link.href}>{link.label}</Link>))}
            </ul>
        </nav>
    );
};

export default NavBar;
