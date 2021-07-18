import $ from 'jquery';
export const initJquery = () => {
    $(document).ready(function () {
        awe_tab();
        dl_backtotop();
        $('#myBtn').click(function () {
            $('#myModal').modal();
        });
        awe_owl();
        // setTimeout(() => {
        //   awe_owl();
        // }, (100));
    });
};

function dl_backtotop() {
    if ($('.back-to-top').length) {
        var scrollTrigger = 200, // px
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('.back-to-top').addClass('show');
                } else {
                    $('.back-to-top').removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        $('.back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate(
                {
                    scrollTop: 0,
                },
                700
            );
        });
    }
}

/********************************************************
# OWL CAROUSEL
********************************************************/

function awe_owl() {
    // $(".owl-carousel:not(.not-dqowl)").owlCarousel({
    // 	navigation: false
    // });
    $('.owl-carousel').each(function () {
        var xs_item = $(this).attr('data-xs-items');
        var md_item = $(this).attr('data-md-items');
        var lg_item = $(this).attr('data-lg-items');
        var sm_item = $(this).attr('data-sm-items');
        var margin = $(this).attr('data-margin');
        var dot = $(this).attr('data-dot');
        var nav = $(this).attr('data-nav');
        var height = $(this).attr('data-height');
        var play = $(this).attr('data-play');
        var loop = $(this).attr('data-loop');
        if (typeof margin !== typeof undefined && margin !== false) {
        } else {
            margin = 30;
        }
        if (typeof xs_item !== typeof undefined && xs_item !== false) {
        } else {
            xs_item = 1;
        }
        if (typeof sm_item !== typeof undefined && sm_item !== false) {
        } else {
            sm_item = 3;
        }
        if (typeof md_item !== typeof undefined && md_item !== false) {
        } else {
            md_item = 4;
        }
        if (typeof lg_item !== typeof undefined && lg_item !== false) {
        } else {
            lg_item = 4;
        }
        if (typeof dot !== typeof undefined && dot !== true) {
            dot = true;
        } else {
            dot = false;
        }
        $(this).owlCarousel({
            loop: loop,
            margin: Number(margin),
            responsiveClass: true,
            dots: dot,
            nav: false,
            autoplay: play,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            autoHeight: false,
            navText: ['', ''],
            responsive: {
                0: {
                    items: Number(xs_item),
                },
                600: {
                    items: Number(sm_item),
                },
                1000: {
                    items: Number(md_item),
                },
                1200: {
                    items: Number(lg_item),
                },
            },
        });
    });
}

function awe_tab() {
    $('.e-tabs').each(function () {
        $(this)
            .find('.tabs-title li:first-child')
            .addClass('current');
        $(this)
            .find('.tab-content')
            .first()
            .addClass('current');

        $(this)
            .find('.tabs-title li')
            .click(function () {
                var tab_id = $(this).attr('data-tab');
                var url = $(this).attr('data-url');
                $(this)
                    .closest('.e-tabs')
                    .find('.tab-viewall')
                    .attr('href', url);
                $(this)
                    .closest('.e-tabs')
                    .find('.tabs-title li')
                    .removeClass('current');
                $(this)
                    .closest('.e-tabs')
                    .find('.tab-content')
                    .removeClass('current');
                $(this).addClass('current');
                $(this)
                    .closest('.e-tabs')
                    .find('#' + tab_id)
                    .addClass('current');
            });
    });
}
