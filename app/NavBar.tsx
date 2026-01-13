import Link from "next/dist/client/link";
import {AiFillBug} from "react-icons/ai";

const NavBar = () => {
    const links = [
        {label: 'Dashboard', href: '/'},
        {label: 'Issues', href: '/issues'},
    ]
    return (
        <nav
            className="flex border-b space-x-6 mb-5  px-5 h-14 items-center navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" href="/"><AiFillBug/></Link>
            <ul className="flex space-x-6">
                {links.map((link) => (
                    <Link className="text-zinc-500 hover:text-zinc-800 transition-colors" key={link.label}
                          href={link.href}>{link.label}</Link>))}
            </ul>
        </nav>
    );
};

export default NavBar;
