// calculateWin = function(obj) {
//     var stake = parseFloat(obj);
//     var odds = parseFloat(document.getElementById("total-odds").value);
//     var wins = Math.round((stake * odds));
//     console.log(stake)
//     console.log(odds)
//     console.log(wins)
//     console.log(obj)
//         // set the value
//     document.getElementById("total-wins").innerText = "UGX" + wins.toString();



// };


var betSlip = function() {
  var odds = parseFloat($("#total-odds").html());

  $("#stake-input").on('input', function() {
      var stake = parseFloat($(this).val());
      localStorage.setItem('stake', stake)
      calculations(stake);
  });

  var new_stake = localStorage.getItem('stake');

  if (new_stake){
    $("#stake-input").val(new_stake);
    calculations(new_stake)
  }

  function calculations(stake){
    var wins = Math.round((stake * odds)) || 0;
    $("#total-wins").html("UGX" + " " + wins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
  }
};


document.addEventListener("turbolinks:load", function() {
    betSlip();
    $(".intialise_input").on("click", function(){
      setTimeout(function(){
        betSlip()
      }, 500)
    });
})
