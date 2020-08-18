// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
import 'core-js/stable'
import 'regenerator-runtime/runtime'

require("modernizr/modernizr.custom.js");

require("@rails/ujs").start()
// //require("turbolinks").start()
require("@rails/activestorage").start()
// require("channels")
//ECharts import
window.echarts = require("packs/admin_assets/echarts.min.js")
//-- Date Timepicker
import './time_picker.js';
import "./bets_analytics.js.erb";
import "./analytics.js.erb";
//--- Bootstrap
import 'bootstrap';

import appInit from './angle/app.init.js';
document.addEventListener('DOMContentLoaded', appInit);

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

$(document).ready(function(){
  $("#kick_off_before").datetimepicker({
    format: "YYYY-MM-DD hh:mm a"
  });
  $("#kick_off_after").datetimepicker({
    format: "YYYY-MM-DD hh:mm a"
  });
});

$('.booking').click('ajax:complete', function() {
  $(this).closest('tr').fadeOut();
  setTimeout(function(){
    $('#notice').html("")
  }, 2000)
});
