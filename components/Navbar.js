import Link from 'next/link';

const Navbar = () => (
    <nav className="navbar">
        <Link href="/" hrefAs='/'>
            <a className="navbar-brand">Note App</a>
        </Link>
        <Link href="/new" hrefAs='/new'>
            <a className="create">Create note</a>
        </Link>
    </nav>
)

export default Navbar;