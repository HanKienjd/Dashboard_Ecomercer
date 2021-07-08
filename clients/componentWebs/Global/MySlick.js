/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import '@/static/web/js/slick.min'

const MySlick = (props) => {
    const { id, children, style, className, ...options } = props
    const defaultId = `id-${Math.ceil((Math.random() * 1000))}-${Math.ceil((Math.random() * 1000))}`
    const [idState, setIdState] = useState(id || defaultId)
    const createSlick = () => {
      $(document).ready(() => {
          $(`#${idState}`).slick(options);
      })
  }
    useEffect(() => {
        let TimeOut
        if (typeof window !== 'undefined' && children) {
            TimeOut = setTimeout(() => {
                createSlick()
            }, 100)
        }
        return () => {
            clearTimeout(TimeOut)
        }
    })
  
    return (
      <div className="mySlick">
        <div className={`${className || ""}`} id={idState} style={style}>
          {children}
        </div>
      </div>
    )
}
export default React.memo(MySlick)