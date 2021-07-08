import React, { useEffect, useState } from 'react'
import $ from 'jquery';

const ZoomImage = (props) => {
    const { id, className, style, src, imgClass, imgStyle, lensSize, lensClass, zoomClass, zoomStyle, zoomRate, } = props;
    const [idState, setIdState] = useState(id || `id-${  Date.now()}`);
    let timeout;
    useEffect(() => {
        if (typeof window !== 'undefined') {
            checkLoop();
        }
        return () => {
            clearTimeout(timeout);
        }
    }, [src]);
    const checkLoop = () => {
        clearTimeout(timeout);
        const img = document.getElementById("zoom-image");
        if (img && img.height) {
            imageZoom();
        }
        else {
            timeout = setTimeout(() => {
                checkLoop();
            }, 300);
        }
    }
    const imageZoom = () => {
        const img = document.getElementById("zoom-image");
        const result = document.getElementById("zoom-result");
        const sizeRate = result.offsetHeight / (result.offsetWidth || 1);
        const lens = document.createElement("DIV");
        lens.setAttribute("style", `position: absolute; border: 1px solid #d4d4d4; width: ${lensSize || 50}px; height:${(lensSize || 50) * sizeRate}px; visibility: hidden;`);
        lens.setAttribute("class", lensClass || "");
        img.parentElement.insertBefore(lens, img);
        const cx = result.offsetWidth / lens.offsetWidth;
        const cy = result.offsetHeight / lens.offsetHeight;
        result.style.backgroundImage = `url('${  img.src  }')`;
        result.style.backgroundSize = `${img.width * cx  }px ${  img.height * cy  }px`;
        const moveLens = (e) => {
            result.style.visibility = "visible";
            lens.style.visibility = "visible";
            e.preventDefault();
            const pos = getCursorPos(e);
            let x = pos.x - (lens.offsetWidth / 2);
            let y = pos.y - (lens.offsetHeight / 2);
            if (x > img.width - lens.offsetWidth) { x = img.width - lens.offsetWidth; }
            if (x < 0) { x = 0; }
            if (y > img.height - lens.offsetHeight) { y = img.height - lens.offsetHeight; }
            if (y < 0) { y = 0; }
            lens.style.left = `${x  }px`;
            lens.style.top = `${y  }px`;
            result.style.backgroundPosition = `-${  x * cx  }px -${  y * cy  }px`;
        };
        const getCursorPos = (e) => {
            let x = 0; let y = 0;
            e = e || window.event;
            const a = img.getBoundingClientRect();
            x = e.pageX - a.left;
            y = e.pageY - a.top;
            x -= window.pageXOffset;
            y -= window.pageYOffset;
            return { x, y };
        };
        const lensLeave = (e) => {
            result.style.visibility = "hidden";
            lens.style.visibility = "hidden";
        };
        let follow;
        if (window.innerWidth >= 768) {
            follow = true;
            lens.addEventListener("mousemove", moveLens);
            img.addEventListener("mousemove", moveLens);
            lens.addEventListener("mouseleave", lensLeave);
            img.addEventListener("mouseleave", lensLeave);
        }
        window.addEventListener('resize', () => {
            if (window.innerWidth < 768 && follow) {
                follow = false;
                lens.removeEventListener("mousemove", moveLens);
                img.removeEventListener("mousemove", moveLens);
                lens.removeEventListener("mouseleave", lensLeave);
                img.removeEventListener("mouseleave", lensLeave);
            }
            else if (!follow) {
                follow = true;
                lens.removeEventListener("mousemove", moveLens);
                img.removeEventListener("mousemove", moveLens);
                lens.removeEventListener("mouseleave", lensLeave);
                img.removeEventListener("mouseleave", lensLeave);
                lens.addEventListener("mousemove", moveLens);
                img.addEventListener("mousemove", moveLens);
                lens.addEventListener("mouseleave", lensLeave);
                img.addEventListener("mouseleave", lensLeave);
            }
        })
    }
    return (
      <React.Fragment>
        <div
          className={className || ""}
          style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                ...(style || {}),
                position: 'relative', textAlign: 'center', width: '100%', height: '100%',
            }}
        >
          <div style={{ position: 'relative', width: 'max-content', height: 'auto' }}>
            <img
              alt=""
              id="zoom-image"
              src={src}
              className={imgClass || ""}
              style={{
                            width: 'auto', height: 'auto',
                            maxWidth: '100%', maxHeight: '467px',
                            ...(imgStyle || {})
                        }}
            />
          </div>
          <div
            id="zoom-result"
            className={zoomClass || ""}
            style={{
                        position: 'absolute',
                        top: 0,
                        left: "100%",
                        width: "100%",
                        height: "100%",
                        border: "1px solid #d4d4d4",
                        backgroundColor: "#FFFFFF",
                        zIndex: 999,
                        visibility: 'hidden',
                        ...(zoomStyle || {}),
                    }}
          />
        </div>
      </React.Fragment>
    )
}
export default React.memo(ZoomImage)