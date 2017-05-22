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

function scrollUp() {
    $('.btn-scroll-top').click(function () {
        $('body,html').animate({scrollTop:0},800);
    })
}

function autoTextarea() {
    $('textarea').autosize();
}

function scrollForm() {
    $("a.anchor-touch").click(function() {
        var elementClick = $(this).attr("href")
        var destination = $(elementClick).offset().top;
        jQuery("html:not(:animated),body:not(:animated)").animate({
            scrollTop: destination
        }, 800);
        $('.input-name').focus();
        return false;
    });
}

function initFile() {
    var inputs = document.querySelectorAll( '.inputfile' );
    Array.prototype.forEach.call( inputs, function( input )
    {
        var label    = input.nextElementSibling,
            labelVal = label.innerHTML;

        input.addEventListener( 'change', function( e )
        {
            var fileName = '';
            if( this.files && this.files.length > 1 )
                fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
            else
                fileName = e.target.value.split( '\\' ).pop();

            if( fileName )
                label.querySelector( 'span' ).innerHTML = fileName;
            else
                label.innerHTML = labelVal;
        });
    });
}

function initMouseMove() {
    var movementStrength = 20;
    var height = movementStrength / $(window).height();
    var width = movementStrength / $(window).width();
    $(".container-wrapper").mousemove(function(e){
        var pageX = e.pageX - ($(window).width() / 2);
        var pageY = e.pageY - ($(window).height() / 2);
        var newvalueX = width * pageX * -1 - 5;
        var newvalueY = height * pageY * -1 - 5;
        $('.mouseov').css("background-position", newvalueX+"px     "+newvalueY+"px");
    })
}


$(window).scroll(function (e) {
    simpleParallax();
    initFixSliderAbout();
    initOpacityBest();

    var heightAddClass = $(this).scrollTop();
    var scrollHeight = $('.container-main-thumbs').height() + $('.container-main-thumbs-t').height();
    var scrollHeight2 = $('.container-main-thumbs').height() + $('.container-main-thumbs-t').height() + $('.container-design-home').height() - 900;
    var scrollHeight3 = $('.out').height() + $('.footer').height() - 890;
    var out = $('.out').height()-60;
    if (heightAddClass >= scrollHeight && heightAddClass < scrollHeight2) {
        $('.container-design-home-bg').css('opacity', '1');
    } else {
        $('.container-design-home-bg').css('opacity', '0');
    }
    if (heightAddClass >= out){
        $('.icon-logo .fill').css('fill', '#75706b');
        $('.icon-mail .feedback-fill-circle').css('fill', '#75706b');
    }   else {
        $('.icon-logo .fill').css('fill', '#d9b189');
        $('.icon-mail .feedback-fill-circle').css('fill', '#c9db75');
    }
    if (heightAddClass >= scrollHeight3){
        $('.box-scroll').addClass('show-scroll-top');
    } else {
        $('.box-scroll').removeClass('show-scroll-top');
    }
});


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

//Parallax
function simpleParallax() {
    var scrolled = $(window).scrollTop() + 1;
    $('.container-header-parallax').css({"transform": "translate3d(0px, " +-(scrolled * 1)+"px, 0px)"});
    $('.container-main-thumbs_parallax-text').css({"transform": "translate3d(0px, " +-(scrolled * 0.7)+"px, 0px)","opacity":1 -(scrolled * 0.0085)});
    $('.container-parallax-img').css({"transform": "translate3d(0px, " + +(scrolled * 8)+"px, 0px)", "opacity":1 -(scrolled * 0.07)});
    $('.container-main-thumbs-t_parallax').css({"transform": "translate3d(0px, " + -(scrolled * 0.1)+"px, 0px)","opacity":0 +(scrolled * 0.01)});
}


function initFixSliderAbout() {
    var heightW = $(this).scrollTop();
    var totalW = $('.container-wrapper-contant').height() + $('.container-wrapper-what-did').height() + $('.container-wrapper-about').height() + $('.wrapper-stages-production_title').height() + 140;
    var height1 = $('#slide-img-1');
    var height2 = $('#slide-img-2');
    var height3 = $('#slide-img-3');
    var height4 = $('#slide-img-4');
    var img1 = $('#img-1');
    var img2 = $('#img-2');
    var img3 = $('#img-3');
    var img4 = $('#img-4');

    var totalH1 = totalW + height1.height()*1.55;
    var totalH2 = totalH1 + height2.height()*1.25;
    var totalH3 = totalH2 + height3.height()*1.75;
    var totalH4 = totalH3 + height4.height()*1.3;


    if(heightW >= totalW && heightW < totalH1){
        height1.find('.wrapper-stages-production_list_number').addClass('greenOpacity');
        // img1.addClass('display-block')
        img1.css({'opacity':'1', 'left':'0'})
    } else {
        height1.find('.wrapper-stages-production_list_number').removeClass('greenOpacity');
        // img1.removeClass('display-block')
        img1.css({'opacity':'0', 'left':'-50%'})
    }

    if(heightW >= totalH1 && heightW < totalH2){
        height2.find('.wrapper-stages-production_list_number').addClass('greenOpacity');
        img2.css({'opacity':'1', 'left':'0'})
    } else {
        height2.find('.wrapper-stages-production_list_number').removeClass('greenOpacity');
        img2.css({'opacity':'0', 'left':'-50%'})
    }

    if(heightW >= totalH2 && heightW < totalH3){
        height3.find('.wrapper-stages-production_list_number').addClass('greenOpacity');
        img3.css({'opacity':'1', 'left':'0'})
    } else {
        height3.find('.wrapper-stages-production_list_number').removeClass('greenOpacity');
        img3.css({'opacity':'0', 'left':'-50%'})
    }

    if(heightW >= totalH3 && heightW < totalH4){
        height4.find('.wrapper-stages-production_list_number').addClass('greenOpacity');
        img4.css({'opacity':'1', 'left':'0'})
    } else {
        height4.find('.wrapper-stages-production_list_number').removeClass('greenOpacity');
        img4.css({'opacity':'0', 'left':'-50%'})
    }

    Revealator.effects_padding = '-220';
}

function initOpacityBest() {
    var heightOpacity = $(this).scrollTop();
    var scrollHeightOpacity = $('.container-wrapper-contant').height() + $('.container-wrapper-what-did').height() + $('.container-wrapper-about').height() + $('.container-wrapper-stages-production').height()-100;

    if(heightOpacity >= scrollHeightOpacity){
        $('.container-wrapper-best').css('opacity', '1');
    } else {
        $('.container-wrapper-best').css('opacity', '0');
    }
}

function initAnimate() {
    $('.container-popup-portfolio-img_list').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated fadeIn',
        offset: 100
    });
}

function initVideo() {
    $('.wrapper-about_video-img-box').mouseover(function () {
        $('.wrapper-about_img').css('opacity','0');
        if($(this).find("video").length){
            $(this).find("video")[0].play();
        }
    });

    $('.wrapper-about_video-img-box').mouseout(function () {
        $('.wrapper-about_img').css('opacity','1');
        if($(this).find("video").length){
            $(this).find("video")[0].pause();
        }
    });
}

function initSwiperGallery() {
    var swiper = new Swiper('.swiper-slider-about-gallery', {
        paginationClickable: true,
        loop: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        pagination: '.swiper-pagination',
        paginationType: 'fraction',
        speed: 800
    });
}

function initPopupPortfolio() {
    $('.popup-portfolio').click(function () {
        $(this).addClass('open-popup');
        $('body,html').animate({scrollTop:0},200);
        $('.container-overflow').addClass('overflow-open');
        $('.container-popup-portfolio').css('right', '0');
        $('.container-btn-portfolio').css('right', '0');
        $('body').addClass('overflow-hidden');
        event.preventDefault();
    });

    $('.container-overflow').click(function () {
        $(this).removeClass('overflow-open');
        $('.container-popup-portfolio').css('right', '-115%');
        $('.container-btn-portfolio').css('right', '-115%');
        $('body').removeClass('overflow-hidden');
    });

    $('.brn-close-popup').click(function () {
        $('.container-overflow').removeClass('overflow-open');
        $('.container-popup-portfolio').css('right', '-115%');
        $('.container-btn-portfolio').css('right', '-115%');
        $('body').removeClass('overflow-hidden');
    });
}

function initMakeOrder() {
    $('.make-order-popup').click(function () {
        $('.container-overflow').removeClass('overflow-open');
        $('.container-popup-portfolio').css('right', '-115%');
        $('.container-btn-portfolio').css('right', '-115%');
        $('body').removeClass('overflow-hidden');

        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top;

        function setTimeAncour() {
            $("html:not(:animated),body:not(:animated)").animate({
                scrollTop: destination
            }, 800);
            $('.input-name').focus();
        }

        setTimeout(setTimeAncour,450);

        return false;
    });
}

function initHoverSwiper() {
    $('.hoverBtn').mouseover(function () {
        $('.swiper-slider-about-gallery .swiper-slide-img > img').css('transform','scale(1.1)')
    });
    $('.hoverBtn').mouseout(function () {
        $('.swiper-slider-about-gallery .swiper-slide-img > img').css('transform','scale(1)')
    });

    $('.hoverBtn').mouseover(function () {
        $('.swiper-slider-news .swiper-slide > img').css('transform','scale(1.1)')
    });
    $('.hoverBtn').mouseout(function () {
        $('.swiper-slider-news .swiper-slide > img').css('transform','scale(1)')
    });
}

function initPopupNews() {
    $('.popup-news').click(function () {
        $(this).addClass('open-popup');
        $('body,html').animate({scrollTop:0},200);
        $('.container-overflow').addClass('overflow-open');
        $('.container-popup-news').css('right', '0');
        $('.container-btn-news').css('right', '0');
        $('body').addClass('overflow-hidden');
        event.preventDefault();
    });

    $('.container-overflow').click(function () {
        $(this).removeClass('overflow-open');
        $('.container-popup-news').css('right', '-100%');
        $('.container-btn-news').css('right', '-115%');
        $('body').removeClass('overflow-hidden');
    });

    $('.brn-close-popup').click(function () {
        $('.container-overflow').removeClass('overflow-open');
        $('.container-popup-news').css('right', '-100%');
        $('.container-btn-news').css('right', '-115%');
        $('body').removeClass('overflow-hidden');
    });
}

function initSwiperNews() {
    var swiper = new Swiper('.swiper-slider-news', {
        paginationClickable: true,
        loop: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        speed: 800
    });
}


var BarbaWidget = {
    init: function() {
        var scope = this;
        Barba.Pjax.start();
        Barba.Prefetch.init();
        Barba.Pjax.getTransition = function() {
            return scope.MovePage;
        };
    },
    MovePage: Barba.BaseTransition.extend({
        start: function() {
            Promise.all([this.newContainerLoading, this.fadeOut()]).then(this.movePages.bind(this));
        },

        initFixBlock: function () {
            $('.sticky').Stickyfill();
        },

        initHoverSwiper: function () {
            $('.hoverBtn').mouseover(function () {
                $('.swiper-slider-about-gallery .swiper-slide-img > img').css('transform','scale(1.1)')
            });
            $('.hoverBtn').mouseout(function () {
                $('.swiper-slider-about-gallery .swiper-slide-img > img').css('transform','scale(1)')
            });

            $('.hoverBtn').mouseover(function () {
                $('.swiper-slider-news .swiper-slide > img').css('transform','scale(1.1)')
            });
            $('.hoverBtn').mouseout(function () {
                $('.swiper-slider-news .swiper-slide > img').css('transform','scale(1)')
            });
        },

        initMouseMove: function () {
            var movementStrength = 20;
            var height = movementStrength / $(window).height();
            var width = movementStrength / $(window).width();
            $(".container-wrapper").mousemove(function(e){
                var pageX = e.pageX - ($(window).width() / 2);
                var pageY = e.pageY - ($(window).height() / 2);
                var newvalueX = width * pageX * -1 - 5;
                var newvalueY = height * pageY * -1 - 5;
                $('.mouseov').css("background-position", newvalueX+"px     "+newvalueY+"px");
            })
        },

        scrollForm: function () {
            $("a.anchor-touch").click(function() {
                var elementClick = $(this).attr("href")
                var destination = $(elementClick).offset().top;
                jQuery("html:not(:animated),body:not(:animated)").animate({
                    scrollTop: destination
                }, 800);
                $('.input-name').focus();
                return false;
            });
        },

        focusInput: function () {
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
        },



        fadeOut: function() {
            return $(this.oldContainer).animate({
                opacity: 0
            }).promise();
        },

        movePages: function() {
            var scope = this;
            this.initFixBlock();
            this.initHoverSwiper();
            this.initMouseMove();
            this.scrollForm();
            this.focusInput();
            // if ($("#map").length > 0) window.onload = this.initMaps();



            TweenLite.set(this.newContainer, {
                visibility: 'visible',
                xPercent: 100,
                position: 'absolute',
                left: 0,
                top: 0,
                right: 0
            });

            TweenLite.to(this.oldContainer, 0.6, { xPercent: -100 });
            TweenLite.to(this.newContainer, 0.6, { xPercent: 0, onComplete: function() {
                TweenLite.set(scope.newContainer, { clearProps: 'all' });
                scope.done();
            }});

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
            $(window).scroll(function (e) {

            });
        }

    })
};

var MapPage = Barba.BaseView.extend({
    namespace: 'map-page',

    onEnterCompleted: function() {
        function initMap() {
            var coordinates = {lat: 57.0162005, lng: 24.1228066},
                map = new google.maps.Map(document.getElementById('map'), {
                    center: coordinates,
                    zoom: 15,
                    disableDefaultUI: false,
                    scrollwheel: false,
                    styles: [
                        {
                            "featureType": "water",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#e9e9e9"
                                },
                                {
                                    "lightness": 17
                                }
                            ]
                        },
                        {
                            "featureType": "landscape",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#f5f5f5"
                                },
                                {
                                    "lightness": 20
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 17
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 29
                                },
                                {
                                    "weight": 0.2
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 18
                                }
                            ]
                        },
                        {
                            "featureType": "road.local",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 16
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#f5f5f5"
                                },
                                {
                                    "lightness": 21
                                }
                            ]
                        },
                        {
                            "featureType": "poi.park",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#dedede"
                                },
                                {
                                    "lightness": 21
                                }
                            ]
                        },
                        {
                            "elementType": "labels.text.stroke",
                            "stylers": [
                                {
                                    "visibility": "on"
                                },
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 16
                                }
                            ]
                        },
                        {
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "saturation": 36
                                },
                                {
                                    "color": "#333333"
                                },
                                {
                                    "lightness": 40
                                }
                            ]
                        },
                        {
                            "elementType": "labels.icon",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "transit",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#f2f2f2"
                                },
                                {
                                    "lightness": 19
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#fefefe"
                                },
                                {
                                    "lightness": 20
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "color": "#fefefe"
                                },
                                {
                                    "lightness": 17
                                },
                                {
                                    "weight": 1.2
                                }
                            ]
                        }
                    ]
                });

            var markerImage = {
                url: 'img/icon-map.png',
                size: new google.maps.Size(80, 80),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(35, 35)
            };

            marker = new google.maps.Marker({
                position: coordinates,
                map: map,
                icon: markerImage
            });
        }
        setTimeout(initMap,500)
    }
});

var NewsPage = Barba.BaseView.extend({
    namespace: 'news-page',

    onEnterCompleted: function() {
        function initPopupNews() {
            $('.popup-news').click(function () {
                $(this).addClass('open-popup');
                $('body,html').animate({scrollTop:0},200);
                $('.container-overflow').addClass('overflow-open');
                $('.container-popup-news').css('right', '0');
                $('body').addClass('overflow-hidden');
                event.preventDefault();
            });

            $('.container-overflow').click(function () {
                $(this).removeClass('overflow-open');
                $('.container-popup-news').css('right', '-100%');
                $('body').removeClass('overflow-hidden');
            });

            $('.brn-close-popup').click(function () {
                $('.container-overflow').removeClass('overflow-open');
                $('.container-popup-news').css('right', '-100%');
                $('body').removeClass('overflow-hidden');
            });
        }

        function initSwiperNews() {
            var swiper = new Swiper('.swiper-slider-news', {
                paginationClickable: true,
                loop: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                speed: 800
            });
        }

        initPopupNews();
        initSwiperNews();
    }
});

var AboutPage = Barba.BaseView.extend({
    namespace: 'about-page',

    onEnterCompleted: function() {
        function initVideo() {
            $('.wrapper-about_video-img-box').mouseover(function () {
                $('.wrapper-about_img').css('opacity','0');
                if($(this).find("video").length){
                    $(this).find("video")[0].play();
                }
            });

            $('.wrapper-about_video-img-box').mouseout(function () {
                $('.wrapper-about_img').css('opacity','1');
                if($(this).find("video").length){
                    $(this).find("video")[0].pause();
                }
            });
        }

        function initSwiperGallery() {
            var swiper = new Swiper('.swiper-slider-about-gallery', {
                paginationClickable: true,
                loop: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                pagination: '.swiper-pagination',
                paginationType: 'fraction',
                speed: 800
            });
        }

        initVideo();
        initSwiperGallery();
    }
});

var PortfolioPage = Barba.BaseView.extend({
    namespace: 'portfolio-page',

    onEnterCompleted: function() {
        function initPopupPortfolio() {
            $('.popup-portfolio').click(function () {
                $(this).addClass('open-popup');
                $('body,html').animate({scrollTop:0},200);
                $('.container-overflow').addClass('overflow-open');
                $('.container-popup-portfolio').css('right', '0');
                $('body').addClass('overflow-hidden');
                event.preventDefault();
            });

            $('.container-overflow').click(function () {
                $(this).removeClass('overflow-open');
                $('.container-popup-portfolio').css('right', '-115%');
                $('body').removeClass('overflow-hidden');
            });

            $('.brn-close-popup').click(function () {
                $('.container-overflow').removeClass('overflow-open');
                $('.container-popup-portfolio').css('right', '-115%');
                $('body').removeClass('overflow-hidden');
            });
        }

        function initMakeOrder() {
            $('.make-order-popup').click(function () {
                $('.container-overflow').removeClass('overflow-open');
                $('.container-popup-portfolio').css('right', '-115%');
                $('body').removeClass('overflow-hidden');

                var elementClick = $(this).attr("href");
                var destination = $(elementClick).offset().top;

                function setTimeAncour() {
                    $("html:not(:animated),body:not(:animated)").animate({
                        scrollTop: destination
                    }, 800);
                    $('.input-name').focus();
                }

                setTimeout(setTimeAncour,450);

                return false;
            });
        }

        initPopupPortfolio();
        initMakeOrder();
    }
});


function initDropzone() {
    Dropzone.options.myAwesomeDropzone = {
        paramName: "file",
        maxFilesize: 2,
        dictDefaultMessage:'Attach file',
        addRemoveLinks: true,
        previewTemplate: document.getElementById('preview-template').innerHTML,
        accept: function(file, done) {
            console.log('efefef');
            if (file.name == "justinbieber.jpg") {
                done("Naha, you don't.");
            }
            else { done(); }
        }
    };
};



focusInput();
scrollUp();
autoTextarea();
scrollForm();
// initFile();
initMouseMove();
initVideo();
initSwiperGallery();
initPopupPortfolio();
initHoverSwiper();
initPopupNews();
initSwiperNews();
initMakeOrder();
initDropzone();

BarbaWidget.init();
MapPage.init();
NewsPage.init();
AboutPage.init();
PortfolioPage.init();

// document.addEventListener("DOMContentLoaded", function() {
//     BarbaWidget.init();
//     MapPage.init();
//     NewsPage.init();
//     AboutPage.init();
// });

