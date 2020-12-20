import Link from 'next/link'
import { useAuthContext } from '~/common/context'
import { Icon, Popup } from 'semantic-ui-react'
import Headroom from 'react-headroom'
import { useRouter } from 'next/router'
import clsx from 'clsx'

export const Navbar = () => {
  const { isLogged, handleLogout } = useAuthContext()
  const logout = (e) => {
    e.preventDefault()
    handleLogout()
  }
  const router = useRouter()

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
            <Link href="/" hrefAs="/">
              <a className="navbar-brand">Code Samples 2.0</a>
            </Link>
          </b>
          {isLogged ? (
            <>
              <Popup
                trigger={
                  <div>
                    <Link href="/new" hrefAs="/new">
                      <a className={clsx('create', { 'active-link': router.pathname === '/new' })}>
                        <Icon name="add" />
                      </a>
                    </Link>
                  </div>
                }
                content="Create new"
                // offset={[0, 50]}
                on="hover"
                position="bottom center"
                inverted
                style={{ marginTop: '30px' }}
              />
              <Popup
                trigger={
                  <div>
                    <a href="#" className="create" onClick={logout}>
                      <Icon name="sign-out" />
                    </a>
                  </div>
                }
                content="Logout"
                // offset={[0, 50]}
                on="hover"
                position="bottom right"
                inverted
                style={{ marginTop: '30px' }}
              />
            </>
          ) : (
            <Popup
              trigger={
                <div>
                  <Link href="/users/auth/signin" hrefAs="/users/auth/signin">
                    <a className={clsx('create', { 'active-link': router.pathname === '/users/auth/signin' })}>
                      <Icon name="sign-in" />
                    </a>
                  </Link>
                </div>
              }
              content="Sign In"
              // offset={[0, 50]}
              on="hover"
              position="bottom right"
              inverted
              style={{ marginTop: '30px' }}
            />
          )}
        </div>
      </nav>
    </Headroom>
  )
}
