//Parallax
function simpleParallax() {
    var scrolled = $(window).scrollTop() + 1;
    $('.header-parallax').css({"transform": "translate3d(0px, " +-(scrolled * 0.8)+"px, 0px)"});
    $('.container-main-thumbs_parallax-text').css({"transform": "translate3d(0px, " +-(scrolled * 0.7)+"px, 0px)","opacity":1 -(scrolled * 0.0085)});
    $('.container-parallax-img').css({"transform": "translate3d(0px, " + +(scrolled * 8)+"px, 0px)", "opacity":1 -(scrolled * 0.07)});
    $('.container-main-thumbs-t_parallax').css({"transform": "translate3d(0px, " + -(scrolled * 0.1)+"px, 0px)","opacity":0 +(scrolled * 0.01)});
}

function focusInput() {
    var inputFocus = $('.input-box');
    var inputLabel = $('.input-label');

    $(inputFocus).on('focus', function () {
        $(this).parents().closest('.box-input').find('.form-label').find(inputLabel).addClass('label-focus');
    });

    $(inputFocus).on('focusout', function () {
        if (this != null && this.value.length == 0){
            $(this).parents().closest('.box-input').find('.form-label').find(inputLabel).removeClass('label-focus');
        }else {
            $(this).parents().closest('.box-input').find('.form-label').find(inputLabel).addClass('label-focus');
        }
    });
}

$(window).scroll(function (e) {
    simpleParallax();

    var heightAddClass = $(this).scrollTop();
    var scrollHeight = $('.container-main-thumbs').height() + $('.container-main-thumbs-t').height();
    var scrollHeight2 = $('.container-main-thumbs').height() + $('.container-main-thumbs-t').height() + $('.container-design-home').height() - 900;
    if (heightAddClass >= scrollHeight && heightAddClass < scrollHeight2) {
        $('.container-design-home-bg').css('opacity', '1');
    } else {
        $('.container-design-home-bg').css('opacity', '0');
    }
});

function scrollForm() {
    $("a.anchor-touch").click(function() {
        var elementClick = $(this).attr("href")
        var destination = $(elementClick).offset().top;
        jQuery("html:not(:animated),body:not(:animated)").animate({
            scrollTop: destination
        }, 800);
        return false;
    });
}

function autoTextarea() {
    $('textarea').autosize();
}

function scrollUp() {
    $('.btn-scroll-top').click(function () {
        $('body,html').animate({scrollTop:0},800);
    })
}

//Parallax
if ($('.parallax').length) {
    Parallax($('.parallax'));
}

function Parallax($parallaxes) {
    $(window).on('scroll', function () {
        var scrollTop = $(window).scrollTop(),
            bSH = $('body').scrollHeight,
            $prlx, $wrapper, wrapperRect, wrapperOffset, wrapperMargin,
            speed, direction, y, scrollHeight, scrollPosition, axis,
            data = {}, topBorder;
        $parallaxes.each(function () {
            data = {};
            $prlx = $(this);
            axis = $prlx.data('axis') || 'y',
                topBorder = 0,
                bottomBorder = 0;

            if (!$prlx.length) {
                return false;
            }

            if ($prlx.closest('.js-parallax-wrapper').length) {
                $wrapper = $prlx.closest('.js-parallax-wrapper');
            } else {
                $wrapper = $prlx.parent();
            }

            wrapperRect = $wrapper[0].getBoundingClientRect();
            speed = parseInt($prlx.data('speed'), 10) / 109 || 0.20;
            direction = parseInt($prlx.data('direction'), 10) || 1;
            wrapperOffset = $wrapper.offset().top;

            wrapperMargin = ($(window).height() - wrapperRect.height + 850) / 2;

            if (0 > wrapperMargin && (scrollTop + wrapperRect.top) <= topBorder) {
                wrapperMargin = 0;
            }

            y = Math.round((wrapperRect.top - wrapperMargin) * speed) * direction;

            if (scrollTop === 0) {
                y = 0;
            } else {
                scrollHeight = bSH;
                scrollPosition = $(window).height() + scrollTop;
                if (
                    scrollHeight - wrapperOffset - $wrapper.innerHeight() <= 2 &&
                    (scrollHeight - scrollPosition) / scrollHeight === 0
                ) {
                    y = 0;
                }
            }
            data[axis] = y;
            TweenLite.to($prlx, 1, data);
        });
    });
};

function initFixBlock() {
    $('.sticky').Stickyfill();
}

initFixBlock();
scrollUp();
autoTextarea();
focusInput();
scrollForm();

