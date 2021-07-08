/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import { Component } from 'react'
import router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import { getComponentDisplayName } from './helpers';
// import log from '@/utils/log';

/* function facebookLogout(){
  FB.logout(function (response) {
    console.log("facebook logout: ", response)
    // user is now logged out
  });
} */

/* function googleSignOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  if (auth2) {
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
  console.log('User not logged in.');
} */

export const auth = ctx => {
  const { token } = nextCookie(ctx)
  // log("withAuth auth token: ", token)
  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: '/login' })
    ctx.res.end()
    return
  }

  if (!token) {
    router.push('/Authenticate/Login', '/login')
  }
  // eslint-disable-next-line consistent-return
  return token
}

export const tokenExpired = ctx => {
  // log("withAuth auth token: ", token)

  if (ctx.req) {
    ctx.res.clearCookie('token');
    ctx.res.writeHead(302, { Location: '/login' })
    ctx.res.end()
    return
  }
  cookie.remove('token');
  router.push('/Authenticate/Login', '/login')

  // eslint-disable-next-line consistent-return
  return null
}

export default WrappedComponent => (
  class withAuthSync extends Component {
    static displayName = `withAuthSync(${getComponentDisplayName(WrappedComponent)})`

    static async getInitialProps(ctx) {
      const token = auth(ctx)
      const { query, asPath, pathname, store, req } = ctx;
      // log("withAuth token: ", token)
      if (req) {
        await store.dispatch({
          type: 'user/fetchCurrent',
          payload: {
            cookies: req.cookies
          }
        });
        await store.dispatch({
          type: 'global/fetchAuthRoles',
          payload: {
            cookies: req.cookies
          }
        });
      }
      const { global: { roles }, user: { currentUser } } = store.getState();
      // console.log("withAuthSync getInitialProps store: %o", currentUser);

      if (currentUser && (
        currentUser.error && currentUser.error.code === 401
        || currentUser.code === 401
      )) {
        // console.log("1 withAuthSync getInitialProps store: %o", currentUser);
        tokenExpired(ctx);
      }
      // const { placeID } = nextCookie(ctx)
      // if (ctx.req && !placeID) {
      //   ctx.res.writeHead(302, { Location: '/selectPlace' })
      //   ctx.res.end()
      // }
      //   const placeID = authPlace(ctx)
      // if (!placeID) {
      //   const url = window.location.href
      //   console.log("sadsa", url)
      //   // router.push('/Dashboard/Analysis', '/selectPlace')
      // }
      ctx.roles = roles;
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx))

      return {
        ...componentProps,
        token,
        query,
        asPath,
        pathname,
      }
    }

    constructor(props) {
      super(props)

      this.syncLogout = this.syncLogout.bind(this)
    }

    componentDidMount() {
      window.addEventListener('storage', this.syncLogout)
    }

    componentWillUnmount() {
      window.removeEventListener('storage', this.syncLogout)
      window.localStorage.removeItem('logout')
    }

    // eslint-disable-next-line class-methods-use-this
    syncLogout(event) {
      if (event.key === 'logout') {
        // console.log('logged out from storage!')
        router.push('/Authenticate/Login', '/login')
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
)