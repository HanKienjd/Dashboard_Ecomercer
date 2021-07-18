import { Component } from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux';
import { getComponentDisplayName } from './helpers';
// import log from '@/utils/log';
import { havePermissionWithMenuId, noMatch } from './authority';
import { getQueryString } from './utils';


export default (funcName, arrPer = ['IsView']) => WrappedComponent => {
  class WithPermission extends Component {
    static displayName = `WithPermission(${getComponentDisplayName(WrappedComponent)})`

    /* static async getInitialProps(ctx) {
      const { store, query } = ctx;
      const a = await store.dispatch({
        type: 'global/fetchAuthRoles',
      })
      log("WithPermission getInitialProps store: %o, a: %o", store.getState(), a) 
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx))

      return { ...componentProps }
    } */

    componentDidMount() {
      const {
        dispatch,
      } = this.props;
      dispatch({
        type: 'global/fetchAuthRoles',
      });
    }

    render() {
      // log("WithPermission props: ", )
      const { roles, router } = this.props;
      let { menuId } = router.query;
      if (typeof window !== 'undefined') {
        menuId = getQueryString('menuId')
      }
      const arrPermissions = havePermissionWithMenuId(roles, menuId, arrPer);
      // console.log("WithPermission arrPermissions: ", arrPermissions)
      // console.log("roles", roles)

      if (roles.length === 0) return <span>Đang tải trang, vui lòng chờ giây lát</span>
      if (!arrPermissions || !arrPermissions.isView) return noMatch()
      return <WrappedComponent {...this.props} permissions={arrPermissions} menuId={menuId} />
    }
  }

  const WithPermissionHoc = withRouter(connect(({ global }) => ({
    roles: global.roles
  }))(props => (
    <WithPermission {...props} />
  )));

  return WithPermissionHoc
}