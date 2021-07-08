import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import '@/static/web/js/jquery.fancybox.min.js'
const MyFancyBox = (props) => {
    const { id, children, style, className, ...options } = props
    const defaultId = `id-${Math.ceil((Math.random() * 1000))}-${Math.ceil((Math.random() * 1000))}`
    const [idState, setIdState] = useState(id || defaultId)

    useEffect(() => {
        let TimeOut
        if (typeof window !== 'undefined' && children) {
            TimeOut = setTimeout(() => {
                createFancyBox()
            }, 100)
        }
        return () => {
            clearTimeout(TimeOut)
        }
    })
    const createFancyBox = () => {
        $(document).ready(function () {
            $(`#${idState}`).fancybox(options);
        })
    }
    return (
        <div className={`${className ? className : ""}`} id={idState} style={style}>
            {children}
        </div>
    )
}
export default React.memo(MyFancyBox)