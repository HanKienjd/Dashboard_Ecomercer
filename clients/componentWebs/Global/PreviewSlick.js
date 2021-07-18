import React, { useEffect, useState, useMemo } from 'react';
import $ from 'jquery';
import _ from 'lodash';
import slick from '@/static/web/js/slick.min.js'
import { getResponsiveImage } from '@/componentWebs/NbmImageNew';

const PreviewSlick = (props) => {
    const {
        id,
        style,
        className,
        altImage,
        images = [],
        imageResize = [120, 100, 70],
        bigImageResize = [800, 600, 600],
        ...options
    } = props;
    useEffect(() => {
        let time
        if (typeof window !== 'undefined') {
            time = setTimeout(() => {
                createSlick()
            }, 100)
        }
        return () => {
            clearTimeout(time)
        }
    }, [])
    useEffect(() => {
        if (typeof window !== 'undefined') {
            $(window).on("load", () => {
                handleCarouselsHeight();
                setTimeout(() => {
                    $("body").addClass("over-visible");
                }, 300);
            });
            $(window).on(
                "resize",
                _.debounce(() => {
                    handleCarouselsHeight();
                }, 200)
            );
        }

    })
    function handleCarouselsHeight() {
        const $left = $(".left");
        if (window.matchMedia("(min-width: 1024px)").matches) {
            const gl2H = $(".gallery2").height();
            $left.css("height", gl2H);
        } else {
            $left.css("height", "auto");
        }
    }
    const createSlick = async () => {
        const $left = $(".left");
        const $gl = $(".gallery");
        const $gl2 = $(".gallery2");
        $gl.slick({
            rows: 0,
            slidesToShow: 2,
            arrows: false,
            draggable: false,
            useTransform: false,
            mobileFirst: true,
            vertical: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 1023,
                    settings: {
                        slidesToShow: 1,
                        vertical: true
                    }
                }
            ]
        });

        $gl2.slick({
            rows: 1,
            useTransform: false,
            prevArrow: null,
            nextArrow: null,
            fade: true,
            asNavFor: $gl
        });
        setTimeout(() => {
            $("body").addClass("over-visible");
        }, 300);
        $(".gallery .item").on("click", function () {
            const index = $(this).attr("data-slick-index");
            $gl2.slick("slickGoTo", index);
        });
    }


    const renderTo = useMemo(() => (
        <div className="synch-carousels">
            <div className="left child">
                <div className="gallery">
                    {images.map(image => {
                        return (
                            <div className="item" key={image}>
                                <img src={getResponsiveImage(image, imageResize)} alt="" />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="right child">
                <div className="gallery2">
                    {images.map(image => {
                        return (
                            <div className="item" key={image}>
                                <img src={getResponsiveImage(image, bigImageResize)} alt="" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

    ), [images])
    return (
        <React.Fragment>
            {renderTo}
        </React.Fragment>
    )
}
export default React.memo(PreviewSlick)