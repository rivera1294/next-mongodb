import Link from 'next/link';
import { useAuthContext } from '~/context'
import { Icon } from 'semantic-ui-react'

const Navbar = () => {
    const { isLogged, handleLogout } = useAuthContext()
    const logout = (e) => {
        e.preventDefault()
        handleLogout()
    }

    return (
        <nav className="navbar">
            <div>
                <Link href="/" hrefAs='/'>
                    <a className="navbar-brand">Note App</a>
                </Link>
                {
                    isLogged ? (
                        <>
                        <Link href="/new" hrefAs='/new'>
                            <a className="create"><Icon name='add' /></a>
                        </Link>
                        <a href="#" className="create" onClick={logout}><Icon name='sign-out' /></a>
                        </>
                    ) : (
                        <Link href="/users/auth/signin" hrefAs='/users/auth/signin'>
                            <a className="create"><Icon name='sign-in' /></a>
                        </Link>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar;