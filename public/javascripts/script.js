$(document).ready(function () {

    $('.cbActive').click(function(e){
        e.preventDefault();
    });

    $(window).on('scroll', function () {
        if($(window).scrollTop()===0 && $("#menu-toggler").attr("aria-expanded")===true) {
            $('#main-nav').removeClass('nav-scroll-menu');
            $('#main-menu').addClass('menu-scroll');
        };
    });

    $(window).on('scroll', function () {
        if($(window).scrollTop()) {
            $('#main-nav').addClass('nav-scroll-menu');
            $('#main-menu').addClass('menu-scroll');
        } else {
            if ($("#menu-toggler").attr("aria-expanded")==="false") {
                $('#main-nav').removeClass('nav-scroll-menu');
                $('#main-menu').removeClass('menu-scroll');
            };
        };
    });

    var pressed = true;
    $("#menu-toggler").click(function () {
        var altura = $(window).scrollTop();

        if (altura === 0) {
            if ($("#menu-toggler").attr("aria-expanded")==="false") {
                pressed = false;
                $('#main-nav').addClass('nav-scroll-menu');
                $('#main-menu').addClass('menu-scroll');
            } else {
                pressed = true;
                $('#main-nav').removeClass('nav-scroll-menu');
                $('#main-menu').removeClass('menu-scroll');
            }
        }
    });

    $('.material-heart').on('click', function () {
        $(this).toggleClass('material-heart-red')
    });

    $('.heartt').on('click', function () {
        $(this).toggleClass('material-heart-red2')
    });

    $(window).on('scroll', function () {
        if ($(this).scrollTop()>100) {
            $('#totop').fadeIn(600);
        } else {
            $('#totop').fadeOut(600);
        }
    });

    $('#totop').click(function () {
        $("html, body").animate({scrollTop: 0}, 600);
    });

    $('#newDestinyButton').click(function () {
        //$('#newDestinyForm').fadeIn(2000);
        $('#newDestinyForm').delay(1000).slideToggle(2000);
        $('#newDestinyButton').fadeOut(1000);
    });

    $('#newDestinyClose').click(function () {
       $('#newDestinyForm').slideToggle(2000);
       $('#newDestinyButton').delay(2000).fadeIn(1000);
    });

});

