// var betSlip = function() {
//   var odds = parseFloat($("#total-odds").html());

//   $("#stake-input").on('input', function() {
//       var stake = parseFloat($(this).val());
//       localStorage.setItem('stake', stake)
//       calculations(stake);
//   });

//   var new_stake = localStorage.getItem('stake');

//   if (new_stake){
//     $("#stake-input").val(new_stake);
//     calculations(new_stake)
//   }

//   function calculations(stake){
//     var wins = Math.round((stake * odds)) || 0;
//     $("#total-wins").html("UGX" + " " + wins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
//   }
// };

// document.addEventListener("turbolinks:load", function() {
//     betSlip();
//     //initialiseInput();
//     $(".intialise_input").on("click", function() {
//         setTimeout(function() {
//             betSlip()
//         }, 500)
//     });

//     var oldHtml = $.fn.html;
//     $.fn.html = function() {
//         var ret = oldHtml.apply(this, arguments);
//         this.trigger("change");
//         return ret;
//     };

//     $("#fixture-table-body").on("change", function() {
//         if ($(this).find(".intialise_input").length > 0) {
//             //initialiseInput();
//             $(".intialise_input").on("click", function() {
//                 setTimeout(function() {
//                     betSlip()
//                 }, 500)
//             });
//         };
//     });
// })
$(document).ready(function () {
  window.onpageshow = function (evt) {
    if (evt.persisted) {
      document.body.style.display = "none";
      location.reload();
    }
  };
});
document.addEventListener("turbolinks:load", function () {
  $("#flash").fadeOut(3000);
});
