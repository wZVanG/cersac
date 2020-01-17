function isMobile() {

  is_mobile = false;
  is_phone = false;
  var width = $(window).width();
  $('body').removeClass('mobile');
  $('body').removeClass('phone');

  if ( width <= 1024 ) {
    is_mobile = true;
    $('body').addClass('mobile');
  }
  
  if ( width <= 767 ) {
    is_phone = true;
    $('body').addClass('phone');
  }
}

function equalFlagshipCells() {
    if (true) {
    // Boxhöhe Anpassen
        var highestBox = 0;
        $('.slider-flagships div.cell').each(function(){
            if($(this).height() > highestBox) 
                highestBox = $(this).height(); 
            });  
        $('.slider-flagships div.cell').height(highestBox);
    }
}

function issuu(){
    
    isMobile();

    var issue = $(".issuu");
        
        issue.attr({
            "width"  : issue.parent().innerWidth() * .8,
            "height" : issue.parent().innerWidth() * .8 * .5625
        });

        if (is_mobile) {
            $('.issuu').parent().html('<a href="http://issuu.com/earlyandbird/docs/kem_jahresbericht2015_web"><img class="cover-fallback" src="img/Bericht_Cover.jpg"></a>');
        }
    
}

$(window).on("load resize",function(){


    isMobile();

    /* header heights
    ----------------------------------------------------------------- */
    //if ($(window).width() > 681){  
    $('header.index, div.slider > div').css({height: $(window).height()});  
    $('div.contentContainer.index').css({'margin-top': $(window).height()});

    if (is_mobile) {
        //$('.bericht').css({height: $(window).height() - 90 });
    }

    $('.portrait').css({
        height: $(window).height()
    });  

    $('div.contentContainer.flags, div.contentContainer.flags div.columns').css({
        height: $(window).height()
    }); 


    equalFlagshipCells();
    


    /* Waypoints
    ----------------------------------------------------------------- */
    
    if(is_mobile) {

        $('.innerHeader *').hide();
        $('.navigationScroll').stop(true).animate({top: 0}, 500);
        $('#trigger-overlay').addClass('scrolldown');

    } else {

        //Fade in elements on index header
        $('.branding').hide();
        $('h1.kem').hide();
        $('.navigation').hide();
        $('blockquote').hide();
        $('.book').css({opacity: 0});
        $('.animateText').css({opacity: 0});

        $('.branding').delay(500).fadeIn(700);
        $('.navigation').delay(1000).fadeIn(700);
        $('blockquote').delay(1500).fadeIn(700);
        $('h1.kem').delay(2000).fadeIn(700);

        //Show and hide navigations
        $('.index ul.socialAside').hide();
        $('.navigationScroll').css({top: -50});

        $('#pointNav').waypoint(function(direction){
            $('ul.socialAside').stop(true).fadeToggle(700);
            if(direction == 'down' ) {
                $('.navigationScroll').stop(true).animate({top: 0}, 500);
                $('.innerHeader').stop(true).fadeOut(500);
                $('#trigger-overlay').addClass('scrolldown');
            } 
                else {
                    $('.navigationScroll').stop(true).animate({top: -50}, 500);
                    $('.innerHeader').stop(true).fadeIn(500);
                    $('#trigger-overlay').removeClass('scrolldown');
                }
            
            }, {offset: '10%'}
        );

    }

    


    $('#pointlayar').waypoint(function(direction){
         $('.book').animate({opacity: 1});
         $('.animateText').animate({opacity: 1});
        }, {offset: '60%'}
    );


    /* fake link
    ----------------------------------------------------------------- */
    $('blockquote').each(function(){
        $(this).hover(function(){
            $(this).find('a.quotelink').toggleClass('fakehover');
        });
    });


    /* navigationCarousel
      ----------------------------------------------------------------- */
    $('.carousel div a').each(function(i){
        $(this).click(function(event){
            event.preventDefault();
            if (i >= 2) {
                $(this).parent().parent().animate({
                    'top': (69) * -1 
                });
            } else {
                $(this).parent().parent().animate({
                    'top': 0
                });
            }
        });
    });

    /* scrolling Parallax
    ----------------------------------------------------------------- */
    $('header .slick-slide h1').css({
        top: $(window).height() / 2
    });

    if (!is_mobile) {

        $(window).scroll(function() {    
            var currentScroll = $(this).scrollTop();
            $('.slider').css({top: -currentScroll / 4 });
            $('.slick-slide div blockquote').css({ bottom: currentScroll / 3 + 100});
            $('.slick-slide h1').css({top: - currentScroll / 5 + $(window).height() / 2});
            $('.slick-slide h1').css({top: - currentScroll / 5 + $(window).height() / 2});
        });
    }


}); // End of resize function


/* qualitaetsmacher videos
----------------------------------------------------------------- */
$(document).on('click', 'a.imgLink', function(e){
    e.preventDefault();
    var video = $(this).attr('data-video');
    var width = $(this).find('img').width();
    var height = $(this).find('img').height();

    $('.doc-video-wrap').width(width);
    $('.doc-video-wrap').height(height);
    $('.doc-video-wrap').html('<iframe width="560" height="315" src="https://www.youtube.com/embed/'+video+'?rel=0&autoplay=true" frameborder="0" allowfullscreen></iframe>');
});


$(document).ready(function(){


    /* trigger lightbox
    ----------------------------------------------------------------- */
    $('#trigger-lightbox, #trigger-overlay').click(function(){
        $(this).toggleClass('close');
    });

    $('#trigger-lightbox').click(function(){
        $('#lightbox').stop(true).fadeToggle(1000);
    });


    /* trigger video lightbox
    ----------------------------------------------------------------- */
    $('a.video-lightbox').click(function(e){
        e.preventDefault();
        var video = $(this).attr('data-lightbox-video');

        $('#mz-lightbox').stop(true).fadeToggle(1000);

        $('#mz-lightbox .video-container').html('<iframe width="560" height="315" src="https://www.youtube.com/embed/'+video+'?rel=0&autoplay=true" frameborder="0" allowfullscreen></iframe>')
    });

    $('#mz-lightbox .close').click(function(e){
        $('#mz-lightbox').stop(true).fadeOut(300);
    });

    /* set scroll navigation
    ----------------------------------------------------------------- */
    var getnavigation = $('.innerHeader').html();
    $('body').prepend('<div class="navigationScroll"> '+getnavigation+' </div>');

    
    /* covered images as background for parent elements
    ----------------------------------------------------------------- */
    $('img.cover').each(function(){

        var src = $(this).attr('src');
        var bgsize = $(this).data('size');
        var bgpos = $(this).data('pos');

            $(this).parent().css({
                'background-image': 'url('+src+')',
                'background-size': bgsize,
                'background-position': bgpos
            });

            $(this).hide();
    });

    /* smoothscroll
    ----------------------------------------------------------------- */
    $(function() {
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });

    });


    /* fancybox
    ----------------------------------------------------------------- */
    $(".fancybox").fancybox();


    /* slick slider
    ----------------------------------------------------------------- */
    $('.slider').slick({
        autoplay: false,
        speed: 2000,
        prevArrow: '<div data-role="none" class="slick-prev"><i class="fa fa-angle-left"></i></div>',
        nextArrow: '<div data-role="none" class="slick-next"><i class="fa fa-angle-right"></i></div>',
        infinite: true,
        fade: true,
    });

    $('.slider-flagships').slick({
        autoplay: false,
        speed: 2000,
        lazyLoad: 'ondemand',
        slidesToScroll: 1,
        dots: false,
        //prevArrow: '<button data-role="none" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
        //nextArrow: '<button data-role="none" class="slick-next"><i class="fa fa-angle-right"></i></button>',
        centerPadding: 0
    });

    $('.start').click(function(e){
        e.preventDefault();
        $('.slider-flagships').slick('slickGoTo', 1);
    });

    $('.slider-flagships').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        if (nextSlide != 0) {
            $('.flagships-bg').fadeOut();
        } else {
            $('.flagships-bg').fadeIn();
        }

        console.log(currentSlide);
    });

    var i = 1;
    $('.gotoimg').each(function(i){
        $(this).click(function(e){
            e.preventDefault();
            $('.slider-flagships').slick('slickGoTo', i);
            $('#lightbox').stop(true).fadeOut(500);
            $('#trigger-lightbox').removeClass('close');
        });
        i++
    });

    $('.gotoarrow').each(function(i){
        $(this).click(function(e){
            e.preventDefault();
            $('.slider-flagships').slick('slickGoTo', i);
            $('#lightbox').stop(true).fadeOut(500);
            $('#trigger-lightbox').removeClass('close');
        });
        i++
    });

    $('#lightbox .cell h2').each(function(i){
        $(this).click(function(e){
            e.preventDefault();
            $('.slider-flagships').slick('slickGoTo', i);
            $('#lightbox').stop(true).fadeOut(500);
            $('#trigger-lightbox').removeClass('close');
        });
        i++
    });    

    /* foundation equalizer
    ----------------------------------------------------------------- */
    $(document).foundation({
        equalizer : {
            equalize_on_stack: false
        }
    }); 

    /* foundation magellan-expedition
    ----------------------------------------------------------------- */
    $(document).foundation({
        "magellan-expedition": {
            active_class: 'active-item', // specify the class used for active sections
            threshold: 0, // how many pixels until the magellan bar sticks, 0 = auto
            destination_threshold: 0, // pixels from the top of destination for it to be considered active
            throttle_delay: 0, // calculation throttling to increase framerate
            fixed_top: 0, // top distance in pixels assigend to the fixed element on scroll
            offset_by_height: 100 // whether to offset the destination by the expedition height. Usually you want this to be true, unless your expedition is on the side.
        }
    });


}); // End of ready function


function popup (url) {
    fenster = window.open(url, "Diese Seite Teilen", "width=500,height=350,resizable=yes");
    fenster.focus();
    return false;
}