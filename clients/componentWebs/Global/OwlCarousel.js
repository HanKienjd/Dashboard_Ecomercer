import React, {  useState } from 'react'
import '@/static/web/js/owl.carousel'
import $ from 'jquery';

const OwlCarousel = (props) => {
    const { id, children, style, className, ...options } = props
    const defaultId = `id-${Math.ceil((Math.random() * 1000))}-${Math.ceil((Math.random() * 1000))}`
    // eslint-disable-next-line no-unused-vars
    const [idState, setIdState] = useState(id || defaultId)

    const createCarousel = () => {
            $(`#${idState}`).owlCarousel(options)
    }
    React.useEffect(()=>{
     const time = setTimeout(() => {
        createCarousel()
      },100)
      return ()=>{
        clearTimeout(time)
      }
    },[])
    // console.log('children', children)
    return (
      <>
        <div className={`owl-carousel ${className || ""}`} id={idState} style={style}>
          {children}
        </div>
      </>
    )
}
export default React.memo(OwlCarousel)