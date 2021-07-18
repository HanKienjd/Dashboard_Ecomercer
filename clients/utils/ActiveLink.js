import Router, { withRouter } from 'next/router'
import Link from 'next/link';
import { Button } from 'antd'
import log from './log';
import { scrollToTop } from './utils';

const ActiveLink = ({ children, router, path, href, className, style, onClick, ...props }) => {
  const handleClick = e => {
    log("ActiveLink handleClick: ", e)
    e.preventDefault()
    Router.push(path, href).then(() =>
      scrollToTop(document.getElementsByClassName('bread-crumb').length > 0 && document.getElementsByClassName('bread-crumb')[0].offsetTop));;
    if (onClick)
      onClick()
  }

  return (
    <a href={href} onClick={handleClick} style={style} className={className} {...props}>
      {children}
    </a>
  )
}

export default withRouter(ActiveLink)


export const ButtonLink = withRouter(({ children, router, href, className, style, ...props }) => {
  // const style = {
  //   // marginRight: 10,
  //   color: router.pathname === href ? 'red' : 'black'
  // }

  const handleClick = e => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <Button onClick={handleClick} style={style} className={className} {...props}>
      {children}
    </Button>
  )
})

export const MenuLink = withRouter(({ children, href, to, target, replace, onClick, className, router, ...props }) => {

  /* const handleClick = e => {
    e.preventDefault()
    router.push(to)
  } */

  if (typeof onClick === 'undefined') {
    // log("onClick: ", onClick)
    return (
      <Link href={`/${href}`} as={to} replace={replace}>
        <a target={target} className={className} {...props}>
          {children}
        </a>
      </Link>
    )
    /* return (
      <a href={to} onClick={handleClick} target={target} replace={replace} className={className} {...props}>
        {children}
      </a>
    ) */
  }

  return (
    <a href={to} onClick={onClick} target={target} replace={replace} className={className} {...props}>
      {children}
    </a>
  )
})


