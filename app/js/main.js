"use strict";

var defaultVideoOptions = {
  controls:false,
  autoplay:false,
  preload:'auto',
  width:'auto',
  height:'auto',
  muted:true
};

var videosArray = [];
var video1 = null, video2 = null, video3 = null,
    video4 = null, video5 = null, video6 = null;

video1 = videojs('v_prueba_1',defaultVideoOptions, function() {
  this.play();
  this.on('ended', function() {
    video2.play();
  });
  videosArray.push({element:this,ratio:9/16});
});

video2 = videojs('v_prueba_2', defaultVideoOptions, function() {
  this.on('ended', function() {
    video1.play();
  });
  videosArray.push({element:this,ratio:16/9});
});

video3 = videojs('v_prueba_3',defaultVideoOptions, function() {
  this.play();
  this.on('ended', function() {
    video4.play();
  });
  videosArray.push({element:this,ratio:9/16});
});

video4 = videojs('v_prueba_4', defaultVideoOptions, function() {
  this.on('ended', function() {
    video3.play();
  });
  videosArray.push({element:this,ratio:16/9});
});

video5 = videojs('v_prueba_5',defaultVideoOptions, function() {
  this.play();
  this.on('ended', function() {
    video6.play();
  });
  videosArray.push({element:this,ratio:9/16});
});

video6 = videojs('v_prueba_6', defaultVideoOptions, function() {
  this.on('ended', function() {
    video5.play();
  });
  videosArray.push({element:this,ratio:16/9});
});

jQuery(document).ready(function($){
  var main = $('body');
  var currentCls = 'home';
  var modules = {
    attendance: $('#attendance'),
    evaluation: $('#evaluation'),
    task: $('#task')
  };

  function changeBackground(c){
    main.removeClass();
    main.attr('class',c);
  }

  function isScrolledIntoView(c) {
    var e = $(window).scrollTop() - 200;
    var d = e + $(window).height();
    var a = $(c).offset().top;
    return ((a <= d) && (a >= e));
  }

  function isScrolledIntoTopView(c) {
    var w_scrl_top = $(window).scrollTop();
    var e_offset   = $(c).offset().top;
    var e_height   = $(c).height();
    return (e_offset + e_height >= w_scrl_top);
  }

  function checkActive(a) {
    var c = a.data('class');
    if (c !== currentCls && isScrolledIntoView(a)) {
      changeBackground(c);
      currentCls = c;
    }
  }

  function onchangeDemoModule(){
    for (var module in modules) {
      var a = modules[module];
      if (modules.hasOwnProperty(module)) {
        checkActive(a);
      }
    }
  }

  $(".home-slider").nerveSlider({
    sliderFullscreen: true
  });

  $( window ).scroll(function() {
    onchangeDemoModule();
  });
  onchangeDemoModule();
});

function resizeVideoJS(){
  for(var video in videosArray){
    var width = document.getElementById(videosArray[video].element.id()).parentElement.offsetWidth-50;
    videosArray[video].element.width(width).height( width * videosArray[video].ratio );
  }
}

resizeVideoJS();
window.onresize = resizeVideoJS;
