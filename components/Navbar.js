import Link from 'next/link';
import { useAuthContext } from '~/context'
import { Icon } from 'semantic-ui-react'
import Headroom from 'react-headroom'

const Navbar = () => {
    const { isLogged, handleLogout } = useAuthContext()
    const logout = (e) => {
        e.preventDefault()
        handleLogout()
    }

    return (
        <Headroom
            style={{
                width: '100%',
                zIndex: 6,
                // height: '70px',
                // display: 'flex',
                // alignItems: 'center',
                // borderBottom: '1px solid lightgray',
                // backgroundColor: '#FFF',
            }}
        >
            <nav className="navbar">
                <div>
                    <b>
                        <Link href="/" hrefAs='/'>
                            <a className="navbar-brand">Code Samples 2.0</a>
                        </Link>
                    </b>
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
        </Headroom>
    )
}

export default Navbar;