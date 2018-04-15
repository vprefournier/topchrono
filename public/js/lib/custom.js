jQuery(document).ready(function() {

  $(".googleSubmit").click(function() {
    $(".formSubmitLogin").submit();
    return false;
  });

    // for hover dropdown menu
    $('ul.nav li.dropdown').hover(function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(200);
    }, function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(200);
    });
    // slick slider call 
    $('.slick_slider').slick({
        dots: true,
        infinite: true,
        speed: 100,
        slidesToShow: 1,
        slide: 'div',
        autoplay: true,
        autoplaySpeed: 20000,
        cssEase: 'linear'
    });
    // latest post slider call 
    $('.latest_postnav').newsTicker({
        row_height: 2000,
        speed: 2000
    });
    jQuery(".fancybox-buttons").fancybox({
        prevEffect: 'none',
        nextEffect: 'none',
        closeBtn: true,
        helpers: {
            title: {
                type: 'inside'
            },
            buttons: {}
        }
    });
    // jQuery('a.gallery').colorbox();
    //Check to see if the window is top if not then display button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });
    //Click event to scroll to top
    $('.scrollToTop').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    $('.tootlip').tooltip();
    $("ul#ticker01").liScroll();


  $('#donationModal').on('shown.bs.modal', function () {
      $($('.modal-body .nav-item a')[0]).click();
  });
});

wow = new WOW({
    animateClass: 'animated',
    offset: 100
});
wow.init();

