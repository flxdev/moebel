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

var scrollBlockBg = $('.container-design-home-bg'), display;
var scrollHeight = $('.container-main-thumbs').height() + $('.container-main-thumbs-t').height()-200;

$(window).scroll(function (e) {
    simpleParallax();
    display = $(this).scrollTop() >= scrollHeight;
    display != scrollBlockBg.css('opacity') && scrollBlockBg.stop().animate({ 'opacity': display }, 200);


});

function fixDesign() {
    var topPosid = $('.container-design-home-sidebar');

    if (!topPosid.length){
        return
    }

    var topPos = topPosid.offset().top;
    $(window).scroll(function() {
        var top = $(document).scrollTop(),
            pip = $('.container-home-work').offset().top,
            height = $('.container-design-home-sidebar').outerHeight();
        if (top > topPos && top < pip - height) {$('.container-design-home-sidebar').addClass('fixed').removeAttr("style");}
        else if (top > pip - height) {$('.container-design-home-sidebar').removeClass('fixed').css({'position':'absolute','bottom':'0'});}
        else {$('.container-design-home-sidebar').removeClass('fixed');}
    });
}

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


fixDesign();
scrollUp();
autoTextarea();
focusInput();
scrollForm();

