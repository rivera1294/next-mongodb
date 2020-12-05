import Link from 'next/link';
import { useAuthContext } from '~/context'

const Navbar = () => {
    const { isLogged, handleLogout } = useAuthContext()
    const logout = (e) => {
        e.preventDefault()
        handleLogout()
    }

    return (
        <nav className="navbar">
            <Link href="/" hrefAs='/'>
                <a className="navbar-brand">Note App</a>
            </Link>
            {
                isLogged ? (
                    <>
                    <Link href="/new" hrefAs='/new'>
                        <a className="create">Create note</a>
                    </Link>
                    <a href="#" className="create" onClick={logout}>Logout</a>
                    </>
                ) : (
                    <Link href="/users/auth/signin" hrefAs='/users/auth/signin'>
                        <a className="create">Login</a>
                    </Link>
                )
            }
        </nav>
    )
}

export default Navbar;