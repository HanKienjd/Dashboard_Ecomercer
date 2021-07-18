import React, { useEffect, useState, useRef } from 'react'
import Isotope from "@/static/web/js/isotope.pkgd.min.js"

const Isotope1 = (props) => {
    const { id, children, style, className, ...options } = props
    const isoRef = useRef()
    // const [state, setState] = useState({ isotope: null })
    // console.log(children)
    useEffect(() => {
        let show
        if (children) {
            show = setTimeout(() => {
                new Isotope(isoRef.current, options)
            }, 500)
        }
        return () => {
            clearTimeout(show)
        }
    }, [children])
    return (
      <>
        <div className={className} ref={isoRef} id={id} style={style}>
          {props.children}
        </div>

      </>
    )
}
export default React.memo(Isotope1)