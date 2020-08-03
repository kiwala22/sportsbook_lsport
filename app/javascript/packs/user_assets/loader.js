// (function($) {
//
//     "use strict";
//
//     var $window = $(window);
//
//         /*------------------------------------
//             01. Preloader
//         --------------------------------------*/
//
//         $('#preloader').fadeOut('normall', function() {
//             $(this).remove();
//         });
//
//
//         /*------------------------------------
//             02. Scroll To Top
//         --------------------------------------*/
//
//         $window.on('scroll', function() {
//             if ($(this).scrollTop() > 500) {
//                 $(".scroll-to-top").fadeIn(400);
//
//             } else {
//                 $(".scroll-to-top").fadeOut(400);
//             }
//         });
//
//         $(".scroll-to-top").on('click', function(event) {
//             event.preventDefault();
//             $("html, body").animate({
//                 scrollTop: 0
//             }, 600);
//         });
//
//
//     // === when window loading === //
//     $window.on("load", function() {
//
//     });
//
// })(jQuery);


document.addEventListener("turbolinks:load", function() {
    $('#preloader').fadeOut(2000, function() {
        $(this).remove();
    });
})
