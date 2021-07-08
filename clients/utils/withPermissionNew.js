import { Component } from 'react'
// import { withRouter } from 'next/router'
// import { connect } from 'react-redux';
import { getComponentDisplayName } from './helpers';
// import log from '@/utils/log';
import { havePermissionWithMenuId } from './authority';

// export default (funcName, arrPer = ['IsView']) => WrappedComponent => {
export default WrappedComponent => {
  // eslint-disable-next-line react/prefer-stateless-function
  class WithPermission extends Component {
    /* componentDidMount(){
      const {
        dispatch,
      } = this.props;
      dispatch({
        type: 'global/fetchAuthRoles',
      });
    } */

    render() {
      // log("WithPermission props: ", this.props);
      return <WrappedComponent {...this.props} />
    }
  }

  WithPermission.displayName = `WithPermission(${getComponentDisplayName(WrappedComponent)})`

  WithPermission.getInitialProps = async (ctx) => {
    /* const { store } = ctx;
    await store.dispatch({
      type: 'global/fetchAuthRoles',
    }) */
    console.log("WithPermission getInitialProps");
    // const { roles } = store.getState();

    const arrPer = ['isView', 'isNew', 'isUpdate', 'isDelete']
    const { roles, query } = ctx;
    const { menuId } = query || {}
    const arrPermissions = havePermissionWithMenuId(roles, menuId, arrPer);
    ctx.permissions = arrPermissions;

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx))

    return { ...componentProps, permissions: arrPermissions }
  }

  return WithPermission;

  /* const WithPermissionHoc = withRouter(connect(({ global }) => ({
    roles: global.roles
  }))(props => (
    <WithPermission {...props} />
  )));

  return WithPermissionHoc */
}